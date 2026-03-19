/**
 * 油画展示框组件
 * 素雅风格，极简细边框
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PaintingFrameProps {
  src: string;
  alt?: string;
  label?: string;
  aspectRatio?: string;
}

export function PaintingFrame({ 
  src, 
  alt = '油画', 
  label = 'Destiny Witness',
  aspectRatio = '4/5'
}: PaintingFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* 极简细边框 */}
      <div className="relative p-1 border border-[#d4d0c8]">
        <div 
          className="relative overflow-hidden bg-[#f0efe9]"
          style={{ aspectRatio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-90"
          />
        </div>
      </div>
      {/* 极简标签 */}
      {label && (
        <div className="mt-6 text-center">
          <p className="text-[10px] tracking-[0.15em] text-[#aaa]">{label}</p>
        </div>
      )}
    </motion.div>
  );
}
