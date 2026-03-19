'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * Social Proof 社交证明模块 - 极简风格
 */

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function AnimatedNumber({ value, suffix, label, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000 }}
      className="text-center group"
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl md:text-6xl font-extralight text-[var(--foreground)] tracking-tight">
          {count.toLocaleString()}
        </span>
        <span className="text-xl md:text-2xl text-[var(--accent)] font-light">{suffix}</span>
      </div>
      <div className="w-8 h-px bg-[var(--sand)] mx-auto mt-4 mb-3 group-hover:w-12 group-hover:bg-[var(--primary)] transition-all duration-500" />
      <p className="text-[var(--text-secondary)] text-xs tracking-[0.1em]">{label}</p>
    </motion.div>
  );
}

export function SocialProof() {
  const stats = [
    { value: 12847, suffix: '+', label: '宠物主找到命定之宠' },
    { value: 98, suffix: '%', label: '用户满意度' },
    { value: 50, suffix: '+', label: '宠物品种匹配' },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-[var(--sand)]">
      <div className="max-w-4xl mx-auto px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[var(--text-muted)] text-xs tracking-[0.3em] uppercase mb-4">
            Trusted by Pet Lovers
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight text-[var(--foreground)] tracking-wide">
            已有 <span className="text-[var(--accent)] font-light">10,000+</span> 宠物主
            <br />
            找到了他们的灵宠
          </h2>
        </motion.div>

        {/* 分隔线 */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-px bg-[var(--primary)] mx-auto mb-16 opacity-30"
        />

        {/* 数据统计 */}
        <div className="grid grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedNumber
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
            />
          ))}
        </div>

        {/* 底部文案 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-[var(--text-muted)] text-xs tracking-[0.2em]"
        >
          以东方智慧，寻找命定之宠
        </motion.p>
      </div>
    </section>
  );
}
