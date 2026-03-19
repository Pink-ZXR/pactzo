'use client';

import { motion } from 'framer-motion';

interface ElementProps {
  className?: string;
  color?: string;
}

// 金元素
export function MetalElement({ className = '', color }: ElementProps) {
  return (
    <motion.svg viewBox="0 0 60 60" fill="none" className={className}>
      <circle cx="30" cy="30" r="25" stroke={color || "currentColor"} strokeWidth="2" fill={color || "currentColor"} fillOpacity="0.1" />
      <circle cx="30" cy="30" r="18" stroke={color || "currentColor"} strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="10" fill={color || "currentColor"} fillOpacity="0.2" />
      <text x="30" y="35" textAnchor="middle" fill={color || "currentColor"} fontSize="14" fontWeight="500">金</text>
    </motion.svg>
  );
}

// 木元素
export function WoodElement({ className = '', color }: ElementProps) {
  return (
    <motion.svg viewBox="0 0 60 60" fill="none" className={className}>
      <path d="M30 55 L30 30" stroke={color || "currentColor"} strokeWidth="3" strokeLinecap="round" />
      <path d="M30 35 L20 25" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 30 L40 20" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="30" cy="18" rx="18" ry="14" fill={color || "currentColor"} fillOpacity="0.15" />
      <ellipse cx="30" cy="18" rx="18" ry="14" stroke={color || "currentColor"} strokeWidth="2" fill="none" />
      <text x="30" y="23" textAnchor="middle" fill={color || "currentColor"} fontSize="12" fontWeight="500">木</text>
    </motion.svg>
  );
}

// 水元素
export function WaterElement({ className = '', color }: ElementProps) {
  return (
    <motion.svg viewBox="0 0 60 60" fill="none" className={className}>
      <path 
        d="M30 8 Q45 25 45 38 Q45 52 30 52 Q15 52 15 38 Q15 25 30 8" 
        fill={color || "currentColor"} 
        fillOpacity="0.15" 
      />
      <path 
        d="M30 8 Q45 25 45 38 Q45 52 30 52 Q15 52 15 38 Q15 25 30 8" 
        stroke={color || "currentColor"} 
        strokeWidth="2" 
        fill="none"
      />
      <path d="M22 35 Q27 38 32 35 Q37 32 42 35" stroke={color || "currentColor"} strokeWidth="1.5" fill="none" opacity="0.5" />
      <text x="30" y="48" textAnchor="middle" fill={color || "currentColor"} fontSize="12" fontWeight="500">水</text>
    </motion.svg>
  );
}

// 火元素
export function FireElement({ className = '', color }: ElementProps) {
  return (
    <motion.svg viewBox="0 0 60 60" fill="none" className={className}>
      <path 
        d="M30 5 Q42 20 42 32 Q42 50 30 55 Q18 50 18 32 Q18 20 30 5" 
        fill={color || "currentColor"} 
        fillOpacity="0.15" 
      />
      <path 
        d="M30 5 Q42 20 42 32 Q42 50 30 55 Q18 50 18 32 Q18 20 30 5" 
        stroke={color || "currentColor"} 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M30 25 Q36 32 36 38 Q36 48 30 50 Q24 48 24 38 Q24 32 30 25" 
        fill={color || "currentColor"} 
        fillOpacity="0.2"
      />
      <text x="30" y="46" textAnchor="middle" fill={color || "currentColor"} fontSize="12" fontWeight="500">火</text>
    </motion.svg>
  );
}

// 土元素
export function EarthElement({ className = '', color }: ElementProps) {
  return (
    <motion.svg viewBox="0 0 60 60" fill="none" className={className}>
      <rect x="12" y="20" width="36" height="30" rx="4" fill={color || "currentColor"} fillOpacity="0.15" />
      <rect x="12" y="20" width="36" height="30" rx="4" stroke={color || "currentColor"} strokeWidth="2" fill="none" />
      <line x1="12" y1="35" x2="48" y2="35" stroke={color || "currentColor"} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="30" y="30" textAnchor="middle" fill={color || "currentColor"} fontSize="12" fontWeight="500">土</text>
    </motion.svg>
  );
}

// 五行动画组件
interface FiveElementsAnimationProps {
  className?: string;
  activeElement?: 'metal' | 'wood' | 'water' | 'fire' | 'earth';
}

export function FiveElementsAnimation({ className = '', activeElement }: FiveElementsAnimationProps) {
  const elements = [
    { key: 'metal', Element: MetalElement, color: 'var(--wuxing-metal)', angle: 0 },
    { key: 'wood', Element: WoodElement, color: 'var(--wuxing-wood)', angle: 72 },
    { key: 'water', Element: WaterElement, color: 'var(--wuxing-water)', angle: 144 },
    { key: 'fire', Element: FireElement, color: 'var(--wuxing-fire)', angle: 216 },
    { key: 'earth', Element: EarthElement, color: 'var(--wuxing-earth)', angle: 288 },
  ];

  return (
    <div className={`relative w-64 h-64 ${className}`}>
      {/* 中心圆环 */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-sand" />
      </motion.div>

      {/* 五行元素 */}
      {elements.map(({ key, Element, color, angle }, index) => {
        const isActive = activeElement === key;
        const x = Math.cos((angle - 90) * Math.PI / 180) * 80;
        const y = Math.sin((angle - 90) * Math.PI / 180) * 80;

        return (
          <motion.div
            key={key}
            className="absolute w-14 h-14"
            style={{
              left: `calc(50% + ${x}px - 28px)`,
              top: `calc(50% + ${y}px - 28px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isActive ? 1.2 : 1,
            }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              animate={isActive ? { 
                scale: [1, 1.1, 1],
              } : undefined}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Element color={color} className="w-full h-full" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* 中心太极图案 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-accent opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
