'use client';

import React, { useState, useEffect } from 'react';
import { Background } from './Background';
// Noise 已移除 - 用户参考截图无噪点
import BgText from './BgText';
import { Glow } from './Glow';
import { TailGlow } from './TailGlow';

/**
 * Hero - godly级背景系统主容器（呼吸节奏统一版 + 分层入场动画）
 * 
 * 分层结构（从下到上）：
 * z-0: Background（光场层）- phase: 0
 * z-1: TailGlow（尾巴空气光）- phase: 0.4
 * z-1: Noise（空气噪声层）
 * z-2: BgText（PACTZO背景字）- phase: 0.8
 * z-3: Glow（柔光跟随层）- phase: 0.2
 * z-10+: 前景内容（children）
 * 
 * 呼吸节奏系统：
 * - 所有组件共享 7 秒周期
 * - 不同 phase 创造层次感
 * - 变化幅度 ≤ 5%，克制自然
 * 
 * 入场动画系统：
 * - 0ms: Background 光场点亮
 * - 400ms: 神兽登场（雾感消散）
 * - 1000ms: 标题「百澤」浮现收紧
 * - 1300ms: 副标题淡入
 * - 1800ms: ScrollHint 最后出现
 */

interface HeroProps {
  children?: React.ReactNode;
  className?: string;
}

export function Hero({ children, className = '' }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  // 避免 SSR 抖动，客户端挂载后再显示
  useEffect(() => {
    setMounted(true);
  }, []);

  // 未挂载时返回占位，避免闪烁
  if (!mounted) {
    return (
      <section 
        className={`relative w-full h-screen overflow-hidden ${className}`}
        style={{ backgroundColor: '#F2F0EB' }}
      />
    );
  }

  return (
    <section 
      className={`relative w-full h-screen overflow-hidden ${className}`}
      style={{ backgroundColor: '#F2F0EB' }}
    >
      {/* 背景层系统 - 呼吸节奏统一 + 入场动画 */}
      <div className="hero-bg-layer">
        <Background />  {/* phase: 0 - 起始 */}
        <TailGlow />    {/* phase: 0.4 - 中等 */}
        {/* Noise 已移除 - 用户参考截图无噪点 */}
        <BgText />      {/* phase: 0.8 - 接近完成 */}
        <Glow />        {/* phase: 0.2 - 轻微滞后 */}
      </div>

      {/* 前景内容 */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* 入场动画样式 - 与呼吸节奏完美衔接 */}
      <style jsx>{`
        .hero-bg-layer {
          position: absolute;
          inset: 0;
          /* 入场动画 1.2s，呼吸在 1.5s 启动，留 0.3s 缓冲确保衔接丝滑 */
          animation: bgFadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes bgFadeIn {
          0% {
            opacity: 0;
            transform: scale(1.08);
            filter: blur(8px);
          }
          60% {
            opacity: 0.9;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
