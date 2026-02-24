import { useReducer, useState, useCallback } from 'react';
import { builderReducer } from '../../lib/builderReducer';
import { createInitialState, createEmptyEducation, createEmptySection } from '../../lib/resumeDefaults';
import { validateStep } from '../../lib/validation';
import WizardNav from './WizardNav';
import ResumeUpload from './ResumeUpload';
import TemplateStep from './steps/TemplateStep';
import ContactStep from './steps/ContactStep';
import ObjectiveStep from './steps/ObjectiveStep';
import EducationStep from './steps/EducationStep';
import ExperienceStep from './steps/ExperienceStep';
import SkillsStep from './steps/SkillsStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import PreviewStep from './steps/PreviewStep';

const TOTAL_STEPS = 8;

const STEP_INFO: { title: string; subtitle: string }[] = [
  { title: 'Choose a template', subtitle: 'Pick a layout that fits your experience and career goals.' },
  { title: 'Contact information', subtitle: 'How employers will reach you.' },
  { title: 'Career objective', subtitle: 'A brief summary of your professional goals. This is optional.' },
  { title: 'Education', subtitle: 'Your academic background and achievements.' },
  { title: 'Experience', subtitle: 'Your work history, leadership roles, and other relevant experience.' },
  { title: 'Skills', subtitle: 'Technical skills, languages, and other proficiencies. This is optional.' },
  { title: 'Additional information', subtitle: 'Awards, activities, interests, or certifications. This is optional.' },
  { title: 'Preview & export', subtitle: 'Review your resume and download it as PDF or DOCX.' },
];

export default function ResumeBuilder() {
  const [state, dispatch] = useReducer(builderReducer, undefined, createInitialState);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(true);
  const [importNotice, setImportNotice] = useState(false);

  const handleNext = useCallback(() => {
    const { isValid, errors } = validateStep(state.currentStep, state);
    if (!isValid) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }
    setCompletedSteps((prev) =>
      prev.includes(state.currentStep) ? prev : [...prev, state.currentStep]
    );
    dispatch({ type: 'SET_STEP', step: state.currentStep + 1 });
  }, [state]);

  const handleBack = useCallback(() => {
    dispatch({ type: 'SET_STEP', step: state.currentStep - 1 });
  }, [state.currentStep]);

  const handleStepClick = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  const handleStartFresh = useCallback(() => {
    setImportNotice(false);
    setShowUpload(false);
  }, []);

  const handleImportComplete = useCallback(() => {
    setCompletedSteps([]);
    dispatch({ type: 'SET_STEP', step: 0 });
    setShowUpload(false);
    setImportNotice(true);
  }, []);

  const handleStartOver = useCallback(() => {
    setCompletedSteps([]);
    dispatch({ type: 'APPLY_AI_RESUME', startStep: 0, resume: {
      template: 'chronological',
      name: '',
      contact: { email: '', phone: '', addresses: [], linkedin: '', website: '' },
      objective: '',
      education: [createEmptyEducation()],
      experienceSections: [createEmptySection()],
      skills: [],
      additionalInfo: [],
    }});
    setShowUpload(true);
    setImportNotice(false);
  }, []);

  if (showUpload) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
          <ResumeUpload
            dispatch={dispatch}
            onStartFresh={handleStartFresh}
            onImportComplete={handleImportComplete}
          />
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <TemplateStep selected={state.template} dispatch={dispatch} />;
      case 1:
        return (
          <ContactStep
            name={state.name}
            contact={state.contact}
            errors={state.errors}
            dispatch={dispatch}
          />
        );
      case 2:
        return <ObjectiveStep objective={state.objective} dispatch={dispatch} aiEnhancements={state.aiEnhancements} />;
      case 3:
        return (
          <EducationStep
            education={state.education}
            errors={state.errors}
            dispatch={dispatch}
            aiEnhancements={state.aiEnhancements}
          />
        );
      case 4:
        return (
          <ExperienceStep
            experienceSections={state.experienceSections}
            errors={state.errors}
            dispatch={dispatch}
            aiEnhancements={state.aiEnhancements}
          />
        );
      case 5:
        return <SkillsStep skills={state.skills} dispatch={dispatch} />;
      case 6:
        return <AdditionalInfoStep additionalInfo={state.additionalInfo} dispatch={dispatch} />;
      case 7:
        return <PreviewStep state={state} dispatch={dispatch} />;
      default:
        return null;
    }
  };

  const stepInfo = STEP_INFO[state.currentStep];

  return (
    <div className="max-w-4xl mx-auto">
      {importNotice && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-forest/30 bg-forest/5 px-4 py-3 text-sm text-forest">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="font-medium text-forest">Resume imported</p>
            <p className="text-gray-700">Everything is editable. Start at step 1 to review and adjust your details.</p>
          </div>
          <button
            type="button"
            onClick={() => setImportNotice(false)}
            className="text-xs text-forest underline-offset-2 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <WizardNav
        currentStep={state.currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
        {/* Step header — shown on all steps except preview */}
        {state.currentStep < TOTAL_STEPS - 1 && stepInfo && (
          <div className="mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                Step {state.currentStep + 1} of {TOTAL_STEPS}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{stepInfo.title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{stepInfo.subtitle}</p>
          </div>
        )}

        {renderStep()}
      </div>

      <div className="flex justify-between mt-6">
        {state.currentStep > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 border border-rule text-ink px-5 py-2.5 rounded-lg text-sm font-medium hover:border-ink transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartOver}
            className="inline-flex items-center gap-2 border border-rule text-ink px-5 py-2.5 rounded-lg text-sm font-medium hover:border-ink transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Start over
          </button>
        )}

        {state.currentStep < TOTAL_STEPS - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta/90 transition-colors"
          >
            {state.currentStep === TOTAL_STEPS - 2 ? 'Preview resume' : 'Next'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
