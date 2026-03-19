'use client';

import { motion } from 'framer-motion';

interface IllustrationProps {
  className?: string;
}

// Buly风格 - 复古药剂师植物边框
export function BulyPlantBorder({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 40" fill="none" className={className}>
      {/* 左侧植物 */}
      <path d="M10 20 Q15 10 20 15 Q25 20 20 25 Q15 30 10 20" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M20 15 Q25 5 30 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M20 25 Q25 35 30 30" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="25" cy="18" r="1" fill="currentColor" opacity="0.4" />
      
      {/* 中间装饰线 */}
      <line x1="40" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
      
      {/* 中心装饰 */}
      <circle cx="100" cy="20" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.3" />
      
      {/* 右侧植物 */}
      <path d="M190 20 Q185 10 180 15 Q175 20 180 25 Q185 30 190 20" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M180 15 Q175 5 170 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M180 25 Q175 35 170 30" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="185" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="175" cy="18" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Buly风格 - 复古标签/徽章
export function BulyBadge({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      {/* 外框 */}
      <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
      
      {/* 中心图案 - 古典花瓶 */}
      <path d="M22 20 Q20 25 22 30 Q20 35 25 40 L35 40 Q40 35 38 30 Q40 25 38 20 Q35 18 30 18 Q25 18 22 20" 
            stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
      
      {/* 植物 */}
      <path d="M30 18 Q28 12 25 15" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M30 18 Q32 12 35 15" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="25" cy="15" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="35" cy="15" r="2" fill="currentColor" opacity="0.5" />
      
      {/* 装饰点 */}
      <circle cx="30" cy="8" r="1" fill="currentColor" />
      <circle cx="30" cy="52" r="1" fill="currentColor" />
      <circle cx="8" cy="30" r="1" fill="currentColor" />
      <circle cx="52" cy="30" r="1" fill="currentColor" />
    </svg>
  );
}

// Buly风格 - 复古角落装饰
export function BulyCorner({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      <path d="M0 0 L20 0 Q15 5 10 10 Q5 15 0 20 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
      <path d="M5 5 Q10 2 15 5 Q12 8 8 8 Q4 8 5 5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="8" cy="6" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Buly风格 - 手绘星星（精致版）
export function BulyStar({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 4 L22 16 L34 16 L24 22 L28 34 L20 26 L12 34 L16 22 L6 16 L18 16 Z" 
            stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Buly风格 - 月相装饰
export function BulyMoonPhase({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 30" fill="none" className={className}>
      {/* 新月 */}
      <circle cx="15" cy="15" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M15 7 Q19 15 15 23" stroke="currentColor" strokeWidth="0.8" fill="none" />
      
      {/* 连接线 */}
      <line x1="28" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      
      {/* 上弦月 */}
      <circle cx="48" cy="15" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M48 7 L48 23" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M48 7 Q52 15 48 23" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2" />
      
      {/* 连接线 */}
      <line x1="61" y1="15" x2="68" y2="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      
      {/* 满月 */}
      <circle cx="75" cy="15" r="8" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

// Buly风格 - 复古分隔线
export function BulyDivider({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 20" fill="none" className={className}>
      <line x1="20" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="10" r="4" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
      <line x1="110" y1="10" x2="180" y2="10" stroke="currentColor" strokeWidth="0.8" />
      
      {/* 小装饰 */}
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="190" cy="10" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Buly风格 - 药草/植物装饰
export function BulyHerbs({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 60" fill="none" className={className}>
      {/* 主茎 */}
      <path d="M50 55 Q48 40 50 25 Q52 15 50 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      
      {/* 左侧叶子 */}
      <path d="M50 45 Q35 40 30 45 Q35 50 50 45" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M48 35 Q38 30 35 35 Q38 40 48 35" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M50 25 Q40 20 38 25 Q40 30 50 25" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      
      {/* 右侧叶子 */}
      <path d="M50 40 Q65 35 70 40 Q65 45 50 40" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      <path d="M52 30 Q62 25 65 30 Q62 35 52 30" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
      
      {/* 顶部花朵 */}
      <circle cx="50" cy="8" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="5" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Buly风格 - 星座/神秘符号装饰
export function BulyMysticSymbol({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      {/* 外圆 */}
      <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
      
      {/* 内六角星 */}
      <path d="M30 10 L38 20 L38 32 L30 38 L22 32 L22 20 Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08" />
      
      {/* 中心点 */}
      <circle cx="30" cy="25" r="3" fill="currentColor" opacity="0.4" />
      
      {/* 装饰小点 */}
      <circle cx="30" cy="8" r="1.5" fill="currentColor" />
      <circle cx="30" cy="52" r="1.5" fill="currentColor" />
      <circle cx="8" cy="30" r="1.5" fill="currentColor" />
      <circle cx="52" cy="30" r="1.5" fill="currentColor" />
    </svg>
  );
}
