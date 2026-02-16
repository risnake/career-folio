import type { Dispatch } from 'react';
import type { BuilderAction } from '../../../lib/builderTypes';
import DynamicList from '../shared/DynamicList';

interface AdditionalInfoStepProps {
  additionalInfo: string[];
  dispatch: Dispatch<BuilderAction>;
}

export default function AdditionalInfoStep({ additionalInfo, dispatch }: AdditionalInfoStepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Additional Information</h2>
      <p className="text-sm text-gray-500 mb-4">
        Awards, activities, interests, or anything else you'd like to include.
      </p>

      <DynamicList
        items={additionalInfo}
        onAdd={() => dispatch({ type: 'ADD_ADDITIONAL_INFO' })}
        onRemove={(index) => dispatch({ type: 'REMOVE_ADDITIONAL_INFO', index })}
        addLabel="Add item"
        renderItem={(info, index) => (
          <input
            type="text"
            value={info}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_ADDITIONAL_INFO', index, value: e.target.value })
            }
            placeholder="e.g. Eagle Scout, Varsity Athlete, Fluent in French..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
      />
    </div>
  );
}
