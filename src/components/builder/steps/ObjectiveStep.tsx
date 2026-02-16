import type { Dispatch } from 'react';
import type { BuilderAction, AISuggestion } from '../../../lib/builderTypes';
import FormTextarea from '../shared/FormTextarea';
import EnhanceButton from '../ai/EnhanceButton';
import SuggestionPanel from '../ai/SuggestionPanel';

interface ObjectiveStepProps {
  objective: string;
  dispatch: Dispatch<BuilderAction>;
  aiEnhancements: Record<string, AISuggestion>;
}

export default function ObjectiveStep({ objective, dispatch, aiEnhancements }: ObjectiveStepProps) {
  const aiKey = 'objective';
  const suggestion = aiEnhancements[aiKey];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Objective</h2>
      <p className="text-sm text-gray-500 mb-4">Optional — a brief statement of your career goals.</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
            Objective Statement
          </label>
          <EnhanceButton
            aiKey={aiKey}
            text={objective}
            dispatch={dispatch}
            enhanceType="objective"
          />
        </div>
        <FormTextarea
          label=""
          name="objective"
          value={objective}
          onChange={(e) => dispatch({ type: 'SET_OBJECTIVE', objective: e.target.value })}
          placeholder="To obtain a position as..."
          rows={3}
        />
        {suggestion && (
          <SuggestionPanel
            aiKey={aiKey}
            suggestion={suggestion}
            dispatch={dispatch}
            onAccept={(suggested) => dispatch({ type: 'SET_OBJECTIVE', objective: suggested })}
          />
        )}
      </div>
    </div>
  );
}
