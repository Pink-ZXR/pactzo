'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BulyDivider, BulyMoonPhase } from '@/components/illustrations';

/**
 * FAQ 常见问题模块
 * 
 * @context 首页营销模块 - 解决用户顾虑，提高转化
 * @style Buly风格 - 复古优雅、月相元素
 */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-001',
    question: '我不记得出生时辰怎么办？',
    answer: '我们的测算主要基于出生年月日，时辰是可选信息。即使不记得具体时辰，也能获得准确的五行属性分析和宠物匹配建议。',
  },
  {
    id: 'faq-002',
    question: '测算免费吗？',
    answer: '是的，基础的五行属性分析和宠物匹配建议完全免费。我们希望帮助每一位爱宠人士找到最适合自己的宠物伴侣。',
  },
  {
    id: 'faq-003',
    question: '五行匹配真的准吗？',
    answer: '我们的算法基于传统八字五行理论，结合现代宠物行为学，为您提供参考建议。当然，每只宠物都是独特的个体，实际相处中还需要您的爱心和耐心。',
  },
  {
    id: 'faq-004',
    question: '可以匹配哪些宠物类型？',
    answer: '目前支持猫咪、狗狗、兔子三大类宠物的品种匹配。我们收录了50+种常见宠物品种的性格特点和五行属性。',
  },
  {
    id: 'faq-005',
    question: '匹配结果可以保存吗？',
    answer: '目前版本暂不支持保存功能。建议您截图保存结果，或订阅我们的「每月人宠运势指南」获取更多养宠建议。',
  },
];

function FAQCard({ item, isOpen, onToggle }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-sand/50 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-foreground font-medium pr-4 group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
        >
          +
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-secondary text-sm leading-relaxed pl-4 border-l-2 border-accent/30">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-001');

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Questions & Answers
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
            常见问题
          </h2>
          
          {/* 月相装饰 */}
          <div className="flex justify-center mt-6 opacity-40">
            <BulyMoonPhase className="w-48 h-12 text-primary" />
          </div>
        </motion.div>

        {/* FAQ 列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-cream border border-sand rounded-[20px] p-6 md:p-8"
        >
          {faqData.map((item) => (
            <FAQCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </motion.div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="mb-4">
            <BulyDivider className="w-32 mx-auto text-sand" />
          </div>
          <p className="text-text-muted text-sm">
            还有其他问题？欢迎随时联系我们
          </p>
        </motion.div>
      </div>
    </section>
  );
}
