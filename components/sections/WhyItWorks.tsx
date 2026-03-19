'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BulyDivider, BulyMysticSymbol, BulyStar } from '@/components/illustrations';

/**
 * WhyItWorks 原理说明模块
 * 
 * @context 首页信任建立 - 解释五行匹配原理
 * @style Buly风格 + 现代极简几何
 * @content 极简展示+中等详细度展开
 */

const wuxingData = [
  { 
    element: '金', 
    en: 'Metal',
    color: 'text-wuxing-metal',
    bg: 'bg-wuxing-metal/10',
    desc: '坚毅、果断',
    pets: ['金毛寻回犬', '英国短毛猫']
  },
  { 
    element: '木', 
    en: 'Wood',
    color: 'text-wuxing-wood',
    bg: 'bg-wuxing-wood/10',
    desc: '温和、生长',
    pets: ['布偶猫', '垂耳兔']
  },
  { 
    element: '水', 
    en: 'Water',
    color: 'text-wuxing-water',
    bg: 'bg-wuxing-water/10',
    desc: '聪慧、流动',
    pets: ['俄罗斯蓝猫', '边境牧羊犬']
  },
  { 
    element: '火', 
    en: 'Fire',
    color: 'text-wuxing-fire',
    bg: 'bg-wuxing-fire/10',
    desc: '热情、活力',
    pets: ['柴犬', '暹罗猫']
  },
  { 
    element: '土', 
    en: 'Earth',
    color: 'text-wuxing-earth',
    bg: 'bg-wuxing-earth/10',
    desc: '稳重、包容',
    pets: ['萨摩耶', '橘猫']
  },
];

const petTypes = [
  { type: '猫', element: '木', traits: '独立优雅，如春风拂柳' },
  { type: '狗', element: '土', traits: '忠诚可靠，如大地承载' },
  { type: '兔', element: '木', traits: '温柔灵动，如草木生长' },
];

function WuxingDiagram() {
  return (
    <div className="relative w-48 h-48 mx-auto my-8">
      {/* 中心 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cream border-2 border-sand flex items-center justify-center z-10">
        <span className="text-xs text-text-secondary">能量</span>
      </div>
      
      {/* 五行环绕 */}
      {wuxingData.map((wx, index) => {
        const angle = (index * 72 - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * 70;
        const y = Math.sin(angle) * 70;
        
        return (
          <motion.div
            key={wx.element}
            className={`absolute w-10 h-10 rounded-full ${wx.bg} border border-sand/50 flex items-center justify-center`}
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <span className={`text-sm font-medium ${wx.color}`}>{wx.element}</span>
          </motion.div>
        );
      })}
      
      {/* 连接线 */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
        <circle cx="96" cy="96" r="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-sand/30" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

export function WhyItWorks() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-background-alt/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <BulyMysticSymbol className="w-8 h-8 text-sand/60" />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-3">
            为什么生辰能决定你的灵宠？
          </h2>
          <div className="flex justify-center mb-4">
            <BulyDivider className="w-24 h-4 text-sand/40" />
          </div>
        </motion.div>

        {/* 核心视觉 - 五行图 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <WuxingDiagram />
        </motion.div>

        {/* 核心文案 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <p className="text-text-secondary leading-relaxed">
            每个人的出生时刻，都带有独特的能量印记。
            就像潮汐受月亮牵引，我们与万物之间也存在微妙的共振。
            五行——金木水火土，是古人描述这种能量流动的语言。
          </p>
        </motion.div>

        {/* 展开按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <span className="text-sm">{isExpanded ? '收起' : '了解更多'}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <BulyStar className="w-4 h-4" />
            </motion.span>
          </button>
        </motion.div>

        {/* 展开内容 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-cream border border-sand rounded-[20px] p-6 md:p-8">
                {/* 五行属性表 */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-foreground mb-4 text-center">
                    五行能量属性
                  </h3>
                  <div className="grid grid-cols-5 gap-2 md:gap-4">
                    {wuxingData.map((wx) => (
                      <div key={wx.element} className="text-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${wx.bg} flex items-center justify-center mx-auto mb-2`}>
                          <span className={`text-lg font-medium ${wx.color}`}>{wx.element}</span>
                        </div>
                        <p className="text-xs text-text-muted mb-1">{wx.en}</p>
                        <p className="text-xs text-text-secondary">{wx.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 宠物类型对应 */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-foreground mb-4 text-center">
                    宠物五行归属
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {petTypes.map((pet) => (
                      <div key={pet.type} className="text-center p-4 bg-background-alt/50 rounded-xl">
                        <span className="text-2xl mb-2 block">
                          {pet.type === '猫' ? '🐱' : pet.type === '狗' ? '🐶' : '🐰'}
                        </span>
                        <p className="font-medium text-foreground mb-1">{pet.type}</p>
                        <p className="text-xs text-wuxing-wood mb-1">属{pet.element}</p>
                        <p className="text-xs text-text-secondary">{pet.traits}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 匹配原理 */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <BulyDivider className="w-16 h-4 text-sand/40" />
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xl mx-auto">
                    <span className="text-primary">相生：</span>金生水，水生木，木生火，火生土，土生金<br/>
                    <span className="text-primary">相克：</span>金克木，木克土，土克水，水克火，火克金<br/>
                    <span className="text-text-muted mt-2 block">
                      找到能补足你、或与你共鸣的能量伴侣
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
