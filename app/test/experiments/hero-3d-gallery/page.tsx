/**
 * @experiment hero-3d-gallery
 * @desc 3D浮动艺术画廊 - 单幅聚焦版
 * @features 三层深度视差、浮动动画、鼠标交互
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Hero3DGallery() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 开场动画
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true)
      });

      // 场景容器淡入
      tl.fromTo(sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      )
      // 背景层展开
      .fromTo(bgLayerRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
        '-=0.5'
      )
      // 神兽图浮现
      .fromTo(imageLayerRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
      // 文字层浮入
      .fromTo(textLayerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 三层深度视差交互
  useEffect(() => {
    if (!isLoaded) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

      // 背景层 - 最慢（远景）
      gsap.to(bgLayerRef.current, {
        x: -xPercent * 30,
        y: -yPercent * 30,
        duration: 2,
        ease: 'power1.out',
      });

      // 神兽图 - 中等（中景）+ 轻微浮动
      gsap.to(imageLayerRef.current, {
        x: -xPercent * 15,
        y: -yPercent * 15,
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 1.5,
        ease: 'power2.out',
      });

      // 文字层 - 最快（近景）
      gsap.to(textLayerRef.current, {
        x: -xPercent * 40,
        y: -yPercent * 40,
        duration: 1,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to([bgLayerRef.current, imageLayerRef.current, textLayerRef.current], {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLoaded]);

  // 神兽呼吸浮动动画
  useEffect(() => {
    if (!isLoaded) return;

    const floatAnimation = gsap.to(imageLayerRef.current, {
      y: '+=10',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      floatAnimation.kill();
    };
  }, [isLoaded]);

  const handleBegin = () => {
    router.push('/test/questionnaire/birthday');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1A2E2A 0%, #2a3d35 40%, #F2F0EB 100%)',
        perspective: '1500px',
      }}
    >
      {/* 3D场景容器 */}
      <div
        ref={sceneRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          opacity: 0,
        }}
      >
        {/* 背景层 - 远山/氛围 */}
        <div
          ref={bgLayerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: 'translateZ(-200px)',
            opacity: 0,
          }}
        >
          {/* 渐变氛围 */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 50%, rgba(58,77,66,0.4) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 30% 70%, rgba(166,138,86,0.15) 0%, transparent 50%)
              `,
            }}
          />
          {/* 巨型镂空字 */}
          <span
            className="text-[35vw] font-black"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(242,240,235,0.06)',
              filter: 'blur(3px)',
            }}
          >
            百澤
          </span>
        </div>

        {/* 神兽图 - 中景主体 */}
        <div
          ref={imageLayerRef}
          className="relative"
          style={{
            width: 'min(500px, 70vw)',
            height: 'min(600px, 70vh)',
            transform: 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            opacity: 0,
          }}
        >
          <Image
            src="/illustrations/hero/baize-divine.png"
            alt="百泽神兽"
            fill
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))',
            }}
            priority
          />
        </div>

        {/* 文字层 - 前景 */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            transform: 'translateZ(100px)',
            opacity: 0,
          }}
        >
          {/* 顶部标签 */}
          <div
            className="absolute top-16 text-[11px] uppercase tracking-[0.4em]"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: 'rgba(242,240,235,0.7)',
            }}
          >
            Divine Beast Archive
          </div>

          {/* 主标题 */}
          <h1
            className="text-[80px] md:text-[120px] font-black mb-4"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              color: '#1A2E2A',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em',
            }}
          >
            百澤
          </h1>

          {/* 副标题 */}
          <p
            className="text-[13px] mb-12 text-center"
            style={{
              fontFamily: '"Space Mono", monospace',
              color: 'rgba(26,46,42,0.6)',
              letterSpacing: '0.2em',
            }}
          >
            洞察万物 · 灵魂契合
          </p>

          {/* 按钮 - 需要pointer-events */}
          <button
            onClick={handleBegin}
            className="pointer-events-auto px-12 py-4 text-[12px] uppercase transition-all duration-500"
            style={{
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.3em',
              backgroundColor: 'transparent',
              border: '1px solid rgba(26,46,42,0.3)',
              color: '#1A2E2A',
              transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1A2E2A';
              e.currentTarget.style.color = '#F2F0EB';
              e.currentTarget.style.letterSpacing = '0.4em';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1A2E2A';
              e.currentTarget.style.letterSpacing = '0.3em';
            }}
          >
            Enter Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
