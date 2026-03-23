/**
 * @experiment hero-frameless
 * @desc 无边框碎裂布局 - 深度视差设计
 * @features 巨型水印背景、散落UI标签、破框标题、悬浮按钮
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroFrameless() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const beastRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const labelTLRef = useRef<HTMLDivElement>(null);
  const labelTRRef = useRef<HTMLDivElement>(null);

  // 初始入场动画 - 纯文字版
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1. 水印从虚无中撑开空间
      tl.fromTo(
        watermarkRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.04, duration: 2.5 }
      )
        // 2. 巨大的汉字标题"百澤"以 stagger 迅速跳入
        .fromTo(
          '.title-char',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1.8 },
          '-=1.5'
        )
        // 3. 副标题跟随
        .fromTo(
          '.subtitle-text',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.6, duration: 1.2 },
          '-=1.2'
        )
        // 4. 四个角落的精密标签最后亮起
        .fromTo(
          [labelTLRef.current, labelTRRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.1 },
          '-=1'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 实时视差：纯文字版
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      // 标题：较慢位移
      gsap.to(titlesRef.current, {
        x: x * 40,
        y: y * 30,
        duration: 2.5,
        ease: 'power2.out',
      });

      // 背景水印：反向移动，拉开极端纵深
      gsap.to(watermarkRef.current, {
        x: -x * 100,
        y: -y * 50,
        duration: 3,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBegin = () => {
    router.push('/test/questionnaire/birthday');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#F2F0EB' }}
    >
      {/* 背景：巨型水印 PACTZO */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="font-black text-[22vw] uppercase"
          style={{
            fontFamily: '"Inter", sans-serif',
            color: '#1A2E2A',
            letterSpacing: '-0.07em',
            opacity: 0.04,
          }}
        >
          PACTZO
        </div>
      </div>

      {/* 内容场景：无边框碎裂布局 */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ zIndex: 10 }}
      >
        {/* UI标签：像坐标一样散落在四周 */}
        <div
          ref={labelTLRef}
          className="absolute text-[11px] uppercase"
          style={{
            top: '50px',
            left: '50px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.4em',
            color: '#1A2E2A',
            zIndex: 50,
          }}
        >
          Specimen / No.01
        </div>
        <div
          ref={labelTRRef}
          className="absolute text-[11px] uppercase"
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

        {/* 核心汉字：纯文字排版，居中突出 */}
        <div
          ref={titlesRef}
          className="absolute text-center pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
          }}
        >
          <h1
            className="font-black m-0"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: 'clamp(120px, 20vw, 200px)',
              color: '#1A2E2A',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            <span className="title-char">百</span>
            <span className="title-char">澤</span>
          </h1>
          <p
            className="subtitle-text mt-2"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: '14px',
              letterSpacing: '0.1em',
              color: '#1A2E2A',
            }}
          >
            洞察万物生息，开启跨越时空的契约。
          </p>
        </div>

        {/* 极简按钮：悬浮在右下角 */}
        <button
          onClick={handleBegin}
          className="absolute text-white border-none cursor-pointer transition-all duration-500"
          style={{
            bottom: '50px',
            right: '50px',
            backgroundColor: '#1A2E2A',
            padding: '22px 45px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '12px',
            letterSpacing: '0.3em',
            zIndex: 100,
            transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a403c';
            e.currentTarget.style.paddingRight = '65px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1A2E2A';
            e.currentTarget.style.paddingRight = '45px';
          }}
        >
          ACTIVATE PACT
        </button>
      </div>
    </div>
  );
}
