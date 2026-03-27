'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * 极简风格 - 结果页
 */

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
    luckyColors: ['黑色', '蓝色'],
    luckyColorsEn: ['Black', 'Blue'],
    direction: '北方',
    directionEn: 'North',
    vibeQuote: "Like water, love finds its way.",
    vibeChinese: '爱如水，总能找到出路。'
  },
  fire: {
    luckyColors: ['红色', '紫色'],
    luckyColorsEn: ['Red', 'Purple'],
    direction: '南方',
    directionEn: 'South',
    vibeQuote: "Passion burns; love warms.",
    vibeChinese: '激情燃烧，爱意温暖。'
  },
  earth: {
    luckyColors: ['黄色', '棕色'],
    luckyColorsEn: ['Yellow', 'Brown'],
    direction: '中央 · 东北方 · 西南方',
    directionEn: 'Center · Northeast · Southwest',
    vibeQuote: "Grounded in earth, rooted in love.",
    vibeChinese: '扎根大地，情系于心。'
  }
};

export default function ResultPage() {
  const [revealed, setRevealed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const wisdom = wisdomQuotes[mockResult.element];
  const harmony = harmonyGuide[mockResult.element];

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const generateCard = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('缘分卡片已生成！（演示功能）');
    }, 1500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--sand)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase">
            百澤
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--text-muted)]"><span className="font-en">Result</span></span>
        </div>
      </nav>

      {/* Hero 结果展示 */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl"
        >
          {/* 匹配度 - 方形衬底增强立体感 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.3em] text-[var(--text-muted)] mb-6"><span className="font-en">Match Score</span></p>
            <div className="relative inline-block">
              {/* 外层装饰框 */}
              <div className="absolute -inset-3 border border-[var(--primary)] transform rotate-2 opacity-10" />
              {/* 主框 */}
              <div className="relative border-2 border-[var(--primary)] px-14 py-10 bg-[var(--cream)] shadow-[var(--shadow-lg)]">
                <p className="text-7xl md:text-9xl font-extralight tracking-tight text-[var(--foreground)]">
                  {mockResult.matchScore}
                  <span className="text-3xl md:text-4xl text-[var(--accent)] ml-1">%</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* 宠物名称 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <p className="text-xs tracking-[0.3em] text-[var(--accent)] mb-4 font-medium">{mockResult.pet.category}</p>
            <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] mb-2 text-[var(--foreground)]">
              {mockResult.pet.name.toUpperCase()}
            </h1>
            <p className="text-lg tracking-[0.3em] text-[var(--text-secondary)]">
              {mockResult.pet.nameCn}
            </p>
          </motion.div>

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
              className="text-xs tracking-[0.2em] text-[var(--text-muted)]"
            >
              SCROLL FOR DETAILS
              <div className="w-px h-8 bg-[var(--sand)] mx-auto mt-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 四维分析 - 艺术画廊风格 */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* 左侧：内容区 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              {/* 艺术标题 - 居中 */}
              <h2 
                className="text-2xl md:text-3xl font-normal tracking-[0.06em] text-[#8b3232] mb-8"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                FOUR DIMENSIONS
              </h2>
              
              {/* 四维解读文字 - 右对齐 */}
              <p 
                className="text-base text-[#555] leading-[1.9] mb-8 text-right"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                <em className="text-[#8b3232] not-italic">五行契合</em>与<em className="text-[#8b3232] not-italic">天时共振</em>，
                是命运交织的根基。<em className="text-[#8b3232] not-italic">地利相宜</em>与<em className="text-[#8b3232] not-italic">人和共鸣</em>，
                是缘分延续的沃土。当金木水火土相生相克，当时辰流转契合命盘，
                空间方位的和谐与性格气质的互补，让每一次相遇都成为命中注定的美好邂逅。
              </p>
              
              {/* 小字标注 - 居中 */}
              <p 
                className="text-[11px] tracking-[0.15em] text-[#888] uppercase mb-10 text-center"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                五行天时地利人和 · 四维契合 · 2024
              </p>
              
              {/* 按钮内嵌分数 */}
              <div className="text-center">
                <button 
                  className="group px-8 py-4 bg-[#2d4a3e] text-[#f5f0e8] hover:bg-[#243d32] transition-all duration-300"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  <span className="text-xs tracking-[0.2em] uppercase mr-4">探索更多</span>
                  <span className="inline-block w-px h-4 bg-white/30 mx-2" />
                  <span className="text-lg font-light tracking-[0.05em]">{Math.round(mockResult.dimensions.reduce((a, b) => a + b.score, 0) / 4)}</span>
                  <span className="text-xs ml-1 opacity-70">分</span>
                </button>
                
                {/* Hover 展开详细分数 */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <p className="text-[11px] tracking-[0.1em] text-[#999]">
                    五行 {mockResult.dimensions[0].score} · 
                    天时 {mockResult.dimensions[1].score} · 
                    地利 {mockResult.dimensions[2].score} · 
                    人和 {mockResult.dimensions[3].score}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* 右侧：植物插画 - 独立区域 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/illustrations/deer-bird-botanical.png"
                  alt="鹿与鸟 - 植物插画"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 匹配原因 */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] text-[var(--text-muted)] mb-4"><span className="font-en">Why This Match</span></p>
            <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.05em] text-[var(--foreground)]">
              缘分解读
            </h2>
          </motion.div>

          <div className="space-y-8">
            {mockResult.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <span className="text-xs tracking-[0.2em] text-[var(--accent)] pt-1 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="w-8 h-px bg-[var(--sand)] mb-4 group-hover:w-16 group-hover:bg-[var(--primary)]/30 transition-all duration-500" />
                  <p className="text-sm md:text-base font-light leading-relaxed text-[var(--text-secondary)]">
                    {reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 总结 - 复古药剂师绿主题 */}
      <section className="py-32 px-6 md:px-12 bg-[#2d4a3e] text-[#f5f0e8] relative overflow-hidden">
        {/* 渐变层次 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#365c4d] via-[#2d4a3e] to-[#243d32]" />
        {/* 纹理装饰 */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f5f0e8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* 顶部光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#f5f0e8]/10 to-transparent" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] text-[#c9a87c] mb-8">DESTINY SPEAKS</p>
            <p className="text-lg md:text-xl font-extralight leading-loose tracking-wide text-[#f5f0e8]">
              {mockResult.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 金句卡片 */}
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
              &ldquo;{wisdom.quote}&rdquo;
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
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#2d4a3e]/20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#2d4a3e]/20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#2d4a3e]/20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#2d4a3e]/20" />
          </motion.div>
        </div>
      </section>

      {/* Destiny Card 生成 */}
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
              <p className="text-xs tracking-[0.3em] text-[#2d4a3e]">百澤 BAIZE</p>
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
              
              <div className="w-12 h-px bg-[#2d4a3e] mx-auto mb-4" />
              
              <p className="text-sm italic text-[#666] mb-2">&ldquo;{wisdom.quote}&rdquo;</p>
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
            className="group relative px-10 py-4 bg-[#2d4a3e] text-white text-sm tracking-[0.2em] disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {isGenerating ? '生成中...' : 'Save Your Destiny Card'}
            </span>
            <div className="absolute inset-0 bg-[#243d32] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </section>

      {/* 人宠和谐指南 */}
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
              <p className="text-sm italic text-[#666] mb-2">&ldquo;{harmony.vibeQuote}&rdquo;</p>
              <p className="text-xs text-[#999]">{harmony.vibeChinese}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#2d4a3e]">
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
              className="px-6 py-3 bg-white text-[#2d4a3e] text-sm tracking-[0.15em] hover:bg-white/90 transition-colors"
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

      {/* CTA */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.1em] text-[var(--text-secondary)] mb-8">
              分享你的命定之宠，或再次探索
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-12 py-4 bg-[var(--primary)] text-white text-xs tracking-[0.3em] uppercase font-medium shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-primary-hover)] hover:-translate-y-1 active:translate-y-0 active:shadow-[var(--shadow-sm)] transition-all duration-300">
                Share Result
              </button>
              <Link
                href="/"
                className="px-12 py-4 border-2 border-[var(--primary)] text-[var(--primary)] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[var(--primary)] hover:text-white hover:shadow-[var(--shadow-primary)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                Try Again
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-[var(--sand)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">
            百澤 BAIZE
          </p>
          <p className="text-xs tracking-[0.1em] text-[var(--text-muted)]">
            测试结果仅供参考
          </p>
        </div>
      </footer>
    </main>
  );
}
