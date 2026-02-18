import type { BuilderState, BuilderAction } from './builderTypes';
import { createEmptyEducation, createEmptyExperienceItem, createEmptySection } from './resumeDefaults';

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step, errors: {} };

    case 'SET_TEMPLATE':
      return { ...state, template: action.template };

    case 'SET_NAME':
      return { ...state, name: action.name };

    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.contact } };

    case 'SET_OBJECTIVE':
      return { ...state, objective: action.objective };

    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, createEmptyEducation()] };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu, i) =>
          i === action.index ? action.education : edu
        ),
      };

    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.index),
      };

    case 'ADD_EXPERIENCE_SECTION':
      return {
        ...state,
        experienceSections: [...state.experienceSections, createEmptySection()],
      };

    case 'UPDATE_EXPERIENCE_SECTION':
      return {
        ...state,
        experienceSections: state.experienceSections.map((sec, i) =>
          i === action.index ? action.section : sec
        ),
      };

    case 'REMOVE_EXPERIENCE_SECTION':
      return {
        ...state,
        experienceSections: state.experienceSections.filter((_, i) => i !== action.index),
      };

    case 'ADD_EXPERIENCE_ITEM':
      return {
        ...state,
        experienceSections: state.experienceSections.map((sec, i) =>
          i === action.sectionIndex
            ? { ...sec, items: [...sec.items, createEmptyExperienceItem()] }
            : sec
        ),
      };

    case 'UPDATE_EXPERIENCE_ITEM':
      return {
        ...state,
        experienceSections: state.experienceSections.map((sec, si) =>
          si === action.sectionIndex
            ? {
                ...sec,
                items: sec.items.map((item, ii) =>
                  ii === action.itemIndex ? action.item : item
                ),
              }
            : sec
        ),
      };

    case 'REMOVE_EXPERIENCE_ITEM':
      return {
        ...state,
        experienceSections: state.experienceSections.map((sec, si) =>
          si === action.sectionIndex
            ? { ...sec, items: sec.items.filter((_, ii) => ii !== action.itemIndex) }
            : sec
        ),
      };

    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, { label: '', value: '' }] };

    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((s, i) => (i === action.index ? action.skill : s)),
      };

    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };

    case 'ADD_ADDITIONAL_INFO':
      return { ...state, additionalInfo: [...state.additionalInfo, ''] };

    case 'UPDATE_ADDITIONAL_INFO':
      return {
        ...state,
        additionalInfo: state.additionalInfo.map((v, i) =>
          i === action.index ? action.value : v
        ),
      };

    case 'REMOVE_ADDITIONAL_INFO':
      return {
        ...state,
        additionalInfo: state.additionalInfo.filter((_, i) => i !== action.index),
      };

    case 'TOUCH_FIELD':
      return { ...state, touched: { ...state.touched, [action.field]: true } };

    case 'SET_ERRORS':
      return { ...state, errors: action.errors };

    case 'AI_REQUEST':
      return {
        ...state,
        aiEnhancements: {
          ...state.aiEnhancements,
          [action.key]: { original: action.original, suggested: '', loading: true },
        },
      };

    case 'AI_SUCCESS':
      return {
        ...state,
        aiEnhancements: {
          ...state.aiEnhancements,
          [action.key]: { ...state.aiEnhancements[action.key], suggested: action.suggested, loading: false },
        },
      };

    case 'AI_ERROR':
      return {
        ...state,
        aiEnhancements: {
          ...state.aiEnhancements,
          [action.key]: { ...state.aiEnhancements[action.key], loading: false, error: action.error },
        },
      };

    case 'AI_ACCEPT': {
      const { [action.key]: _, ...rest } = state.aiEnhancements;
      return { ...state, aiEnhancements: rest };
    }

    case 'AI_REJECT': {
      const { [action.key]: _, ...rest } = state.aiEnhancements;
      return { ...state, aiEnhancements: rest };
    }

    case 'APPLY_AI_RESUME': {
      const contact = {
        email: action.resume.contact.email || '',
        phone: action.resume.contact.phone || '',
        addresses: action.resume.contact.addresses ?? [],
        linkedin: action.resume.contact.linkedin || '',
        website: action.resume.contact.website || '',
      };

      return {
        ...state,
        template: action.resume.template,
        name: action.resume.name,
        contact,
        objective: action.resume.objective,
        education:
          action.resume.education && action.resume.education.length > 0
            ? action.resume.education
            : [createEmptyEducation()],
        experienceSections:
          action.resume.experienceSections && action.resume.experienceSections.length > 0
            ? action.resume.experienceSections
            : [createEmptySection()],
        skills: action.resume.skills ?? [],
        additionalInfo: action.resume.additionalInfo ?? [],
        errors: {},
        touched: {},
      };
    }

    default:
      return state;
  }
}
