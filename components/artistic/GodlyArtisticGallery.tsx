'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface GodlyArtisticGalleryProps {
  className?: string;
}

export default function GodlyArtisticGallery({ className = '' }: GodlyArtisticGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, left: string, delay: number}>>([]);

  // 初始化粒子系统
  useEffect(() => {
    const particleCount = 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15
    }));
    setParticles(newParticles);
  }, []);

  // GSAP动画初始化
  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      // 分层入场动画序列
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      });

      // 背景氛围层 (0s)
      timeline.from('.ambient-background-layer', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      });

      // 主体插画层 (0.3s延迟)
      timeline.from(parallaxRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power2.out'
      }, 0.3);

      // 装饰元素层 (0.6s延迟)
      timeline.from('.floating-element', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out(1.7)'
      }, 0.6);

      // 文字叙事层 (0.9s延迟)
      timeline.from([titleRef.current, subtitleRef.current], {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power1.out'
      }, 0.9);

      // 视差滚动效果
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        });
      }

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={galleryRef}
      className={`godly-artistic-gallery ${className}`}
    >
      {/* 背景氛围层 - 粒子动画 + 光影效果 */}
      <div className="ambient-background-layer">
        <div className="particle-system">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 主体展示层 - 视差滚动插画 */}
      <div className="main-illustration-parallax">
        <motion.div
          ref={parallaxRef}
          className="parallax-wrapper"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="parallax-image-container">
            <Image
              src="/illustrations/new-pets-collection.jpg"
              alt="温馨的宠物大家庭"
              fill
              className="parallax-image"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 装饰浮动层 - 微交互动效元素 */}
      <div className="decorative-floating-elements">
        <div className="floating-element floating-leaf-1" />
        <div className="floating-element floating-leaf-2" />
        <div className="floating-element floating-paw" />
      </div>

      {/* 文字叙事层 - 动态诗意文案 */}
      <div className="narrative-text-layer">
        <motion.h2
          ref={titleRef}
          className="narrative-title font-zh-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          你的契合之选
        </motion.h2>
        <motion.p
          ref={subtitleRef}
          className="narrative-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        >
          温馨的宠物大家庭
        </motion.p>
      </div>
    </section>
  );
}