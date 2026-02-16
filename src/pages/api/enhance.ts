export const prerender = false;

import type { APIRoute } from 'astro';
import { verbCategories } from '../../data/actionVerbs';

const allVerbs = verbCategories.flatMap((c) => c.verbs);
const uniqueVerbs = [...new Set(allVerbs)].join(', ');

const SYSTEM_PROMPT = `You are a resume writing expert. Enhance the following resume bullet point to be more impactful and professional. Use strong action verbs from this list where appropriate: ${uniqueVerbs}. Keep the enhanced version concise (one sentence), specific, and quantified where possible. Return ONLY the enhanced bullet point text, nothing else.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { bullet, context } = body as { bullet?: string; context?: string };

    if (!bullet || typeof bullet !== 'string' || bullet.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'bullet is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (bullet.length > 500) {
      return new Response(
        JSON.stringify({ error: 'bullet must be 500 characters or fewer' }),
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

    const userContent = context
      ? `${bullet}\n\nContext: ${context}`
      : bullet;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-haiku',
        temperature: 0.3,
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('OpenRouter error:', res.status, text);
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
