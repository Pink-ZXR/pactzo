/**
 * @experiment result-v3
 * @base 结果页完整整合版
 * @date 2026-03-18
 * @changes 整合原有模块(Hero/四维分析/缘分解读) + 新增模块(金句卡片/Destiny Card/人宠和谐指南/Newsletter)
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MatchScore, PetProfile, PaintingFrame, DestinyCard, ReasonList } from '@/components/result';

// 模拟结果数据
const mockResult = {
  pet: {
    name: 'British Shorthair',
    nameCn: '英国短毛猫',
    category: 'CAT',
    icon: '○',
  },
  matchScore: 92,
  element: 'metal' as const,
  dimensions: [
    { en: 'WUXING', zh: '五行', score: 88 },
    { en: 'TIANSHI', zh: '天时', score: 95 },
    { en: 'DILI', zh: '地利', score: 90 },
    { en: 'RENHE', zh: '人和', score: 94 },
  ],
  reasons: [
    '五行属土，与你的木属性相生相克，形成稳定互补',
    '独立性强，适合你的作息节奏，不会过度依赖',
    '对空间要求适中，适应你的居住环境',
  ],
  summary: '英短是命中注定与你相伴的灵魂伴侣。它的沉稳与独立，恰好平衡了你的热情与繁忙。在静谧的夜晚，它会成为你最忠实的陪伴者。',
};

// 五行金句数据
const wisdomQuotes = {
  metal: {
    element: '金',
    pinyin: 'Jīn',
    english: 'Metal',
    quote: 'True gold fears no fire; true bond fears no time.',
    chinese: '真金不怕火炼，真情不怕时间。',
    source: '《增广贤文》/ Ancient Wisdom'
  },
  wood: {
    element: '木',
    pinyin: 'Mù',
    english: 'Wood',
    quote: 'Like a tree, love grows deep in silence.',
    chinese: '如树般，爱在静默中深根。',
    source: '《道德经》/ Tao Te Ching'
  },
  water: {
    element: '水',
    pinyin: 'Shuǐ',
    english: 'Water',
    quote: 'Water flows to the heart; fate flows to the soul.',
    chinese: '水流入心，缘流入魂。',
    source: '《庄子》/ Zhuangzi'
  },
  fire: {
    element: '火',
    pinyin: 'Huǒ',
    english: 'Fire',
    quote: 'A spark ignites; a heart unites.',
    chinese: '星火点燃，心灵相连。',
    source: '《易经》/ I Ching'
  },
  earth: {
    element: '土',
    pinyin: 'Tǔ',
    english: 'Earth',
    quote: 'Earth nurtures all; love nurtures the soul.',
    chinese: '大地滋养万物，爱滋养灵魂。',
    source: '《礼记》/ Book of Rites'
  }
};

// 和谐指南数据
const harmonyGuide = {
  metal: {
    luckyColors: ['白色', '金色', '银色'],
    luckyColorsEn: ['White', 'Gold', 'Silver'],
    direction: '西方 · 西北方',
    directionEn: 'West · Northwest',
    vibeQuote: "It's not just a pet; it's a mirror to your soul.",
    vibeChinese: '它不是你的一部分，你是它的全部。'
  },
  wood: {
    luckyColors: ['绿色', '青色'],
    luckyColorsEn: ['Green', 'Cyan'],
    direction: '东方 · 东南方',
    directionEn: 'East · Southeast',
    vibeQuote: "In silence, roots intertwine; in love, souls align.",
    vibeChinese: '静默中根系交织，爱意中灵魂相依。'
  },
  water: {
    luckyColors: ['黑色', '深蓝色'],
    luckyColorsEn: ['Black', 'Deep Blue'],
    direction: '北方',
    directionEn: 'North',
    vibeQuote: "Water finds its way; fate finds its home.",
    vibeChinese: '水自有其道，缘自有其归。'
  },
  fire: {
    luckyColors: ['红色', '橙色', '紫色'],
    luckyColorsEn: ['Red', 'Orange', 'Purple'],
    direction: '南方',
    directionEn: 'South',
    vibeQuote: "A flame shared is a flame doubled.",
    vibeChinese: '分享的火焰，成倍的温暖。'
  },
  earth: {
    luckyColors: ['黄色', '棕色', '米色'],
    luckyColorsEn: ['Yellow', 'Brown', 'Beige'],
    direction: '中央 · 西南方 · 东北方',
    directionEn: 'Center · Southwest · Northeast',
    vibeQuote: "Grounded in earth, lifted by love.",
    vibeChinese: '扎根大地，被爱托起。'
  }
};

export default function ResultV3() {
  const [revealed, setRevealed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const wisdom = wisdomQuotes[mockResult.element];
  const harmony = harmonyGuide[mockResult.element];

  // 生成 Destiny Card
  const generateCard = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    alert('Destiny Card 已生成！（实际项目中这里会下载图片）');
  };

  // 订阅处理
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      
      {/* ===== 1. Hero：匹配结果 ===== */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 pb-32 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl"
        >
          {/* 匹配度 */}
          <MatchScore score={mockResult.matchScore} />

          {/* 宠物名称 */}
          <PetProfile 
            name={mockResult.pet.name}
            nameCn={mockResult.pet.nameCn}
            category={mockResult.pet.category}
          />

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs tracking-[0.2em] text-[#999]"
            >
              SCROLL FOR DETAILS
              <div className="w-px h-8 bg-[#e5e3dd] mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. 四维分析 - 古典票据式 ===== */}
      <section className="py-20 md:py-28 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* 左侧：内容区（占3列） */}
            <div className="md:col-span-3">
              {/* 艺术标题 */}
              <h2 
                className="text-2xl md:text-3xl font-normal tracking-[0.08em] text-[#8b3232] mb-8"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                FOUR DIMENSIONS
              </h2>
              
              {/* 四维解读文字 */}
              <p 
                className="text-base text-[#555] leading-[1.9] mb-10"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                <em className="text-[#8b3232] not-italic">五行契合</em>与<em className="text-[#8b3232] not-italic">天时共振</em>，
                是命运交织的根基。<em className="text-[#8b3232] not-italic">地利相宜</em>与<em className="text-[#8b3232] not-italic">人和共鸣</em>，
                是缘分延续的沃土。
              </p>
              
              {/* 四维数据统计 - 古典票据式 */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { zh: '五行', en: 'WUXING', score: 88 },
                  { zh: '天时', en: 'TIANSHI', score: 95 },
                  { zh: '地利', en: 'DILI', score: 92 },
                  { zh: '人和', en: 'RENHE', score: 90 },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-white p-4 relative group"
                  >
                    {/* 外边框 - 票据风格 */}
                    <div className="absolute inset-0 border border-[#d4d0c8]" />
                    {/* 内边框 - 虚线装饰 */}
                    <div className="absolute inset-[3px] border border-dashed border-[#e5e3dd]" />
                    {/* 角落装饰 */}
                    <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#c9a87c]" />
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#c9a87c]" />
                    <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#c9a87c]" />
                    <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#c9a87c]" />
                    
                    <div className="relative z-10">
                      {/* 顶部：维度名称 */}
                      <div className="flex items-baseline justify-between mb-3">
                        <p className="text-xs tracking-[0.2em] text-[#555]">{item.zh}</p>
                        <p 
                          className="text-[9px] tracking-[0.15em] text-[#aaa]"
                          style={{ fontFamily: "'Cormorant', serif" }}
                        >
                          {item.en}
                        </p>
                      </div>
                      
                      {/* 分隔线 */}
                      <div className="w-full h-px bg-[#e5e3dd] mb-3 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white -mt-[3px]" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#c9a87c] rounded-full -mt-[1.5px]" />
                      </div>
                      
                      {/* 底部：分数 */}
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-[#999]">SCORE</span>
                        <p 
                          className="text-3xl font-light text-[#8b3232]"
                          style={{ fontFamily: "'Cormorant', serif", letterSpacing: '0.05em' }}
                        >
                          {item.score}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 小字标注 */}
              <p className="text-[10px] tracking-[0.15em] text-[#999] uppercase mb-6">
                命定之约 · 四维契合 · 2024
              </p>
              
              {/* 深绿按钮 */}
              <button 
                className="px-8 py-3 bg-[#3a4d42] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#2a3d32] transition-colors"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                探索更多
              </button>
            </div>
            
            {/* 右侧：油画（占2列，较小） */}
            <div className="md:col-span-2">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/illustrations/lady-with-dog.png"
                  alt="贵妇与小狗"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 3. 缘分解读（极简融合版） ===== */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[#3a4d42]">
        <div className="max-w-4xl mx-auto">
          {/* 顶部标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] text-[#7a8f82] mb-4">Why This Match</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.05em] text-[#f5f4f0]">
              缘分解读
            </h2>
          </motion.div>

          {/* 三栏理由 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16"
          >
            {[
              { icon: '◈', label: '五行契合', en: 'Element' },
              { icon: '◉', label: '性格共振', en: 'Character' },
              { icon: '◆', label: '空间和谐', en: 'Space' },
            ].map((item, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="text-xl text-[#a8b8ae]">{item.icon}</span>
                  <span className="text-xs tracking-[0.15em] text-[#a8b8ae]">{item.en}</span>
                </div>
                <p className="text-sm md:text-base font-light leading-relaxed text-[#e8ebe9]">
                  {mockResult.reasons[index]}
                </p>
              </div>
            ))}
          </motion.div>

          {/* 命定之约卡片 - 融合在底部 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f5f4f0] py-12 md:py-16 px-8 md:px-12 text-center"
          >
            <p className="text-[10px] tracking-[0.4em] text-[#999] mb-4 uppercase">A Destiny Sealed</p>
            <p className="text-xs tracking-[0.3em] text-[#8b3232] mb-6">命定之约</p>
            <p className="text-base md:text-lg font-light leading-[1.8] text-[#2a2a2a] max-w-2xl mx-auto mb-6">
              {mockResult.summary}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[#3a4d42]/20" />
              <span className="text-xs tracking-[0.2em] text-[#999]">百澤 PACTZO</span>
              <div className="w-8 h-px bg-[#3a4d42]/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. 金句卡片 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#f5f4f0]">
        <div className="max-w-3xl mx-auto">
          <motion.p 
            className="text-xs tracking-[0.4em] text-[#999] mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ANCIENT WISDOM / 古籍智慧
          </motion.p>

          <motion.div 
            className="relative p-8 md:p-12 border border-[#e5e3dd] text-center bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* 三语标题 */}
            <div className="mb-8">
              <span className="text-4xl md:text-5xl font-extralight">{wisdom.element}</span>
              <span className="mx-3 text-[#999]">·</span>
              <span className="text-lg text-[#666]">{wisdom.pinyin}</span>
              <span className="mx-3 text-[#999]">·</span>
              <span className="text-lg text-[#666]">{wisdom.english}</span>
            </div>

            {/* 英文金句 */}
            <p className="text-lg md:text-xl font-light text-[#2a2a2a] mb-4 italic">
              "{wisdom.quote}"
            </p>

            {/* 中文翻译 */}
            <p className="text-base md:text-lg text-[#666] mb-6">
              {wisdom.chinese}
            </p>

            {/* 出处 */}
            <p className="text-xs tracking-[0.2em] text-[#999]">
              — {wisdom.source}
            </p>

            {/* 装饰边框 */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#3a4d42]/20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#3a4d42]/20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#3a4d42]/20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#3a4d42]/20" />
          </motion.div>
        </div>
      </section>

      {/* ===== 5. Destiny Card 生成 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-xs tracking-[0.4em] text-[#999] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SHARE YOUR DESTINY
          </motion.p>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-extralight text-[#2a2a2a] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            保存你的缘分卡片
          </motion.h2>
          
          <motion.p 
            className="text-sm text-[#666] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            生成精美长图，分享至社交平台
          </motion.p>

          {/* 预览卡片 */}
          <motion.div 
            ref={cardRef}
            className="relative w-72 h-[500px] mx-auto mb-8 bg-[#f8f7f4] shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Logo */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <p className="text-xs tracking-[0.3em] text-[#3a4d42]">百澤 BAIZE</p>
            </div>

            {/* 宠物图 */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-[#e5e3dd]">
              <Image src="/pets/cat-ink.png" alt="" fill sizes="128px" className="object-cover" />
            </div>

            {/* 内容 */}
            <div className="absolute top-56 left-0 right-0 text-center px-6">
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">YOUR DESTINY</p>
              <p className="text-lg font-light mb-1">{wisdom.element} · {mockResult.pet.nameCn}</p>
              <p className="text-xs text-[#999] mb-4">{wisdom.english} · {mockResult.pet.name}</p>
              
              <div className="w-12 h-px bg-[#3a4d42] mx-auto mb-4" />
              
              <p className="text-sm italic text-[#666] mb-2">"{wisdom.quote}"</p>
              <p className="text-xs text-[#999]">{wisdom.chinese}</p>
            </div>

            {/* 二维码区域 */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#e5e3dd] flex items-center justify-center">
                <span className="text-xs text-[#999]">QR</span>
              </div>
              <p className="text-[10px] tracking-[0.1em] text-[#999]">扫码测你的缘分</p>
            </div>
          </motion.div>

          {/* 生成按钮 */}
          <motion.button
            onClick={generateCard}
            disabled={isGenerating}
            className="group relative px-10 py-4 bg-[#3a4d42] text-white text-sm tracking-[0.2em] disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {isGenerating ? '生成中...' : 'Save Your Destiny Card'}
            </span>
            <div className="absolute inset-0 bg-[#2a3832] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </section>

      {/* ===== 6. 人宠和谐指南 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#f5f4f0]">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            className="text-xs tracking-[0.4em] text-[#999] mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            THE HARMONY GUIDE
          </motion.p>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-extralight text-[#2a2a2a] mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            人宠和谐指南
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 幸运色 */}
            <motion.div 
              className="p-6 border border-[#e5e3dd] text-center bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">LUCKY COLOR</p>
              <p className="text-lg font-light mb-4">幸运色</p>
              <div className="flex justify-center gap-2 mb-4">
                {harmony.luckyColors.map((color, i) => (
                  <span key={i} className="text-sm text-[#666]">{color}</span>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                {harmony.luckyColorsEn.map((color, i) => (
                  <span key={i} className="text-xs text-[#999]">{color}</span>
                ))}
              </div>
            </motion.div>

            {/* 吉位 */}
            <motion.div 
              className="p-6 border border-[#e5e3dd] text-center bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">FORTUNATE DIRECTION</p>
              <p className="text-lg font-light mb-4">吉位</p>
              <p className="text-sm text-[#666] mb-2">{harmony.direction}</p>
              <p className="text-xs text-[#999]">{harmony.directionEn}</p>
            </motion.div>

            {/* 性格共振 */}
            <motion.div 
              className="p-6 border border-[#e5e3dd] text-center bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">VIBE SYNC</p>
              <p className="text-lg font-light mb-4">性格共振</p>
              <p className="text-sm italic text-[#666] mb-2">"{harmony.vibeQuote}"</p>
              <p className="text-xs text-[#999]">{harmony.vibeChinese}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. Newsletter ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#3a4d42]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p 
            className="text-xs tracking-[0.4em] text-white/50 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SPIRIT & PET MONTHLY
          </motion.p>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-extralight text-white mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            灵宠月刊
          </motion.h2>
          
          <motion.p 
            className="text-sm text-white/60 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            每月一封，关于你和它的命理指南
          </motion.p>

          <motion.form 
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#3a4d42] text-sm tracking-[0.15em] hover:bg-white/90 transition-colors"
            >
              {subscribed ? '已订阅' : '开启缘分追踪'}
            </button>
          </motion.form>

          <motion.p 
            className="text-xs text-white/40 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            首次订阅赠送「五行宠物手册」PDF
          </motion.p>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-12 px-6 md:px-12 bg-[#2a2a2a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-[0.3em] text-white/60">
            百澤 BAIZE
          </p>
          <p className="text-xs tracking-[0.1em] text-white/40">
            测试结果仅供参考
          </p>
        </div>
      </footer>
    </main>
  );
}
