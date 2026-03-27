'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const STEPS = [
  {
    id: 'companion',
    tag: 'Selection 01',
    title: 'Companion\nShip.',
    subtitle: '你对陪伴的需求',
    options: [
      { value: 3, label: 'ALWAYS', meta: '希望宠物时刻陪伴' },
      { value: 2, label: 'SOMETIMES', meta: '适度陪伴，各有空间' },
      { value: 1, label: 'INDEPENDENT', meta: '独立相处，互不打扰' },
    ],
  },
  {
    id: 'attachment',
    tag: 'Selection 02',
    title: 'Emotional\nBond.',
    subtitle: '你期望的情感依赖程度',
    options: [
      { value: 3, label: 'DEEP', meta: '深度情感连接' },
      { value: 2, label: 'BALANCED', meta: '亲密但保持边界' },
      { value: 1, label: 'LIGHT', meta: '轻松随性的关系' },
    ],
  },
  {
    id: 'responsibility',
    tag: 'Selection 03',
    title: 'Commit\nMent.',
    subtitle: '你愿意投入多少精力',
    options: [
      { value: 3, label: 'DEVOTED', meta: '全心投入，不计代价' },
      { value: 2, label: 'REASONABLE', meta: '适度投入，量力而行' },
      { value: 1, label: 'MINIMAL', meta: '简单照料，低维护' },
    ],
  },
];

const TRANSITION = { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

export default function RenhePage() {
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
        sessionStorage.setItem('renhe', JSON.stringify(newAnswers));
        router.push('/questionnaire/appearance');
      } else {
        setActiveStep(activeStep + 1);
      }
    }, 400);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/questionnaire/dili');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#F6F5F2] text-[#1A1A1A] overflow-hidden selection:bg-[#7A2E2E]/10">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url('/noise.svg')` }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="font-inter-label text-[9px] opacity-50 hover:opacity-100 hover:text-[#7A2E2E] transition-all duration-300">
            百澤
          </Link>

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
              <div className="relative">
                <AnimatePresence mode="wait">
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
