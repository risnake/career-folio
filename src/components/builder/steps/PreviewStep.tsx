import { useState } from 'react';
import type { BuilderState, BuilderAction } from '../../../lib/builderTypes';
import ResumePreview from '../preview/ResumePreview';
import PdfExport from '../export/PdfExport';
import { exportToDocx } from '../export/DocxExport';

export default function PreviewStep({
  state,
}: {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
}) {
  const [docxLoading, setDocxLoading] = useState(false);

  const handleDocxDownload = async () => {
    setDocxLoading(true);
    try {
      await exportToDocx(state);
    } catch (err) {
      console.error('DOCX generation failed:', err);
    } finally {
      setDocxLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ResumePreview state={state} />

      <div className="flex flex-wrap items-center justify-center gap-4">
        <PdfExport state={state} />

        <button
          type="button"
          onClick={handleDocxDownload}
          disabled={docxLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-rule px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink disabled:opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3"
            />
          </svg>
          {docxLoading ? 'Generating DOCX...' : 'Download DOCX'}
        </button>
      </div>
    </div>
  );
}
