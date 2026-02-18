export const prerender = false;

import type { APIRoute } from 'astro';
import type { TemplateType, BuilderGeneratedResume } from '../../lib/builderTypes';
import type { ResumeContact, Education, ExperienceItem, ResumeSection } from '../../data/resumes';
import { createEmptyEducation, createEmptyExperienceItem, createEmptySection } from '../../lib/resumeDefaults';

type ClientMessage = { role: 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are a deterministic resume intake assistant. Ask concise follow-up questions until you have enough detail to produce a resume. Never invent facts—if key details are missing, ask for them. When ready, return ONLY a JSON object that matches the required shape (no prose, no markdown). Keep bullets action-oriented and specific, and cap each at 200 characters. Prefer asking another question over guessing.`;

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

function toCleanString(value: unknown, max = 400): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function toStringArray(value: unknown, maxItems: number, maxLen = 220): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => toCleanString(item, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

function toTemplate(value: unknown): TemplateType {
  if (typeof value !== 'string') return 'chronological';
  const lower = value.toLowerCase();
  if (lower.startsWith('function')) return 'functional';
  if (lower.startsWith('combination')) return 'combination';
  return 'chronological';
}

function normalizeEducation(list: unknown): Education[] {
  if (!Array.isArray(list)) return [createEmptyEducation()];
  const normalized = list.slice(0, 4).map((edu): Education => {
    return {
      institution: toCleanString((edu as Education)?.institution, 180),
      location: toCleanString((edu as Education)?.location, 120),
      degree: toCleanString((edu as Education)?.degree, 180),
      dates: toCleanString((edu as Education)?.dates, 120),
      gpa: toCleanString((edu as Education)?.gpa, 40),
      coursework: toStringArray((edu as Education)?.coursework, 8, 80),
      details: toStringArray((edu as Education)?.details, 6),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyEducation()];
}

function normalizeExperienceItems(list: unknown): ExperienceItem[] {
  if (!Array.isArray(list)) return [createEmptyExperienceItem()];
  const normalized = list.slice(0, 4).map((item): ExperienceItem => {
    return {
      title: toCleanString((item as ExperienceItem)?.title, 140),
      organization: toCleanString((item as ExperienceItem)?.organization, 160),
      location: toCleanString((item as ExperienceItem)?.location, 140),
      dates: toCleanString((item as ExperienceItem)?.dates, 120),
      bullets: toStringArray((item as ExperienceItem)?.bullets, 6, 200),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyExperienceItem()];
}

function normalizeExperienceSections(list: unknown): ResumeSection[] {
  if (!Array.isArray(list)) return [createEmptySection()];
  const normalized = list.slice(0, 4).map((section): ResumeSection => {
    return {
      title: toCleanString((section as ResumeSection)?.title, 140),
      items: normalizeExperienceItems((section as ResumeSection)?.items),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptySection()];
}

function normalizeResume(raw: any): BuilderGeneratedResume {
  const contactInput = (raw?.contact ?? {}) as ResumeContact;
  const contact: ResumeContact = {
    email: toCleanString(contactInput.email, 160),
    phone: toCleanString(contactInput.phone, 60),
    addresses: toStringArray(contactInput.addresses, 3, 140),
    linkedin: toCleanString(contactInput.linkedin, 200),
    website: toCleanString(contactInput.website, 200),
  };

  return {
    template: toTemplate(raw?.template),
    name: toCleanString(raw?.name, 180),
    contact,
    objective: toCleanString(raw?.objective, 600),
    education: normalizeEducation(raw?.education),
    experienceSections: normalizeExperienceSections(raw?.experienceSections),
    skills: Array.isArray(raw?.skills)
      ? raw.skills
          .slice(0, 10)
          .map((skill: { label?: string; value?: string }) => ({
            label: toCleanString(skill?.label, 80),
            value: toCleanString(skill?.value, 200),
          }))
          .filter((s) => s.label || s.value)
      : [],
    additionalInfo: toStringArray(raw?.additionalInfo, 8, 200),
  };
}

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
      resume: normalizeResume(raw.resume),
    };
  }
  return null;
}

function extractJson(content: string) {
  const trimmed = content.trim();

  // Try direct parse first
  try {
    return JSON.parse(trimmed);
  } catch { /* fall through */ }

  // Try fenced code block
  const fenceMatch = trimmed.match(/```(?:json)?\\s*([\\s\\S]*?)\\s*```/i);
  if (fenceMatch?.[1]) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch { /* fall through */ }
  }

  // Try substring from first { to last }
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const slice = trimmed.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(slice);
    } catch { /* fall through */ }
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
    education: normalizeEducation(input?.education),
    experienceSections: normalizeExperienceSections(input?.experienceSections),
    skills: Array.isArray(input?.skills)
      ? input.skills
          .slice(0, 10)
          .map((skill: { label?: string; value?: string }) => ({
            label: toCleanString(skill?.label, 80),
            value: toCleanString(skill?.value, 200),
          }))
          .filter((s) => s.label || s.value)
      : [],
    additionalInfo: toStringArray(input?.additionalInfo, 8, 200),
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
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

    const model = runtime?.env?.OPENROUTER_MODEL || import.meta.env.OPENROUTER_MODEL || 'stepfun/step-3.5-flash:free';

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
      const errText = await res.text();
      console.error('OpenRouter error:', res.status, errText);
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
