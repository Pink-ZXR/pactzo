'use client';

import React from 'react';
import { useBreath, mapBreath } from '@/hooks/useBreath';

/**
 * TailGlow - 尾巴空气光层
 * 
 * 效果：在页面底部营造空气感的光晕
 * - 位置：底部中央
 * - 尺寸：宽而扁的椭圆
 * - 柔和扩散，营造空间深度
 * 
 * 呼吸节奏：
 * - phase: 0.4（中等相位）
 * - opacity: 0.2 → 0.32（12% 变化，比背景更有生命）
 * - scale: 1 → 1.03（3% 扩张）
 */

interface TailGlowProps {
  /** 光晕颜色 */
  color?: string;
}

export function TailGlow({ 
  color = 'rgba(255,255,255,0.25)' 
}: TailGlowProps) {
  const breath = useBreath(7000, 0.4); // 7秒周期，中等相位

  // 呼吸值映射
  const breathOpacity = mapBreath(breath, 0.2, 0.32);  // 0.2 → 0.32
  const breathScale = mapBreath(breath, 1, 1.03);      // 1 → 1.03

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        // 宽而扁的椭圆，位于底部
        width: '80vw',
        height: '30vh',
        borderRadius: '50%',
        // 柔和的径向渐变
        background: `radial-gradient(ellipse at center, ${color} 0%, rgba(255,255,255,0.1) 50%, transparent 80%)`,
        // 位置：底部中央
        left: '50%',
        bottom: '-5vh',
        transform: `translateX(-50%) scale(${breathScale})`,
        opacity: breathOpacity,
        filter: 'blur(60px)',
        zIndex: 1
      }}
    />
  );
}

export default TailGlow;
