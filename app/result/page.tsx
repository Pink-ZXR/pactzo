/**
 * @experiment result-v4
 * @base 结果页 Top 3 升级版
 * @date 2026-03-22
 * @changes 接入真实匹配算法, Top3展示, 五维/四维动态维度, 保持原有配色体系
 */

'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useSpring as useFramerSpring, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { calculateWuxing, WUXING_NAMES } from '@/lib/wuxing';
import { matchPetByCategory, matchAllPets, type MatchResult } from '@/lib/matching';
import { PET_CATEGORIES } from '@/lib/pet-database';
import type { UserProfile, PetCategory, WuxingElement, AppearanceProfile } from '@/hooks/useTestStore';
import html2canvas from 'html2canvas';

// CountUpNumber component with spring physics
function CountUpNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useFramerSpring(0, { stiffness: 50, damping: 30 });

  useEffect(() => {
    springValue.set(value);
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [value, springValue]);

  return <>{displayValue}</>;
}

// 五行金句数据
const wisdomQuotes: Record<WuxingElement, { element: string; pinyin: string; english: string; quote: string; chinese: string; source: string }> = {
  metal: { element: '金', pinyin: 'Jīn', english: 'Metal', quote: 'True gold fears no fire; true bond fears no time.', chinese: '真金不怕火炼，真情不怕时间。', source: '《增广贤文》/ Ancient Wisdom' },
  wood: { element: '木', pinyin: 'Mù', english: 'Wood', quote: 'Like a tree, love grows deep in silence.', chinese: '如树般，爱在静默中深根。', source: '《道德经》/ Tao Te Ching' },
  water: { element: '水', pinyin: 'Shuǐ', english: 'Water', quote: 'Water flows to the heart; fate flows to the soul.', chinese: '水流入心，缘流入魂。', source: '《庄子》/ Zhuangzi' },
  fire: { element: '火', pinyin: 'Huǒ', english: 'Fire', quote: 'A spark ignites; a heart unites.', chinese: '星火点燃，心灵相连。', source: '《易经》/ I Ching' },
  earth: { element: '土', pinyin: 'Tǔ', english: 'Earth', quote: 'Earth nurtures all; love nurtures the soul.', chinese: '大地滋养万物，爱滋养灵魂。', source: '《礼记》/ Book of Rites' },
};

// 和谐指南数据
const harmonyGuide: Record<WuxingElement, { luckyColors: string[]; luckyColorsEn: string[]; direction: string; directionEn: string; vibeQuote: string; vibeChinese: string }> = {
  metal: { luckyColors: ['白色', '金色', '银色'], luckyColorsEn: ['White', 'Gold', 'Silver'], direction: '西方 · 西北方', directionEn: 'West · Northwest', vibeQuote: "It's not just a pet; it's a mirror to your soul.", vibeChinese: '它不是你的一部分，你是它的全部。' },
  wood: { luckyColors: ['绿色', '青色'], luckyColorsEn: ['Green', 'Cyan'], direction: '东方 · 东南方', directionEn: 'East · Southeast', vibeQuote: "In silence, roots intertwine; in love, souls align.", vibeChinese: '静默中根系交织，爱意中灵魂相依。' },
  water: { luckyColors: ['黑色', '深蓝色'], luckyColorsEn: ['Black', 'Deep Blue'], direction: '北方', directionEn: 'North', vibeQuote: "Water finds its way; fate finds its home.", vibeChinese: '水自有其道，缘自有其归。' },
  fire: { luckyColors: ['红色', '橙色', '紫色'], luckyColorsEn: ['Red', 'Orange', 'Purple'], direction: '南方', directionEn: 'South', vibeQuote: "A flame shared is a flame doubled.", vibeChinese: '分享的火焰，成倍的温暖。' },
  earth: { luckyColors: ['黄色', '棕色', '米色'], luckyColorsEn: ['Yellow', 'Brown', 'Beige'], direction: '中央 · 西南方 · 东北方', directionEn: 'Center · Southwest · Northeast', vibeQuote: "Grounded in earth, lifted by love.", vibeChinese: '扎根大地，被爱托起。' },
};

// Silk transition constant
const SILK = { duration: 1.4, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] };

// 稀有度系统
type RarityLevel = 'COMMON' | 'RARE' | 'LEGENDARY';
const RARITY_MAP: Record<string, RarityLevel> = {
  cat: 'COMMON', dog: 'COMMON',                    // 猫狗 = 常见
  rabbit: 'RARE', small: 'RARE', bird: 'RARE',     // 兔/小宠/鸟 = 稀有
  reptile: 'LEGENDARY', fish: 'RARE',              // 爬宠 = 传说
  amphibian: 'LEGENDARY', exotic: 'LEGENDARY',     // 两栖/异宠 = 传说
};
const RARITY_LABEL: Record<RarityLevel, { en: string; cn: string }> = {
  COMMON: { en: 'COMMON', cn: '常见' },
  RARE: { en: 'RARE', cn: '稀有' },
  LEGENDARY: { en: 'LEGENDARY', cn: '传说' },
};
function getRarityLevel(category: string): RarityLevel {
  return RARITY_MAP[category] || 'COMMON';
}
function generateDestinyId(year: number, month: number, day: number, breedId: string): string {
  let hash = 0;
  const seed = `${year}${month}${day}${breedId}`;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const letter = String.fromCharCode(65 + (Math.abs(hash) % 26));
  const num = String(Math.abs(hash) % 100000).padStart(5, '0');
  return `#${letter}${num}`;
}

// Share phase type
type SharePhase = 'idle' | 'dimming' | 'summoning' | 'quoting' | 'glowing' | 'card-ready';

// 数据节点位置（模块级常量，确保 hooks 顶层调用数量固定）
const DATA_NODE_POSITIONS = [
  { top: '18%', left: '12%', right: undefined, bottom: undefined, depth: 1.5 },
  { top: '12%', right: '15%', left: undefined, bottom: undefined, depth: 0.8 },
  { bottom: '22%', left: '15%', top: undefined, right: undefined, depth: 2.0 },
  { bottom: '18%', right: '12%', top: undefined, left: undefined, depth: 1.2 },
  { top: '50%', left: '5%', right: undefined, bottom: undefined, depth: 1.0 },
];

export default function ResultPage() {
  const router = useRouter();
  const [top3, setTop3] = useState<MatchResult[]>([]);
  const [element, setElement] = useState<WuxingElement>('earth');
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedPetIndex, setSelectedPetIndex] = useState<0 | 1 | 2>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // 分享仪式系统
  const [sharePhase, setSharePhase] = useState<SharePhase>('idle');
  const [shareCardUrl, setShareCardUrl] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [birthYear, setBirthYear] = useState(2000);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  // ===== 3D 悬浮视差 =====
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const _cardRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const _cardRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const _cardX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const _cardY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const _chineseRotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const _chineseRotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const _chineseX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);

  // 背景水印位移（提升至顶层，不在 JSX 内调用 hook）
  const bgWatermarkX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const bgWatermarkY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  // Seal Section 视差变量
  const sealBgX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const sealBgY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  const sealCardX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const sealCardY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const sealContentX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const sealContentY = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

  // 数据节点位移（5 个固定数量，不可在 map 内调用 hooks，需逐一声明）
  const node0X = useTransform(smoothX, [-0.5, 0.5], [40 * DATA_NODE_POSITIONS[0].depth, -40 * DATA_NODE_POSITIONS[0].depth]);
  const node0Y = useTransform(smoothY, [-0.5, 0.5], [30 * DATA_NODE_POSITIONS[0].depth, -30 * DATA_NODE_POSITIONS[0].depth]);
  const node1X = useTransform(smoothX, [-0.5, 0.5], [40 * DATA_NODE_POSITIONS[1].depth, -40 * DATA_NODE_POSITIONS[1].depth]);
  const node1Y = useTransform(smoothY, [-0.5, 0.5], [30 * DATA_NODE_POSITIONS[1].depth, -30 * DATA_NODE_POSITIONS[1].depth]);
  const node2X = useTransform(smoothX, [-0.5, 0.5], [40 * DATA_NODE_POSITIONS[2].depth, -40 * DATA_NODE_POSITIONS[2].depth]);
  const node2Y = useTransform(smoothY, [-0.5, 0.5], [30 * DATA_NODE_POSITIONS[2].depth, -30 * DATA_NODE_POSITIONS[2].depth]);
  const node3X = useTransform(smoothX, [-0.5, 0.5], [40 * DATA_NODE_POSITIONS[3].depth, -40 * DATA_NODE_POSITIONS[3].depth]);
  const node3Y = useTransform(smoothY, [-0.5, 0.5], [30 * DATA_NODE_POSITIONS[3].depth, -30 * DATA_NODE_POSITIONS[3].depth]);
  const node4X = useTransform(smoothX, [-0.5, 0.5], [40 * DATA_NODE_POSITIONS[4].depth, -40 * DATA_NODE_POSITIONS[4].depth]);
  const node4Y = useTransform(smoothY, [-0.5, 0.5], [30 * DATA_NODE_POSITIONS[4].depth, -30 * DATA_NODE_POSITIONS[4].depth]);
  const _nodeXTransforms = [node0X, node1X, node2X, node3X, node4X];
  const _nodeYTransforms = [node0Y, node1Y, node2Y, node3Y, node4Y];

  // ===== 读取数据 + 执行匹配 =====
  useEffect(() => {
    const init = () => {
    try {
      const birthdateStr = sessionStorage.getItem('birthdate');
      const tianshiStr = sessionStorage.getItem('tianshi');
      const diliStr = sessionStorage.getItem('dili');
      const renheStr = sessionStorage.getItem('renhe');
      const appearanceStr = sessionStorage.getItem('appearance');
      const categoryStr = sessionStorage.getItem('pet_category');

      if (!birthdateStr || !tianshiStr || !diliStr || !renheStr || !categoryStr) {
        const missing = [
          !birthdateStr && 'birthdate',
          !tianshiStr && 'tianshi',
          !diliStr && 'dili',
          !renheStr && 'renhe',
          !categoryStr && 'pet_category',
        ].filter(Boolean).join(', ');
        console.error('[Result] 缺失 sessionStorage 字段:', missing);
        setErrorMsg(`数据缺失：${missing}`);
        return;
      }

      const birthdate = JSON.parse(birthdateStr);
      const tianshi = JSON.parse(tianshiStr);
      const dili = JSON.parse(diliStr);
      const renhe = JSON.parse(renheStr);
      const appearance: AppearanceProfile | undefined = appearanceStr ? JSON.parse(appearanceStr) : undefined;
      const category = categoryStr as PetCategory | 'all';

      const userWuxing = calculateWuxing(birthdate.year, birthdate.month, birthdate.day);
      setElement(userWuxing);
      setBirthYear(birthdate.year);
      setBirthMonth(birthdate.month);
      setBirthDay(birthdate.day);

      const userProfile: UserProfile = { tianshi, dili, renhe, appearance };
      const results = category === 'all'
        ? matchAllPets(userWuxing, userProfile)
        : matchPetByCategory(category as PetCategory, userWuxing, userProfile);

      setTop3(results.slice(0, 3));
      setLoaded(true);
    } catch (e) {
      console.error('[Result] 计算异常:', e);
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
    };
    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // ===== 分享仪式：5步电影动画 =====
  const handleSealShare = useCallback(async () => {
    if (sharePhase !== 'idle') return;
    setShareCardUrl(null);

    // Phase 1: 暗幕
    setSharePhase('dimming');
    await new Promise(r => setTimeout(r, 600));

    // Phase 2: 召唤
    setSharePhase('summoning');
    await new Promise(r => setTimeout(r, 600));

    // Phase 3: 金句
    setSharePhase('quoting');
    await new Promise(r => setTimeout(r, 800));

    // Phase 4: 微光
    setSharePhase('glowing');
    await new Promise(r => setTimeout(r, 1000));

    // Phase 5: 截图生成
    setSharePhase('card-ready');
    if (shareCardRef.current) {
      try {
        const canvas = await html2canvas(shareCardRef.current, {
          scale: 2,
          backgroundColor: '#f5f4f0',
          useCORS: true,
          logging: false,
        });
        setShareCardUrl(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('[Share] html2canvas error:', err);
      }
    }
  }, [sharePhase]);

  const closeShareOverlay = useCallback(() => {
    setSharePhase('idle');
    setShareCardUrl(null);
    setCopiedIndex(null);
  }, []);

  const handleCopyText = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch { /* fallback: do nothing */ }
  }, []);

  const handleDownloadCard = useCallback(() => {
    if (!shareCardUrl) return;
    const a = document.createElement('a');
    a.href = shareCardUrl;
    a.download = `pactzo-destiny-card.png`;
    a.click();
  }, [shareCardUrl]);

  // ESC 关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sharePhase !== 'idle') closeShareOverlay();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [sharePhase, closeShareOverlay]);

  // ===== 错误状态 =====
  if (errorMsg) {
    return (
      <main className="min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-xs tracking-[0.3em] text-[#8B2635]" style={{ fontFamily: "'Space Mono', monospace" }}>ERROR</p>
        <p className="text-sm text-[#666] text-center max-w-sm">{errorMsg}</p>
        <p className="text-xs text-[#999] text-center max-w-sm">请打开浏览器控制台查看详细错误（F12 → Console）</p>
        <button
          onClick={() => router.replace('/questionnaire/birthday')}
          className="mt-4 px-8 py-3 border border-[#1A2E2A] text-xs tracking-[0.2em] text-[#1A2E2A] hover:bg-[#1A2E2A] hover:text-white transition-colors"
        >
          重新开始问卷
        </button>
      </main>
    );
  }

  // ===== Loading 状态 =====
  if (!loaded || top3.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f4f0] flex items-center justify-center">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm tracking-[0.3em] text-[#999]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          READING DESTINY...
        </motion.p>
      </main>
    );
  }

  // ===== 准备数据（依赖 selectedPetIndex，随用户选择动态切换）=====
  const best = top3[selectedPetIndex] ?? top3[0];
  const wisdom = wisdomQuotes[best.breed.wuxing] ?? wisdomQuotes[element];
  const harmony = harmonyGuide[element];

  // 动态维度 (4 or 5)
  const dimensions = [
    { en: 'WUXING', zh: '五行', score: best.scores.wuxing },
    { en: 'TIANSHI', zh: '天时', score: best.scores.tianshi },
    { en: 'DILI', zh: '地利', score: best.scores.dili },
    { en: 'RENHE', zh: '人和', score: best.scores.renhe },
    ...(best.scores.appearance != null ? [{ en: 'APPEARANCE', zh: '外观', score: best.scores.appearance }] : []),
  ];


  const _generateCard = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    alert('Destiny Card 已生成！');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setTimeout(() => setSubscribed(false), 3000); setEmail(''); }
  };

  return (
    <main className="min-h-screen bg-[#f5f4f0] snap-y snap-mandatory overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>

      {/* ===== 1. Hero: The Manifesto (25vh Massive Score) ===== */}
      <section className="snap-section relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F6F5F2] snap-start">
        {/* Background watermark — ghost texture at 0.02 opacity */}
        <motion.div
          style={{ x: bgWatermarkX, y: bgWatermarkY, zIndex: -1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[25vw] font-black whitespace-nowrap"
            style={{ fontFamily: "'Noto Serif SC', serif", letterSpacing: '0.05em', color: '#1A1A1A', opacity: 0.02 }}
          >
            百澤契約
          </span>
        </motion.div>

        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
        />

        {/* Main layout: Massive score top-left offset */}
        <div className="relative z-10 w-full h-screen px-6 md:px-12 lg:px-20">

          {/* ── TOP-LEFT: Massive Match % (25vh) with spring count-up ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="absolute top-[15%] left-6 md:left-12 lg:left-20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`score-${selectedPetIndex}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <motion.span
                  className="tabular-nums tracking-tighter"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontWeight: 500,
                    fontSize: '25vh',
                    lineHeight: 0.85,
                    color: '#1A1A1A',
                  }}
                  initial={{ opacity: 0 }}
                  animate={revealed ? { opacity: 1 } : {}}
                >
                  <CountUpNumber value={best.scores.total} />
                </motion.span>
                <span
                  className="ml-1 align-top"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontWeight: 300,
                    fontSize: '5vh',
                    color: '#1A1A1A',
                    opacity: 0.15,
                    lineHeight: 1.2,
                  }}
                >
                  %
                </span>
                {/* Label: Chinese Bold below number, well-spaced */}
                <div className="mt-8 flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.2em',
                      color: '#1A1A1A',
                      opacity: 1,
                    }}
                  >
                    契合度
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: '9px',
                      letterSpacing: '0.35em',
                      color: 'rgba(26,26,26,0.22)',
                      textTransform: 'uppercase',
                    }}
                  >
                    MATCH SCORE
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── BOTTOM-RIGHT: Pet Identity - Chinese Main Actor ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SILK, delay: 0.6 }}
            className="absolute bottom-[20%] right-6 md:right-12 lg:right-20 text-right"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`identity-${selectedPetIndex}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                {/* Category + Element - Chinese bold, 100% opacity */}
                <p
                  className="text-sm font-bold tracking-[0.15em] mb-4"
                  style={{
                    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                    fontWeight: 700,
                    color: '#7A2E2E',
                    opacity: 1,
                  }}
                >
                  {best.breed.categoryName} · {WUXING_NAMES[element]}
                </p>
                {/* Chinese Name - Main Actor */}
                <h3
                  style={{
                    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    letterSpacing: '0.08em',
                    color: '#1A1A1A',
                    lineHeight: 1.1,
                    opacity: 1,
                  }}
                >
                  {best.breed.name}
                </h3>
                {/* English Name - Decorative sub */}
                <p
                  className="mt-3 italic"
                  style={{
                    fontFamily: "'Playfair Display', 'Cormorant', serif",
                    fontWeight: 300,
                    fontSize: '14px',
                    letterSpacing: '0.2em',
                    color: 'rgba(26,26,26,0.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  {best.breed.nameEn}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── CENTER: Decorative vertical line ── */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={revealed ? { scaleY: 1 } : {}}
            transition={{ ...SILK, delay: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[30vh] origin-center"
            style={{ backgroundColor: 'rgba(26,26,26,0.06)' }}
          />

          {/* ── Dimension badges: staggered float ── */}
          <div className="absolute bottom-[8%] left-6 md:left-12 lg:left-20 flex gap-6">
            {dimensions.slice(0, 3).map((dim, idx) => (
              <motion.div
                key={dim.en}
                initial={{ opacity: 0, y: 20 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ ...SILK, delay: 0.9 + idx * 0.05 }}
                className="text-center"
              >
                <span
                  className="block text-[8px] tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.2 }}
                >
                  {dim.en}
                </span>
                <span
                  className="text-xl tabular-nums"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, color: '#1A1A1A' }}
                >
                  {dim.score}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          {/* SCROLL 文字 — 呼吸动画 */}
          <motion.span
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: "'Times New Roman', 'Source Han Serif CN', serif",
              fontSize: '10px',
              letterSpacing: '0.5em',
              color: '#1A1A1A',
              fontStyle: 'italic',
            }}
          >
            SCROLL
          </motion.span>

          {/* 扫光线 — 流动向下 */}
          <div className="relative w-px overflow-hidden" style={{ height: '48px' }}>
            {/* 底线 */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,26,26,0.08)' }} />
            {/* 扫光块 */}
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
              className="absolute left-0 w-full"
              style={{
                height: '40%',
                background: 'linear-gradient(to bottom, transparent, rgba(26,26,26,0.45), transparent)',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== 2. TOP 3 命运三选 - Asymmetrical Editorial Grid ===== */}
      <section className="snap-section py-20 md:py-32 px-6 md:px-12 bg-[#F6F5F2] snap-start">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#1A1A1A] mb-4" style={{ fontFamily: "'Space Mono', monospace", opacity: 0.3 }}>WHICH ONE IS YOURS</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-[0.08em]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              你的三种可能
            </h2>
          </motion.div>

          {/* Asymmetrical 2-Column Grid: Left 65% / Right 35% */}
          <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-6 md:gap-8">

            {/* ── LEFT: Rank 01 (Full Height) ── */}
            {top3[0] && (() => {
              const match = top3[0];
              const idx = 0;
              const isExpanded = expandedCard === idx;
              const isSelected = selectedPetIndex === idx;
              const isDimmed = selectedPetIndex !== idx;
              return (
                <motion.div
                  key={match.breed.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SILK, delay: 0 }}
                  animate={{
                    opacity: isDimmed ? 0.2 : 1,
                    scale: isSelected ? 1.015 : 1,
                  }}
                  className="relative row-span-2 cursor-pointer group"
                  onClick={() => {
                    setSelectedPetIndex(idx as 0 | 1 | 2);
                    setExpandedCard(isExpanded ? null : idx);
                  }}
                  style={{ transition: 'all 1.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
                >
                  <div
                    className="relative h-full p-10 md:p-14 flex flex-col justify-between transition-all duration-[1400ms]"
                    style={{
                      backgroundColor: isSelected ? '#FFFFFF' : '#E0EAE9',
                      boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
                      transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                      transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                    }}
                  >
                    {/* Rank Label */}
                    <div className="mb-8">
                      <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 400, fontSize: '10px', letterSpacing: '0.4em', opacity: 0.4 }}>RANK_01</span>
                    </div>

                    {/* Animal Name — Chinese is Main Actor */}
                    <div className="flex-1 flex flex-col justify-center">
                      {/* English — decorative ghost above */}
                      <p className="mb-2 italic" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(26,26,26,0.25)', textTransform: 'uppercase' }}>
                        {match.breed.nameEn}
                      </p>
                      {/* Chinese — bold, #1A1A1A, 100% opacity */}
                      <h3 className="mb-3" style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.04em', color: '#1A1A1A', lineHeight: 1.1, opacity: 1 }}>
                        {match.breed.name}
                      </h3>
                      <p className="mt-2" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300, fontSize: '12px', color: 'rgba(26,26,26,0.4)', lineHeight: 1.8 }}>
                        {match.breed.categoryName} · {PET_CATEGORIES[match.breed.category]?.icon} · {WUXING_NAMES[match.breed.wuxing]}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="text-6xl md:text-7xl tabular-nums tracking-tight" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, color: '#1A1A1A' }}>
                        {match.scores.total}
                      </span>
                      <span className="text-xl" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 400, color: '#1A1A1A', opacity: 0.25 }}>%</span>
                      <span className="ml-4 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", color: '#1A1A1A', opacity: 0.3 }}>best match</span>
                    </div>

                    {/* Divider */}
                    <div className="mt-6 h-px bg-[#1A1A1A]/8" />

                    {/* Traits */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {match.breed.traits.slice(0, 4).map((trait) => (
                        <span key={trait} className="text-[10px] tracking-[0.1em] text-[#1A1A1A]/40 border-b border-[#1A1A1A]/8 pb-1" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300 }}>{trait}</span>
                      ))}
                    </div>

                    {/* ── Expanded: Dimension Details ── */}
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 space-y-4">
                        <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/30 uppercase mb-4" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>DIMENSION ANALYSIS</p>
                        {[
                          { label: '五行', en: 'Wuxing', score: match.scores.wuxing },
                          { label: '天时', en: 'Tianshi', score: match.scores.tianshi },
                          { label: '地利', en: 'Dili', score: match.scores.dili },
                          { label: '人和', en: 'Renhe', score: match.scores.renhe },
                          ...(match.scores.appearance != null ? [{ label: '外观', en: 'Appearance', score: match.scores.appearance }] : []),
                        ].map((d, di) => (
                          <motion.div
                            key={d.en}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: di * 0.05, duration: 0.5 }}
                            className="flex items-center gap-4"
                          >
                            <span className="w-8 text-[9px] tracking-[0.1em] text-[#1A1A1A]/40 shrink-0" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>{d.label}</span>
                            <div className="flex-1 h-[2px] bg-[#1A1A1A]/6 relative rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isExpanded ? { width: `${d.score}%` } : { width: 0 }}
                                transition={{ duration: 0.8, delay: di * 0.05, ease: [0.19, 1, 0.22, 1] }}
                                className="absolute top-0 left-0 h-full bg-[#1A1A1A]/40 rounded-full"
                              />
                            </div>
                            <span className="text-[11px] tabular-nums w-8 text-right" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, color: '#1A1A1A', opacity: 0.6 }}>{d.score}</span>
                          </motion.div>
                        ))}
                        {/* Emotional Summary */}
                        <p className="mt-4 pt-4 border-t border-[#1A1A1A]/8 text-sm leading-[1.8] italic" style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A1A', opacity: 0.5 }}>
                          &ldquo;{match.emotionalSummary}&rdquo;
                        </p>
                      </div>
                    </motion.div>

                    {/* Hover hint */}
                    <div className="absolute bottom-4 right-5">
                      <span className="text-[9px] tracking-[0.2em] text-[#1A1A1A]/20 group-hover:text-[#1A1A1A]/40 transition-opacity" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
                        {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                      </span>
                    </div>

                    {/* Corner decorations for #1 */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#1A1A1A]/8" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#1A1A1A]/8" />
                  </div>
                </motion.div>
              );
            })()}

            {/* ── RIGHT: Rank 02 & 03 (Stacked) ── */}
            {top3.slice(1, 3).map((match, i) => {
              const idx = i + 1;
              const isExpanded = expandedCard === idx;
              const isSelected = selectedPetIndex === idx;
              const isDimmed = selectedPetIndex !== idx;
              return (
                <motion.div
                  key={match.breed.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SILK, delay: (idx) * 0.1 }}
                  animate={{
                    opacity: isDimmed ? 0.2 : 1,
                    scale: isSelected ? 1.015 : 1,
                  }}
                  className="relative cursor-pointer group"
                  onClick={() => {
                    setSelectedPetIndex(idx as 0 | 1 | 2);
                    setExpandedCard(isExpanded ? null : idx);
                  }}
                  style={{ transition: 'all 1.4s cubic-bezier(0.19, 1, 0.22, 1)' }}
                >
                  <div
                    className="relative p-8 md:p-10 transition-all duration-[1400ms]"
                    style={{
                      backgroundColor: isSelected ? '#FFFFFF' : '#E0EAE9',
                      boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
                      transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                      transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                    }}
                  >
                    {/* Rank Label */}
                    <div className="mb-5">
                      <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 400, fontSize: '10px', letterSpacing: '0.4em', opacity: 0.4 }}>RANK_0{idx + 1}</span>
                    </div>

                    {/* Animal Name + Score */}
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        {/* English — ghost above */}
                        <p className="italic mb-1" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(26,26,26,0.25)', textTransform: 'uppercase' }}>
                          {match.breed.nameEn}
                        </p>
                        {/* Chinese — bold main actor */}
                        <h3 style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '0.04em', color: '#1A1A1A', lineHeight: 1.1, opacity: 1 }}>
                          {match.breed.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl md:text-5xl tabular-nums" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, color: '#1A1A1A' }}>
                          {match.scores.total}
                        </span>
                        <span className="text-sm ml-0.5" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", color: '#1A1A1A', opacity: 0.2 }}>%</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300, fontSize: '12px', opacity: 0.5, lineHeight: 1.8 }}>
                      {match.breed.categoryName} · {PET_CATEGORIES[match.breed.category]?.icon}
                    </p>

                    {/* Divider */}
                    <div className="mt-4 h-px bg-[#1A2E2A]/10" />

                    {/* Traits */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {match.breed.traits.slice(0, 3).map((trait) => (
                        <span key={trait} className="text-[10px] tracking-[0.1em] text-[#1A2E2A]/50 border-b border-[#1A2E2A]/10 pb-0.5" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300 }}>{trait}</span>
                      ))}
                    </div>

                    {/* ── Expanded: Dimension Details ── */}
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-3">
                        <p className="text-[9px] tracking-[0.3em] text-[#1A2E2A]/40 uppercase mb-3" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>DIMENSIONS</p>
                        {[
                          { label: '五行', score: match.scores.wuxing },
                          { label: '天时', score: match.scores.tianshi },
                          { label: '地利', score: match.scores.dili },
                          { label: '人和', score: match.scores.renhe },
                          ...(match.scores.appearance != null ? [{ label: '外观', score: match.scores.appearance }] : []),
                        ].map((d, di) => (
                          <motion.div
                            key={d.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: di * 0.08, duration: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <span className="w-7 text-[9px] tracking-[0.1em] text-[#1A2E2A]/50 shrink-0">{d.label}</span>
                            <div className="flex-1 h-[2px] bg-[#1A2E2A]/8 relative rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isExpanded ? { width: `${d.score}%` } : { width: 0 }}
                                transition={{ duration: 0.8, delay: di * 0.1, ease: [0.19, 1, 0.22, 1] }}
                                className="absolute top-0 left-0 h-full bg-[#1A2E2A]/50 rounded-full"
                              />
                            </div>
                            <span className="text-[10px] tabular-nums w-7 text-right" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, color: '#1A1A1A', opacity: 0.6 }}>{d.score}</span>
                          </motion.div>
                        ))}
                        <p className="mt-3 pt-3 border-t border-[#1A1A1A]/8 text-xs leading-[1.8] italic" style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A1A', opacity: 0.4 }}>
                          &ldquo;{match.emotionalSummary}&rdquo;
                        </p>
                      </div>
                    </motion.div>

                    {/* Hover hint */}
                    <div className="absolute bottom-3 right-4">
                      <span className="text-[8px] tracking-[0.2em] text-[#1A2E2A]/15 group-hover:text-[#1A2E2A]/35 transition-opacity" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
                        {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ===== 3. Dimension Analysis - Radar Chart + Legend ===== */}
      <section className="snap-section relative py-20 md:py-32 px-6 md:px-12 bg-[#1A2E2A] snap-start">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#7a8f82] mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>DIMENSION ANALYSIS</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-[0.08em] text-[#f5f4f0]" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '0 0 8px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)' }}>
              维度解析
            </h2>
          </motion.div>

          {/* Asymmetrical: 60% Radar / 40% Legend */}
          <div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-8 md:gap-12 items-center">

            {/* ── LEFT: SVG Radar Chart ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SILK, delay: 0 }}
              className="relative flex items-center justify-center"
            >
              <svg viewBox="0 0 300 300" className="w-full max-w-[380px] mx-auto">
                {/* Grid rings */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => {
                  const pts = dimensions.map((_, idx) => {
                    const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                    const r = 120 * scale;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  });
                  return <polygon key={i} points={pts.join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />;
                })}
                {/* Axis lines */}
                {dimensions.map((_, idx) => {
                  const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                  return <line key={idx} x1="150" y1="150" x2={150 + 120 * Math.cos(angle)} y2={150 + 120 * Math.sin(angle)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />;
                })}
                {/* Data fill polygon */}
                <motion.polygon
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  points={dimensions.map((d, idx) => {
                    const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                    const r = (d.score / 100) * 120;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  }).join(' ')}
                  fill="rgba(224, 234, 233, 0.4)"
                  stroke="rgba(224, 234, 233, 0.7)"
                  strokeWidth="0.5"
                />
                {/* Data outline polygon */}
                <motion.polygon
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  points={dimensions.map((d, idx) => {
                    const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                    const r = (d.score / 100) * 120;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  }).join(' ')}
                  fill="none"
                  stroke="rgba(224, 234, 233, 0.9)"
                  strokeWidth="1"
                />
                {/* Vertex dots */}
                {dimensions.map((d, idx) => {
                  const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                  const r = (d.score / 100) * 120;
                  return (
                    <motion.circle
                      key={d.en}
                      cx={150 + r * Math.cos(angle)}
                      cy={150 + r * Math.sin(angle)}
                      r="2"
                      fill="#E0EAE9"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    />
                  );
                })}
                {/* Axis labels */}
                {dimensions.map((d, idx) => {
                  const angle = (Math.PI * 2 * idx) / dimensions.length - Math.PI / 2;
                  const labelR = 140;
                  const x = 150 + labelR * Math.cos(angle);
                  const y = 150 + labelR * Math.sin(angle);
                  return (
                    <text
                      key={d.en}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="8"
                      fontFamily="'Space Mono', monospace"
                      letterSpacing="0.1em"
                    >
                      {d.en}
                    </text>
                  );
                })}
              </svg>
            </motion.div>

            {/* ── RIGHT: Text Legend ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...SILK, delay: 0.2 }}
              className="space-y-0"
            >
              {dimensions.map((d, idx) => (
                <motion.div
                  key={d.en}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 py-5 border-b border-white/[0.06]">
                    {/* Index */}
                    <span className="text-[10px] text-white/20 w-10 shrink-0" style={{ fontFamily: "'Space Mono', monospace" }}>
                      [DIM_0{idx + 1}]
                    </span>
                    {/* Vertical separator */}
                    <div className="w-px h-8 bg-white/10 shrink-0" />
                    {/* Label + Score */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs tracking-[0.3em] text-white/50 uppercase" style={{ fontFamily: "'Space Mono', monospace", textShadow: '0 0 8px rgba(255,255,255,0.15)' }}>
                          {d.en}
                        </span>
                        <span className="text-[10px] tracking-[0.15em] text-white/25">{d.zh}</span>
                      </div>
                      {/* Score bar */}
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/10 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${d.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute top-0 left-0 h-full bg-[#E0EAE9]/60"
                          />
                        </div>
                        <span className="text-sm tabular-nums text-white/70 w-8 text-right" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 500, textShadow: '0 0 8px rgba(255,255,255,0.15)' }}>
                          {d.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Match Reasons Summary */}
              <div className="pt-6">
                {best.matchReasons.map((reason, index) => {
                  const dimLabels: Record<string, string> = { wuxing: 'Element', tianshi: 'Timing', dili: 'Space', renhe: 'Character', appearance: 'Appearance' };
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                      className="text-sm leading-[1.8] text-white/40 mb-3"
                      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 300 }}
                    >
                      <span className="text-[9px] tracking-[0.2em] text-[#c9a87c]/60 uppercase mr-2" style={{ fontFamily: "'Space Mono', monospace" }}>{dimLabels[reason.dimension] || 'Fate'}</span>
                      {reason.text}
                    </motion.p>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* 命定之约卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-[#f5f4f0] py-12 md:py-16 px-8 md:px-12 text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[#e5e3dd]"
          >
            <p className="text-[10px] tracking-[0.4em] text-[#8B4513] mb-4 uppercase font-bold">A Destiny Sealed</p>
            <p className="text-sm tracking-[0.3em] text-[#8b3232] mb-6 font-bold">命定之约</p>
            <p className="text-base md:text-lg font-medium leading-[1.8] text-[#1A2E2A] max-w-2xl mx-auto mb-6" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {best.emotionalSummary}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[#1A2E2A]/30" />
              <span className="text-xs tracking-[0.3em] text-[#666] font-bold">百澤 PACTZO</span>
              <div className="w-12 h-px bg-[#1A2E2A]/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Final Manifesto Quote ===== */}
      <section className="snap-section relative min-h-screen flex items-center justify-center bg-[#F6F5F2] overflow-hidden snap-start">
        <div className="relative z-10 text-center px-[8vw] md:px-[20vw] max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SILK, delay: 0 }}
          >
            {/* Label */}
            <p className="text-[10px] tracking-[0.5em] mb-10 uppercase" style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.3 }}>
              ANCIENT WISDOM · {wisdom.english.toUpperCase()}
            </p>

            {/* Main Quote — AnimatePresence left-out right-in on selectedPetIndex change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${selectedPetIndex}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <blockquote className="relative">
                  <p
                    className="text-2xl md:text-[32px] leading-[1.8] italic"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 400, color: '#1A1A1A', opacity: 0.8 }}
                  >
                    <span className="text-[2em] not-italic font-medium float-left leading-[0.8] mr-3 mt-1" style={{ color: '#7A2E2E' }}>
                      {wisdom.quote.charAt(0)}
                    </span>
                    {wisdom.quote.slice(1)}
                  </p>
                </blockquote>

                {/* Chinese Translation */}
                <p
                  className="mt-8 text-base md:text-lg tracking-[0.2em]"
                  style={{ fontFamily: "'Noto Serif SC', serif", lineHeight: 1.8, color: '#1A1A1A', opacity: 0.45 }}
                >
                  {wisdom.chinese}
                </p>

                {/* Source */}
                <p
                  className="mt-6 text-xs tracking-[0.2em]"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.2 }}
                >
                  — {wisdom.source}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Element Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center justify-center gap-4"
            >
              <div className="w-16 h-px bg-[#1A1A1A]/10" />
              <span className="text-3xl" style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A1A', opacity: 0.12 }}>{wisdom.element}</span>
              <div className="w-16 h-px bg-[#1A1A1A]/10" />
            </motion.div>
          </motion.div>
        </div>

        {/* Rotating Seal SVG */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-0">
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="opacity-[0.08]"
          >
            <circle cx="60" cy="60" r="56" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            {/* Inner text path */}
            <defs>
              <path id="sealTextPath" d="M 60,60 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text fill="#1A1A1A" fontSize="6" fontFamily="'Space Mono', monospace" letterSpacing="0.3em">
              <textPath href="#sealTextPath" startOffset="0%">
                PACTZO · OFFICIAL · DESTINY · CONTRACT · 2026 ·
              </textPath>
            </text>
            {/* Center character */}
            <text x="60" y="62" textAnchor="middle" dominantBaseline="central" fill="#1A1A1A" fontSize="20" fontFamily="'Noto Serif SC', serif" fontWeight="900">
              澤
            </text>
            {/* Corner marks */}
            <line x1="40" y1="42" x2="40" y2="48" stroke="#1A1A1A" strokeWidth="0.5" />
            <line x1="37" y1="45" x2="43" y2="45" stroke="#1A1A1A" strokeWidth="0.5" />
            <line x1="77" y1="72" x2="77" y2="78" stroke="#1A1A1A" strokeWidth="0.5" />
            <line x1="74" y1="75" x2="80" y2="75" stroke="#1A1A1A" strokeWidth="0.5" />
          </motion.svg>
        </div>
      </section>

      {/* ===== 5. Destiny Card 生成 — Godly Editorial Gallery ===== */}
      <section
        className="relative min-h-screen bg-[#F6F5F2] overflow-hidden flex items-center justify-center select-none py-24 snap-start"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
          mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      >


        {/* ── Layer 1: 背景水印 PACTZO DESTINY 2026 ── */}
        <div className="absolute inset-0 pointer-events-none z-1 flex items-center justify-center overflow-hidden">
          {/* 远景 — 极大极淡 */}
          <motion.div
            initial={false}
            animate={{ skewX: (selectedPetIndex - 1) * -2 }}
            transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute whitespace-nowrap"
            style={{
              x: sealBgX,
              y: sealBgY,
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: 'clamp(100px, 15vw, 220px)',
              fontWeight: 900,
              color: 'rgba(0,0,0,0.03)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              userSelect: 'none',
              transform: 'rotate(-5deg)',
            }}
          >
            PACTZO DESTINY 2026
          </motion.div>
        </div>

        {/* ── 主舞台 ── */}
        <div className="relative z-10 w-full max-w-[1100px] px-6 md:px-[8%]">
          <div className="flex flex-col md:grid md:grid-cols-[1fr_380px] md:gap-20 md:items-start gap-12">

            {/* 左侧：Typography Overhaul 标题区 */}
            <aside className="md:pt-10">
              <motion.header
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="mb-10 md:mb-20 relative"
              >
                {/* 标题排版艺术 */}
                <div className="relative z-10 pl-2">
                  {/* 第一行：衬线 Bold */}
                  <p
                    className="leading-[1.0] mb-1"
                    style={{
                      fontFamily: "'Noto Serif SC', serif",
                      fontWeight: 700,
                      fontSize: 'clamp(28px, 4vw, 38px)',
                      color: '#1A1A1A',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    保存你的
                  </p>
                  {/* 第二行：非对称组合 — "缘分" 草书 + "卡片" Bold */}
                  <div className="flex items-baseline gap-2 leading-[1.0]">
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        fontWeight: 400,
                        fontStyle: 'italic',
                        fontSize: 'clamp(36px, 5.5vw, 52px)',
                        color: '#1A1A1A',
                        letterSpacing: '-0.02em',
                        opacity: 0.85,
                      }}
                    >
                      缘分
                    </span>
                    <span
                      style={{
                        fontFamily: "'Noto Serif SC', serif",
                        fontWeight: 700,
                        fontSize: 'clamp(28px, 4vw, 38px)',
                        color: '#1A1A1A',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      卡片
                    </span>
                  </div>
                </div>

                <p
                  className="mt-6 text-[13px] leading-relaxed max-w-[280px]"
                  style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", color: '#1A1A1A', opacity: 0.28, letterSpacing: '0.06em' }}
                >
                  将这一份宿命的共鸣封存于档案。分享至广阔的世界，让缘分在此刻定格。
                </p>
              </motion.header>

              {/* 01 / 02 / 03 导航 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              >
                <span
                  className="block italic text-[11px] mb-3"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", color: '#1A1A1A', opacity: 0.28, letterSpacing: '0.15em' }}
                >
                  WHICH DESTINY CALLS TO YOU?
                </span>
                <p
                  className="text-[9px] font-bold mb-6 uppercase"
                  style={{ fontFamily: "'PingFang SC', sans-serif", color: '#1A1A1A', letterSpacing: '0.55em' }}
                >
                  哪一份缘分在指引你？
                </p>
                <nav className="relative flex gap-10 items-start">
                  {([0, 1, 2] as const).map((idx) => {
                    const isActive = selectedPetIndex === idx;
                    const pet = top3[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPetIndex(idx)}
                        className="relative pb-3 text-left transition-all duration-500"
                        style={{ transform: isActive ? 'scale(1.15)' : 'scale(1)', transformOrigin: 'bottom left' }}
                      >
                        <span
                          className="block transition-all duration-500"
                          style={{
                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                            fontStyle: 'italic',
                            fontSize: '20px',
                            fontWeight: 700,
                            color: isActive ? '#1A1A1A' : '#ccc',
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className="block text-[10px] mt-1 transition-all duration-500"
                          style={{
                            fontFamily: "var(--font-inter), 'Inter', sans-serif",
                            fontWeight: 300,
                            color: '#bbb',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(5px)',
                          }}
                        >
                          {pet?.breed.nameEn || '—'}
                        </span>
                      </button>
                    );
                  })}
                  {/* 滑动下划线 */}
                  <motion.div
                    layoutId="seal-underline"
                    className="absolute bottom-0"
                    style={{
                      height: '2px',
                      backgroundColor: '#1A1A1A',
                      width: '48px',
                      left: `${selectedPetIndex * 88}px`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </nav>
              </motion.div>
            </aside>

            {/* 右侧：Godly 卡片区 */}
            <main className="relative">
              <motion.div
                ref={cardRef}
                animate={{ translateY: (selectedPetIndex - 1) * -8 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden"
                style={{
                  x: sealCardX,
                  y: sealCardY,
                  aspectRatio: '3/4.5',
                  width: '100%',
                  maxWidth: '380px',
                  backgroundColor: '#E8EDEB',
                  boxShadow: `
                    0 2px 4px rgba(0,0,0,0.04),
                    0 8px 16px rgba(0,0,0,0.06),
                    0 24px 48px rgba(0,0,0,0.07),
                    0 60px 100px -20px rgba(0,0,0,0.09),
                    inset 0 1px 0 rgba(255,255,255,0.6)
                  `,
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* 纸张肌理噪点 */}
                <div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                    opacity: 0.6,
                  }}
                />

                {/* 双边框装饰 */}
                <div className="absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none z-20" />
                <div className="absolute inset-2 border border-[#1A1A1A]/[0.03] pointer-events-none z-20" />

                {/* 卡片内遮罩描边大字（底部 clip 区域） */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none z-1 overflow-hidden"
                  style={{ height: '40%' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`bg-name-${selectedPetIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden"
                      style={{ height: '100%' }}
                    >
                      <span
                        className="whitespace-nowrap uppercase"
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: 'clamp(48px, 9vw, 72px)',
                          WebkitTextStroke: '0.5px rgba(26,26,26,0.1)',
                          color: 'transparent',
                          letterSpacing: '-0.03em',
                          lineHeight: 0.85,
                          paddingBottom: '8px',
                        }}
                      >
                        {best.breed.nameEn}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 顶部版本号 */}
                <div
                  className="text-[8px] tracking-[0.5em] relative z-10"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.25 }}
                >
                  PACTZO · EDITION_2026
                </div>

                {/* 模糊淡入淡出切换内容 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`seal-card-${selectedPetIndex}`}
                    initial={{ opacity: 0, filter: 'blur(12px)', y: 8 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', y: -8 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col relative z-10"
                    style={{
                      x: sealContentX,
                      y: sealContentY,
                    }}
                  >
                    {/* 宠物名 */}
                    <div className="mt-6">
                      <span
                        className="italic text-[12px] tracking-[0.12em] block mb-2"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", color: '#1A1A1A', opacity: 0.28 }}
                      >
                        {wisdom.english} · {best.breed.nameEn}
                      </span>
                      <h3
                        className="text-[26px] tracking-[0.15em] leading-tight"
                        style={{ fontFamily: "'Noto Serif SC', 'PingFang SC', serif", fontWeight: 700, color: '#1A1A1A' }}
                      >
                        {wisdom.element} · {best.breed.name}
                      </h3>
                    </div>

                    {/* 金句独立凹陷区块 */}
                    <div
                      className="my-8 p-4 relative"
                      style={{
                        backgroundColor: 'rgba(26,26,26,0.03)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(255,255,255,0.5)',
                        borderRadius: '2px',
                      }}
                    >
                      {/* 左侧细线装饰 */}
                      <div className="absolute left-0 top-3 bottom-3 w-px" style={{ backgroundColor: 'rgba(122,46,46,0.2)' }} />
                      <p
                        className="italic text-[15px] leading-snug mb-2 pl-3"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", color: '#1A1A1A', opacity: 0.55 }}
                      >
                        &ldquo;{wisdom.quote}&rdquo;
                      </p>
                      <p
                        className="text-[9px] tracking-[0.25em] pl-3"
                        style={{ fontFamily: "'Noto Serif SC', serif", color: '#1A1A1A', opacity: 0.3 }}
                      >
                        {wisdom.chinese}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 底部匹配分 */}
                <div
                  className="text-[8px] tracking-[0.4em] relative z-10"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.18 }}
                >
                  MATCH_INDEX // {best.scores.total}%
                </div>

                {/* 右上品牌标签 */}
                <div className="absolute top-4 right-4 z-20">
                  <p
                    className="text-[7px] tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", color: '#1A1A1A', opacity: 0.22 }}
                  >
                    百澤
                  </p>
                </div>
              </motion.div>

              {/* 封印按钮 */}
              <motion.button
                onClick={handleSealShare}
                disabled={isGenerating || sharePhase !== 'idle'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                className="mt-8 w-full disabled:opacity-50 transition-all duration-700 relative"
                style={{ padding: '4px', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  const outer = e.currentTarget.querySelector('[data-outer]') as HTMLElement;
                  const inner = e.currentTarget.querySelector('[data-inner]') as HTMLElement;
                  if (outer) outer.style.borderColor = 'rgba(26,26,26,0.22)';
                  if (inner) {
                    inner.style.borderColor = 'rgba(26,26,26,0.12)';
                    inner.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  const outer = e.currentTarget.querySelector('[data-outer]') as HTMLElement;
                  const inner = e.currentTarget.querySelector('[data-inner]') as HTMLElement;
                  if (outer) outer.style.borderColor = 'rgba(26,26,26,0.10)';
                  if (inner) {
                    inner.style.borderColor = 'rgba(26,26,26,0.06)';
                    inner.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                  }
                }}
              >
                {/* 外层边框 */}
                <div
                  data-outer=""
                  className="absolute inset-0 transition-all duration-700"
                  style={{ border: '0.5px solid rgba(26,26,26,0.10)' }}
                />
                {/* 内层：白色背景 + 双层分离内容 */}
                <div
                  data-inner=""
                  className="relative transition-all duration-700"
                  style={{
                    border: '0.5px solid rgba(26,26,26,0.06)',
                    backgroundColor: '#FFFFFF',
                    padding: '20px 24px 18px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* 上行：英文衬线 ghost */}
                  <p
                    className="italic text-center mb-1"
                    style={{
                      fontFamily: "'Times New Roman', 'Source Han Serif CN', serif",
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      color: 'rgba(122,46,46,0.5)',
                    }}
                  >
                    {isGenerating ? 'GENERATING...' : 'Seal the Destiny'}
                  </p>
                  {/* 下行：中文主角 Bold */}
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      letterSpacing: '0.45em',
                      color: '#1A1A1A',
                    }}
                  >
                    {isGenerating ? '生成中...' : '分享此刻'}
                  </p>
                </div>
              </motion.button>
            </main>
          </div>
        </div>
      </section>

      {/* ===== 6. 人宠和谐指南 ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#f5f4f0]">
        <div className="max-w-4xl mx-auto">
          <motion.p className="text-xs tracking-[0.4em] text-[#999] mb-4 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>THE HARMONY GUIDE</motion.p>
          <motion.h2 className="text-2xl md:text-3xl font-extralight text-[#2a2a2a] mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            人宠和谐指南
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div className="p-6 border border-[#e5e3dd] text-center bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">LUCKY COLOR</p>
              <p className="text-lg font-light mb-4">幸运色</p>
              <div className="flex justify-center gap-2 mb-4">{harmony.luckyColors.map((c, i) => <span key={i} className="text-sm text-[#666]">{c}</span>)}</div>
              <div className="flex justify-center gap-2">{harmony.luckyColorsEn.map((c, i) => <span key={i} className="text-xs text-[#999]">{c}</span>)}</div>
            </motion.div>
            <motion.div className="p-6 border border-[#e5e3dd] text-center bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">FORTUNATE DIRECTION</p>
              <p className="text-lg font-light mb-4">吉位</p>
              <p className="text-sm text-[#666] mb-2">{harmony.direction}</p>
              <p className="text-xs text-[#999]">{harmony.directionEn}</p>
            </motion.div>
            <motion.div className="p-6 border border-[#e5e3dd] text-center bg-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-xs tracking-[0.2em] text-[#999] mb-2">VIBE SYNC</p>
              <p className="text-lg font-light mb-4">性格共振</p>
              <p className="text-sm italic text-[#666] mb-2">&ldquo;{harmony.vibeQuote}&rdquo;</p>
              <p className="text-xs text-[#999]">{harmony.vibeChinese}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 7. Newsletter ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#1A2E2A]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p className="text-xs tracking-[0.4em] text-white/50 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>SPIRIT & PET MONTHLY</motion.p>
          <motion.h2 className="text-2xl md:text-3xl font-extralight text-white mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>灵宠月刊</motion.h2>
          <motion.p className="text-sm text-white/60 mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>每月一封，关于你和它的命理指南</motion.p>
          <motion.form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40" required />
            <button type="submit" className="px-6 py-3 bg-white text-[#3a4d42] text-sm tracking-[0.15em] hover:bg-white/90 transition-colors">
              {subscribed ? '已订阅' : '开启缘分追踪'}
            </button>
          </motion.form>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-12 px-6 md:px-12 bg-[#F6F5F2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-[0.3em]" style={{ color: 'rgba(26,26,26,0.4)' }}>百澤 Pactzo</p>
          <p className="text-xs tracking-[0.1em]" style={{ color: 'rgba(26,26,26,0.25)' }}>测试结果仅供参考</p>
        </div>
      </footer>

      {/* ===== 隐藏的分享卡 DOM（html2canvas 截图源）===== */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        <div
          ref={shareCardRef}
          style={{
            width: '750px',
            height: '1050px',
            backgroundColor: '#f5f4f0',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 56px',
            fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          {/* 极淡噪点纹理 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          />
          {/* 顶部高光（立体感）*/}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* 底部阴影暗角 */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.04) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* 内边框 */}
          <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(0,0,0,0.07)', pointerEvents: 'none' }} />

          {/* 顶部双栏 */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', letterSpacing: '0.35em', color: '#8B7355', fontWeight: 700 }}>
              A DESTINY SEALED
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', letterSpacing: '0.35em', color: '#8B7355', fontWeight: 700 }}>
              BAIZE PACTZO
            </p>
          </div>

          {/* 中间核心 */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* 编号 + 英文名 */}
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', letterSpacing: '0.25em', color: '#8B7355', fontWeight: 700, marginBottom: '14px' }}>
              {generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id).replace('#', 'NO. ')} / {best.breed.nameEn?.toUpperCase()}
            </p>

            {/* 中文宠物名 */}
            <p style={{ fontSize: '68px', fontWeight: 700, color: '#1A2E2A', letterSpacing: '0.12em', lineHeight: 1.1, marginBottom: '40px', fontFamily: "'Noto Serif SC', serif" }}>
              {best.breed.name}
            </p>

            {/* 匹配分数 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '40px' }}>
              <span style={{ fontFamily: "'Times New Roman', serif", fontSize: '56px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{best.scores.total}%</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', letterSpacing: '0.25em', color: '#888', fontWeight: 700 }}>SOUL CONNECTION</span>
            </div>

            {/* 分割线 */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: '32px' }} />

            {/* 情感金句 */}
            <p style={{ fontFamily: "'Noto Serif SC', 'Times New Roman', serif", fontSize: '18px', lineHeight: 2, color: '#3a3a3a', maxWidth: '540px' }}>
              {best.emotionalSummary}
            </p>
          </div>

          {/* 底部 */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.15em', color: '#999', fontWeight: 700 }}>
                {RARITY_LABEL[getRarityLevel(best.breed.category)].en}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.2em', color: '#999', fontWeight: 700 }}>pactzo.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ShareOverlay · Godly 仪式感覆盖层 ===== */}
      <AnimatePresence>
        {sharePhase !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backdropFilter: 'blur(24px)', backgroundColor: 'rgba(0,0,0,0.35)' }}
            onClick={(e) => { if (e.target === e.currentTarget) closeShareOverlay(); }}
          >
            {/* 关闭 */}
            <button
              onClick={closeShareOverlay}
              className="absolute top-6 right-6 z-[110] text-white/30 hover:text-white/70 transition-colors"
              style={{ fontFamily: "'Times New Roman', serif", fontSize: '22px', fontStyle: 'italic', lineHeight: 1 }}
            >
              ×
            </button>

            {/* 中央内容 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center text-center px-6"
              style={{ maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'none' }}
            >
              {/* 顶部仪式标签 */}
              <p
                className="mb-8 tracking-[0.4em] uppercase"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.4em',
                }}
              >
                A Destiny Sealed
              </p>

              {/* ── 卡片主角 ── */}
              <motion.div
                animate={{
                  boxShadow: (sharePhase === 'glowing' || sharePhase === 'card-ready')
                    ? '0 0 60px rgba(255,255,255,0.12), 0 0 120px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)'
                    : '0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.35)',
                }}
                transition={{ duration: 1 }}
                style={{
                  borderRadius: '2px',
                  outline: '1px solid rgba(255,255,255,0.08)',
                  outlineOffset: '0px',
                }}
              >
                {shareCardUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={shareCardUrl}
                    alt="Destiny Card"
                    style={{
                      width: '380px',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                  />
                ) : (
                  /* 动画阶段预览卡 */
                  <div style={{
                    width: '380px',
                    padding: '1px',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent)',
                    borderRadius: '4px',
                  }}>
                    <div style={{
                      padding: '36px 24px',
                      background: '#f5f4f0',
                      borderRadius: '3px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.3em', color: '#8B7355' }}>
                          A DESTINY SEALED
                        </p>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '0.3em', color: '#8B7355' }}>
                          BAIZE PACTZO
                        </p>
                      </div>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#8B7355', marginBottom: '6px' }}>
                        {best.breed.nameEn?.toUpperCase()}
                      </p>
                      <p style={{ fontFamily: "'Noto Serif SC', serif", fontSize: '28px', fontWeight: 700, color: '#1A2E2A', letterSpacing: '0.1em', marginBottom: '16px' }}>
                        {best.breed.name}
                      </p>
                      <p style={{ fontFamily: "'Times New Roman', serif", fontSize: '24px', color: '#1A1A1A', marginBottom: '16px' }}>
                        {best.scores.total}%
                      </p>
                      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.06)', marginBottom: '16px' }} />
                      <p style={{ fontFamily: "'Noto Serif SC', serif", fontSize: '11px', color: '#4a4a4a', lineHeight: 1.8 }}>
                        {wisdom.quote}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* ── 阶段过渡文字 ── */}
              <AnimatePresence mode="wait">
                {(sharePhase === 'summoning' || sharePhase === 'quoting' || sharePhase === 'glowing') && !shareCardUrl && (
                  <motion.p
                    key="ritual-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 tracking-[0.2em]"
                    style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {sharePhase === 'summoning' && 'Summoning your destiny...'}
                    {sharePhase === 'quoting' && 'Recording the bond...'}
                    {sharePhase === 'glowing' && 'Sealing the moment...'}
                  </motion.p>
                )}
                {sharePhase === 'card-ready' && !shareCardUrl && (
                  <motion.p
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="mt-6"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}
                  >
                    GENERATING...
                  </motion.p>
                )}
              </AnimatePresence>

              {/* ── 操作区（仅 card-ready 后显示）── */}
              <AnimatePresence>
                {sharePhase === 'card-ready' && shareCardUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center mt-8 w-full"
                    style={{ maxWidth: '280px' }}
                  >
                    {/* 主按钮：保存图片 */}
                    <button
                      onClick={handleDownloadCard}
                      className="w-full py-3 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)]"
                      style={{
                        fontFamily: "'PingFang SC', 'Hiragino Sans GB', serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        letterSpacing: '0.3em',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)',
                      }}
                    >
                      保存图片
                    </button>

                    {/* 社媒极简入口 */}
                    {(() => {
                      const destinyId = generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id);
                      const rarity = RARITY_LABEL[getRarityLevel(best.breed.category)].cn;
                      // 小红书/微博 中文富文案
                      const shareTextFull = `【百澤灵宠匹配】五行缘分测试 ✨\n\n我的命定灵宠是 ${wisdom.element}行 · ${best.breed.name}\n契合度 ${best.scores.total}% · ${rarity}\n\n"${best.emotionalSummary}"\n\n${wisdom.chinese}\n\n测出你的灵宠 → pactzo.com\n\n#百澤 #宠物匹配 #五行缘分 #${best.breed.name} #灵宠`;
                      // X 推文简版（字数限制）
                      const shareTextX = `${wisdom.element} · ${best.breed.name} — ${best.scores.total}% soul match\n"${best.emotionalSummary.slice(0, 50)}..."\n\npactzo.com`;
                      const u = encodeURIComponent('https://pactzo.com');
                      const tX = encodeURIComponent(shareTextX);
                      const tWeibo = encodeURIComponent(shareTextFull);
                      return (
                        <div className="mt-4 flex gap-6" style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)' }}>
                          <a href={`https://twitter.com/intent/tweet?text=${tX}&url=${u}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors cursor-pointer">X</a>
                          <a href={`https://service.weibo.com/share/share.php?title=${tWeibo}&url=${u}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors cursor-pointer">Weibo</a>
                          <span
                            className="hover:text-white/60 transition-colors cursor-pointer"
                            onClick={() => handleCopyText(shareTextFull, 1)}
                          >
                            {copiedIndex === 1 ? 'Copied ✓' : 'Copy'}
                          </span>
                        </div>
                      );
                    })()}

                    {/* 缘分编号 + 稀有度 */}
                    <div className="mt-5 flex items-center gap-3">
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}>
                        {generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id)}
                      </span>
                      <span
                        className="px-2 py-0.5"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          color: getRarityLevel(best.breed.category) === 'LEGENDARY' ? '#c9a87c' : 'rgba(255,255,255,0.7)',
                          border: `0.5px solid ${getRarityLevel(best.breed.category) === 'LEGENDARY' ? 'rgba(201,168,124,0.4)' : 'rgba(255,255,255,0.35)'}`,
                        }}
                      >
                        {RARITY_LABEL[getRarityLevel(best.breed.category)].en}
                      </span>
                    </div>

                    {/* 仪式落款 */}
                    <p
                      className="mt-6 mb-2"
                      style={{
                        fontFamily: "'Times New Roman', serif",
                        fontStyle: 'italic',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Your destiny is now recorded
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
