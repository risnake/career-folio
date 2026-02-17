import type { Dispatch } from 'react';
import type { AISuggestion, BuilderAction } from '../../../lib/builderTypes';

interface SuggestionPanelProps {
  aiKey: string;
  suggestion: AISuggestion;
  dispatch: Dispatch<BuilderAction>;
  onAccept?: (suggested: string) => void;
}

export default function SuggestionPanel({
  aiKey,
  suggestion,
  dispatch,
  onAccept,
}: SuggestionPanelProps) {
  if (suggestion.loading) {
    return (
      <div className="mt-2 flex items-center gap-2 rounded border border-rule bg-warm-white p-3 text-sm text-muted">
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        Enhancing...
      </div>
    );
  }

  if (suggestion.error) {
    return (
      <div className="mt-2 flex items-center justify-between rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        <span>{suggestion.error}</span>
        <button
          type="button"
          onClick={() => dispatch({ type: 'AI_REJECT', key: aiKey })}
          className="ml-3 shrink-0 border border-red-300 text-red-700 text-xs px-2 py-0.5 rounded hover:bg-red-100 transition-colors"
        >
          Dismiss
        </button>
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
          onClick={() => {
            onAccept?.(suggestion.suggested);
            dispatch({ type: 'AI_ACCEPT', key: aiKey });
          }}
          className="bg-forest text-white text-xs px-3 py-1 rounded hover:bg-forest/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
