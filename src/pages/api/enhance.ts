export const prerender = false;

import type { APIRoute } from 'astro';
import { verbCategories } from '../../data/actionVerbs';

const allVerbs = verbCategories.flatMap((c) => c.verbs);
const uniqueVerbs = [...new Set(allVerbs)].join(', ');

const BULLET_SYSTEM_PROMPT = `You are a resume writing expert. Enhance the following resume bullet point to be more impactful and professional. Use strong action verbs from this list where appropriate: ${uniqueVerbs}. Keep the enhanced version concise (one sentence), specific, and quantified where possible. Return ONLY the enhanced bullet point text, nothing else.`;

const OBJECTIVE_SYSTEM_PROMPT = `You are a resume writing expert. Improve the following career objective statement to be more compelling and professional. Make it concise, specific to the candidate's goals, and impactful. Return ONLY the improved objective text, nothing else.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { bullet, text, context, type } = body as {
      bullet?: string;
      text?: string;
      context?: string;
      type?: 'bullet' | 'objective';
    };

    const enhanceType = type || 'bullet';
    const isObjective = enhanceType === 'objective';

    // For objective type, accept either `text` or `bullet` field
    const inputText = isObjective ? (text || bullet) : bullet;
    const maxLength = isObjective ? 1000 : 500;
    const fieldName = isObjective ? 'text' : 'bullet';

    if (!inputText || typeof inputText !== 'string' || inputText.trim().length === 0) {
      return new Response(JSON.stringify({ error: `${fieldName} is required` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (inputText.length > maxLength) {
      return new Response(
        JSON.stringify({ error: `${fieldName} must be ${maxLength} characters or fewer` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const apiKey = import.meta.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI enhancement is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const systemPrompt = isObjective ? OBJECTIVE_SYSTEM_PROMPT : BULLET_SYSTEM_PROMPT;

    const userContent = context
      ? `${inputText}\n\nContext: ${context}`
      : inputText;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: import.meta.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-haiku',
        temperature: 0.3,
        max_tokens: 200,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenRouter error:', res.status, errText);
      return new Response(
        JSON.stringify({ error: 'AI service returned an error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();
    const suggested = data.choices?.[0]?.message?.content?.trim();

    if (!suggested) {
      return new Response(
        JSON.stringify({ error: 'No suggestion returned from AI' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ suggested }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Enhance API error:', err);
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
