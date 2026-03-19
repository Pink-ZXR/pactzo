'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { BulyHerbs, BulyMysticSymbol, BulyDivider } from '@/components/illustrations';

/**
 * Newsletter 订阅模块
 * 
 * @context 首页营销模块 - 用户留存，收集Email
 * @style Buly风格 - 复古信封、植物元素、神秘符号
 */

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // 这里可以添加实际的订阅逻辑
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background-alt/30 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
        <BulyHerbs className="w-full h-full text-primary" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 rotate-180">
        <BulyHerbs className="w-full h-full text-primary" />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* 顶部装饰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <BulyMysticSymbol className="w-12 h-12 text-primary opacity-50" />
        </motion.div>

        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Monthly Guide
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
            每月人宠运势指南
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            订阅我们的运势指南，获取专属于你和你的命定之宠的每月运势分析、养宠建议和五行调和小贴士
          </p>
        </motion.div>

        {/* 分隔线 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <BulyDivider className="w-full max-w-xs mx-auto text-sand" />
        </motion.div>

        {/* 订阅表单 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入您的邮箱地址"
                    required
                    className="w-full px-5 py-3 bg-cream border-2 border-sand rounded-full text-foreground placeholder:text-text-muted focus:outline-none focus:border-primary-light transition-colors"
                  />
                </div>
                <Button type="submit" size="lg" className="whitespace-nowrap">
                  立即订阅
                </Button>
              </div>
              <p className="text-text-muted text-xs text-center">
                我们尊重您的隐私，不会向第三方分享您的信息
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 bg-cream border border-sand rounded-[20px]"
            >
              <div className="flex justify-center mb-4">
                <BulyMysticSymbol className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                订阅成功！
              </h3>
              <p className="text-text-secondary text-sm">
                感谢您的订阅，我们会将每月运势指南发送至 {email}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 订阅权益 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <p className="text-2xl font-light text-primary mb-1">📧</p>
            <p className="text-text-secondary text-xs">每月运势</p>
          </div>
          <div>
            <p className="text-2xl font-light text-primary mb-1">🐾</p>
            <p className="text-text-secondary text-xs">养宠建议</p>
          </div>
          <div>
            <p className="text-2xl font-light text-primary mb-1">☯️</p>
            <p className="text-text-secondary text-xs">五行调和</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
