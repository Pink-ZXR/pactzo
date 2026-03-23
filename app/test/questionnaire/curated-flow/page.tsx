'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 配置数据 ---
const STEPS = [
  {
    id: 'rhythm',
    tag: 'Selection 01',
    title: 'Daily\nRhythm.',
    subtitle: '生命脉动的周期性观测',
    options: [
      { id: 'early', label: 'EARLY BIRD', meta: 'Synchronized with sunrise' },
      { id: 'flexible', label: 'FLEXIBLE', meta: 'Adapting to the fluid time' },
      { id: 'night', label: 'NIGHT OWL', meta: 'Deep resonance in darkness' },
    ]
  },
  {
    id: 'space',
    tag: 'Selection 02',
    title: 'Living\nSpace.',
    subtitle: '物理空间的维度考量',
    options: [
      { id: 'spacious', label: 'SPACIOUS', meta: 'The freedom of vastness' },
      { id: 'compact', label: 'COMPACT', meta: 'The beauty of intimacy' },
    ]
  }
];

// --- 动画参数：Godly 级曲线 ---
const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function CuratedFlow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative h-screen w-full bg-[#F6F5F2] text-[#1F1F1F] overflow-hidden font-sans selection:bg-[#7A2E2E]/10">
      
      {/* 1. 噪点纹理层 (纸张质感) */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* 2. 底部导航索引 (极简线) */}
      <footer className="fixed bottom-10 left-10 right-10 md:bottom-12 md:left-12 md:right-12 z-40 flex justify-between items-end">
        <div className="flex gap-8 md:gap-12">
          {STEPS.map((step, i) => (
            <button 
              key={i} 
              onClick={() => setActiveStep(i)}
              className="group flex flex-col gap-2 text-left transition-all"
            >
              <span className={`text-[9px] tracking-[0.2em] uppercase transition-opacity duration-700 ${activeStep === i ? 'opacity-40' : 'opacity-0'}`}>
                {step.id.toUpperCase()}
              </span>
              <div className={`h-[1px] transition-all duration-1000 ${activeStep === i ? 'w-16 bg-[#7A2E2E]' : 'w-8 bg-black/10'}`} />
            </button>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.6em] font-bold opacity-20 uppercase">Pactzo / Archive</div>
      </footer>

      {/* 3. 主舞台 (横向平移) */}
      <motion.main 
        animate={{ x: `-${activeStep * 100}%` }}
        transition={TRANSITION}
        className="flex h-full w-full"
      >
        {STEPS.map((step, index) => (
          <section 
            key={step.id} 
            className="relative min-w-full h-full flex items-center justify-center px-[6%] md:px-[10%] lg:px-[14%]"
          >
            {/* 左右分栏容器 */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-12 md:gap-8">
              
              {/* 左侧：标题区 */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {activeStep === index && (
                    <motion.div 
                      key={`title-${step.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ ...TRANSITION, delay: 0.3 }}
                      className="border-l-[1.5px] border-[#1F1F1F] pl-10 md:pl-12 lg:pl-16"
                    >
                      <span className="block text-[10px] tracking-[0.5em] uppercase opacity-30 mb-6 md:mb-8 font-semibold">
                        {step.tag}
                      </span>
                      <h1 className="text-[clamp(56px,10vw,110px)] leading-[0.85] font-serif tracking-tighter mb-4 md:mb-6 whitespace-pre-line">
                        {step.title}
                      </h1>
                      <p className="text-[10px] md:text-xs tracking-[0.35em] opacity-40 uppercase italic">
                        {step.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 右侧：选项区 */}
              <div className="flex flex-col gap-0 md:pl-8 lg:pl-16">
                {step.options.map((opt, optIdx) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeStep === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ ...TRANSITION, delay: 0.5 + optIdx * 0.12 }}
                    onClick={() => index < STEPS.length - 1 && setActiveStep(index + 1)}
                    className="group relative w-full text-left py-7 md:py-8 border-b border-black/[0.06] hover:translate-x-4 transition-all duration-500"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-[0.15em] md:tracking-[0.2em] transition-colors group-hover:text-[#7A2E2E]">
                          {opt.label}
                        </h3>
                        <p className="text-[8px] md:text-[9px] tracking-[0.2em] opacity-30 uppercase mt-2 font-medium">
                          {opt.meta}
                        </p>
                      </div>
                      <span className="text-2xl font-thin opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                        →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 背景装饰编号 */}
            <div className="absolute right-[6%] md:right-[10%] bottom-[10%] md:bottom-[12%] text-[20vh] md:text-[25vh] font-serif italic opacity-[0.025] pointer-events-none select-none">
              0{index + 1}
            </div>
          </section>
        ))}
      </motion.main>
    </div>
  );
}
