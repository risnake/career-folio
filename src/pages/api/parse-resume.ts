export const prerender = false;

import type { APIRoute } from 'astro';
import { normalizeResume, extractJson } from '../../lib/resumeNormalizers';
import { createRateLimiter, getClientIp } from '../../lib/rateLimiter';

const SYSTEM_PROMPT = `You are a resume parser. Given raw resume text, extract structured data and return it as a JSON object. Do NOT invent or embellish any information — only use what is explicitly stated in the text. If a field is not present in the text, leave it as an empty string or empty array.

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "name": "Full Name",
  "contact": {
    "email": "email@example.com",
    "phone": "(555) 123-4567",
    "addresses": ["123 Main St, City, State ZIP"],
    "linkedin": "linkedin.com/in/name",
    "website": "website.com"
  },
  "objective": "Career objective statement if present",
  "education": [
    {
      "institution": "University Name",
      "location": "City, State",
      "degree": "Degree and Major",
      "dates": "MM/YYYY - MM/YYYY",
      "gpa": "3.8/4.0",
      "coursework": ["Course 1", "Course 2"],
      "details": ["Honor or detail"]
    }
  ],
  "experienceSections": [
    {
      "title": "Work Experience",
      "items": [
        {
          "title": "Job Title",
          "organization": "Company Name",
          "location": "City, State",
          "dates": "MM/YYYY - MM/YYYY",
          "bullets": ["Accomplishment or responsibility"]
        }
      ]
    }
  ],
  "skills": [
    { "label": "Category", "value": "Skill details" }
  ],
  "additionalInfo": ["Award, activity, or other info"]
}

Guidelines:
- Group experience items into logical sections (Work Experience, Leadership, Research, Volunteer, Projects, etc.)
- Keep bullet points exactly as written — do not rewrite or enhance them
- For dates, use the format from the resume text as-is
- Extract skills into category/details pairs where possible
- Put awards, certifications, activities, interests, and other items into additionalInfo`;

const rateLimiter = createRateLimiter(60_000, 10);

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const clientIp = getClientIp(request);
    if (rateLimiter.isLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const { text } = body as { text?: string };

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Resume text is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (text.length > 15000) {
      return new Response(
        JSON.stringify({ error: 'Resume text is too long (max 15,000 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const runtime = locals.runtime as { env?: { OPENROUTER_API_KEY?: string; OPENROUTER_MODEL?: string } };
    const apiKey = runtime?.env?.OPENROUTER_API_KEY || import.meta.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service is not configured. Please set OPENROUTER_API_KEY in Cloudflare Pages settings.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const model = runtime?.env?.OPENROUTER_MODEL || import.meta.env.OPENROUTER_MODEL || 'openrouter/free';

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 8192,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Parse this resume:\n\n${text.trim()}` },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenRouter error:', res.status, errText);

      let detail = `AI service error (${res.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson?.error?.message) detail = errJson.error.message;
      } catch { /* use default detail */ }

      return new Response(
        JSON.stringify({ error: detail }),
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

    if (!parsed || typeof parsed !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Could not parse AI response into structured data' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const resume = normalizeResume(parsed);

    return new Response(JSON.stringify({ resume }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Parse resume error:', err);
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
