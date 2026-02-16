import type { Dispatch } from 'react';
import type { Education } from '../../../data/resumes';
import type { BuilderAction } from '../../../lib/builderTypes';
import { createEmptyEducation } from '../../../lib/resumeDefaults';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';

interface EducationStepProps {
  education: Education[];
  errors: Record<string, string>;
  dispatch: Dispatch<BuilderAction>;
}

export default function EducationStep({ education, errors, dispatch }: EducationStepProps) {
  const update = (index: number, partial: Partial<Education>) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      index,
      education: { ...education[index], ...partial },
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>

      <DynamicList
        items={education}
        onAdd={() => dispatch({ type: 'ADD_EDUCATION' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_EDUCATION', index })}
        addLabel="Add education"
        renderItem={(edu, index) => {
          const details = edu.details ?? [];
          return (
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="Institution *"
                  name={`edu-institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => update(index, { institution: e.target.value })}
                  error={errors[`education.${index}.institution`]}
                  placeholder="Stanford University"
                />
                <FormField
                  label="Location *"
                  name={`edu-location-${index}`}
                  value={edu.location}
                  onChange={(e) => update(index, { location: e.target.value })}
                  error={errors[`education.${index}.location`]}
                  placeholder="Stanford, CA"
                />
              </div>

              <FormField
                label="Degree *"
                name={`edu-degree-${index}`}
                value={edu.degree}
                onChange={(e) => update(index, { degree: e.target.value })}
                error={errors[`education.${index}.degree`]}
                placeholder="BA in Computer Science"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="Dates *"
                  name={`edu-dates-${index}`}
                  value={edu.dates}
                  onChange={(e) => update(index, { dates: e.target.value })}
                  error={errors[`education.${index}.dates`]}
                  placeholder="9/2020 - 6/2024"
                />
                <FormField
                  label="GPA"
                  name={`edu-gpa-${index}`}
                  value={edu.gpa ?? ''}
                  onChange={(e) => update(index, { gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <label
                  htmlFor={`edu-coursework-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Relevant Coursework
                </label>
                <input
                  id={`edu-coursework-${index}`}
                  type="text"
                  value={(edu.coursework ?? []).join(', ')}
                  onChange={(e) =>
                    update(index, {
                      coursework: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Economics, Statistics, Computer Science"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Separate courses with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <DynamicList
                  items={details}
                  onAdd={() => update(index, { details: [...details, ''] })}
                  onRemove={(dIdx) =>
                    update(index, { details: details.filter((_, i) => i !== dIdx) })
                  }
                  addLabel="Add detail"
                  renderItem={(detail, dIdx) => (
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => {
                        const updated = [...details];
                        updated[dIdx] = e.target.value;
                        update(index, { details: updated });
                      }}
                      placeholder="Honor, award, or other detail"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
