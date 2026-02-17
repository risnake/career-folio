export const prerender = false;

import type { APIRoute } from 'astro';
import { verbCategories } from '../../data/actionVerbs';

const allVerbs = verbCategories.flatMap((c) => c.verbs);
const uniqueVerbs = [...new Set(allVerbs)].join(', ');

const BULLET_SYSTEM_PROMPT = `You are a resume writing expert. Enhance the following resume bullet point to be more impactful and professional. Use strong action verbs from this list where appropriate: ${uniqueVerbs}. Keep the enhanced version concise (one sentence), specific, and quantified where possible. Return ONLY the enhanced bullet point text, nothing else.`;

const OBJECTIVE_SYSTEM_PROMPT = `You are a resume writing expert. Improve the following career objective statement to be more compelling and professional. Make it concise, specific to the candidate's goals, and impactful. Return ONLY the improved objective text, nothing else.`;

const VALID_TYPES = new Set(['bullet', 'objective']);

/**
 * Parse the raw AI model response to extract just the enhanced text.
 * Models may wrap their response in quotes, add prefixes like
 * "Here's the enhanced version:", markdown formatting, etc.
 */
function parseAIResponse(raw: string): string {
  let text = raw.trim();

  // Strip common conversational prefixes the model may add
  const prefixPatterns = [
    /^here(?:'s| is) (?:the |an? |your )?(?:enhanced|improved|revised|updated|suggested|better)[\w\s]*?:\s*/i,
    /^(?:enhanced|improved|revised|updated|suggested)[\w\s]*?:\s*/i,
    /^sure[,!.]?\s*(?:here(?:'s| is)[\w\s]*?:\s*)?/i,
    /^(?:certainly|absolutely|of course)[,!.]?\s*(?:here(?:'s| is)[\w\s]*?:\s*)?/i,
  ];
  for (const pattern of prefixPatterns) {
    text = text.replace(pattern, '');
  }

  // Strip surrounding quotes (single, double, or smart quotes)
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'")) ||
    (text.startsWith('\u201c') && text.endsWith('\u201d'))
  ) {
    text = text.slice(1, -1);
  }

  // Strip leading bullet markers
  text = text.replace(/^[\u2022\-\*]\s*/, '');

  // If multiple lines, take the first non-empty line (model may add explanations after)
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1) {
    // If the first line looks like a label (ends with ":"), take the second line
    text = lines[0].endsWith(':') ? lines[1] : lines[0];
  } else if (lines.length === 1) {
    text = lines[0];
  }

  // Final cleanup: strip any remaining surrounding quotes after all other processing
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
  }

  return text.trim();
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { bullet, text, context, type } = body as {
      bullet?: string;
      text?: string;
      context?: string;
      type?: string;
    };

    // Validate type parameter
    const enhanceType = type || 'bullet';
    if (!VALID_TYPES.has(enhanceType)) {
      return new Response(
        JSON.stringify({ error: `Invalid type: must be "bullet" or "objective"` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const isObjective = enhanceType === 'objective';

    // Accept either `text` or `bullet` field for backwards compatibility
    const inputText = text || bullet;
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

    // Access runtime environment variables from Cloudflare Pages
    // In production, these come from the Cloudflare dashboard secrets
    // In local development with wrangler, they come from .dev.vars
    const runtime = locals.runtime as { env?: { OPENROUTER_API_KEY?: string; OPENROUTER_MODEL?: string } };
    const apiKey = runtime?.env?.OPENROUTER_API_KEY || import.meta.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI enhancement is not configured. Please set OPENROUTER_API_KEY in Cloudflare Pages settings.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const systemPrompt = isObjective ? OBJECTIVE_SYSTEM_PROMPT : BULLET_SYSTEM_PROMPT;

    const userContent = context
      ? `${inputText}\n\nContext: ${context}`
      : inputText;

    const model = runtime?.env?.OPENROUTER_MODEL || import.meta.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-haiku';

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
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
    const rawContent = data.choices?.[0]?.message?.content?.trim();

    if (!rawContent) {
      return new Response(
        JSON.stringify({ error: 'No suggestion returned from AI' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const suggested = parseAIResponse(rawContent);

    if (!suggested) {
      return new Response(
        JSON.stringify({ error: 'Could not parse AI response' }),
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
