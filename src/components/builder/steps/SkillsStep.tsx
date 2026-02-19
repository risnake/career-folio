import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import FormField from '../shared/FormField';
import DynamicList from '../shared/DynamicList';

const SKILL_EXAMPLES = [
  'Programming: Python, JavaScript/TypeScript, React, Git',
  'Data: SQL (joins/CTEs), Excel modeling, Tableau or Looker',
  'Design/Tools: Figma components, Adobe Suite, accessibility checks',
  'Leadership: Ran weekly standups; mentored peers; onboarded teammates',
  'Communication: Presented to 50+ audience; wrote documentation and SOPs',
  'STEM Coursework: AP Calculus BC, AP Physics, MATLAB labs',
  'Clubs: Robotics (CAD/Arduino), DECA case prep, NHS tutoring hours',
  'Writing/Research: APA/MLA citations, slide storytelling, interview notes',
  'Operations: Google Workspace, event logistics, point-of-sale systems',
];

interface SkillsStepProps {
  skills: { label: string; value: string }[];
  dispatch: Dispatch<BuilderAction>;
}

export default function SkillsStep({ skills, dispatch }: SkillsStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
      <div className="mb-4">
        <p className="text-xs text-gray-500">Use these examples as inspiration for categories and phrasing:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILL_EXAMPLES.map((example) => (
            <span
              key={example}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
            >
              {example}
            </span>
          ))}
        </div>
      </div>

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
