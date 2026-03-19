'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showTagline = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { logo: 'text-xl', tagline: 'text-xs' },
    md: { logo: 'text-3xl', tagline: 'text-sm' },
    lg: { logo: 'text-5xl', tagline: 'text-base' },
  };

  return (
    <motion.div 
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        {/* Logo Icon - 手绘风格的爪印 */}
        <LogoIcon size={size} />
        
        {/* 品牌名称 */}
        <div className="flex flex-col">
          <span className={`${sizes[size].logo} font-semibold text-foreground tracking-wider`}>
            百澤
          </span>
          <span className={`text-primary-light tracking-[0.3em] ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
            PACTZO
          </span>
        </div>
      </div>
      
      {showTagline && (
        <motion.p 
          className={`${sizes[size].tagline} text-text-secondary mt-2 tracking-wide`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          以东方智慧，寻找命定之宠
        </motion.p>
      )}
    </motion.div>
  );
}

interface LogoIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LogoIcon({ size = 'md', className = '' }: LogoIconProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.svg
      viewBox="0 0 60 60"
      fill="none"
      className={`${iconSizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {/* 外圈 - 水墨晕染效果 */}
      <circle 
        cx="30" 
        cy="30" 
        r="28" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="currentColor"
        fillOpacity="0.05"
        className="text-primary"
      />
      
      {/* 爪印中心 */}
      <ellipse 
        cx="30" 
        cy="35" 
        rx="10" 
        ry="8" 
        fill="currentColor"
        className="text-primary"
        opacity="0.8"
      />
      
      {/* 爪印肉垫 - 四个小圆 */}
      <circle cx="20" cy="24" r="5" fill="currentColor" className="text-primary" opacity="0.7" />
      <circle cx="30" cy="20" r="5" fill="currentColor" className="text-primary" opacity="0.7" />
      <circle cx="40" cy="24" r="5" fill="currentColor" className="text-primary" opacity="0.7" />
      <circle cx="25" cy="28" r="4" fill="currentColor" className="text-primary" opacity="0.6" />
      <circle cx="35" cy="28" r="4" fill="currentColor" className="text-primary" opacity="0.6" />
      
      {/* 装饰性虚线 */}
      <circle 
        cx="30" 
        cy="30" 
        r="25" 
        stroke="currentColor" 
        strokeWidth="1" 
        fill="none"
        strokeDasharray="4 4"
        className="text-secondary"
        opacity="0.5"
      />
    </motion.svg>
  );
}

// 简约版 Logo（仅文字）
export function LogoText({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-wider ${className}`}>
      <span className="text-foreground">百澤</span>
      <span className="text-primary-light text-xs ml-1 tracking-[0.2em]">PACTZO</span>
    </span>
  );
}
