'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-cream border-none shadow-[3px_3px_0_var(--primary-dark),6px_6px_15px_rgba(139,115,85,0.15)] hover:shadow-[4px_4px_0_var(--primary-dark),8px_8px_20px_rgba(139,115,85,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_var(--primary-dark),4px_4px_10px_rgba(139,115,85,0.15)]',
    secondary: 'bg-cream text-primary border-2 border-sand shadow-[2px_2px_0_var(--sand),4px_4px_10px_rgba(139,115,85,0.08)] hover:shadow-[3px_3px_0_var(--sand),6px_6px_15px_rgba(139,115,85,0.12)] hover:translate-x-[-1px] hover:translate-y-[-1px]',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-cream',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-3 text-base rounded-full',
    lg: 'px-8 py-4 text-lg rounded-full',
  };
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
