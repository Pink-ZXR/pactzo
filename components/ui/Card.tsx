'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  children,
  onClick,
  selected = false,
  className = '',
  hoverable = true,
}: CardProps) {
  const baseStyles = 'bg-cream border-2 rounded-[20px] transition-all duration-300';
  
  const stateStyles = selected
    ? 'border-primary shadow-[4px_4px_0_var(--primary-light),0_0_0_4px_rgba(139,115,85,0.1)]'
    : 'border-sand shadow-[4px_4px_0_var(--sand),8px_8px_20px_rgba(139,115,85,0.08)]';
  
  const hoverStyles = hoverable && !selected
    ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--sand),12px_12px_30px_rgba(139,115,85,0.12)] cursor-pointer'
    : '';
  
  return (
    <motion.div
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${hoverStyles} ${className}`}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      layout
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  hoverColor?: string;
}

export function FeatureCard({ icon, title, description, delay = 0, hoverColor }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group bg-cream border-2 border-sand rounded-[20px] p-6 shadow-[4px_4px_0_var(--sand),8px_8px_20px_rgba(139,115,85,0.08)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--sand),12px_12px_30px_rgba(139,115,85,0.12)] transition-all duration-300 cursor-pointer"
    >
      <div className={`w-12 h-12 mb-4 transition-colors duration-300 ${hoverColor ? `text-sand group-hover:${hoverColor}` : 'text-primary'}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface PetCardProps {
  name: string;
  icon: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function PetCard({ name, icon, selected = false, onClick }: PetCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
        selected
          ? 'bg-primary/10 border-2 border-primary shadow-[4px_4px_0_var(--primary-light)]'
          : 'bg-cream border-2 border-sand shadow-[4px_4px_0_var(--sand)] hover:shadow-[6px_6px_0_var(--sand)] hover:-translate-x-0.5 hover:-translate-y-0.5'
      }`}
      whileTap={{ scale: 0.96 }}
      layout
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`w-20 h-20 ${selected ? 'text-primary' : 'text-primary-light'} transition-colors`}>
          {icon}
        </div>
        <span className={`text-lg font-medium ${selected ? 'text-primary' : 'text-foreground'}`}>
          {name}
        </span>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
