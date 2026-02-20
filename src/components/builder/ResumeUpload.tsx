import { useState, useRef, useCallback, useEffect } from 'react';
import type { Dispatch } from 'react';
import type { BuilderAction, BuilderGeneratedResume } from '../../lib/builderTypes';

interface ResumeUploadProps {
  dispatch: Dispatch<BuilderAction>;
  onStartFresh: () => void;
  onImportComplete: () => void;
}

export default function ResumeUpload({ dispatch, onStartFresh, onImportComplete }: ResumeUploadProps) {
  const [mode, setMode] = useState<'choose' | 'upload'>('choose');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500_000) {
      setError('File is too large (max 500KB)');
      return;
    }

    const validTypes = ['text/plain', 'text/markdown', 'text/csv'];
    const validExtensions = ['.txt', '.md', '.text'];
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
      setError('Please upload a text file (.txt). For PDF or Word resumes, copy and paste the text instead.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setText(content);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file. Try pasting the text instead.');
    };
    reader.readAsText(file);

    // Reset the input so the same file can be re-selected
    e.target.value = '';
  }, []);

  const handleParse = useCallback(async () => {
    if (!text.trim()) {
      setError('Please paste your resume text or upload a file first.');
      return;
    }

    setLoading(true);
    setError('');

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
        signal: controller.signal,
      });

      const bodyText = await res.text();
      let data: { resume?: BuilderGeneratedResume; error?: string } | null = null;
      try {
        data = bodyText ? JSON.parse(bodyText) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        setError(data?.error || 'Failed to parse resume. Please try again.');
        return;
      }

      if (!data?.resume) {
        setError('Could not extract resume data. Try adjusting the text and parsing again.');
        return;
      }

      dispatch({ type: 'APPLY_AI_RESUME', resume: data.resume });
      onImportComplete();
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : 'Network error. Please check your connection.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [text, dispatch, onImportComplete]);

  if (mode === 'choose') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to start?</h2>
          <p className="text-gray-500">Choose how to get going with your resume.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onStartFresh}
            className="group text-left p-6 rounded-xl border-2 border-gray-200 hover:border-terracotta hover:bg-terracotta/5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center mb-3 group-hover:bg-terracotta/20 transition-colors">
              <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Start from scratch</h3>
            <p className="text-sm text-gray-500">Build your resume step by step with guided prompts and AI assistance.</p>
          </button>

          <button
            type="button"
            onClick={() => setMode('upload')}
            className="group text-left p-6 rounded-xl border-2 border-gray-200 hover:border-forest hover:bg-forest/5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-3 group-hover:bg-forest/20 transition-colors">
              <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Import existing resume</h3>
            <p className="text-sm text-gray-500">Paste or upload your resume text and we'll parse it into editable sections.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        type="button"
        onClick={() => { setMode('choose'); setError(''); setText(''); }}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to options
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-1">Import your resume</h2>
      <p className="text-sm text-gray-500 mb-6">
        Paste your resume content below or upload a text file. Our AI will extract the details into editable sections.
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="resume-text" className="block text-sm font-medium text-gray-700">
              Resume text
            </label>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.text,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-forest/80 font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload .txt file
              </button>
            </div>
          </div>
          <textarea
            id="resume-text"
            value={text}
            onChange={(e) => { setText(e.target.value); setError(''); }}
            placeholder={"Paste your resume text here...\n\nJohn Doe\njohn@example.com | (555) 123-4567\n\nExperience\nSoftware Engineer at Acme Corp\n- Built scalable APIs serving 10k requests/day\n- Led migration from monolith to microservices\n\nEducation\nBS Computer Science, State University, 2020"}
            rows={12}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest resize-y font-mono"
          />
          <p className="mt-1 text-xs text-gray-400">
            {text.length > 0 ? `${text.length.toLocaleString()} characters` : 'Tip: Copy all text from your PDF or Word resume and paste it here'}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleParse}
          disabled={loading || !text.trim()}
          className="w-full inline-flex items-center justify-center gap-2 bg-forest text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Parsing resume...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              Parse my resume
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Your resume text is sent to our AI service for parsing. We don't store your data.
        </p>
      </div>
    </div>
  );
}
