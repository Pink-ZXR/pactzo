'use client';

import { motion } from 'framer-motion';

interface DecorationProps {
  className?: string;
}

// 手绘星星
export function StarDecoration({ className = '' }: DecorationProps) {
  return (
    <motion.svg 
      viewBox="0 0 40 40" 
      fill="none" 
      className={className}
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M20 4 L23 15 L34 15 L25 22 L28 33 L20 26 L12 33 L15 22 L6 15 L17 15 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </motion.svg>
  );
}

// 小星星（简约版）
export function SmallStar({ className = '' }: DecorationProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

// 手绘月亮
export function MoonDecoration({ className = '' }: DecorationProps) {
  return (
    <motion.svg 
      viewBox="0 0 50 50" 
      fill="none" 
      className={className}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M35 10 Q45 25 35 40 Q20 45 10 35 Q5 20 15 10 Q25 5 35 10"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="30" cy="18" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="25" cy="28" r="1.5" fill="currentColor" opacity="0.3" />
    </motion.svg>
  );
}

// 手绘植物/叶子
export function LeafDecoration({ className = '' }: DecorationProps) {
  return (
    <motion.svg 
      viewBox="0 0 40 60" 
      fill="none" 
      className={className}
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* 茎 */}
      <path
        d="M20 58 Q20 40 22 30 Q24 20 20 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* 叶子 */}
      <path
        d="M20 10 Q10 15 8 25 Q10 35 20 30 Q30 25 28 15 Q25 10 20 10"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* 叶脉 */}
      <path d="M20 12 L20 28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M14 20 L20 22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M26 18 L20 22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </motion.svg>
  );
}

// 手绘云朵
export function CloudDecoration({ className = '' }: DecorationProps) {
  return (
    <motion.svg 
      viewBox="0 0 80 40" 
      fill="none" 
      className={className}
      animate={{ x: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M15 30 Q5 30 8 22 Q5 15 15 15 Q18 8 30 10 Q40 5 50 12 Q60 8 65 15 Q75 15 72 25 Q78 32 65 32 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.08"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

// 手绘爱心
export function HeartDecoration({ className = '' }: DecorationProps) {
  return (
    <motion.svg 
      viewBox="0 0 40 40" 
      fill="none" 
      className={className}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M20 35 Q5 22 5 14 Q5 6 12 6 Q17 6 20 12 Q23 6 28 6 Q35 6 35 14 Q35 22 20 35"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </motion.svg>
  );
}

// 手绘圆点装饰
export function DotsDecoration({ className = '' }: DecorationProps) {
  return (
    <svg viewBox="0 0 60 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="10" r="4" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

// 波浪线装饰
export function WaveDecoration({ className = '' }: DecorationProps) {
  return (
    <svg viewBox="0 0 100 20" fill="none" className={className}>
      <path
        d="M0 10 Q15 0 30 10 Q45 20 60 10 Q75 0 90 10 Q105 20 120 10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

// 散落装饰组合
interface ScatteredDecorationsProps {
  className?: string;
}

export function ScatteredDecorations({ className = '' }: ScatteredDecorationsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* 左上 */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-8 h-8 text-accent opacity-40"
        animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <SmallStar className="w-full h-full" />
      </motion.div>
      
      {/* 右上 */}
      <motion.div 
        className="absolute top-[15%] right-[10%] w-10 h-10 text-primary-light opacity-30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <MoonDecoration className="w-full h-full" />
      </motion.div>
      
      {/* 左下 */}
      <motion.div 
        className="absolute bottom-[20%] left-[8%] w-6 h-6 text-secondary opacity-40"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <HeartDecoration className="w-full h-full" />
      </motion.div>
      
      {/* 右下 */}
      <motion.div 
        className="absolute bottom-[15%] right-[5%] w-12 h-8 text-accent-light opacity-30"
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <CloudDecoration className="w-full h-full" />
      </motion.div>
      
      {/* 中间偏右 */}
      <motion.div 
        className="absolute top-[40%] right-[15%] w-6 h-6 text-primary opacity-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <SmallStar className="w-full h-full" />
      </motion.div>
    </div>
  );
}
