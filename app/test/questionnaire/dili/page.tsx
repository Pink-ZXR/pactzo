'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * 极简风格 - 地利问卷页
 */

const questions = [
  {
    id: 'space',
    title: 'LIVING SPACE',
    subtitle: '你的居住空间',
    options: [
      { value: 3, label: 'SPACIOUS', desc: '大房子 / 有庭院' },
      { value: 2, label: 'MODERATE', desc: '中等公寓 / 有阳台' },
      { value: 1, label: 'COMPACT', desc: '小户型 / 空间有限' },
    ],
  },
  {
    id: 'stability',
    title: 'STABILITY',
    subtitle: '你的居住稳定性',
    options: [
      { value: 3, label: 'STABLE', desc: '长期居住，不会搬家' },
      { value: 2, label: 'FLEXIBLE', desc: '可能会搬，但不频繁' },
      { value: 1, label: 'MOBILE', desc: '经常搬家 / 租房居住' },
    ],
  },
];

export default function DiliPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  const handleSelect = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (isLast) {
      sessionStorage.setItem('dili', JSON.stringify(newAnswers));
      router.push('/test/questionnaire/renhe');
    } else {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      router.push('/test/questionnaire/tianshi');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--sand)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase">
            百澤
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--text-muted)]"><span className="font-en"><span className="font-en">03 / 06</span></span></span>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 pb-32">
        <div className="max-w-2xl mx-auto w-full">
          {/* 步骤标识 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-[var(--text-muted)]"><span className="font-en">Step 03</span></span>
              <span className="text-xs tracking-[0.2em] text-[var(--accent)] font-medium">DILI · 地利</span>
            </div>
            <div className="w-12 h-px bg-[var(--primary)] mt-4 opacity-30" />
          </motion.div>

          {/* 问题进度 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 mb-12"
          >
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-px flex-1 transition-colors ${
                  i <= currentQ ? 'bg-[var(--primary)]' : 'bg-[var(--sand)]'
                }`}
              />
            ))}
          </motion.div>

          {/* 问题 */}
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.05em] leading-tight mb-4 text-[var(--foreground)]">
              {question.title}
            </h1>
            <p className="text-sm tracking-[0.1em] text-[var(--text-secondary)] mb-16">
              {question.subtitle}
            </p>

            {/* 选项 */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left py-5 px-6 border-l-2 transition-all duration-300 group relative ${
                    answers[question.id] === option.value
                      ? 'border-[var(--primary)] bg-[var(--cream)] shadow-[var(--shadow-sm)]'
                      : 'border-[var(--sand)] hover:border-[var(--secondary)] hover:bg-[var(--background-alt)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm tracking-[0.15em] mb-1.5 transition-colors font-medium ${
                        answers[question.id] === option.value ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'
                      }`}>
                        {option.label}
                      </p>
                      <p className={`text-xs tracking-wide transition-colors ${
                        answers[question.id] === option.value ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'
                      }`}>
                        {option.desc}
                      </p>
                    </div>
                    <span className={`text-lg transition-all duration-300 ${
                      answers[question.id] === option.value 
                        ? 'opacity-100 text-[var(--accent)] translate-x-0' 
                        : 'opacity-0 group-hover:opacity-40 -translate-x-2 text-[var(--text-muted)]'
                    }`}>
                      →
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <button
              onClick={handleBack}
              className="text-xs tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors font-en"
            >
              ← <span className="font-en">Back</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 底部进度 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[var(--sand)]">
        <motion.div 
          className="h-full bg-[var(--primary)]"
          initial={{ width: '33.33%' }}
          animate={{ width: '50%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </main>
  );
}
