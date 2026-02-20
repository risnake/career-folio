const STEPS = [
  { label: 'Template', short: '1' },
  { label: 'Contact', short: '2' },
  { label: 'Objective', short: '3' },
  { label: 'Education', short: '4' },
  { label: 'Experience', short: '5' },
  { label: 'Skills', short: '6' },
  { label: 'Extras', short: '7' },
  { label: 'Preview', short: '8' },
];

interface WizardNavProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export default function WizardNav({ currentStep, completedSteps, onStepClick }: WizardNavProps) {
  const progress = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <nav className="mb-8">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium">Progress</span>
        <span className="text-xs text-gray-400">{progress}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-forest rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <ol className="flex items-center gap-1 overflow-x-auto min-w-max">
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
