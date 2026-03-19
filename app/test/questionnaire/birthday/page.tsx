'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * 极简风格 - 生日选择页
 */

const years = Array.from({ length: 80 }, (_, i) => 2010 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function BirthdayPage() {
  const router = useRouter();
  const [date, setDate] = useState({ year: 1995, month: 6, day: 15 });

  const handleNext = () => {
    sessionStorage.setItem('birthdate', JSON.stringify(date));
    router.push('/test/questionnaire/tianshi');
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--sand)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase">
            百澤
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--text-muted)] font-en">01 / 06</span>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 pb-32">
        <div className="max-w-2xl mx-auto w-full">
          {/* 步骤标识 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.2em] text-[var(--text-muted)] font-en">Step 01</span>
            <div className="w-12 h-px bg-[var(--primary)] mt-4 opacity-30" />
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.05em] leading-tight mb-6 text-[var(--foreground)] font-en">
              Birth Date
            </h1>
            <p className="text-sm tracking-[0.1em] text-[var(--text-secondary)] leading-relaxed">
              你是什么时候来到这个世界的？
              <br />
              <span className="text-xs text-[var(--text-muted)]">我们将根据出生日期推算你的五行属性</span>
            </p>
          </motion.div>

          {/* 日期选择器 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="grid grid-cols-3 gap-8 md:gap-16">
              {/* 年 */}
              <div>
                <label className="block text-xs tracking-[0.2em] text-[var(--text-muted)] mb-4 font-en">Year</label>
                <select
                  value={date.year}
                  onChange={(e) => setDate({ ...date, year: parseInt(e.target.value) })}
                  className="w-full bg-transparent border-b border-[var(--sand)] py-3 text-2xl md:text-3xl font-extralight focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* 月 */}
              <div>
                <label className="block text-xs tracking-[0.2em] text-[var(--text-muted)] mb-4 font-en">Month</label>
                <select
                  value={date.month}
                  onChange={(e) => setDate({ ...date, month: parseInt(e.target.value) })}
                  className="w-full bg-transparent border-b border-[var(--sand)] py-3 text-2xl md:text-3xl font-extralight focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>

              {/* 日 */}
              <div>
                <label className="block text-xs tracking-[0.2em] text-[var(--text-muted)] mb-4 font-en">Day</label>
                <select
                  value={date.day}
                  onChange={(e) => setDate({ ...date, day: parseInt(e.target.value) })}
                  className="w-full bg-transparent border-b border-[var(--sand)] py-3 text-2xl md:text-3xl font-extralight focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{String(d).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* 按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-8"
          >
            <Link 
              href="/"
              className="text-xs tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors font-en"
            >
              ← Back
            </Link>
            <button
              onClick={handleNext}
              className="px-12 py-4 bg-[var(--primary)] text-white text-xs tracking-[0.25em] uppercase font-medium shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-primary-hover)] hover:-translate-y-1 active:translate-y-0 active:shadow-[var(--shadow-sm)] transition-all duration-300 font-en"
            >
              Continue
            </button>
          </motion.div>
        </div>
      </div>

      {/* 底部进度 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[var(--sand)]">
        <motion.div 
          className="h-full bg-[var(--primary)]"
          initial={{ width: 0 }}
          animate={{ width: '16.66%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </main>
  );
}
