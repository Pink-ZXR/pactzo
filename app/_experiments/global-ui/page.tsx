'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 测试页专用 - 从主版本复制并隔离
// 全局UI调整实验版本

gsap.registerPlugin(ScrollTrigger);

/**
 * 百澤 BAIZE - 全局UI调整测试页
 * 
 * 实验内容：
 * - 调整整体色彩系统
 * - 优化间距与留白
 * - 改进排版层次
 * - 增强交互反馈
 */

// Hero Section 专用样式
const heroStyles = `
  @keyframes scroll-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  @keyframes scroll-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(0.8); opacity: 0.6; }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  .animate-scroll-line {
    animation: scroll-line 2s ease-in-out infinite;
  }
  .animate-pulse-dot {
    animation: pulse-dot 2s ease-in-out infinite;
  }
  .animate-pulse-ring {
    animation: pulse-ring 2s ease-out infinite;
  }
  .animate-scroll-float {
    animation: scroll-float 1.6s ease-in-out infinite;
  }
`;

export default function GlobalUITest() {
  const [menuOpen, setMenuOpen] = useState(false);
  
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
  
  // 七种命定网格容器 ref
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  const categoryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Hero Section refs
  const heroRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const baizeRef = useRef<HTMLDivElement>(null);
  const baizeHeadRef = useRef<HTMLDivElement>(null);
  const baizeGhostRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Hero Section GSAP 动效
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero区滚动动画
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 标题缩小淡出
      heroTl.to(titlesRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -100,
        ease: 'none',
      });

      // 神兽层随滚动淡出
      heroTl.to(baizeRef.current, { y: -150, opacity: 0, ease: 'none' }, 0);
      heroTl.to(baizeGhostRef.current, { y: -100, opacity: 0, ease: 'none' }, 0);
      heroTl.to(baizeHeadRef.current, { y: -120, opacity: 0, ease: 'none' }, 0);
      heroTl.to(glowRef.current, { opacity: 0, ease: 'none' }, 0);

      // 背景水印反向移动
      heroTl.to(watermarkRef.current, { y: 200, opacity: 0.02, ease: 'none' }, 0);
    }, heroRef);

    // 入场动效
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(baizeGhostRef.current, { opacity: 0, x: 80 }, { opacity: 0.16, x: 0, duration: 3, ease: 'power2.out' })
      .fromTo(baizeRef.current, { opacity: 0, x: 100 }, { opacity: 0.35, x: 0, duration: 2.5, ease: 'power3.out' }, '-=2.5')
      .fromTo(baizeHeadRef.current, { opacity: 0, scale: 0.95 }, { opacity: 0.4, scale: 1, duration: 2, ease: 'power2.out' }, '-=2')
      .fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power1.inOut' }, '-=1.8')
      .fromTo('.hero-title-char', { y: 40, opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1.2, ease: 'expo.out' }, '-=1.2')
      .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 0.7, duration: 0.8, ease: 'power2.out' }, '-=0.8')
      .fromTo('.hero-label', { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, '-=0.6')
      .fromTo('.hero-scroll', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    // 鼠标视差
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(titlesRef.current, { x: x * 40, y: y * 30, rotateY: x * 8, rotateX: -y * 8, duration: 1.5, ease: 'power2.out' });
      gsap.to(watermarkRef.current, { x: -x * 80, y: -y * 40, duration: 2, ease: 'power1.out' });
      gsap.to(baizeRef.current, { x: -x * 60, y: -y * 40, duration: 2.5, ease: 'power2.out' });
      gsap.to(baizeGhostRef.current, { x: -x * 30, y: -y * 20, duration: 3, ease: 'power1.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
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

  // ═══════════════════════════════════════════════════════════════
  // 七种命定 - GSAP ScrollTrigger 滚动入场动画
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    // 初始隐藏所有方块
    categoryItemsRef.current.forEach(item => {
      if (item) gsap.set(item, { opacity: 0, y: 40, scale: 0.95 });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: categoriesGridRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(categoryItemsRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{heroStyles}</style>
      {/* 测试页标识 */}
      <div className="fixed top-20 left-0 z-[100] bg-[var(--accent)] text-white text-[10px] px-3 py-1 tracking-widest">
        GLOBAL UI TEST
      </div>
      
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm">
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
                  href={item === 'Begin' ? '/questionnaire/birthday' : '#'}
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

      {/* Hero Section - 五层视觉结构 */}
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#F2F0EB' }}
      >
        {/* ═══ Layer 1: 背景底色层 ═══ */}
        {/* 由父容器 backgroundColor 提供 */}

        {/* ═══ Layer 2: 超低透明度品牌字母背景 ═══ */}
        <div
          ref={watermarkRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ zIndex: 2 }}
        >
          <div
            className="font-black uppercase whitespace-nowrap"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(200px, 28vw, 400px)',
              color: '#1A2E2A',
              letterSpacing: '0.02em',
              opacity: 0.05,
              transform: 'scaleX(1.2)',
            }}
          >
            PACTZO
          </div>
        </div>

        {/* ═══ Layer 3: 空气氛围渐变层 ═══ */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #F2F0EB 0%, #F2F0EB 40%, transparent 100%)',
            zIndex: 3,
          }}
        />

        {/* ═══ Layer 4: 神兽插画层 ═══ */}
        {/* 4a: 幻影神兽（背景灵影） */}
        <div
          ref={baizeGhostRef}
          className="absolute pointer-events-none"
          style={{
            width: '85vw',
            height: '95vh',
            right: '2vw',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            opacity: 0,
            mixBlendMode: 'multiply',
            maskImage: 'radial-gradient(ellipse 80% 80% at 65% 45%, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 65% 45%, black 30%, transparent 70%)',
          }}
        >
          <Image
            src="/illustrations/hero/baize-gold.jpg"
            alt="白泽幻影"
            fill
            className="object-contain object-right"
            style={{
              filter: 'contrast(0.75) brightness(1.15) saturate(0.85) blur(15px)',
            }}
            priority
          />
        </div>

        {/* 4b: 主神兽（前景清晰层） */}
        <div
          ref={baizeRef}
          className="absolute pointer-events-none"
          style={{
            width: '80vw',
            height: '90vh',
            right: '-5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 5,
            opacity: 0,
            mixBlendMode: 'multiply',
            maskImage: 'linear-gradient(to left, black 40%, transparent 85%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 85%), linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskComposite: 'intersect' as any,
            WebkitMaskComposite: 'destination-in' as any,
          }}
        >
          <Image
            src="/illustrations/hero/baize-gold.jpg"
            alt="白泽神兽"
            fill
            className="object-contain object-right"
            style={{
              filter: 'contrast(0.94) brightness(1.03) saturate(0.95)',
            }}
            priority
          />
        </div>

        {/* 4c: 头部清晰聚焦层（景深） */}
        <div
          ref={baizeHeadRef}
          className="absolute pointer-events-none"
          style={{
            width: '40vw',
            height: '55vh',
            right: '5vw',
            top: '20%',
            zIndex: 6,
            opacity: 0,
            mixBlendMode: 'multiply',
            maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 65%)',
          }}
        >
          <Image
            src="/illustrations/hero/baize-gold.jpg"
            alt="白泽神兽头部"
            fill
            className="object-contain object-right"
            style={{
              filter: 'contrast(0.88) brightness(1.05) saturate(0.95)',
              objectPosition: '80% 30%',
            }}
            priority
          />
        </div>

        {/* 4d: 空气光晕（神兽头部柔光） */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: '35vw',
            height: '40vh',
            right: '8vw',
            top: '15%',
            zIndex: 7,
            opacity: 0,
            background: 'radial-gradient(ellipse at center, rgba(246, 243, 234, 0.07) 0%, transparent 70%)',
          }}
        />

        {/* ═══ Layer 5: 标题与文字层 ═══ */}
        {/* 四角标签 */}
        <div
          className="hero-label absolute text-[11px] uppercase"
          style={{
            top: '50px',
            left: '50px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.4em',
            color: '#1A2E2A',
            zIndex: 50,
          }}
        >
          Spirit of Mountains
        </div>
        <div
          className="hero-label absolute text-[11px] uppercase"
          style={{
            top: '50px',
            right: '50px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.4em',
            color: '#1A2E2A',
            zIndex: 50,
          }}
        >
          Pactzo Archive
        </div>

        {/* 核心标题 */}
        <div
          ref={titlesRef}
          className="absolute text-center"
          style={{
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <p
            className="hero-subtitle mb-4"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: '13px',
              letterSpacing: '0.15em',
              opacity: 0,
              color: '#1A2E2A',
              lineHeight: 1.8,
            }}
          >
            洞察万物生息<br />
            基于东方五行智慧的灵宠匹配
          </p>
          <h1
            className="font-black m-0"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: 'clamp(110px, 18vw, 185px)',
              color: '#1A2E2A',
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              textShadow: '0 4px 30px rgba(242, 240, 235, 0.8), 0 2px 10px rgba(242, 240, 235, 0.6)',
            }}
          >
            <span className="hero-title-char">百</span>
            <span className="hero-title-char">澤</span>
          </h1>
        </div>

        {/* 滚动提示 */}
        <div
          className="hero-scroll animate-scroll-float absolute flex flex-col items-center gap-3 cursor-pointer group"
          style={{
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
        >
          <span
            className="text-[10px] uppercase transition-all duration-500 group-hover:tracking-[0.5em]"
            style={{
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.3em',
              color: 'rgba(26,46,42,0.5)',
            }}
          >
            SCROLL
          </span>
          <div className="relative w-px h-12 overflow-hidden">
            <div
              className="absolute w-full animate-scroll-line"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, #1A2E2A 0%, transparent 80%)',
              }}
            />
          </div>
          <div className="relative">
            <div
              className="w-2 h-2 rounded-full animate-pulse-dot"
              style={{ backgroundColor: '#1A2E2A' }}
            />
            <div
              className="absolute inset-0 w-2 h-2 rounded-full animate-pulse-ring"
              style={{ border: '1px solid #1A2E2A' }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          四维匹配体系 - Godly风格门户粘性布局
          左栏：粘性标题区 (4列) | 右栏：滚动内容区 (8列)
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={dimensionsSectionRef} className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* 大屏：4:8 栅格布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* ═══ 左侧：粘性标题区 (4列) ═══ */}
            <div className="lg:col-span-4">
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
            <div className="lg:col-span-8">
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

      {/* ═══════════════════════════════════════════════════════════════
          七种命定 - 白玉牌效果重构
          暖灰底色隔离 + 纯白方块 + 垂直居中放大 + 强烈悬停动效
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto">
          {/* 区块标题 - 大幅放大 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <p className="text-sm md:text-base tracking-[0.3em] text-gray-400 mb-6 font-en uppercase font-medium">
              CATEGORIES
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-gray-900">
              七种命定
            </h2>
          </motion.div>

          {/* ═══ 网格布局：白玉牌效果 ═══ */}
          <div ref={categoriesGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            
            {/* CAT */}
            <div
              ref={el => { categoryItemsRef.current[0] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              {/* 几何图标 - 极大放大 */}
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ○
              </div>
              {/* 英文 - 放大加粗 */}
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                CAT
              </p>
              {/* 中文 - 字号适中颜色浅 */}
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                猫咪
              </p>
            </div>

            {/* DOG */}
            <div
              ref={el => { categoryItemsRef.current[1] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ◇
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                DOG
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                狗狗
              </p>
            </div>

            {/* RABBIT */}
            <div
              ref={el => { categoryItemsRef.current[2] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                △
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                RABBIT
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                兔子
              </p>
            </div>

            {/* SMALL */}
            <div
              ref={el => { categoryItemsRef.current[3] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                □
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                SMALL
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                小宠
              </p>
            </div>

            {/* BIRD */}
            <div
              ref={el => { categoryItemsRef.current[4] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ◁
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                BIRD
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                鸟类
              </p>
            </div>

            {/* REPTILE */}
            <div
              ref={el => { categoryItemsRef.current[5] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ▽
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                REPTILE
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                爬宠
              </p>
            </div>

            {/* FISH */}
            <div
              ref={el => { categoryItemsRef.current[6] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ◎
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                FISH
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                水族
              </p>
            </div>

            {/* ALL */}
            <div
              ref={el => { categoryItemsRef.current[7] = el; }}
              className="group relative bg-white border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
                         p-6 md:p-8 aspect-square 
                         hover:shadow-2xl hover:-translate-y-3
                         transition-all duration-500 ease-out cursor-pointer overflow-hidden
                         flex flex-col justify-center items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl text-gray-300 
                              group-hover:text-gray-800 group-hover:scale-110
                              transition-all duration-500 ease-out mb-6">
                ✦
              </div>
              <p className="text-xl md:text-2xl tracking-[0.25em] text-gray-800 font-bold font-en mb-3">
                ALL
              </p>
              <p className="text-base md:text-lg tracking-[0.2em] text-gray-500 font-light">
                跨类推荐
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 品牌介绍 */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
      <section className="py-24 md:py-32 bg-[var(--background)]">
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
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
                仅需 2 分钟，开启你的缘分之旅。
              </p>
              <Link href="/questionnaire/birthday" className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] border-b border-[var(--primary)] pb-1 hover:opacity-50 transition-opacity">
                Discover More
              </Link>
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
                白泽，通万物之情，知鬼神之事。我们以白泽为名，愿成为连接你与命定之宠的桥梁。
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
                每一次匹配，都是一段新故事的开始。
              </p>
              <Link href="/questionnaire/birthday" className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] border-b border-[var(--primary)] pb-1 hover:opacity-50 transition-opacity">
                Start Journey
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 border-t border-[var(--sand)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">
            百澤 BAIZE &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs tracking-[0.1em] text-[var(--text-muted)]">
            测试结果仅供参考，选择宠物请结合实际情况
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}
