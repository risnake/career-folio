import type { TemplateType, BuilderGeneratedResume } from './builderTypes';
import type {
  ResumeContact,
  Education,
  ExperienceItem,
  ResumeSection,
  EducationClub,
} from '../data/resumes';
import { createEmptyEducation, createEmptyExperienceItem, createEmptySection } from './resumeDefaults';

export function toCleanString(value: unknown, max = 400): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function toStringArray(value: unknown, maxItems: number, maxLen = 220): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => toCleanString(item, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function toTemplate(value: unknown): TemplateType {
  if (typeof value !== 'string') return 'chronological';
  const lower = value.toLowerCase();
  if (lower.startsWith('function')) return 'functional';
  if (lower.startsWith('combination')) return 'combination';
  return 'chronological';
}

function normalizeDateRange(value: unknown): string {
  const raw = toCleanString(value, 120);
  if (!raw) return '';

  const parts = raw.split(/\s*(?:-|–|—|to|through|until)\s*/i).filter(Boolean);
  if (parts.length === 0) return '';

  const [start, ...rest] = parts;
  const end = rest.join(' ') || '';
  const endNormalized = end ? (/present/i.test(end) ? 'Present' : end) : '';

  return endNormalized ? `${start} - ${endNormalized}` : start;
}

function normalizeClubs(list: unknown, maxItems = 12): EducationClub[] {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, maxItems)
    .map((club): EducationClub => ({
      name: toCleanString((club as EducationClub)?.name, 140),
      position: toCleanString((club as EducationClub)?.position, 140),
      impact: toCleanString((club as EducationClub)?.impact, 300),
      progression: toCleanString((club as EducationClub)?.progression, 220),
    }))
    .filter((club) => club.name || club.position || club.impact || club.progression);
}

export function normalizeEducation(list: unknown, maxItems = 6): Education[] {
  if (!Array.isArray(list)) return [createEmptyEducation()];
  const normalized = list.slice(0, maxItems).map((edu): Education => {
    return {
      institution: toCleanString((edu as Education)?.institution, 180),
      location: toCleanString((edu as Education)?.location, 120),
      degree: toCleanString((edu as Education)?.degree, 180),
      dates: normalizeDateRange((edu as Education)?.dates),
      gpa: toCleanString((edu as Education)?.gpa, 40),
      coursework: toStringArray((edu as Education)?.coursework, 10, 80),
      details: toStringArray((edu as Education)?.details, 8),
      clubs: normalizeClubs((edu as Education)?.clubs),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyEducation()];
}

export function normalizeExperienceItems(list: unknown, maxItems = 8): ExperienceItem[] {
  if (!Array.isArray(list)) return [createEmptyExperienceItem()];
  const normalized = list.slice(0, maxItems).map((item): ExperienceItem => {
    return {
      title: toCleanString((item as ExperienceItem)?.title, 140),
      organization: toCleanString((item as ExperienceItem)?.organization, 160),
      location: toCleanString((item as ExperienceItem)?.location, 140),
      dates: normalizeDateRange((item as ExperienceItem)?.dates),
      bullets: toStringArray((item as ExperienceItem)?.bullets, 10, 300),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptyExperienceItem()];
}

export function normalizeExperienceSections(list: unknown, maxSections = 6, maxItemsPerSection = 8): ResumeSection[] {
  if (!Array.isArray(list)) return [createEmptySection()];
  const normalized = list.slice(0, maxSections).map((section): ResumeSection => {
    return {
      title: toCleanString((section as ResumeSection)?.title, 140),
      items: normalizeExperienceItems((section as ResumeSection)?.items, maxItemsPerSection),
    };
  });
  return normalized.length > 0 ? normalized : [createEmptySection()];
}

export function normalizeResume(raw: any, limits?: { maxSkills?: number; maxAdditional?: number }): BuilderGeneratedResume {
  const maxSkills = limits?.maxSkills ?? 12;
  const maxAdditional = limits?.maxAdditional ?? 10;
  const clubKeywords = ['club', 'society', 'council', 'association', 'chapter', 'fraternity', 'sorority'];

  const contactInput = (raw?.contact ?? {}) as ResumeContact;
  const contact: ResumeContact = {
    email: toCleanString(contactInput.email, 160),
    phone: toCleanString(contactInput.phone, 60),
    addresses: toStringArray(contactInput.addresses, 3, 140),
    linkedin: toCleanString(contactInput.linkedin, 200),
    website: toCleanString(contactInput.website, 200),
  };

  const education = normalizeEducation(raw?.education);
  const experienceSections = normalizeExperienceSections(raw?.experienceSections);

  const detectedClubs: EducationClub[] = [];
  for (const section of experienceSections) {
    for (const item of section.items) {
      const text = `${item.title || ''} ${item.organization || ''}`.toLowerCase();
      if (text && clubKeywords.some((kw) => text.includes(kw))) {
        detectedClubs.push({
          name: item.organization || item.title || 'Club role',
          position: item.title || '',
          impact: Array.isArray(item.bullets) ? item.bullets.filter(Boolean).join(' ') : '',
        });
      }
    }
  }

  if (detectedClubs.length > 0 && education.length > 0) {
    const existingClubs = education[0].clubs ?? [];
    education[0] = { ...education[0], clubs: [...existingClubs, ...detectedClubs] };
  }

  return {
    template: toTemplate(raw?.template),
    name: toCleanString(raw?.name, 180),
    contact,
    objective: toCleanString(raw?.objective, 600),
    education,
    experienceSections,
    skills: Array.isArray(raw?.skills)
      ? raw.skills
          .slice(0, maxSkills)
          .map((skill: { label?: string; value?: string }) => ({
            label: toCleanString(skill?.label, 80),
            value: toCleanString(skill?.value, 200),
          }))
          .filter((s: { label: string; value: string }) => s.label || s.value)
      : [],
    additionalInfo: toStringArray(raw?.additionalInfo, maxAdditional, 200),
  };
}

/**
 * Extracts a JSON object from a string that may contain markdown fencing or other wrapping.
 */
export function extractJson(content: string) {
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

  // Try the outermost balanced-looking JSON block
  const braceStart = trimmed.indexOf('{');
  const braceEnd = trimmed.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      return JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
    } catch { /* fall through */ }
  }

  return null;
}
