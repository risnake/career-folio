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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700">
            Objective statement
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
