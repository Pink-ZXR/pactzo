'use client';

import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import { useBreath, mapBreath } from '@/hooks/useBreath';

/**
 * Background - 光场层（核心背景）
 * 
 * 实现"聚焦光场背景"：
 * - radial-gradient，光源偏右（65% 55%）
 * - 中间亮，边缘暗
 * - 米白 / 灰白（不要纯白）
 * - 鼠标轻微偏移（±10px）
 * 
 * 呼吸节奏：
 * - phase: 0（起始相位）
 * - scale: 1 → 1.015（1.5% 扩张）
 * - opacity: 0.98 → 0.94（4% 淡化）
 */

export function Background() {
  const { x, y } = useParallax(0.05);
  const breath = useBreath(7000, 0); // 7秒周期，起始相位

  // 映射到像素偏移 (±10px)
  const offsetX = x * 10;
  const offsetY = y * 10;

  // 呼吸值映射
  const breathScale = mapBreath(breath, 1, 1.015);      // 1 → 1.015
  const breathOpacity = mapBreath(breath, 0.94, 0.98);  // 0.94 → 0.98（反向：呼出时更亮）

  return (
    <div
      className="absolute inset-0"
      style={{
        // 精细 radial-gradient 营造深度（8层过渡）
        background: `
          radial-gradient(
            circle at ${68 + x * 2}% ${52 + y * 2}%,
            rgba(255,255,255,${0.98 * breathOpacity}) 0%,
            rgba(250,250,250,${0.92 * breathOpacity}) 18%,
            rgba(240,240,240,${0.75 * breathOpacity}) 32%,
            rgba(225,225,225,${0.55 * breathOpacity}) 48%,
            rgba(205,205,205,${0.38 * breathOpacity}) 65%,
            rgba(185,185,185,${0.28 * breathOpacity}) 82%,
            rgba(170,170,170,${0.22 * breathOpacity}) 100%
          )
        `,
        // 整体轻微跟随鼠标 + 呼吸缩放
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${1.05 * breathScale})`,
        zIndex: 0
      }}
    />
  );
}

export default Background;
