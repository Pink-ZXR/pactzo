'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- 配置数据 ---
const STEPS = [
  {
    id: 'schedule',
    tag: 'Selection 01',
    title: 'Daily\nRhythm.',
    subtitle: '你的作息习惯',
    options: [
      { value: 3, label: 'EARLY BIRD', meta: '早起型，清晨即起' },
      { value: 2, label: 'FLEXIBLE', meta: '随性型，没有固定规律' },
      { value: 1, label: 'NIGHT OWL', meta: '夜猫子，晚睡晚起' },
    ],
  },
  {
    id: 'energy',
    tag: 'Selection 02',
    title: 'Energy\nLevel.',
    subtitle: '你的精力状态',
    options: [
      { value: 3, label: 'ENERGETIC', meta: '精力充沛，活力满满' },
      { value: 2, label: 'MODERATE', meta: '精力适中，张弛有度' },
      { value: 1, label: 'RELAXED', meta: '容易疲惫，需要休息' },
    ],
  },
];

const TRANSITION = { duration: 1.2, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

export default function TianshiPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const step = STEPS[activeStep];
  const isLastStep = activeStep === STEPS.length - 1;

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      setSelectedValue(null);
      if (isLastStep) {
        sessionStorage.setItem('tianshi', JSON.stringify(newAnswers));
        router.push('/questionnaire/dili');
      } else {
        setActiveStep(activeStep + 1);
      }
    }, 400);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/questionnaire/birthday');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#F6F5F2] text-[#1A1A1A] overflow-hidden selection:bg-[#7A2E2E]/10">
      {/* 噪点纹理 */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="font-inter-label text-[9px] opacity-50 hover:opacity-100 hover:text-[#7A2E2E] transition-all duration-300">
            百澤
          </Link>
          <span className="font-inter text-[10px] tracking-[0.3em] text-[#1A1A1A]/30 font-light">02 / 07</span>
        </div>
      </nav>

      {/* 侧边装饰文字 */}
      <div className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 font-inter text-[7px] tracking-[0.6em] uppercase opacity-[0.06] pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        PACTZO_ARCHIVE_2026
      </div>

      {/* 底部导航索引 */}
      <footer className="fixed bottom-10 left-10 right-10 md:bottom-12 md:left-12 md:right-12 z-40 flex justify-between items-end">
        <div className="flex items-end gap-8 md:gap-12">
          <button
            onClick={handleBack}
            className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-all duration-300 pb-1"
          >
            ← Back
          </button>
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => i < activeStep && setActiveStep(i)}
              className="group flex flex-col gap-2 text-left transition-all"
            >
              <span className={`font-inter text-[9px] tracking-[0.2em] uppercase transition-opacity duration-700 ${activeStep === i ? 'opacity-40' : 'opacity-0'}`}>
                {s.id.toUpperCase()}
              </span>
              <div className={`h-[1px] transition-all duration-1000 ${activeStep === i ? 'w-16 bg-[#7A2E2E]' : 'w-8 bg-black/10'}`} />
            </button>
          ))}
        </div>
        <div className="font-inter-label text-[10px] opacity-20">Step 02</div>
      </footer>

      {/* 主舞台 (横向平移) */}
      <motion.main
        animate={{ x: `-${activeStep * 100}%` }}
        transition={TRANSITION}
        className="flex h-full w-full"
      >
        {STEPS.map((s, index) => (
          <section
            key={s.id}
            className="relative min-w-full h-full flex items-center justify-center px-[6%] md:px-[10%] lg:px-[14%]"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-12 md:gap-8">
              {/* 左侧：标题 */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeStep === index && (
                    <motion.div
                      key={`title-${s.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ ...TRANSITION, delay: 0.2 }}
                      className="border-l-[1.5px] border-[#1A1A1A] pl-10 md:pl-12 lg:pl-16"
                    >
                      <span className="font-inter-label block text-[9px] opacity-30 mb-6 md:mb-8">
                        {s.tag}
                      </span>
                      <h1 className="font-playfair text-[clamp(48px,8vw,88px)] leading-[0.85] mb-4 md:mb-6 whitespace-pre-line">
                        {s.title}
                      </h1>
                      <p className="font-inter text-[10px] md:text-xs tracking-[0.35em] opacity-30 uppercase font-light italic">
                        {s.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 右侧：选项 */}
              <div className="flex flex-col gap-0 md:pl-8 lg:pl-16">
                {s.options.map((opt, optIdx) => {
                  const isSelected = selectedValue === opt.value && activeStep === index;
                  return (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeStep === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ ...TRANSITION, delay: 0.4 + optIdx * 0.08 }}
                      onClick={() => !selectedValue && handleSelect(opt.value)}
                      className={`group relative w-full text-left py-7 md:py-8 border-b border-black/[0.06] transition-all duration-500
                        ${isSelected ? 'translate-x-[15px]' : 'hover:translate-x-[15px]'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className={`font-inter text-lg md:text-xl lg:text-2xl font-medium tracking-[0.15em] md:tracking-[0.2em] transition-colors duration-300
                            ${isSelected ? 'text-[#7A2E2E]' : 'group-hover:text-[#7A2E2E]'}`}>
                            {opt.label}
                          </h3>
                          <p className="font-inter text-[8px] md:text-[9px] tracking-[0.2em] opacity-30 uppercase mt-2 font-light">
                            {opt.meta}
                          </p>
                        </div>
                        <motion.span
                          animate={{ rotate: isSelected ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                          className={`text-2xl font-thin transition-all duration-300
                            ${isSelected ? 'opacity-100 text-[#7A2E2E]' : 'opacity-0 group-hover:opacity-60'}`}
                        >
                          +
                        </motion.span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 背景装饰编号 */}
            <div className="absolute right-[6%] md:right-[10%] bottom-[10%] md:bottom-[12%] text-[20vh] md:text-[25vh] font-playfair italic opacity-[0.02] pointer-events-none select-none">
              0{index + 1}
            </div>
          </section>
        ))}
      </motion.main>
    </div>
  );
}
