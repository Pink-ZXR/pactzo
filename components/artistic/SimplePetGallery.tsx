'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SimplePetGalleryProps {
  className?: string;
}

export default function SimplePetGallery({ className = '' }: SimplePetGalleryProps) {
  return (
    <section 
      className={className}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
      }}
    >
      {/* 背景图片 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image 
          src="/illustrations/new-pets-collection.jpg"
          alt="温馨的宠物大家庭"
          fill
          style={{
            objectFit: 'cover',
          }}
          priority
          sizes="100vw"
        />
      </div>
      
      {/* 文字内容 */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          padding: '40px 60px',
          background: 'rgba(249, 248, 246, 0.85)',
          borderRadius: '8px',
        }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          你的契合之选
        </motion.h2>
        <motion.p
          className="text-sm md:text-base text-[var(--text-secondary)] mt-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        >
          每一只宠物，都是命中注定的相遇
        </motion.p>
      </div>
    </section>
  );
}