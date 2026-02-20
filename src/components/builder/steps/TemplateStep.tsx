import type { Dispatch } from 'react';
import type { TemplateType, BuilderAction } from '../../../lib/builderTypes';

interface TemplateStepProps {
  selected: TemplateType | null;
  dispatch: Dispatch<BuilderAction>;
}

const templates: { type: TemplateType; name: string; description: string; bestFor: string }[] = [
  {
    type: 'chronological',
    name: 'Chronological',
    description: 'Lists experience in reverse chronological order.',
    bestFor: 'Best for: steady career progression, same field',
  },
  {
    type: 'functional',
    name: 'Functional',
    description: 'Organizes content by skill areas rather than timeline.',
    bestFor: 'Best for: career changers, employment gaps',
  },
  {
    type: 'combination',
    name: 'Combination',
    description: 'Skill-based sections paired with detailed work history.',
    bestFor: 'Best for: experienced professionals, versatile backgrounds',
  },
];

export default function TemplateStep({ selected, dispatch }: TemplateStepProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((t) => {
        const isSelected = selected === t.type;
        return (
          <button
            key={t.type}
            type="button"
            onClick={() => dispatch({ type: 'SET_TEMPLATE', template: t.type })}
            className={`text-left p-5 rounded-lg border-2 transition-all ${
              isSelected
                ? 'ring-2 ring-terracotta border-terracotta bg-terracotta/5'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full border-2 ${isSelected ? 'border-terracotta bg-terracotta' : 'border-gray-300'}`} />
              <h3 className="font-medium text-gray-900">{t.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-xs text-gray-400 mt-2">{t.bestFor}</p>
          </button>
        );
      })}
    </div>
  );
}
