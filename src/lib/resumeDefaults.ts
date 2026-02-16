import type { Education, ExperienceItem, ResumeSection } from '../data/resumes';
import type { BuilderState } from './builderTypes';

export function createEmptyEducation(): Education {
  return {
    institution: '',
    location: '',
    degree: '',
    dates: '',
    gpa: '',
    coursework: [],
    details: [],
  };
}

export function createEmptyExperienceItem(): ExperienceItem {
  return {
    title: '',
    organization: '',
    location: '',
    dates: '',
    bullets: [''],
  };
}

export function createEmptySection(): ResumeSection {
  return {
    title: '',
    items: [createEmptyExperienceItem()],
  };
}

export function createInitialState(): BuilderState {
  return {
    currentStep: 0,
    template: null,
    name: '',
    contact: {
      email: '',
      phone: '',
      addresses: [],
      linkedin: '',
      website: '',
    },
    objective: '',
    education: [createEmptyEducation()],
    experienceSections: [createEmptySection()],
    skills: [],
    additionalInfo: [],
    errors: {},
    touched: {},
    aiEnhancements: {},
  };
}
