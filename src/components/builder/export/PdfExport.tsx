import { useState } from 'react';
import type { BuilderState } from '../../../lib/builderTypes';

export default function PdfExport({ state }: { state: BuilderState }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { saveAs } = await import('file-saver');

      const template = state.template ?? 'chronological';
      let PdfComponent: React.ComponentType<{ state: BuilderState }>;

      if (template === 'functional') {
        const mod = await import('./pdf-templates/FunctionalPdf');
        PdfComponent = mod.default;
      } else if (template === 'combination') {
        const mod = await import('./pdf-templates/CombinationPdf');
        PdfComponent = mod.default;
      } else {
        const mod = await import('./pdf-templates/ChronologicalPdf');
        PdfComponent = mod.default;
      }

      const blob = await pdf(<PdfComponent state={state} />).toBlob();
      const fileName = state.name
        ? `${state.name.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      saveAs(blob, fileName);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-terracotta/90 disabled:opacity-60"
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
      {loading ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
}
