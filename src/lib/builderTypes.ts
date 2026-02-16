import type { ResumeContact, Education, ExperienceItem, ResumeSection } from '../data/resumes';

export type TemplateType = 'chronological' | 'functional' | 'combination';

export interface AISuggestion {
  original: string;
  suggested: string;
  loading: boolean;
  error?: string;
}

export interface BuilderState {
  currentStep: number;
  template: TemplateType | null;
  name: string;
  contact: ResumeContact;
  objective: string;
  education: Education[];
  experienceSections: ResumeSection[];
  skills: { label: string; value: string }[];
  additionalInfo: string[];
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  aiEnhancements: Record<string, AISuggestion>;
}

export type BuilderAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_TEMPLATE'; template: TemplateType }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_CONTACT'; contact: Partial<ResumeContact> }
  | { type: 'SET_OBJECTIVE'; objective: string }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; index: number; education: Education }
  | { type: 'REMOVE_EDUCATION'; index: number }
  | { type: 'ADD_EXPERIENCE_SECTION' }
  | { type: 'UPDATE_EXPERIENCE_SECTION'; index: number; section: ResumeSection }
  | { type: 'REMOVE_EXPERIENCE_SECTION'; index: number }
  | { type: 'ADD_EXPERIENCE_ITEM'; sectionIndex: number }
  | { type: 'UPDATE_EXPERIENCE_ITEM'; sectionIndex: number; itemIndex: number; item: ExperienceItem }
  | { type: 'REMOVE_EXPERIENCE_ITEM'; sectionIndex: number; itemIndex: number }
  | { type: 'ADD_SKILL' }
  | { type: 'UPDATE_SKILL'; index: number; skill: { label: string; value: string } }
  | { type: 'REMOVE_SKILL'; index: number }
  | { type: 'ADD_ADDITIONAL_INFO' }
  | { type: 'UPDATE_ADDITIONAL_INFO'; index: number; value: string }
  | { type: 'REMOVE_ADDITIONAL_INFO'; index: number }
  | { type: 'TOUCH_FIELD'; field: string }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'AI_REQUEST'; key: string; original: string }
  | { type: 'AI_SUCCESS'; key: string; suggested: string }
  | { type: 'AI_ERROR'; key: string; error: string }
  | { type: 'AI_ACCEPT'; key: string }
  | { type: 'AI_REJECT'; key: string };
