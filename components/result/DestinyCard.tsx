/**
 * 命定之约卡片组件
 * 素雅风格文字展示
 */

'use client';

import { motion } from 'framer-motion';

interface DestinyCardProps {
  title?: string;
  subtitle?: string;
  content: string;
  brand?: string;
}

export function DestinyCard({ 
  title = '命定之约',
  subtitle = 'A Destiny Sealed',
  content,
  brand = '百澤 PACTZO'
}: DestinyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="lg:pt-8"
    >
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] text-[#999] mb-3 uppercase">{subtitle}</p>
        <h3 
          className="text-xl md:text-2xl font-normal text-[#2a2a2a] mb-8 tracking-[0.1em]"
          style={{ fontFamily: "'ZCOOL SongTi', 'Noto Serif SC', serif" }}
        >
          {title}
        </h3>
        <p 
          className="text-base font-normal leading-[2.4] text-[#444] mb-8"
          style={{ 
            fontFamily: "'Noto Serif SC', 'ZCOOL XiaoWei', serif",
            letterSpacing: '0.03em'
          }}
        >
          {content}
        </p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-[#d4d0c8]" />
          <span className="text-[10px] tracking-[0.2em] text-[#aaa]">{brand}</span>
        </div>
      </div>
    </motion.div>
  );
}
