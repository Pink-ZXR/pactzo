'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * 极简风格 - 加载页
 */

const loadingSteps = [
  { en: 'ANALYZING WUXING', zh: '解析五行属性' },
  { en: 'READING TIANSHI', zh: '推算天时' },
  { en: 'CALCULATING DILI', zh: '测量地利' },
  { en: 'SENSING RENHE', zh: '感应人和' },
  { en: 'FINDING MATCH', zh: '寻找命定之宠' },
];

export default function LoadingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 60);

    const timeout = setTimeout(() => {
      router.push('/test/result/v3');
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[var(--primary)] text-white flex flex-col justify-center items-center px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 left-6 md:left-12"
      >
        <Link href="/" className="text-xs tracking-[0.3em] uppercase text-white/50">
          百澤
        </Link>
      </motion.div>

      {/* 主内容 */}
      <div className="max-w-md w-full text-center">
        {/* 进度圆环 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-16"
        >
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="square"
              strokeDasharray={377}
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
              transition={{ duration: 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-extralight tracking-wider">{progress}%</span>
          </div>
        </motion.div>

        {/* 当前步骤 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm tracking-[0.3em] mb-2">
            {loadingSteps[currentStep].en}
          </p>
          <p className="text-xs tracking-[0.2em] text-white/40">
            {loadingSteps[currentStep].zh}
          </p>
        </motion.div>

        {/* 步骤指示器 */}
        <div className="flex justify-center gap-2">
          {loadingSteps.map((_, i) => (
            <motion.div
              key={i}
              className={`w-8 h-px transition-colors ${
                i <= currentStep ? 'bg-white' : 'bg-white/20'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* 底部文案 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-xs tracking-[0.1em] text-white/30"
      >
        Reading the threads of fate...
      </motion.p>
    </main>
  );
}
