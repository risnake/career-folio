import type { BuilderState } from './builderTypes';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateStep(step: number, state: BuilderState): ValidationResult {
  const errors: Record<string, string> = {};

  switch (step) {
    case 0:
      if (!state.template) {
        errors.template = 'Please select a template';
      }
      break;

    case 1:
      if (!state.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!state.contact.email.trim()) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(state.contact.email)) {
        errors.email = 'Please enter a valid email';
      }
      break;

    case 2:
      // Objective is optional
      break;

    case 3:
      if (state.education.length === 0) {
        errors.education = 'At least one education entry is required';
      }
      state.education.forEach((edu, i) => {
        if (!edu.institution.trim()) {
          errors[`education.${i}.institution`] = 'Institution is required';
        }
        if (!edu.location.trim()) {
          errors[`education.${i}.location`] = 'Location is required';
        }
        if (!edu.degree.trim()) {
          errors[`education.${i}.degree`] = 'Degree is required';
        }
        if (!edu.dates.trim()) {
          errors[`education.${i}.dates`] = 'Dates are required';
        }
      });
      break;

    case 4:
      state.experienceSections.forEach((section, i) => {
        if (!section.title.trim()) {
          errors[`experienceSections.${i}.title`] = 'Section title is required';
        }
      });
      break;

    case 5:
      // Skills are optional
      break;

    case 6:
      // Additional info is optional
      break;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
