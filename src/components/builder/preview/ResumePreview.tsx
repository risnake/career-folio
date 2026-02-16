import type { BuilderState } from '../../../lib/builderTypes';
import ChronologicalPreview from './ChronologicalPreview';
import FunctionalPreview from './FunctionalPreview';
import CombinationPreview from './CombinationPreview';

export default function ResumePreview({ state }: { state: BuilderState }) {
  const PreviewComponent = {
    chronological: ChronologicalPreview,
    functional: FunctionalPreview,
    combination: CombinationPreview,
  }[state.template ?? 'chronological'];

  return (
    <div className="mx-auto max-w-[8.5in] bg-white p-8 shadow-lg">
      <PreviewComponent state={state} />
    </div>
  );
}
