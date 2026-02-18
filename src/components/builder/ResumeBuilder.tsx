import { useReducer, useState, useCallback } from 'react';
import { builderReducer } from '../../lib/builderReducer';
import { createInitialState } from '../../lib/resumeDefaults';
import { validateStep } from '../../lib/validation';
import WizardNav from './WizardNav';
import TemplateStep from './steps/TemplateStep';
import ContactStep from './steps/ContactStep';
import ObjectiveStep from './steps/ObjectiveStep';
import EducationStep from './steps/EducationStep';
import ExperienceStep from './steps/ExperienceStep';
import SkillsStep from './steps/SkillsStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import PreviewStep from './steps/PreviewStep';
import AssistantChat from './AssistantChat';

const TOTAL_STEPS = 8;

export default function ResumeBuilder() {
  const [state, dispatch] = useReducer(builderReducer, undefined, createInitialState);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

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

  return (
    <div className="max-w-4xl mx-auto">
      <AssistantChat state={state} dispatch={dispatch} />

      <WizardNav
        currentStep={state.currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
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
          <div />
        )}

        {state.currentStep < TOTAL_STEPS - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta/90 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
