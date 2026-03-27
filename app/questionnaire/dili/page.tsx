'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// --- 配置数据 ---
const STEPS = [
  {
    id: 'space',
    tag: 'Selection 01',
    title: 'Living\nSpace.',
    subtitle: '你的居住空间',
    options: [
      { value: 3, label: 'SPACIOUS', meta: '大房子 / 有庭院' },
      { value: 2, label: 'MODERATE', meta: '中等公寓 / 有阳台' },
      { value: 1, label: 'COMPACT', meta: '小户型 / 空间有限' },
    ],
  },
  {
    id: 'stability',
    tag: 'Selection 02',
    title: 'Stability.',
    subtitle: '你的居住稳定性',
    options: [
      { value: 3, label: 'STABLE', meta: '长期居住，不会搬家' },
      { value: 2, label: 'FLEXIBLE', meta: '可能会搬，但不频繁' },
      { value: 1, label: 'MOBILE', meta: '经常搬家 / 租房居住' },
    ],
  },
];

const TRANSITION = { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

export default function DiliPage() {
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
        sessionStorage.setItem('dili', JSON.stringify(newAnswers));
        router.push('/questionnaire/renhe');
      } else {
        setActiveStep(activeStep + 1);
      }
    }, 400);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/questionnaire/tianshi');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#F6F5F2] text-[#1A1A1A] overflow-hidden selection:bg-[#7A2E2E]/10">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="font-inter-label text-[9px] opacity-50 hover:opacity-100 hover:text-[#7A2E2E] transition-all duration-300">
            百澤
          </Link>
          <span className="font-inter text-[10px] tracking-[0.3em] text-[#1A1A1A]/30 font-light">03 / 07</span>
        </div>
      </nav>

      <div className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 font-inter text-[7px] tracking-[0.6em] uppercase opacity-[0.06] pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        PACTZO_ARCHIVE_2026
      </div>

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
      </footer>

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
              <div className="relative overflow-hidden">
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      key={`title-${s.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ ...TRANSITION, delay: 0.1 }}
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

              <div className="flex flex-col gap-0 md:pl-8 lg:pl-16">
                {s.options.map((opt, optIdx) => {
                  const isSelected = selectedValue === opt.value && activeStep === index;
                  return (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeStep === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ ...TRANSITION, delay: 0.15 + optIdx * 0.05 }}
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

          </section>
        ))}
      </motion.main>
    </div>
  );
}
