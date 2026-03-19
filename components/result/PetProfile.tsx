/**
 * 宠物档案组件
 * 显示宠物名称、类别、中文名
 */

'use client';

import { motion } from 'framer-motion';

interface PetProfileProps {
  name: string;
  nameCn: string;
  category: string;
}

export function PetProfile({ name, nameCn, category }: PetProfileProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-4"
    >
      <p className="text-xs tracking-[0.3em] text-[#6b2222] mb-4 font-semibold">{category}</p>
      <h1 
        className="text-3xl md:text-5xl font-light mb-3 text-[#2a2a2a]"
        style={{ 
          fontFamily: "'Cormorant', 'ZCOOL SongTi', serif",
          letterSpacing: '0.12em'
        }}
      >
        {name.toUpperCase()}
      </h1>
      <p 
        className="text-lg tracking-[0.4em] text-[#666]"
        style={{ fontFamily: "'ZCOOL XiaoWei', 'Noto Serif SC', serif" }}
      >
        {nameCn}
      </p>
    </motion.div>
  );
}
