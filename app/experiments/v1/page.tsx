'use client';

/**
 * @experiment v1
 * @base main (app/page.tsx)
 * @date 2026-03-18
 * @changes 基线版本，与主版本完全一致
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { SocialProof } from '../../components/sections/SocialProof';
import { DestinySamples } from '../../components/sections/DestinySamples';

/**
 * 百澤 BAIZE - 极简风格首页
 * 
 * Maison Margiela 风格 + 莫兰迪森林绿
 * - 大量留白
 * - 细体字体 + 大字间距
 * - 全屏区块
 */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--primary)]">
      {/* 导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link href="/" className="text-xs tracking-[0.3em] font-light text-[var(--foreground)]">
            百澤
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xs tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {/* 全屏菜单 */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-[var(--background)] flex items-center justify-center"
        >
          <nav className="text-center space-y-8">
            {['Begin', 'About', 'Method'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={item === 'Begin' ? '/test/questionnaire/birthday' : '#'}
                  className="block text-4xl md:text-6xl font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Hero Section - 分屏布局 */}
      <section className="min-h-screen flex flex-col md:flex-row">
        {/* 左侧 - 文字内容 */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start px-8 md:px-16 lg:px-24 pt-28 pb-16 md:pt-20 md:pb-20">
          <motion.div 
            className="max-w-lg text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* 品牌标识 */}
            <h1 className="text-[12vw] md:text-[6vw] font-extralight tracking-[0.2em] leading-none mb-4 text-[var(--foreground)]">
              百澤
            </h1>
            
            <p className="text-sm md:text-base font-light tracking-[0.4em] mb-12 text-[var(--primary)] uppercase font-en">
              Pactzo
            </p>

            {/* 副标题 */}
            <div className="mb-14 space-y-3">
              <p className="text-sm md:text-base tracking-[0.15em] text-[var(--accent)] font-normal font-en">
                Discover Your Destined Companion
              </p>
              <p className="text-sm tracking-[0.08em] text-[var(--text-secondary)]">找到与你契合的宠物</p>
              <p className="text-xs tracking-[0.15em] text-[var(--text-muted)]">基于东方五行智慧的宠物匹配</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/test/questionnaire/birthday">
                <button className="group relative px-14 py-5 bg-[var(--primary)] text-white text-xs tracking-[0.25em] uppercase shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-primary-hover)] hover:-translate-y-1 active:translate-y-0 active:shadow-[var(--shadow-sm)] transition-all duration-300 font-en">
                  <span className="relative z-10">Begin</span>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* 右侧 - 白泽插画 */}
        <motion.div 
          className="relative w-full md:w-[45%] min-h-[60vh] md:min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <Image
            src="/hero-baize.png"
            alt="白泽神兽"
            fill
            className="object-cover object-center"
            priority
          />
          {/* 左侧渐变融合 */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent hidden md:block" />
          {/* 顶部渐变（移动端） */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--background)] to-transparent md:hidden" />
          {/* 底部渐变 */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </motion.div>

        {/* 滚动提示 */}
        <motion.div 
          className="absolute bottom-12 left-8 md:left-16 lg:left-24"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-[var(--sand)]" />
        </motion.div>
      </section>

      {/* 特色区块 - 编号式布局 */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* 区块标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-start gap-4"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-[var(--sand)] flex-shrink-0 mt-1">
              <Image
                src="/pets/cat-ink.png"
                alt="百澤"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-[var(--text-muted)] mb-3 font-en">Our Method</p>
              <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.08em] text-[var(--foreground)]">四维匹配体系</h2>
            </div>
          </motion.div>

          {[
            {
              num: '01',
              title: 'WUXING',
              subtitle: '五行契合',
              desc: '根据你的出生日期推算五行属性，从命理层面解读你与宠物的能量契合。金木水火土，万物皆有归属。',
            },
            {
              num: '02',
              title: 'TIANSHI',
              subtitle: '天时相应',
              desc: '分析你的作息习惯与精力状态，找到与你生活节奏同频的宠物伙伴。时间的韵律，是相处的基础。',
            },
            {
              num: '03',
              title: 'DILI',
              subtitle: '地利相宜',
              desc: '考量你的居住空间与环境稳定性，匹配最适应你生活场景的宠物。空间的边界，是舒适的起点。',
            },
            {
              num: '04',
              title: 'RENHE',
              subtitle: '人和缘定',
              desc: '洞察你的陪伴需求与情感期待，寻找与你灵魂契合的命定之宠。关系的本质，是彼此的成全。',
            },
          ].map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="grid grid-cols-12 gap-4 py-16 border-t border-[var(--sand)] group hover:bg-[var(--background-alt)]/50 transition-colors duration-500 -mx-6 px-6"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="text-xs text-[var(--warm-gray)] tracking-[0.2em] font-light">{item.num}</span>
              </div>
              <div className="col-span-10 md:col-span-3">
                <h3 className="text-2xl md:text-3xl font-extralight tracking-[0.15em] text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-2 mt-4 md:mt-0">
                <p className="text-sm tracking-[0.3em] text-[var(--accent)] font-medium">
                  {item.subtitle}
                </p>
              </div>
              <div className="col-span-12 md:col-span-6 mt-4 md:mt-0">
                <p className="text-sm font-light leading-relaxed text-[var(--text-secondary)] max-w-md">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 宠物类型展示 */}
      <section className="py-32 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.3em] text-[var(--text-muted)] mb-4">CATEGORIES</p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-[var(--foreground)]">
              七种命定
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--sand)]">
            {[
              { en: 'CAT', zh: '猫咪', icon: '○' },
              { en: 'DOG', zh: '狗狗', icon: '◇' },
              { en: 'RABBIT', zh: '兔子', icon: '△' },
              { en: 'SMALL', zh: '小宠', icon: '□' },
              { en: 'BIRD', zh: '鸟类', icon: '◁' },
              { en: 'REPTILE', zh: '爬宠', icon: '▽' },
              { en: 'FISH', zh: '水族', icon: '◎' },
              { en: 'ALL', zh: '跨类推荐', icon: '✦' },
            ].map((item, index) => (
              <motion.div
                key={item.en}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[var(--background-alt)] p-8 md:p-12 text-center hover:bg-[var(--cream)] hover:shadow-[var(--shadow-md)] transition-all duration-400 cursor-pointer group"
              >
                <div className="text-2xl md:text-3xl mb-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-xs tracking-[0.2em] mb-1 text-[var(--foreground)] font-medium">{item.en}</p>
                <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">{item.zh}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof 社交证明 */}
      <SocialProof />

      {/* Destiny Samples 缘分案例 */}
      <DestinySamples />

      {/* 品牌介绍 */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base font-light leading-loose text-[var(--text-secondary)] tracking-wide">
              百澤相信，人与宠物的相遇并非偶然。
              <br /><br />
              我们将东方五行智慧与现代算法相结合，
              <br />
              通过<span className="text-[var(--primary)] font-medium">天时、地利、人和</span>三重维度，
              <br />
              为你寻找命中注定的伴侣。
              <br /><br />
              <span className="text-xs tracking-[0.2em] text-[var(--warm-gray)]">
                BAIZE — WHERE DESTINY MEETS COMPANIONSHIP
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA 区块 - Maison Margiela 分屏排版 */}
      <section className="py-24 md:py-32 bg-[var(--background)]">
        {/* 第一行：左图右文 */}
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* 左侧图片 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--background-alt)]"
          >
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full max-w-sm">
                <Image
                  src="/pets/cat-ink.png"
                  alt="百澤"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
          {/* 右侧文字 */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-sm text-center"
            >
              <p className="text-sm italic text-[var(--text-secondary)] mb-6">Pactzo / begin</p>
              <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                我们相信，每一只宠物都是命中注定的相遇。通过四维匹配体系，从五行、天时、地利、人和四个维度，为你寻找最契合的灵魂伴侣。
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
                仅需 2 分钟，开启你的缘分之旅。
              </p>
              <Link href="/test/questionnaire/birthday" className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] border-b border-[var(--primary)] pb-1 hover:opacity-50 transition-opacity">
                Discover More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 第二行：左文右图 */}
        <div className="flex flex-col md:flex-row-reverse min-h-[60vh]">
          {/* 右侧图片 - 猫咪 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--primary)] overflow-hidden"
          >
            {/* 装饰边框线 */}
            <div className="absolute inset-8 border border-white/10 pointer-events-none" />
            <div className="absolute inset-12 border border-white/5 pointer-events-none" />
            
            {/* 四角装饰 */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />

            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                {/* 复古插画边框 */}
                <div className="absolute -inset-4 border-2 border-white/20 rounded-full" />
                <div className="absolute -inset-8 border border-white/10 rounded-full" />
                {/* 装饰虚线 */}
                <div className="absolute -inset-12 border border-dashed border-white/5 rounded-full" />
                
                {/* 图片容器 */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--primary-dark)]/50">
                  <Image
                    src="/pets/dog-white.png"
                    alt="宠物"
                    fill
                    className="object-contain scale-110"
                  />
                  {/* 边缘柔化渐变 */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(42,56,50,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>
          {/* 左侧文字 */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-sm text-center"
            >
              <p className="text-sm italic text-[var(--text-secondary)] mb-6">Destiny / awaits</p>
              <p className="text-sm leading-relaxed text-[var(--foreground)] mb-4">
                白泽，通万物之情，知鬼神之事。我们以白泽为名，愿成为连接你与命定之宠的桥梁。
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-8">
                每一次匹配，都是一段新故事的开始。
              </p>
              <Link href="/test/questionnaire/birthday" className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] border-b border-[var(--primary)] pb-1 hover:opacity-50 transition-opacity">
                Start Journey
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 border-t border-[var(--sand)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs tracking-[0.3em] text-[var(--text-muted)]">
            百澤 BAIZE &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs tracking-[0.1em] text-[var(--text-muted)]">
            测试结果仅供参考，选择宠物请结合实际情况
          </p>
        </div>
      </footer>
    </main>
  );
}
