import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import FormTextarea from '../shared/FormTextarea';

interface ObjectiveStepProps {
  objective: string;
  dispatch: Dispatch<BuilderAction>;
}

export default function ObjectiveStep({ objective, dispatch }: ObjectiveStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Objective</h2>
      <p className="text-sm text-gray-500 mb-4">Optional — a brief statement of your career goals.</p>

      <FormTextarea
        label="Objective Statement"
        name="objective"
        value={objective}
        onChange={(e) => dispatch({ type: 'SET_OBJECTIVE', objective: e.target.value })}
        placeholder="To obtain a position as..."
        rows={3}
      />
    </div>
  );
}
