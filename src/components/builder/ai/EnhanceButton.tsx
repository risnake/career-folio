import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import { useEnhance } from './useEnhance';

interface EnhanceButtonProps {
  aiKey: string;
  text: string;
  dispatch: Dispatch<BuilderAction>;
}

export default function EnhanceButton({
  aiKey,
  text,
  dispatch,
}: EnhanceButtonProps) {
  const { enhance, loading } = useEnhance(dispatch);

  return (
    <button
      type="button"
      title="Enhance with AI"
      disabled={loading || !text.trim()}
      onClick={() => enhance(aiKey, text)}
      className="p-1 text-forest hover:text-forest/80 disabled:opacity-50 transition-colors"
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
        </svg>
      )}
    </button>
  );
}
