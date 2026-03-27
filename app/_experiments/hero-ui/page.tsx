'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useSpring, useTransform, useMotionValue, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Hero } from '@/components/hero';
import { useBreath, mapBreath } from '@/hooks/useBreath';

gsap.registerPlugin(ScrollTrigger);

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

      {/* 背后柔光晕 - 呼吸联动，确保 opacity 在有效范围 */}
      <style jsx>{`
        .scroll-hint-anchor {
          position: relative;
        }
        .scroll-hint-anchor::before {
          content: "";
          position: absolute;
          inset: -8px -16px;
          background: radial-gradient(
            circle,
            rgba(255,255,255,0.35),
            transparent 70%
          );
          filter: blur(8px);
          z-index: -1;
          opacity: ${Math.max(0.2, 0.85 - breath * 0.5)};
        }
      `}</style>
    </motion.a>
  );
}

/**
 * 电影级 Hero - 使用新的 godly 级背景系统
 * 
 * 背景层（由 Hero 组件提供）：
 * - Background: 光场层（radial-gradient，光源偏右）
 * - Noise: 空气噪声层（SVG texture）
 * - BgText: PACTZO 空间结构层（gradient + blur）
 * - Glow: 柔光跟随层（延迟跟随鼠标）
 * 
 * 前景层：
 * - 空间断裂神兽层
 * - 标题"百澤"
 * - CTA 按钮
 */

// 导航组件
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] font-light text-[#1A2E2A]">
            百澤
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xs tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#F2F0EB] flex items-center justify-center">
          <nav className="text-center space-y-8">
            {['Begin', 'About', 'Method'].map((item, i) => (
              <div key={item} style={{ animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                <Link 
                  href={item === 'Begin' ? '/questionnaire/birthday' : item === 'About' ? '/about' : '/method'}
                  className="block text-4xl md:text-6xl font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // 鼠标位置
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 物理弹簧
  const springX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 40 });

  // 各层视差
  const farX = useTransform(springX, [-500, 500], [-15, 15]);
  const farY = useTransform(springY, [-500, 500], [-10, 10]);
  
  const mainX = useTransform(springX, [-500, 500], [-8, 8]);
  const mainY = useTransform(springY, [-500, 500], [-5, 5]);
  
  const titleXMouse = useTransform(springX, [-500, 500], [-3, 3]);
  const titleYMouse = useTransform(springY, [-500, 500], [-2, 2]);

  // 滚动进度
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // 滚动驱动的动画值
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const titleYScroll = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const beastScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const beastBlur = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  // 合并标题Y轴动画
  const titleY = useTransform([titleYMouse, titleYScroll], ([mouse, scroll]) => (mouse as number) + (scroll as number));

  // 鼠标移动处理
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <>
      <Nav />
      
      {/* 测试页标识 */}
      <div className="fixed top-4 right-4 z-[999] bg-black/80 text-white text-xs px-3 py-1.5 rounded-full">
        TEST: Godly Background System
      </div>

      <section ref={sectionRef} className="relative h-[200vh]">
        <div ref={containerRef} onMouseMove={handleMouseMove}>
          {/* 使用新的 Hero 背景系统 */}
          <Hero>
            {/* 空间断裂神兽层 */}
            <div className="relative w-full h-full">
              {/* 上层断裂 - 薄 + 左偏（外层入场，内层视差） */}
              <div className="hero-beast-far absolute z-[1] w-full h-full pointer-events-none">
              <motion.div 
                style={{ x: farX, y: farY }}
                className="layer-far w-full h-full"
              >
                <div 
                  className="absolute w-[120vw] h-[35%] top-0 -left-[10%]"
                  style={{ transform: 'translateX(-40px) translateY(-20px)' }}
                >
                  <Image 
                    src="/illustrations/hero/baize-gold-new.png"
                    alt="Far Beast"
                    width={1400}
                    height={500}
                    className="w-full h-full object-cover object-top opacity-20"
                    style={{ filter: 'blur(20px) brightness(1.1)' }}
                    priority
                  />

                </div>
              </motion.div>
              </div>

              {/* 中层主体 - 神兽登场（外层入场，内层视差） */}
              <div className="hero-beast-main absolute z-[5] w-full h-full pointer-events-none">
              <motion.div 
                style={{ x: mainX, y: mainY, scale: beastScale }}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
                className="layer-main w-full h-full flex items-center justify-center"
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
                      WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 45% 50%, black 50%, transparent 85%)'
                    }}
                    priority
                  />
                </div>
              </motion.div>
              </div>

              {/* 前景标题 - 分层入场 */}
              <motion.div 
                className="hero-title absolute z-[10] flex flex-col items-center justify-center pointer-events-none"
                style={{ x: titleXMouse, y: titleY, scale: titleScale, opacity: titleOpacity, right: '12%', bottom: '22%' }}
              >
                {/* 副标题 - 1300ms延迟 */}
                <div className="text-center mb-8 hero-subtitle">
                  <p className="font-serif tracking-[0.2em] text-[#1A2E2A] text-xs mb-2">洞察万物生息</p>
                  <p className="font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px] mb-1">基于东方五行智慧的灵宠匹配</p>
                  <p className="font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px]">为你推荐最合适的陪伴</p>
                </div>

                {/* 标题「百澤」- 1000ms延迟（外层入场，内层呼吸） */}
                <div className="hero-title-text">
                  <motion.h1 
                    animate={{ scale: [1, 1.015, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="font-black m-0"
                    style={{
                      fontFamily: '"Noto Serif SC", serif',
                      fontSize: 'clamp(80px, 10vw, 140px)',
                      color: '#1A2E2A',
                      letterSpacing: '-0.02em',
                      lineHeight: 0.9,
                      textShadow: '0 4px 30px rgba(242, 240, 235, 0.8)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    百 澤
                  </motion.h1>
                </div>

                {/* 呼吸节奏统一的滚动提示 - 1800ms延迟 */}
                <div className="hero-scroll-hint">
                  <ScrollHint />
                </div>
              </motion.div>
            </div>
          </Hero>
        </div>
      </section>

      {/* 分层入场动画样式（入场动画在外层 div，不与 Framer Motion 冲突） */}
      <style jsx>{`
        /* 神兽主体登场 - 400ms延迟，雾感消散 */
        .hero-beast-main {
          animation: beastEnter 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        @keyframes beastEnter {
          0% {
            opacity: 0;
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }

        /* 标题「百澤」- 1000ms延迟，浮现收紧 */
        .hero-title-text {
          animation: titleReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1s;
          opacity: 0;
        }

        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            letter-spacing: 0.2em;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: -0.02em;
          }
        }

        /* 副标题 - 1300ms延迟 */
        .hero-subtitle {
          animation: subtitleFade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1.3s;
          opacity: 0;
        }

        @keyframes subtitleFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ScrollHint - 1800ms延迟 */
        .hero-scroll-hint {
          animation: hintEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 1.8s;
          opacity: 0;
        }

        @keyframes hintEnter {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* 上层断裂 - 300ms延迟，更重的雾感 */
        .hero-beast-far {
          animation: beastFarEnter 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        @keyframes beastFarEnter {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
}
