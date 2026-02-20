import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';

const SKILL_SUGGESTIONS = ['Languages', 'Technical', 'Software', 'Certifications', 'Interests'];

interface SkillsStepProps {
  skills: { label: string; value: string }[];
  dispatch: Dispatch<BuilderAction>;
}

export default function SkillsStep({ skills, dispatch }: SkillsStepProps) {
  return (
    <div>
      {skills.length === 0 && (
        <div className="text-center py-6 mb-4 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500 mb-3">No skills added yet. Add a category to get started.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SKILL_SUGGESTIONS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => dispatch({ type: 'ADD_SKILL' })}
                className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors"
              >
                + {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <DynamicList
        items={skills}
        onAdd={() => dispatch({ type: 'ADD_SKILL' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_SKILL', index })}
        addLabel="Add skill category"
        renderItem={(skill, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <FormField
              label="Category"
              name={`skill-label-${index}`}
              value={skill.label}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SKILL',
                  index,
                  skill: { ...skill, label: e.target.value },
                })
              }
              placeholder="e.g. Languages"
            />
            <FormField
              label="Details"
              name={`skill-value-${index}`}
              value={skill.value}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SKILL',
                  index,
                  skill: { ...skill, value: e.target.value },
                })
              }
              placeholder="Fluent in Spanish; conversational French"
            />
          </div>
        )}
      />
    </div>
  );
}
