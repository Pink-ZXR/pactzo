/**
 * 匹配评分组件
 * 显示匹配百分比，带装饰边框
 */

'use client';

import { motion } from 'framer-motion';

interface MatchScoreProps {
  score: number;
  label?: string;
}

export function MatchScore({ score, label = 'Match Score' }: MatchScoreProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <p className="text-xs tracking-[0.3em] text-[#999] mb-6">{label}</p>
      <div className="relative inline-block">
        <div className="absolute -inset-3 border border-[#3a4d42] transform rotate-2 opacity-10" />
        <div className="relative border-2 border-[#3a4d42] px-14 py-10 bg-white shadow-lg">
          <p 
            className="text-7xl md:text-9xl font-light text-[#2a2a2a]"
            style={{ letterSpacing: '0.05em' }}
          >
            {score}
            <span 
              className="text-3xl md:text-4xl text-[#6b2222] ml-2 font-medium"
              style={{ letterSpacing: '0.1em' }}
            >%</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
