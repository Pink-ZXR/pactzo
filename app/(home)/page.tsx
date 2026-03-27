'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from '@/components/hero';
import { useBreath, mapBreath } from '@/hooks/useBreath';

// 注册 GSAP 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 百澤 BAIZE - 极简风格首页
 * 
 * Maison Margiela 风格 + 莫兰迪森林绿
 * - 大量留白
 * - 细体字体 + 大字间距
 * - 全屏区块
 */

/**
 * ScrollHint - 呼吸节奏统一的滚动提示
 * 
 * 呼吸节奏：
 * - phase: 0.6（中等滞后）
 * - translateY: 0px → 4px（轻微下沉）
 * - opacity: 0.3 → 0.6（呼吸显现）
 */
function ScrollHint() {
  const breath = useBreath(7000, 0.6); // 7秒周期，中等滞后相位

  // 呼吸值映射
  const breathY = mapBreath(breath, 0, 4);       // 0px → 4px 下沉
  const breathOpacity = mapBreath(breath, 0.6, 0.9); // 0.6 → 0.9 显现

  return (
    <motion.a
      href="/questionnaire/birthday"
      className="mt-16 group relative flex flex-col items-center scroll-hint-anchor"
      whileHover={{ y: 3 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: `translateY(${breathY}px)`,
        opacity: breathOpacity
      }}
    >
      {/* 文字 */}
      <span 
        className="text-[10px] tracking-[0.12em] uppercase mb-4"
        style={{
          color: 'rgba(20, 40, 30, 0.85)',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >开始探索</span>

      {/* 竖线 - 流光动画保留 */}
      <div className="relative w-px h-12 bg-[#1A2E2A]/20 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[#1A2E2A]"
          animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 箭头 - 呼吸节奏浮动 */}
      <motion.span
        className="text-lg text-[#1A2E2A] mt-2"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓
      </motion.span>
    </motion.a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);

  // Hero 鼠标视差
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 40 });
  const farX = useTransform(springX, [-500, 500], [-15, 15]);
  const farY = useTransform(springY, [-500, 500], [-10, 10]);
  const mainX = useTransform(springX, [-500, 500], [-8, 8]);
  const mainY = useTransform(springY, [-500, 500], [-5, 5]);
  const titleXMouse = useTransform(springX, [-500, 500], [-3, 3]);
  const titleYMouse = useTransform(springY, [-500, 500], [-2, 2]);

  // Hero 滚动进度
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const titleYScroll = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const beastScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(
    [titleYMouse, titleYScroll],
    ([mouse, scroll]) => (mouse as number) + (scroll as number)
  );

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  // ═══════════════════════════════════════════════════════════════
  // 四维匹配体系 - GSAP ScrollTrigger refs
  // ═══════════════════════════════════════════════════════════════
  const dimensionsSectionRef = useRef<HTMLElement>(null);
  const dimensionItem1Ref = useRef<HTMLDivElement>(null);
  const dimensionItem2Ref = useRef<HTMLDivElement>(null);
  const dimensionItem3Ref = useRef<HTMLDivElement>(null);
  const dimensionItem4Ref = useRef<HTMLDivElement>(null);
  const dimensionLine1Ref = useRef<HTMLDivElement>(null);
  const dimensionLine2Ref = useRef<HTMLDivElement>(null);
  const dimensionLine3Ref = useRef<HTMLDivElement>(null);
  const dimensionLine4Ref = useRef<HTMLDivElement>(null);
  


  // Lenis 丝滑滚动初始化（与 GSAP ticker 联动）
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);



  // ═══════════════════════════════════════════════════════════════
  // 四维匹配体系 - GSAP ScrollTrigger 动效
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    // 确保元素初始隐藏，避免 SSR 闪烁
    const items = [
      dimensionItem1Ref.current,
      dimensionItem2Ref.current,
      dimensionItem3Ref.current,
      dimensionItem4Ref.current,
    ];
    items.forEach(item => {
      if (item) gsap.set(item, { opacity: 0, y: 60 });
    });

    const ctx = gsap.context(() => {
      // 四个维度的独立 ScrollTrigger 配置
      const dimensions = [
        { item: dimensionItem1Ref.current, line: dimensionLine1Ref.current },
        { item: dimensionItem2Ref.current, line: dimensionLine2Ref.current },
        { item: dimensionItem3Ref.current, line: dimensionLine3Ref.current },
        { item: dimensionItem4Ref.current, line: dimensionLine4Ref.current },
      ];

      dimensions.forEach(({ item, line }, index) => {
        if (!item) return;

        // 创建时间线，绑定 ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        // 内容入场动画 - 从下往上浮现
        tl.to(item, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.08,
        });

        // 分割线宽度从0%到100%
        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.6'
          );
        }
      });
    }, dimensionsSectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <>
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] font-light text-[var(--foreground)]">
            百澤
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xs tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* 全屏菜单 */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-[var(--background)] flex items-center justify-center"
        >
          <nav className="text-center space-y-8">
            {['Begin', 'About', 'Method'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={item === 'Begin' ? '/questionnaire/birthday' : item === 'About' ? '/about' : '/method'}
                  className="block text-4xl md:text-6xl font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}

      {/* ═════ Hero Section - 新 Hero 组件方案 ═════ */}
      <div ref={heroSectionRef} onMouseMove={handleHeroMouseMove} className="relative">
        <Hero>
          <div className="relative w-full h-full">
            {/* 中层主体 - 神兽登场（外层入场，内层视差） */}
            <div className="hero-beast-main absolute z-[5] w-full h-full pointer-events-none">
              <motion.div
                style={{ x: mainX, y: mainY, scale: beastScale }}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-[70vw]" style={{ transform: 'translateY(5%)' }}>
                  <Image
                    src="/illustrations/hero/baize-gold-new.png"
                    alt="Main Beast"
                    width={1400}
                    height={1000}
                    className="w-full h-auto"
                    style={{
                      filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.06))',
                      maskImage: 'radial-gradient(ellipse 70% 80% at 45% 50%, black 50%, transparent 85%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 45% 50%, black 50%, transparent 85%)',
                    }}
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* 前景标题 */}
            <motion.div
              className="hero-title absolute z-[10] flex flex-col items-center justify-center pointer-events-none"
              style={{ x: titleXMouse, y: titleY, scale: titleScale, opacity: titleOpacity, right: '12%', bottom: '22%' }}
            >
              <div className="text-center mb-8 hero-subtitle">
                <p className="font-serif tracking-[0.2em] text-[#1A2E2A] text-xs mb-2">洞察万物生息</p>
                <p className="font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px] mb-1">基于东方五行智慧的灵宠匹配</p>
                <p className="font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px]">为你推荐最合适的陪伴</p>
              </div>

              <div className="hero-title-text">
                <motion.h1
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-black m-0"
                  style={{
                    fontFamily: '"Noto Serif SC", serif',
                    fontSize: 'clamp(80px, 10vw, 140px)',
                    color: '#1A2E2A',
                    letterSpacing: '-0.02em',
                    lineHeight: 0.9,
                    textShadow: '0 4px 30px rgba(242, 240, 235, 0.8)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  百 澤
                </motion.h1>
              </div>

              <div className="hero-scroll-hint">
                <ScrollHint />
              </div>
            </motion.div>
          </div>
        </Hero>
      </div>

      {/* 入场动画样式 */}
      <style jsx>{`
        .hero-beast-main {
          animation: beastEnter 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        @keyframes beastEnter {
          0% { 
            opacity: 0; 
            filter: blur(10px);
            transform: scale(0.95) translateY(20px);
          }
          50% {
            opacity: 0.8;
            filter: blur(3px);
          }
          100% { 
            opacity: 1; 
            filter: blur(0);
            transform: scale(1) translateY(0);
          }
        }
        .hero-title-text {
          animation: titleReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
        @keyframes titleReveal {
          0% { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
            letter-spacing: 0.15em;
            filter: blur(4px);
          }
          40% {
            opacity: 0.6;
            filter: blur(2px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
            letter-spacing: -0.02em;
            filter: blur(0);
          }
        }
        .hero-subtitle {
          animation: subtitleFade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1.3s;
          opacity: 0;
        }
        @keyframes subtitleFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-scroll-hint {
          animation: hintEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1.8s;
          opacity: 0;
        }
        @keyframes hintEnter {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .hero-beast-far {
          animation: beastFarEnter 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        @keyframes beastFarEnter {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }
        /* 东方古典美学标题 - 神性显现 */
        .godly-title {
          /* 1. 思源宋体系列 */
          font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
          
          /* 2. 核心：极大的字间距 */
          letter-spacing: 0.5em;
          
          /* 3. 深沉墨灰色，非纯黑 */
          color: #2D2926;
          
          /* 4. 微弱神性光晕，呼应背景 */
          text-shadow: 0 0 15px rgba(242, 240, 235, 0.8);
          
          /* 5. 细体高级感 */
          font-weight: 300;
          
          /* 6. 从模糊到清晰的神性显现 */
          animation: grainReveal 3s ease-out forwards;
        }
        
        @keyframes grainReveal {
          0% { 
            filter: blur(10px); 
            opacity: 0; 
            transform: scale(1.05);
          }
          100% { 
            filter: blur(0); 
            opacity: 1; 
            transform: scale(1);
          }
        }
      `}</style>

      {/* ═════════════════════════════════════════════════════════════
          四维匹配体系 - Godly风格门户粘性布局
          左栏：粘性标题区 (4列) | 右栏：滚动内容区 (8列)
          ═════════════════════════════════════════════════════════════ */}
      <section ref={dimensionsSectionRef} className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* 大屏：4:8 栅格布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* ═══ 左侧：粘性标题区 (4列) ═══ */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-[33vh]">
                {/* 神兽图标 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[var(--sand)] mb-8"
                >
                  <Image
                    src="/pets/cat-ink.png"
                    alt="百澤"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
                
                {/* 英文小标题 */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xs tracking-[0.4em] text-[var(--text-muted)] mb-4 font-en uppercase"
                >
                  Our Method
                </motion.p>
                
                {/* 主标题 */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.06em] text-[var(--foreground)] leading-tight"
                >
                  四维
                  <br />
                  匹配体系
                </motion.h2>
                
                {/* 装饰线 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-px bg-[var(--accent)] mt-8 origin-left"
                />
              </div>
            </div>
            
            {/* ═══ 右侧：滚动内容区 (8列) ═══ */}
            <div className="lg:col-span-8 relative">
              <div className="space-y-32 lg:space-y-40">
                
                {/* 01 WUXING */}
                <div ref={dimensionItem1Ref} className="relative group text-left">
                  {/* ═══ 顶部分割线 - 杂志排版感 ═══ */}
                  <div className="w-full h-px bg-gray-200/40 mb-12" />
                  
                  {/* ═══ 数字水印 - 极大无衬线细体 ═══ */}
                    <span 
                      className="absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      01
                    </span>

                  
                  {/* 内容容器 - 左对齐杂志排版 */}
                  <div className="relative pt-12 pl-6 md:pl-12">
                    {/* ═══ 英文标题 - 极度夸张放大 ═══ */}
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2">
                      WUXING
                    </h3>
                    
                    {/* ═══ 中文副标题 - 紧贴放大 ═══ */}
                    <p className="text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8">
                      五行契合
                    </p>
                    
                    {/* ═══ 极细分割线 - GSAP动画目标 ═══ */}
                    <div ref={dimensionLine1Ref} className="h-px bg-gray-400/60 w-32 mb-8 origin-left" />
                    
                    {/* 描述文字 */}
                    <p className="text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500">
                      根据你的出生日期推算五行属性，从命理层面解读你与宠物的能量契合。金木水火土，万物皆有归属。
                    </p>
                  </div>
                </div>

                {/* 02 TIANSHI */}
                <div ref={dimensionItem2Ref} className="relative group text-left">
                  <div className="w-full h-px bg-gray-200/40 mb-12" />
                  <span 
                    className="absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    02
                  </span>
                  <div className="relative pt-12 pl-6 md:pl-12">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2">
                      TIANSHI
                    </h3>
                    <p className="text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8">
                      天时相应
                    </p>
                    <div ref={dimensionLine2Ref} className="h-px bg-gray-400/60 w-32 mb-8 origin-left" />
                    <p className="text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500">
                      分析你的作息习惯与精力状态，找到与你生活节奏同频的宠物伙伴。时间的韵律，是相处的基础。
                    </p>
                  </div>
                </div>

                {/* 03 DILI */}
                <div ref={dimensionItem3Ref} className="relative group text-left">
                  <div className="w-full h-px bg-gray-200/40 mb-12" />
                  <span 
                    className="absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    03
                  </span>

                  <div className="relative pt-12 pl-6 md:pl-12">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2">
                      DILI
                    </h3>
                    <p className="text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8">
                      地利相宜
                    </p>
                    <div ref={dimensionLine3Ref} className="h-px bg-gray-400/60 w-32 mb-8 origin-left" />
                    <p className="text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500">
                      考量你的居住空间与环境稳定性，匹配最适应你生活场景的宠物。空间的边界，是舒适的起点。
                    </p>
                  </div>
                </div>

                {/* 04 RENHE */}
                <div ref={dimensionItem4Ref} className="relative group text-left">
                  <div className="w-full h-px bg-gray-200/40 mb-12" />
                  <span 
                    className="absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    04
                  </span>

                  <div className="relative pt-12 pl-6 md:pl-12">
                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2">
                      RENHE
                    </h3>
                    <p className="text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8">
                      人和缘定
                    </p>
                    <div ref={dimensionLine4Ref} className="h-px bg-gray-400/60 w-32 mb-8 origin-left" />
                    <p className="text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500">
                      洞察你的陪伴需求与情感期待，寻找与你灵魂契合的命定之宠。关系的本质，是彼此的成全。
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          你的契合之选 - 白玉牌效果重构
          暖灰底色隔离 + 纯白方块 + 垂直居中放大 + 强烈悬停动效
          ═════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-[#F9F8F6] relative">
        <div className="max-w-7xl mx-auto relative">
          {/* 区块标题 - 东方古典美学 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="godly-title text-3xl md:text-4xl lg:text-5xl">
              你的契合之选
            </h2>
          </motion.div>

          {/* ═══ 宠物全家福插画 - 视差滚动 + 呼吸节奏 ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full overflow-hidden rounded-lg"
            style={{
              // 视差滚动：以 0.8 速度跟随，创造空间深度
              transform: "translateZ(0)",
            }}
          >
            {/* 图片容器 - 呼吸缩放效果 */}
            <motion.div
              className="relative w-full"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/illustrations/pets-family-gathering.jpg"
                alt="宠物全家福"
                width={1400}
                height={933}
                className="w-full h-auto"
                priority
              />
              {/* 底部渐变遮罩 - 与背景融合 */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #F9F8F6 0%, transparent 100%)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 品牌介绍 */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm md:text-base font-light leading-loose text-[var(--text-secondary)] tracking-wide">
              百澤相信，人与宠物的相遇并非偶然。
              <br /><br />
              我们将东方五行智慧与现代算法相结合，
              <br />
              通过<span className="text-[var(--primary)] font-medium">天时、地利、人和</span>三重维度，
              <br />
              为你寻找命中注定的伴侣。
              <br /><br />
              <span className="text-xs tracking-[0.2em] text-[var(--warm-gray)]">
                BAIZE — WHERE DESTINY MEETS COMPANIONSHIP
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA 区块 - Maison Margiela 分屏排版 */}
      <section className="py-24 md:py-32 bg-[var(--background)] relative">
        {/* 第一行：左图右文 */}
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* 左侧图片 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--background-alt)]"
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full max-w-sm">
                <Image
                  src="/pets/cat-ink.png"
                  alt="百澤"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
          {/* 右侧文字 */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-sm text-center"
            >
              <p className="text-sm italic text-[var(--text-secondary)] mb-6">Pactzo / begin</p>
              <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                我们相信，每一只宠物都是命中注定的相遇。通过四维匹配体系，从五行、天时、地利、人和四个维度，为你寻找最契合的灵魂伴侣。
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                仅需 2 分钟，开启你的缘分之旅。
              </p>
            </motion.div>
          </div>
        </div>

        {/* 第二行：左文右图 */}
        <div className="flex flex-col md:flex-row-reverse min-h-[60vh]">
          {/* 右侧图片 - 猫咪 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--primary)] overflow-hidden"
          >
            {/* 装饰边框线 */}
            <div className="absolute inset-8 border border-white/10 pointer-events-none" />
            <div className="absolute inset-12 border border-white/5 pointer-events-none" />
            
            {/* 四角装饰 */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />

            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                {/* 复古插画边框 */}
                <div className="absolute -inset-4 border-2 border-white/20 rounded-full" />
                <div className="absolute -inset-8 border border-white/10 rounded-full" />
                {/* 装饰虚线 */}
                <div className="absolute -inset-12 border border-dashed border-white/5 rounded-full" />
                
                {/* 图片容器 */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--primary-dark)]/50">
                  <Image
                    src="/pets/dog-white.png"
                    alt="宠物"
                    fill
                    className="object-contain scale-110"
                  />
                  {/* 边缘柔化渐变 */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(42,56,50,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>
          {/* 左侧文字 */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-sm text-center"
            >
              <p className="text-sm italic text-[var(--text-secondary)] mb-6">Destiny / awaits</p>
              <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                百澤，通万物之情，知鬼神之事。我们以百澤为名，愿成为连接你与命定之宠的桥梁。
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
                每一次匹配，都是一段新故事的开始。
              </p>
              <Link href="/questionnaire/birthday" className="group/cta relative inline-block px-10 py-4 transition-all duration-500 hover:translate-y-[-2px]">
                {/* 双层边框 - 外层深绿 + 内层浅色 */}
                <span className="absolute inset-0 border-2 border-[#1A2E2A] bg-[#1A2E2A] transition-all duration-500" />
                <span className="absolute inset-[5px] border border-white/40 transition-all duration-500 group-hover/cta:border-white/55" />
                {/* 悬停底部阴影 */}
                <span className="absolute -bottom-2 -right-2 w-full h-full bg-[#1A2E2A]/10 -z-10 transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:translate-y-1" />
                <span className="relative text-xs tracking-[0.3em] uppercase text-white font-medium">
                  Start Journey
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 px-6 md:px-12 border-t border-[var(--sand)] relative"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">
            百澤 PACTZO &copy; 2026
          </p>
          <p className="text-xs tracking-[0.1em] text-[var(--text-muted)]">
            测试结果仅供参考，选择宠物请结合实际情况
          </p>
        </div>
      </motion.footer>
    </main>
    </>
  );
}
