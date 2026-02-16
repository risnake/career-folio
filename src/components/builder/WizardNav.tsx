const STEPS = [
  { label: 'Template', short: 'Tmpl' },
  { label: 'Contact', short: 'Info' },
  { label: 'Objective', short: 'Obj' },
  { label: 'Education', short: 'Edu' },
  { label: 'Experience', short: 'Exp' },
  { label: 'Skills', short: 'Skills' },
  { label: 'Additional', short: 'More' },
  { label: 'Preview', short: 'Done' },
];

interface WizardNavProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export default function WizardNav({ currentStep, completedSteps, onStepClick }: WizardNavProps) {
  return (
    <nav className="mb-8 overflow-x-auto">
      <ol className="flex items-center gap-1 min-w-max">
        {STEPS.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = completedSteps.includes(i);
          const isClickable = isCompleted && !isActive;

          return (
            <li key={i} className="flex items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-terracotta/10 text-terracotta font-semibold'
                    : isCompleted
                      ? 'text-forest hover:bg-forest/5 cursor-pointer'
                      : 'text-gray-400 cursor-default'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-terracotta text-white'
                      : isCompleted
                        ? 'bg-forest text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.short}</span>
              </button>

              {i < STEPS.length - 1 && (
                <div className={`w-4 h-px mx-0.5 ${isCompleted ? 'bg-forest' : 'bg-gray-200'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
