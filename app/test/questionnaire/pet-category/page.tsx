'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * 极简风格 - 宠物类型选择页
 */

const categories = [
  { id: 'cat', en: 'CAT', zh: '猫咪', icon: '○', desc: '独立优雅的灵魂伴侣' },
  { id: 'dog', en: 'DOG', zh: '狗狗', icon: '◇', desc: '忠诚热情的挚友' },
  { id: 'rabbit', en: 'RABBIT', zh: '兔子', icon: '△', desc: '温柔安静的小精灵' },
  { id: 'small', en: 'SMALL PET', zh: '小宠', icon: '□', desc: '仓鼠、龙猫、刺猬等' },
  { id: 'bird', en: 'BIRD', zh: '鸟类', icon: '◁', desc: '灵动歌唱的羽友' },
  { id: 'reptile', en: 'REPTILE', zh: '爬宠', icon: '▽', desc: '冷酷外表下的静谧' },
  { id: 'fish', en: 'AQUATIC', zh: '水族', icon: '◎', desc: '沉默而治愈的陪伴' },
  { id: 'all', en: 'SURPRISE ME', zh: '跨类推荐', icon: '✦', desc: '让命运来决定' },
];

export default function PetCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    sessionStorage.setItem('pet_category', id);
    
    setTimeout(() => {
      router.push('/test/loading');
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--sand)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] uppercase">
            百澤
          </Link>
          <span className="text-xs tracking-[0.2em] text-[var(--text-muted)]"><span className="font-en"><span className="font-en">05 / 06</span></span></span>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-32">
        <div className="max-w-4xl mx-auto w-full">
          {/* 步骤标识 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-[var(--text-muted)]"><span className="font-en">Step 05</span></span>
              <span className="text-xs tracking-[0.2em] text-[var(--accent)] font-medium">CATEGORY</span>
            </div>
            <div className="w-12 h-px bg-[var(--primary)] mt-4 opacity-30" />
          </motion.div>

          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.05em] leading-tight mb-4 text-[var(--foreground)]">
              CHOOSE YOUR PATH
            </h1>
            <p className="text-sm tracking-[0.1em] text-[var(--text-secondary)]">
              选择你心仪的宠物类型，或让命运为你做出选择
            </p>
          </motion.div>

          {/* 选项网格 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--sand)]"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => handleSelect(cat.id)}
                className={`bg-[var(--cream)] p-6 md:p-8 text-left transition-all duration-300 group ${
                  selected === cat.id ? 'bg-[var(--primary)] text-white shadow-[var(--shadow-lg)]' : 'hover:bg-[var(--background-alt)] hover:shadow-[var(--shadow-sm)]'
                }`}
              >
                <div className={`text-2xl md:text-3xl mb-4 transition-all duration-300 ${
                  selected === cat.id ? 'text-white scale-110' : 'text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:scale-110'
                }`}>
                  {cat.icon}
                </div>
                <p className="text-xs tracking-[0.2em] mb-1 font-medium">{cat.en}</p>
                <p className={`text-xs tracking-[0.15em] mb-2 ${
                  selected === cat.id ? 'text-[var(--secondary-light)]' : 'text-[var(--text-muted)]'
                }`}>
                  {cat.zh}
                </p>
                <p className={`text-xs leading-relaxed ${
                  selected === cat.id ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'
                }`}>
                  {cat.desc}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* 返回按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link
              href="/test/renhe"
              className="text-xs tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors font-en"
            >
              ← <span className="font-en">Back</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 底部进度 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[var(--sand)]">
        <motion.div 
          className="h-full bg-[var(--primary)]"
          initial={{ width: '66.66%' }}
          animate={{ width: '83.33%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </main>
  );
}
