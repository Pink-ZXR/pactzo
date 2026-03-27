'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const categories = [
  { id: 'cat', label: 'CAT', meta: '猫咪 · 独立优雅的灵魂伴侣', icon: '◯' },
  { id: 'dog', label: 'DOG', meta: '狗狗 · 忠诚热情的挚友', icon: '△' },
  { id: 'rabbit', label: 'RABBIT', meta: '兔子 · 温柔安静的小精灵', icon: '◇' },
  { id: 'small', label: 'SMALL PET', meta: '小宠 · 仓鼠、龙猫、雪貂等', icon: '□' },
  { id: 'bird', label: 'BIRD', meta: '鸟类 · 灵动歌唱的羽友', icon: '✕' },
  { id: 'reptile', label: 'REPTILE', meta: '爬宠 · 佛系独特的存在', icon: '◐' },
  { id: 'fish', label: 'AQUATIC', meta: '水族 · 沉默而治愈的陪伴', icon: '◎' },
  { id: 'amphibian', label: 'AMPHIBIAN', meta: '两栖 · 角蛙、六角恐龙等', icon: '◑' },
  { id: 'exotic', label: 'EXOTIC', meta: '异宠 · 迷你猪、羊驼、蜜袋鼯等', icon: '✦' },
  { id: 'all', label: 'SURPRISE ME', meta: '跨类推荐 · 让命运来决定', icon: '?' },
];

const TRANSITION = { duration: 1.2, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

export default function PetCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    sessionStorage.setItem('pet_category', id);
    setTimeout(() => {
      router.push('/loading');
    }, 400);
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
          <Link
            href="/questionnaire/appearance"
            className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-all duration-300 pb-1"
          >
            ← Back
          </Link>
          <div className="flex flex-col gap-2">
            <span className="font-inter text-[9px] tracking-[0.2em] uppercase opacity-40">CATEGORY</span>
            <div className="h-[1px] w-16 bg-[#7A2E2E]" />
          </div>
        </div>

      </footer>

      <div className="h-full flex items-center justify-center px-[6%] md:px-[10%] lg:px-[14%]">
        <div className="w-full grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...TRANSITION, delay: 0.2 }}
            className="border-l-[1.5px] border-[#1A1A1A] pl-10 md:pl-12 lg:pl-16"
          >
            <span className="font-inter-label block text-[9px] opacity-30 mb-6 md:mb-8">
              Final Selection
            </span>
            <h1 className="font-playfair text-[clamp(48px,8vw,100px)] leading-[0.85] mb-4 md:mb-6 whitespace-pre-line">
              {'Choose\nYour Path.'}
            </h1>
            <p className="font-inter text-[10px] md:text-xs tracking-[0.35em] opacity-30 uppercase font-light italic">
              选择你心仪的宠物类型
            </p>
          </motion.div>

          {/* Asymmetrical Staggered Grid — Even columns offset by 40px */}
          <div className="md:pl-8 lg:pl-16 grid grid-cols-2 gap-x-8 md:gap-x-12">
            {categories.map((cat, idx) => {
              const isSelected = selected === cat.id;
              const isEvenCol = idx % 2 === 1;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...TRANSITION, delay: 0.3 + idx * 0.05 }}
                  onClick={() => !selected && handleSelect(cat.id)}
                  className={`group relative w-full text-left py-6 md:py-8 transition-all duration-500
                    ${isSelected ? 'translate-x-[15px]' : 'hover:translate-x-[15px]'}
                    ${isEvenCol ? 'md:mt-10' : ''}`}
                  style={{
                    backgroundColor: isSelected ? '#E0EAE9' : 'transparent',
                    transform: isSelected ? 'scale(1.05)' : undefined,
                    boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {/* Top border line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#1A1A1A]/[0.06]" />

                  <div className="flex justify-between items-start px-2">
                    <div>
                      {/* 0.5px stroke geometric icon */}
                      <span
                        className="block mb-3 text-lg transition-all duration-300"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 100,
                          color: isSelected ? '#7A2E2E' : 'rgba(26,26,26,0.2)',
                        }}
                      >
                        {cat.icon}
                      </span>
                      <h3
                        className="font-inter text-sm md:text-base lg:text-lg font-medium tracking-[0.15em] md:tracking-[0.2em] transition-colors duration-300"
                        style={{ color: isSelected ? '#7A2E2E' : '#1A1A1A' }}
                      >
                        {cat.label}
                      </h3>
                      <p className="font-inter text-[7px] md:text-[8px] tracking-[0.15em] opacity-30 uppercase mt-2 font-light">
                        {cat.meta}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isSelected ? 45 : 0, opacity: isSelected ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className="text-xl font-thin text-[#7A2E2E]"
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Hover: ambient shadow + scale + bg transition */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      backgroundColor: '#E0EAE9',
                      transform: 'scale(1.05)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                      zIndex: -1,
                    }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
