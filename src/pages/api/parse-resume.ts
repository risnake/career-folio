export const prerender = false;

import type { APIRoute } from 'astro';
import type { TemplateType, BuilderGeneratedResume } from '../../lib/builderTypes';
import type { ResumeContact, Education, ExperienceItem, ResumeSection } from '../../data/resumes';
import { createEmptyEducation, createEmptyExperienceItem, createEmptySection } from '../../lib/resumeDefaults';

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
  const normalized = list.slice(0, 6).map((edu): Education => {
    return {
      institution: toCleanString((edu as Education)?.institution, 180),
      location: toCleanString((edu as Education)?.location, 120),
      degree: toCleanString((edu as Education)?.degree, 180),
      dates: toCleanString((edu as Education)?.dates, 120),
      gpa: toCleanString((edu as Education)?.gpa, 40),
      coursework: toStringArray((edu as Education)?.coursework, 10, 80),
      details: toStringArray((edu as Education)?.details, 8),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyEducation()];
}

function normalizeExperienceItems(list: unknown): ExperienceItem[] {
  if (!Array.isArray(list)) return [createEmptyExperienceItem()];
  const normalized = list.slice(0, 8).map((item): ExperienceItem => {
    return {
      title: toCleanString((item as ExperienceItem)?.title, 140),
      organization: toCleanString((item as ExperienceItem)?.organization, 160),
      location: toCleanString((item as ExperienceItem)?.location, 140),
      dates: toCleanString((item as ExperienceItem)?.dates, 120),
      bullets: toStringArray((item as ExperienceItem)?.bullets, 10, 300),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyExperienceItem()];
}

function normalizeExperienceSections(list: unknown): ResumeSection[] {
  if (!Array.isArray(list)) return [createEmptySection()];
  const normalized = list.slice(0, 6).map((section): ResumeSection => {
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
    phone: toCleanString(contactInput.phone, 60) || undefined,
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
          .slice(0, 12)
          .map((skill: { label?: string; value?: string }) => ({
            label: toCleanString(skill?.label, 80),
            value: toCleanString(skill?.value, 200),
          }))
          .filter((s: { label: string; value: string }) => s.label || s.value)
      : [],
    additionalInfo: toStringArray(raw?.additionalInfo, 10, 200),
  };
}

function extractJson(content: string) {
  const trimmed = content.trim();

  // Try direct parse first
  try {
    return JSON.parse(trimmed);
  } catch { /* fall through */ }

  // Try fenced code block
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch?.[1]) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch { /* fall through */ }
  }

  // Try the first balanced-looking JSON block
  const braceStart = trimmed.indexOf('{');
  const braceEnd = trimmed.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      return JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
    } catch { /* fall through */ }
  }

  return null;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

type RateLimitEntry = { windowStart: number; count: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.windowStart = now;
    entry.count = 1;
    rateLimitStore.set(ip, entry);
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const body = await request.json();
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

    const model = runtime?.env?.OPENROUTER_MODEL || import.meta.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 4096,
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
