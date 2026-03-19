'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({ currentStep, totalSteps, className = '' }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-text-secondary">
          步骤 {currentStep} / {totalSteps}
        </span>
        <span className="text-sm text-primary font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

interface StepDotsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepDots({ currentStep, totalSteps, className = '' }: StepDotsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index < currentStep
              ? 'bg-primary w-2 h-2'
              : index === currentStep
              ? 'bg-primary w-3 h-3'
              : 'bg-sand w-2 h-2'
          }`}
          animate={{
            scale: index === currentStep ? 1.2 : 1,
          }}
        />
      ))}
    </div>
  );
}
