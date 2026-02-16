import type { Dispatch } from 'react';
import type { AISuggestion, BuilderAction } from '../../../lib/builderTypes';

interface SuggestionPanelProps {
  aiKey: string;
  suggestion: AISuggestion;
  dispatch: Dispatch<BuilderAction>;
}

export default function SuggestionPanel({
  aiKey,
  suggestion,
  dispatch,
}: SuggestionPanelProps) {
  if (suggestion.error) {
    return (
      <div className="mt-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {suggestion.error}
      </div>
    );
  }

  return (
    <div className="mt-2 grid grid-cols-2 gap-3 rounded border border-rule bg-warm-white p-3">
      <div>
        <p className="label-sm mb-1 text-muted">Original</p>
        <p className="text-sm text-ink">{suggestion.original}</p>
      </div>
      <div className="border-l-2 border-forest pl-3">
        <p className="label-sm mb-1 text-forest">Suggested</p>
        <p className="text-sm text-ink">{suggestion.suggested}</p>
      </div>
      <div className="col-span-2 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => dispatch({ type: 'AI_REJECT', key: aiKey })}
          className="border border-rule text-ink text-xs px-3 py-1 rounded hover:bg-cream transition-colors"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'AI_ACCEPT', key: aiKey })}
          className="bg-forest text-white text-xs px-3 py-1 rounded hover:bg-forest/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
