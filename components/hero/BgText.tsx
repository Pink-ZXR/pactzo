'use client';

import { useState, useEffect } from 'react';
import { useBreath, mapBreath } from '@/hooks/useBreath';

/**
 * BgText - PACTZO 背景文字层
 * 
 * 效果：看起来像"空间结构"，而不是文字
 * - gradient + background-clip:text
 * - color: transparent
 * - 几乎不可察觉的呼吸变化
 * 
 * 呼吸节奏：
 * - phase: 0.8（接近完成周期）
 * - blur: 1.4px → 1.8px（0.4px 变化）
 * - opacity: 0.8 → 0.7（反向，呼出时更淡）
 */

export default function BgText() {
  const [mounted, setMounted] = useState(false);
  const breath = useBreath(7000, 0.8); // 7秒周期，接近完成相位

  // 避免 SSR 问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 呼吸值映射（极其微妙）
  const breathBlur = mapBreath(breath, 1.4, 1.8);      // 1.4px → 1.8px
  const breathOpacity = mapBreath(breath, 0.7, 0.8);   // 0.7 → 0.8（反向）

  // 未挂载时不渲染，避免 SSR 样式问题
  if (!mounted) return null;

  return (
    <div 
      className="bg-text"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22vw',
        fontWeight: 700,
        letterSpacing: '0.1em',
        backgroundImage: `linear-gradient(
          90deg,
          rgba(0,0,0,${0.02 * breathOpacity}),
          rgba(0,0,0,${0.08 * breathOpacity}),
          rgba(0,0,0,${0.02 * breathOpacity})
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        filter: `blur(${breathBlur}px)`,
        transform: 'scale(1.08)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      PACTZO
      <style jsx>{`
        .bg-text {
          opacity: 0;
          animation: bgTextEnter 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
        }
        
        @keyframes bgTextEnter {
          0% {
            opacity: 0;
            letter-spacing: 0.3em;
            filter: blur(8px);
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            letter-spacing: 0.1em;
            filter: blur(1.6px);
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
