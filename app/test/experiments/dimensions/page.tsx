/**
 * @experiment dimensions-v2
 * @base 四维匹配体系区块 - 交互反馈升级
 * @date 2026-03-18
 * @changes 编号透明度提升、英文标题下划线生长、描述文字右移
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DimensionsV2() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const dimensions = [
    { 
      num: '01', 
      title: '五行契合', 
      en: 'WUXING', 
      desc: '根据你的出生日期推算五行属性，从命理层面解读你与宠物的能量契合。金木水火土，万物皆有归属。'
    },
    { 
      num: '02', 
      title: '天时相应', 
      en: 'TIANSHI', 
      desc: '分析你的作息习惯与精力状态，找到与你生活节奏同频的宠物伙伴。时间的韵律，是相处的基础。'
    },
    { 
      num: '03', 
      title: '地利相宜', 
      en: 'DILI', 
      desc: '考量你的居住空间与环境稳定性，匹配最适应你生活场景的宠物。空间的边界，是舒适的起点。'
    },
    { 
      num: '04', 
      title: '人和缘定', 
      en: 'RENHE', 
      desc: '洞察你的陪伴需求与情感期待，寻找与你灵魂契合的命定之宠。关系的本质，是彼此的成全。'
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f4] py-24 md:py-32">
      <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        
        {/* 区块标题 */}
        <motion.div 
          className="mb-16 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-full bg-[#3a4d42]/10 flex items-center justify-center overflow-hidden">
            <Image src="/pets/cat-ink.png" alt="" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] text-[#999] mb-1 font-light">Our Method</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-[#2a2a2a] tracking-[0.05em]">
              四维匹配体系
            </h2>
          </div>
        </motion.div>

        {/* 维度列表 */}
        <div className="space-y-0">
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.num}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* 背景大编号 - 透明度随悬停变化 */}
              <motion.span 
                className="absolute -top-6 left-0 text-[8rem] md:text-[12rem] font-extralight text-[#3a4d42] leading-none pointer-events-none select-none"
                animate={{ 
                  opacity: hoveredRow === index ? 0.06 : 0.02
                }}
                transition={{ duration: 0.3 }}
              >
                {dim.num}
              </motion.span>

              {/* 内容行 */}
              <div className="relative py-12 md:py-14 border-t border-[#e5e3dd] group-last:border-b">
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                  
                  {/* 小编号 */}
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-xs text-[#999] font-light">{dim.num}</span>
                  </div>

                  {/* 英文标题 + 下划线动画 */}
                  <div className="col-span-10 md:col-span-3">
                    <h3 
                      className="text-xl md:text-2xl lg:text-3xl font-extralight text-[#2a2a2a] tracking-[0.12em] uppercase"
                      style={{ fontFamily: 'Cormorant, Georgia, serif' }}
                    >
                      {dim.en}
                    </h3>
                    
                    {/* 下划线生长动画 */}
                    <motion.div 
                      className="h-px bg-[#8b3232] mt-3"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredRow === index ? '80%' : 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>

                  {/* 中文标题 */}
                  <div className="col-span-6 md:col-span-2">
                    <p className="text-sm tracking-[0.15em] text-[#8b3232]">{dim.title}</p>
                  </div>

                  {/* 描述文字 - 悬停右移 */}
                  <div className="col-span-12 md:col-span-6 mt-2 md:mt-0">
                    <motion.p 
                      className="text-sm text-[#666] leading-[1.8] font-light"
                      animate={{ 
                        x: hoveredRow === index ? 10 : 0,
                        color: hoveredRow === index ? '#3a4d42' : '#666'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {dim.desc}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
