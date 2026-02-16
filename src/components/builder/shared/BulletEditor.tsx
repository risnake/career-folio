import type { Dispatch } from 'react';
import type { BuilderAction, AISuggestion } from '../../../lib/builderTypes';
import EnhanceButton from '../ai/EnhanceButton';
import SuggestionPanel from '../ai/SuggestionPanel';

interface BulletEditorProps {
  bullets: string[];
  onChange: (bullets: string[]) => void;
  sectionIndex: number;
  itemIndex: number;
  dispatch: Dispatch<BuilderAction>;
  aiEnhancements: Record<string, AISuggestion>;
}

export default function BulletEditor({
  bullets,
  onChange,
  sectionIndex,
  itemIndex,
  dispatch,
  aiEnhancements,
}: BulletEditorProps) {
  const updateBullet = (bulletIndex: number, value: string) => {
    const updated = [...bullets];
    updated[bulletIndex] = value;
    onChange(updated);
  };

  const removeBullet = (bulletIndex: number) => {
    onChange(bullets.filter((_, i) => i !== bulletIndex));
  };

  const addBullet = () => {
    onChange([...bullets, '']);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
      {bullets.map((bullet, bulletIndex) => {
        const aiKey = `${sectionIndex}-${itemIndex}-${bulletIndex}`;
        const suggestion = aiEnhancements[aiKey];

        return (
          <div key={bulletIndex} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">&bull;</span>
              <input
                type="text"
                value={bullet}
                onChange={(e) => updateBullet(bulletIndex, e.target.value)}
                placeholder="Describe an accomplishment or responsibility..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <EnhanceButton
                aiKey={aiKey}
                text={bullet}
                dispatch={dispatch}
              />
              <button
                type="button"
                onClick={() => removeBullet(bulletIndex)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove bullet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {suggestion && (
              <SuggestionPanel
                aiKey={aiKey}
                suggestion={suggestion}
                dispatch={dispatch}
              />
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={addBullet}
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add bullet
      </button>
    </div>
  );
}
