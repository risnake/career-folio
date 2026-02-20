export const prerender = false;

import type { APIRoute } from 'astro';
import type { BuilderGeneratedResume } from '../../lib/builderTypes';
import {
  toCleanString,
  toStringArray,
  toTemplate,
  normalizeEducation,
  normalizeExperienceSections,
  normalizeResume,
  extractJson,
} from '../../lib/resumeNormalizers';
import { createRateLimiter, getClientIp } from '../../lib/rateLimiter';

type ClientMessage = { role: 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are a deterministic resume intake assistant. Ask concise follow-up questions until you have enough detail to produce a resume. Never invent facts—if key details are missing, ask for them. When ready, return ONLY a JSON object that matches the required shape (no prose, no markdown). Keep bullets action-oriented and specific, and cap each at 200 characters. Prefer asking another question over guessing.`;

const rateLimiter = createRateLimiter(60_000, 60);

interface BuilderChatReplyQuestion {
  type: 'question';
  message: string;
}

interface BuilderChatReplyResume {
  type: 'resume';
  message: string;
  resume: BuilderGeneratedResume;
}

type BuilderChatReply = BuilderChatReplyQuestion | BuilderChatReplyResume;

function normalizeReply(raw: any): BuilderChatReply | null {
  const message = toCleanString(raw?.message, 800);
  if (raw?.type === 'question') {
    return {
      type: 'question',
      message: message || 'What role and industry are you targeting?',
    };
  }
  if (raw?.type === 'resume' && raw?.resume) {
    return {
      type: 'resume',
      message: message || 'Drafted your resume.',
      resume: normalizeResume(raw.resume, { maxSkills: 10, maxAdditional: 8 }),
    };
  }
  return null;
}

function sanitizeMessages(input: unknown): ClientMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((m) => {
      if (m && (m as ClientMessage).role && (m as ClientMessage).content) {
        const role = (m as ClientMessage).role;
        if (role !== 'user' && role !== 'assistant') return null;
        const content = toCleanString((m as ClientMessage).content, 1200);
        return content ? { role, content } : null;
      }
      return null;
    })
    .filter(Boolean)
    .slice(-12) as ClientMessage[];
}

function sanitizeStateSnapshot(input: any): BuilderGeneratedResume {
  return {
    template: toTemplate(input?.template),
    name: toCleanString(input?.name, 180),
    contact: {
      email: toCleanString(input?.contact?.email, 160),
      phone: toCleanString(input?.contact?.phone, 60),
      addresses: toStringArray(input?.contact?.addresses, 3, 140),
      linkedin: toCleanString(input?.contact?.linkedin, 200),
      website: toCleanString(input?.contact?.website, 200),
    },
    objective: toCleanString(input?.objective, 600),
    education: normalizeEducation(input?.education, 4),
    experienceSections: normalizeExperienceSections(input?.experienceSections, 4, 4),
    skills: Array.isArray(input?.skills)
      ? input.skills
          .slice(0, 10)
          .map((skill: { label?: string; value?: string }) => ({
            label: toCleanString(skill?.label, 80),
            value: toCleanString(skill?.value, 200),
          }))
          .filter((s: { label: string; value: string }) => s.label || s.value)
      : [],
    additionalInfo: toStringArray(input?.additionalInfo, 8, 200),
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const clientIp = getClientIp(request);
    if (rateLimiter.isLimited(clientIp)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please slow down.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const messages = sanitizeMessages(body?.messages);
    const stateSnapshot = sanitizeStateSnapshot(body?.state ?? {});

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: 'At least one message is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const runtime = locals.runtime as { env?: { OPENROUTER_API_KEY?: string; OPENROUTER_MODEL?: string } };
    const apiKey = runtime?.env?.OPENROUTER_API_KEY || import.meta.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI assistant is not configured. Please set OPENROUTER_API_KEY.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const model = runtime?.env?.OPENROUTER_MODEL || import.meta.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

    const payload = {
      model,
      temperature: 0,
      max_tokens: 2048,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'system',
          content: `ALWAYS respond with raw JSON only (no markdown). The JSON must be one of:
{"type":"question","message":"<concise follow-up question>"}
{"type":"resume","message":"<short status>","resume":{template,name,contact,objective,education,experienceSections,skills,additionalInfo}}
Current structured state (use to avoid repeating questions): ${JSON.stringify(stateSnapshot)}`,
        },
        ...messages,
      ],
    };

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      await res.text(); // consume body without logging sensitive content
      console.error('OpenRouter error status:', res.status);
      return new Response(
        JSON.stringify({ error: `AI service error (${res.status})` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return new Response(
        JSON.stringify({ error: 'No response returned from AI' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const parsed = typeof rawContent === 'string' ? extractJson(rawContent) : rawContent;

    const reply = normalizeReply(parsed);

    if (!reply) {
      return new Response(
        JSON.stringify({ error: 'AI reply did not match expected schema' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Builder chat error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

export const ALL: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
};
