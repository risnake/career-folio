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
        body: JSON.stringify({ text, context, type: type || 'bullet' }),
      });

      const bodyText = await res.text();
      let data: { suggested?: string; error?: string } | null = null;
      try {
        data = bodyText ? JSON.parse(bodyText) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        dispatch({
          type: 'AI_ERROR',
          key,
          error: data?.error || 'Enhancement failed',
        });
        return;
      }

      const suggested = data?.suggested;
      if (!suggested) {
        dispatch({
          type: 'AI_ERROR',
          key,
          error: 'Unexpected response from server',
        });
        return;
      }

      dispatch({ type: 'AI_SUCCESS', key, suggested });
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
