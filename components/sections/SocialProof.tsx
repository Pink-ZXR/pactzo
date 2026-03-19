'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BulyDivider, BulyBadge, BulyHerbs } from '@/components/illustrations';

/**
 * Social Proof 社交证明模块
 * 
 * @context 首页营销模块 - 建立信任感
 * @style Buly风格 - 复古药剂师、植物元素、精细线条
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
      className="text-center"
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl md:text-5xl font-light text-primary tracking-tight">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl text-primary">{suffix}</span>
      </div>
      <p className="text-text-secondary text-sm mt-2 tracking-wide">{label}</p>
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full opacity-20">
        <BulyHerbs className="w-32 h-20 text-primary-light" />
      </div>
      <div className="absolute bottom-0 right-0 w-full opacity-20 rotate-180">
        <BulyHerbs className="w-32 h-20 text-primary-light ml-auto" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* 顶部装饰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <BulyBadge className="w-16 h-16 text-primary opacity-60" />
        </motion.div>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Trusted by Pet Lovers
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground">
            已有 <span className="text-primary font-normal">10,000+</span> 宠物主
            <br />
            找到了他们的灵宠
          </h2>
        </motion.div>

        {/* 分隔线 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <BulyDivider className="w-full max-w-md mx-auto text-sand" />
        </motion.div>

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

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-xs italic">
            "以东方智慧，寻找命定之宠"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
