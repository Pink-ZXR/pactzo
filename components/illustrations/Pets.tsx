'use client';

import { motion } from 'framer-motion';

interface IllustrationProps {
  className?: string;
  animate?: boolean;
}

// 手绘风格猫咪插画
export function CatIllustration({ className = '', animate = true }: IllustrationProps) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* 身体 */}
      <ellipse cx="60" cy="75" rx="30" ry="25" fill="currentColor" opacity="0.15" />
      <path
        d="M30 75 Q30 50 60 50 Q90 50 90 75 Q90 100 60 100 Q30 100 30 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={{ strokeDasharray: '3 2' }}
      />
      
      {/* 头部 */}
      <circle cx="60" cy="40" r="22" fill="currentColor" opacity="0.1" />
      <circle cx="60" cy="40" r="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      
      {/* 耳朵 */}
      <path
        d="M42 25 L38 8 L52 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M78 25 L82 8 L68 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* 眼睛 */}
      <ellipse cx="50" cy="38" rx="4" ry="5" fill="currentColor" />
      <ellipse cx="70" cy="38" rx="4" ry="5" fill="currentColor" />
      <circle cx="51" cy="36" r="1.5" fill="white" />
      <circle cx="71" cy="36" r="1.5" fill="white" />
      
      {/* 鼻子 */}
      <path
        d="M58 46 L60 49 L62 46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.6"
      />
      
      {/* 胡须 */}
      <path d="M40 44 L28 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 48 L26 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 44 L92 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 48 L94 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* 尾巴 */}
      <motion.path
        d="M90 80 Q100 70 105 80 Q110 95 100 105"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: [
          "M90 80 Q100 70 105 80 Q110 95 100 105",
          "M90 80 Q100 65 108 78 Q115 92 102 108",
          "M90 80 Q100 70 105 80 Q110 95 100 105"
        ]} : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// 手绘风格狗狗插画
export function DogIllustration({ className = '', animate = true }: IllustrationProps) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* 身体 */}
      <ellipse cx="55" cy="78" rx="32" ry="22" fill="currentColor" opacity="0.15" />
      <ellipse cx="55" cy="78" rx="32" ry="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      
      {/* 头部 */}
      <ellipse cx="60" cy="40" rx="24" ry="20" fill="currentColor" opacity="0.1" />
      <ellipse cx="60" cy="40" rx="24" ry="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
      
      {/* 耳朵（垂耳） */}
      <path
        d="M38 30 Q28 35 30 55 Q32 60 38 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M38 30 Q28 35 30 55 Q32 60 38 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M82 30 Q92 35 90 55 Q88 60 82 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M82 30 Q92 35 90 55 Q88 60 82 55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* 眼睛 */}
      <circle cx="50" cy="38" r="4" fill="currentColor" />
      <circle cx="70" cy="38" r="4" fill="currentColor" />
      <circle cx="51" cy="36" r="1.5" fill="white" />
      <circle cx="71" cy="36" r="1.5" fill="white" />
      
      {/* 鼻子 */}
      <ellipse cx="60" cy="50" rx="6" ry="4" fill="currentColor" opacity="0.8" />
      <ellipse cx="61" cy="49" rx="2" ry="1" fill="white" opacity="0.4" />
      
      {/* 嘴巴 */}
      <path
        d="M54 54 Q60 60 66 54"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* 舌头 */}
      <motion.path
        d="M58 56 Q60 62 62 56"
        fill="currentColor"
        opacity="0.4"
        animate={animate ? { 
          d: [
            "M58 56 Q60 62 62 56",
            "M58 56 Q60 66 62 56",
            "M58 56 Q60 62 62 56"
          ]
        } : undefined}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* 尾巴 */}
      <motion.path
        d="M85 72 Q95 65 100 75 Q105 85 98 90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { 
          rotate: [-10, 10, -10],
        } : undefined}
        style={{ transformOrigin: '85px 72px' }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      
      {/* 前腿 */}
      <path d="M40 95 L38 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 95 L55 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}

// 手绘风格兔子插画
export function RabbitIllustration({ className = '', animate = true }: IllustrationProps) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* 身体 */}
      <ellipse cx="60" cy="80" rx="25" ry="22" fill="currentColor" opacity="0.15" />
      <ellipse cx="60" cy="80" rx="25" ry="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      
      {/* 头部 */}
      <circle cx="60" cy="50" r="20" fill="currentColor" opacity="0.1" />
      <circle cx="60" cy="50" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
      
      {/* 长耳朵 */}
      <motion.path
        d="M48 35 Q42 10 48 5 Q55 8 52 35"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.1"
        animate={animate ? { rotate: [-3, 3, -3] } : undefined}
        style={{ transformOrigin: '50px 35px' }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M48 35 Q42 10 48 5 Q55 8 52 35"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        animate={animate ? { rotate: [-3, 3, -3] } : undefined}
        style={{ transformOrigin: '50px 35px' }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M72 35 Q78 10 72 5 Q65 8 68 35"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="currentColor"
        opacity="0.1"
        animate={animate ? { rotate: [3, -3, 3] } : undefined}
        style={{ transformOrigin: '70px 35px' }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      <motion.path
        d="M72 35 Q78 10 72 5 Q65 8 68 35"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        animate={animate ? { rotate: [3, -3, 3] } : undefined}
        style={{ transformOrigin: '70px 35px' }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      />
      
      {/* 眼睛 */}
      <circle cx="52" cy="48" r="4" fill="currentColor" />
      <circle cx="68" cy="48" r="4" fill="currentColor" />
      <circle cx="53" cy="46" r="1.5" fill="white" />
      <circle cx="69" cy="46" r="1.5" fill="white" />
      
      {/* 鼻子 */}
      <ellipse cx="60" cy="56" rx="3" ry="2" fill="currentColor" opacity="0.6" />
      
      {/* 嘴巴 (Y形) */}
      <path d="M60 58 L60 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M56 65 Q60 62 64 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* 尾巴（小圆球） */}
      <circle cx="85" cy="85" r="8" fill="currentColor" opacity="0.2" />
      <circle cx="85" cy="85" r="8" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 3" />
    </motion.svg>
  );
}
