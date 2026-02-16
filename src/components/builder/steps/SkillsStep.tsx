import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';

interface SkillsStepProps {
  skills: { label: string; value: string }[];
  dispatch: Dispatch<BuilderAction>;
}

export default function SkillsStep({ skills, dispatch }: SkillsStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>

      <DynamicList
        items={skills}
        onAdd={() => dispatch({ type: 'ADD_SKILL' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_SKILL', index })}
        addLabel="Add skill"
        renderItem={(skill, index) => (
          <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-1/3">
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
                placeholder="Language"
              />
            </div>
            <div className="flex-1">
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
          </div>
        )}
      />
    </div>
  );
}
