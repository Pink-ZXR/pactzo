'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 设计常量配置 ---
const TRINITY_DATA = [
  {
    rank: '01',
    en: 'COCKATIEL',
    cn: '玄凤鹦鹉',
    type: '鸟类 · 木 · 火',
    tags: ['温柔', '粘人', '会话', '亲人'],
    score: 82,
    goldenSentence: '"Like a tree, love grows deep in silence."',
    goldenCn: '如树般，爱在静默中深根。',
  },
  {
    rank: '02',
    en: 'BUDGERIGAR',
    cn: '虎皮鹦鹉',
    type: '鸟类 · 金',
    tags: ['活泼', '会说话', '好养', '社交'],
    score: 78,
    goldenSentence: '"The sky is vast, but my home is wherever you are."',
    goldenCn: '天空辽阔，而我的家在有你的地方。',
  },
  {
    rank: '03',
    en: 'LOVEBIRD',
    cn: '牡丹鹦鹉',
    type: '鸟类 · 火',
    tags: ['活泼', '粘人', '色彩艳丽', '热情'],
    score: 73,
    goldenSentence: '"Together we form a melody that never ends."',
    goldenCn: '我们共同谱写一段永不停歇的旋律。',
  },
];

const SILK = { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

export default function TrinitySharePreview() {
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const selectedPet = TRINITY_DATA[selectedPetIndex];

  return (
    <div className="min-h-screen bg-[#F6F5F2] py-24 px-[6%] relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-50"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="text-center mb-16 relative z-10"
      >
        {/* English ghost */}
        <p
          className="mb-3 uppercase italic tracking-[0.5em]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 300,
            fontSize: '11px',
            color: 'rgba(26,26,26,0.3)',
          }}
        >
          Which Soul Will You Embrace as Destiny?
        </p>
        {/* Chinese bold main actor */}
        <h1
          style={{
            fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '0.1em',
            color: '#1A1A1A',
          }}
        >
          你选择哪一个宠物？
        </h1>
      </motion.header>

      {/* ── Trinity Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 relative z-10 w-full max-w-6xl mx-auto mb-16">

        {/* ── Rank 01 Large Card (left, row-span-2) ── */}
        <motion.div
          className="md:row-span-2 relative cursor-pointer group"
          animate={{
            opacity: selectedPetIndex !== 0 ? 0.25 : 1,
            scale: selectedPetIndex === 0 ? 1.015 : 1,
          }}
          transition={{ ...SILK }}
          onClick={() => setSelectedPetIndex(0)}
        >
          <div
            className="relative h-full p-12 flex flex-col justify-between transition-all duration-700"
            style={{
              backgroundColor: selectedPetIndex === 0 ? '#FFFFFF' : '#E0EAE9',
              boxShadow: selectedPetIndex === 0 ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
              transform: selectedPetIndex === 0 ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#1A1A1A]/10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#1A1A1A]/10" />

            {/* Header row */}
            <div className="flex justify-between items-start mb-6">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.4em', color: '#1A1A1A', opacity: 0.4 }}>
                RANK_01
              </span>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`score-lg-${selectedPetIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={SILK}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      fontSize: 'clamp(64px, 10vw, 100px)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                      color: '#1A1A1A',
                      display: 'block',
                    }}
                  >
                    {selectedPet.score}
                    <span style={{ fontSize: '0.4em', opacity: 0.2, marginLeft: '2px' }}>%</span>
                  </motion.span>
                </AnimatePresence>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.35em', color: '#1A1A1A', opacity: 0.35, marginTop: '4px' }}>
                  BEST MATCH
                </p>
              </div>
            </div>

            {/* Pet name area */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`name-lg-${selectedPetIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={SILK}
                >
                  {/* English ghost */}
                  <p
                    className="italic mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 300,
                      fontSize: '11px',
                      letterSpacing: '0.35em',
                      color: 'rgba(26,26,26,0.25)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {selectedPet.en}
                  </p>
                  {/* Chinese bold main */}
                  <h2
                    style={{
                      fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(40px, 6vw, 64px)',
                      letterSpacing: '0.1em',
                      color: '#1A1A1A',
                      lineHeight: 1.1,
                    }}
                  >
                    {selectedPet.cn}
                  </h2>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.25em',
                      color: 'rgba(26,26,26,0.35)',
                    }}
                  >
                    {selectedPet.type}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider + Tags */}
            <div className="mt-8">
              <div className="h-px mb-5" style={{ backgroundColor: 'rgba(26,26,26,0.08)' }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tags-lg-${selectedPetIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-5"
                >
                  {selectedPet.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'PingFang SC', sans-serif",
                        fontWeight: 600,
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        color: 'rgba(26,26,26,0.45)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Rank 02 Small Card ── */}
        {[1, 2].map((idx) => {
          const pet = TRINITY_DATA[idx];
          const isSelected = selectedPetIndex === idx;
          return (
            <motion.div
              key={pet.rank}
              className="relative cursor-pointer"
              animate={{
                opacity: selectedPetIndex !== idx ? 0.25 : 1,
                scale: isSelected ? 1.015 : 1,
              }}
              transition={{ ...SILK }}
              onClick={() => setSelectedPetIndex(idx)}
            >
              <div
                className="relative p-10 flex flex-col justify-between h-full transition-all duration-700"
                style={{
                  backgroundColor: isSelected ? '#FFFFFF' : '#E0EAE9',
                  boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
                  transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                  minHeight: '220px',
                }}
              >
                {/* Header row */}
                <div className="flex justify-between items-start mb-4">
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.4em', color: '#1A1A1A', opacity: isSelected ? 0.5 : 0.25 }}>
                    RANK_0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      fontSize: 'clamp(36px, 5vw, 56px)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.03em',
                      color: '#1A1A1A',
                    }}
                  >
                    {pet.score}
                    <span style={{ fontSize: '0.4em', opacity: 0.2 }}>%</span>
                  </span>
                </div>

                {/* Pet name */}
                <div>
                  <p
                    className="italic mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      color: `rgba(26,26,26,${isSelected ? 0.3 : 0.18})`,
                      textTransform: 'uppercase',
                    }}
                  >
                    {pet.en}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      letterSpacing: '0.08em',
                      color: '#1A1A1A',
                      lineHeight: 1.1,
                    }}
                  >
                    {pet.cn}
                  </h3>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px',
                      letterSpacing: '0.25em',
                      color: 'rgba(26,26,26,0.3)',
                    }}
                  >
                    {pet.type}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Golden Sentence ── */}
      <div className="w-full max-w-4xl mx-auto relative z-10 mb-24">
        <div
          className="p-14 border-t border-b text-center"
          style={{ borderColor: 'rgba(26,26,26,0.08)', backgroundColor: 'rgba(255,255,255,0.6)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`golden-${selectedPetIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={SILK}
            >
              <p
                className="italic mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  lineHeight: 1.7,
                  letterSpacing: '0.02em',
                  color: 'rgba(26,26,26,0.75)',
                }}
              >
                {selectedPet.goldenSentence}
              </p>
              <p
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  letterSpacing: '0.15em',
                  color: 'rgba(26,26,26,0.4)',
                  lineHeight: 1.8,
                }}
              >
                {selectedPet.goldenCn}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-12 h-px" style={{ backgroundColor: 'rgba(26,26,26,0.1)' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(26,26,26,0.25)' }}>
              PACTZO · 百澤
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: 'rgba(26,26,26,0.1)' }} />
          </div>
        </div>
      </div>

      {/* ── Social Capsule (Fixed bottom) ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div
          className="flex items-center gap-1 px-2 py-1.5 rounded-full"
          style={{
            backgroundColor: 'rgba(246,245,242,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(26,26,26,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {[
            { label: 'R', title: '小红书' },
            { label: '抖', title: 'TikTok' },
            { label: 'IG', title: 'Instagram' },
          ].map(({ label, title }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.1, backgroundColor: '#E0EAE9' }}
              title={title}
              className="w-11 h-11 flex items-center justify-center rounded-full transition-colors"
              style={{ cursor: 'pointer' }}
            >
              <span
                style={{
                  fontFamily: label === 'R' ? "'Playfair Display', serif" : "'PingFang SC', sans-serif",
                  fontSize: label === 'R' ? '15px' : '12px',
                  fontWeight: 600,
                  color: 'rgba(26,26,26,0.45)',
                }}
              >
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
