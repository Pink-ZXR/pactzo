/**
 * @experiment result-v2
 * @base 结果页升级 - 金句卡片、Destiny Card、人宠和谐指南、Newsletter
 * @date 2026-03-18
 * @changes 新增四大模块：金句卡片(中英双语)、社交分享卡片、人宠和谐指南、灵宠月刊订阅
 */

'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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

export default function ResultV2() {
  const [userElement] = useState<'metal' | 'wood' | 'water' | 'fire' | 'earth'>('metal');
  const [userPet] = useState('猫咪');
  const [userPetEn] = useState('Cat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const wisdom = wisdomQuotes[userElement];
  const harmony = harmonyGuide[userElement];

  // 生成 Destiny Card
  const generateCard = async () => {
    setIsGenerating(true);
    // 模拟生成过程
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
    <main className="min-h-screen bg-[#f8f7f4]">
      
      {/* ===== Hero：匹配结果 ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            className="text-xs tracking-[0.4em] text-[#999] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            YOUR DESTINED COMPANION
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-extralight text-[#2a2a2a] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            你的命定之宠
          </motion.h1>

          {/* 宠物展示 */}
          <motion.div 
            className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#3a4d42]/5" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#e5e3dd]">
              <Image
                src="/pets/cat-ink.png"
                alt={userPet}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* 五行标签 */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-2xl md:text-3xl font-light">{wisdom.element}</span>
            <span className="text-sm text-[#999]">{wisdom.pinyin}</span>
            <span className="text-sm text-[#999]">{wisdom.english}</span>
            <span className="mx-2 text-[#ddd]">·</span>
            <span className="text-lg">{userPet}</span>
            <span className="text-sm text-[#999]">{userPetEn}</span>
          </motion.div>
        </div>
      </section>

      {/* ===== 模块1：金句卡片 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
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
            className="relative p-8 md:p-12 border border-[#e5e3dd] text-center"
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

      {/* ===== 模块2：Destiny Card 生成 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#f5f4f0]">
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
            className="relative w-72 h-[500px] mx-auto mb-8 bg-white shadow-xl overflow-hidden"
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
              <Image src="/pets/cat-ink.png" alt="" fill className="object-cover" />
            </div>

            {/* 内容 */}
            <div className="absolute top-56 left-0 right-0 text-center px-6">
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">YOUR DESTINY</p>
              <p className="text-lg font-light mb-1">{wisdom.element} · {userPet}</p>
              <p className="text-xs text-[#999] mb-4">{wisdom.english} · {userPetEn}</p>
              
              <div className="w-12 h-px bg-[#3a4d42] mx-auto mb-4" />
              
              <p className="text-sm italic text-[#666] mb-2">"{wisdom.quote}"</p>
              <p className="text-xs text-[#999]">{wisdom.chinese}</p>
            </div>

            {/* 二维码区域 */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#f5f4f0] flex items-center justify-center">
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

      {/* ===== 模块3：人宠和谐指南 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
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
              className="p-6 border border-[#e5e3dd] text-center"
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
              className="p-6 border border-[#e5e3dd] text-center"
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
              className="p-6 border border-[#e5e3dd] text-center"
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

      {/* ===== 模块4：Newsletter ===== */}
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
      <footer className="py-8 px-6 md:px-12 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg tracking-[0.15em] text-white/80">百澤</span>
            <span className="text-xs tracking-[0.3em] text-white/40">BAIZE</span>
          </div>
          <Link href="/" className="text-xs text-white/40 hover:text-white/60 transition-colors">
            返回首页
          </Link>
        </div>
      </footer>
    </main>
  );
}
