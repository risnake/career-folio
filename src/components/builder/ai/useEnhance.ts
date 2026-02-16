import { useState } from 'react';
import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';

export function useEnhance(dispatch: Dispatch<BuilderAction>) {
  const [loading, setLoading] = useState(false);

  const enhance = async (key: string, text: string, context?: string, type?: 'bullet' | 'objective') => {
    setLoading(true);
    dispatch({ type: 'AI_REQUEST', key, original: text });

    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet: text, text, context, type: type || 'bullet' }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({
          type: 'AI_ERROR',
          key,
          error: data.error || 'Enhancement failed',
        });
        return;
      }

      dispatch({ type: 'AI_SUCCESS', key, suggested: data.suggested });
    } catch (err) {
      dispatch({
        type: 'AI_ERROR',
        key,
        error: err instanceof Error ? err.message : 'Network error',
      });
    } finally {
      setLoading(false);
    }
  };

  return { enhance, loading };
}
