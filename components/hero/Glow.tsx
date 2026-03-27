'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import { useBreath, mapBreath } from '@/hooks/useBreath';

/**
 * Glow - 柔光跟随层
 * 
 * 效果：一个柔和的光斑跟随鼠标移动
 * - 尺寸：500~700px
 * - 延迟跟随（lerp）
 * - blur: 20px+
 * - opacity: 0.2 ~ 0.4
 * 
 * 呼吸节奏：
 * - phase: 0.2（滞后于背景）
 * - opacity: 0.25 → 0.35（10% 变化）
 * - blur: 30px → 40px（柔和扩散）
 */

interface GlowProps {
  size?: number;
  color?: string;
}

export function Glow({ 
  size = 600, 
  color = 'rgba(255,255,255,0.35)' 
}: GlowProps) {
  const { x, y } = useParallax(0.04); // 稍快一点的跟随
  const breath = useBreath(7000, 0.2); // 7秒周期，滞后相位

  // 映射到像素偏移 (±30px)，光斑移动幅度更大
  const offsetX = x * 30;
  const offsetY = y * 30;

  // 呼吸值映射
  const breathOpacity = mapBreath(breath, 0.25, 0.35); // 0.25 → 0.35
  const breathBlur = mapBreath(breath, 30, 40);        // 30px → 40px

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0.15) 40%, transparent 70%)`,
        filter: `blur(${breathBlur}px)`,
        opacity: breathOpacity,
        // 初始位置偏右（靠近标题区域）
        left: '55%',
        top: '45%',
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        zIndex: 3
        // 注意：移除 CSS animation，改用 useBreath 统一控制
      }}
    />
  );
}

export default Glow;
