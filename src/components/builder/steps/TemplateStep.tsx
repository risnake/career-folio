import type { Dispatch } from 'react';
import type { TemplateType, BuilderAction } from '../../../lib/builderTypes';

interface TemplateStepProps {
  selected: TemplateType | null;
  dispatch: Dispatch<BuilderAction>;
}

const templates: { type: TemplateType; name: string; description: string }[] = [
  {
    type: 'chronological',
    name: 'Chronological',
    description: 'Lists experience in reverse chronological order. Best for traditional career progression.',
  },
  {
    type: 'functional',
    name: 'Functional',
    description: 'Organizes experience by skill areas. Best for career changers or those with gaps.',
  },
  {
    type: 'combination',
    name: 'Combination',
    description: 'Combines skill-based sections with detailed work history. Most versatile format.',
  },
];

export default function TemplateStep({ selected, dispatch }: TemplateStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((t) => {
          const isSelected = selected === t.type;
          return (
            <button
              key={t.type}
              type="button"
              onClick={() => dispatch({ type: 'SET_TEMPLATE', template: t.type })}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'ring-2 ring-terracotta border-terracotta bg-terracotta/5'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h3 className="font-medium text-gray-900 mb-1">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
