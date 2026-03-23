/**
 * @experiment hero-scroll-transition
 * @desc 视差滚动衔接 - Hero与内容自然过渡
 * @features 滚动时Hero淡出、内容淡入、多层视差
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const dimensions = [
  { num: '01', en: 'WUXING', title: '五行契合', desc: '根据你的出生日期推算五行属性，从命理层面解读你与宠物的能量契合。金木水火土，万物皆有归属。' },
  { num: '02', en: 'TIANSHI', title: '天时相应', desc: '分析你的作息习惯与精力状态，找到与你生活节奏同频的宠物伙伴。时间的韵律，是相处的基础。' },
  { num: '03', en: 'DILI', title: '地利相宜', desc: '考量你的居住空间与环境稳定性，匹配最适应你生活场景的宠物。空间的边界，是舒适的起点。' },
  { num: '04', en: 'RENHE', title: '人和缘定', desc: '洞察你的陪伴需求与情感期待，寻找与你灵魂契合的命定之宠。关系的本质，是彼此的成全。' },
];

// 添加CSS动画
const scrollIndicatorStyles = `
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

export default function HeroScrollTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const baizeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const baizeHeadRef = useRef<HTMLDivElement>(null);
  const baizeGhostRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

      // 神兽图随滚动淡出上移
      heroTl.to(
        baizeRef.current,
        {
          y: -150,
          opacity: 0,
          scale: 0.9,
          ease: 'none',
        },
        0
      );

      // 幻影神兽随滚动淡出
      heroTl.to(
        baizeGhostRef.current,
        {
          y: -100,
          opacity: 0,
          ease: 'none',
        },
        0
      );

      // 头部聚焦层随滚动淡出
      heroTl.to(
        baizeHeadRef.current,
        {
          y: -120,
          opacity: 0,
          ease: 'none',
        },
        0
      );

      // 光晕随滚动淡出
      heroTl.to(
        glowRef.current,
        {
          opacity: 0,
          ease: 'none',
        },
        0
      );

      // 背景水印加速反向移动
      heroTl.to(
        watermarkRef.current,
        {
          y: 200,
          opacity: 0.02,
          ease: 'none',
        },
        0
      );

      // 内容区元素依次浮现
      const contentItems = contentRef.current?.querySelectorAll('.dimension-item');
      contentItems?.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // 背景大编号视差
        const bgNum = item.querySelector('.bg-number');
        if (bgNum) {
          gsap.fromTo(
            bgNum,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 0.03,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 档案显影动效 - 简化版
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // 1. 幻影神兽先出现（背景灵影）
    tl.fromTo(
      baizeGhostRef.current,
      { 
        opacity: 0,
        x: 80,
      },
      { 
        opacity: 0.16,
        x: 0,
        duration: 3,
        ease: 'power2.out',
      }
    )

    // 2. 主神兽显影（前景清晰层）
    .fromTo(
      baizeRef.current,
      { 
        opacity: 0,
        x: 100,
      },
      { 
        opacity: 0.35,
        x: 0,
        duration: 2.5,
        ease: 'power3.out',
      },
      '-=2.5'
    )

    // 2.5 头部清晰聚焦层
    .fromTo(
      baizeHeadRef.current,
      { 
        opacity: 0,
        scale: 0.95,
      },
      { 
        opacity: 0.4,
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      },
      '-=2'
    )

    // 2.8 空气光晕柔和浮现
    .fromTo(
      glowRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power1.inOut' },
      '-=1.8'
    )

    // 3. 标题错位跳写入場
    .fromTo(
      '.title-char',
      { y: 40, opacity: 0, rotateX: -20 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        stagger: 0.15, 
        duration: 1.2, 
        ease: 'expo.out',
      },
      '-=1.2'
    )

    // 4. 副文案淡入
    .fromTo(
      '.subtitle-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 0.7, duration: 0.8, ease: 'power2.out' },
      '-=0.8'
    )

    // 4. 四角标签精密亮起
    .fromTo(
      ['.label-tl', '.label-tr'],
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
      '-=0.6'
    )

    // 5. SCROLL提示最后浮现
    .fromTo(
      '.scroll-indicator',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  // 鼠标移动3D视差效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      // 标题3D悬浮
      gsap.to(titlesRef.current, {
        x: x * 40,
        y: y * 30,
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 1.5,
        ease: 'power2.out',
      });

      // 背景水印反向移动
      gsap.to(watermarkRef.current, {
        x: -x * 80,
        y: -y * 40,
        duration: 2,
        ease: 'power1.out',
      });

      // 神兽图视差 - 反向漂移增强立体错位感
      gsap.to(baizeRef.current, {
        x: -x * 60,
        y: -y * 40,
        duration: 2.5,
        ease: 'power2.out',
      });

      // 幻影神兽 - 更慢的漂移增强纵深
      gsap.to(baizeGhostRef.current, {
        x: -x * 30,
        y: -y * 20,
        duration: 3,
        ease: 'power1.out',
      });

      // 四角标签轻微视差
      gsap.to('.label-tl', {
        x: x * 10,
        y: y * 10,
        duration: 2,
        ease: 'power2.out',
      });
      gsap.to('.label-tr', {
        x: x * 10,
        y: y * 10,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{scrollIndicatorStyles}</style>
      <div ref={containerRef} className="relative">
      {/* Hero区 - 100vh */}
      <div
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
        {/* 左侧纯色遮罩 - 保护文字区域 */}
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
          className="label-tl absolute text-[11px] uppercase"
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
          className="label-tr absolute text-[11px] uppercase"
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

        {/* 核心标题 - 错位覆盖巨兽 */}
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
            className="subtitle-text mb-4"
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
            <span className="title-char">百</span>
            <span className="title-char">澤</span>
          </h1>
        </div>

        {/* 滚动提示 - 增强版 */}
        <div
          className="scroll-indicator animate-scroll-float absolute flex flex-col items-center gap-3 cursor-pointer group"
          style={{
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
          }}
        >
          {/* 文字 - 带悬停动效 */}
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
          
          {/* 动态线条 - 呼吸动画 */}
          <div className="relative w-px h-12 overflow-hidden">
            <div
              className="absolute w-full animate-scroll-line"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom, #1A2E2A 0%, transparent 80%)',
              }}
            />
          </div>
          
          {/* 底部圆点 - 脉冲效果 */}
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
      </div>

      {/* 内容区 - 四维匹配体系 */}
      <div
        ref={contentRef}
        className="relative py-32"
        style={{ backgroundColor: '#F2F0EB' }}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          {/* 区块标题 */}
          <div className="mb-20 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#1A2E2A]/10 flex items-center justify-center overflow-hidden">
              <Image src="/pets/cat-ink.png" alt="" width={40} height={40} className="object-cover" />
            </div>
            <div>
              <p
                className="text-xs tracking-[0.4em] text-[#999] mb-1"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Our Method
              </p>
              <h2
                className="text-3xl md:text-4xl font-extralight text-[#1A2E2A] tracking-[0.05em]"
                style={{ fontFamily: '"Noto Serif SC", serif' }}
              >
                四维匹配体系
              </h2>
            </div>
          </div>

          {/* 维度列表 */}
          <div className="space-y-0">
            {dimensions.map((dim, index) => (
              <div
                key={dim.num}
                className="dimension-item relative group py-16 md:py-20 border-t border-[#e5e3dd] last:border-b"
              >
                {/* 背景大编号 */}
                <span
                  className="bg-number absolute -top-8 left-0 text-[10rem] md:text-[14rem] font-extralight text-[#1A2E2A] leading-none pointer-events-none select-none"
                  style={{ opacity: 0 }}
                >
                  {dim.num}
                </span>

                {/* 内容行 */}
                <div className="relative grid grid-cols-12 gap-4 md:gap-6 items-start">
                  {/* 小编号 */}
                  <div className="col-span-2 md:col-span-1">
                    <span
                      className="text-xs text-[#999]"
                      style={{ fontFamily: '"Space Mono", monospace' }}
                    >
                      {dim.num}
                    </span>
                  </div>

                  {/* 英文标题 */}
                  <div className="col-span-10 md:col-span-3">
                    <h3
                      className="text-xl md:text-2xl lg:text-3xl font-extralight text-[#1A2E2A] tracking-[0.12em] uppercase"
                      style={{ fontFamily: '"Cormorant", Georgia, serif' }}
                    >
                      {dim.en}
                    </h3>
                    <div
                      className="h-px bg-[#8b3232] mt-3 transition-all duration-500"
                      style={{ width: '0%' }}
                    />
                  </div>

                  {/* 中文标题 */}
                  <div className="col-span-6 md:col-span-2">
                    <p
                      className="text-sm tracking-[0.15em] text-[#8b3232]"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {dim.title}
                    </p>
                  </div>

                  {/* 描述 */}
                  <div className="col-span-12 md:col-span-6 mt-2 md:mt-0">
                    <p
                      className="text-sm text-[#666] leading-[1.8] font-light"
                      style={{ fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {dim.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
