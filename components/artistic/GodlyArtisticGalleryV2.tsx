'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface GodlyArtisticGalleryV2Props {
  className?: string;
}

export default function GodlyArtisticGalleryV2({ className = '' }: GodlyArtisticGalleryV2Props) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const mainArtworkRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const smallArtwork1Ref = useRef<HTMLDivElement>(null);
  const smallArtwork2Ref = useRef<HTMLDivElement>(null);
  const primaryTagRef = useRef<HTMLDivElement>(null);
  const secondaryTagRef = useRef<HTMLDivElement>(null);

  // GSAP动画初始化
  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      // 艺术画廊入场序列
      const artTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1.5,
          toggleActions: 'play none none reverse'
        }
      });

      // 1. 画廊墙面质感浮现 (0s-1.5s)
      artTimeline.from('.gallery-wall-layer', {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      });

      // 2. 动态光源系统渐显 (0.3s-1.8s)
      artTimeline.from(lightingRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power1.out'
      }, 0.3);

      // 3. 主插画优雅滑入 (0.6s-2.6s)
      artTimeline.from(mainArtworkRef.current, {
        y: 120,
        rotation: -8,
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: 'power2.out'
      }, 0.6);

      // 4. 装饰性小幅作品点缀 (1.2s-2.5s)
      artTimeline.from([smallArtwork1Ref.current, smallArtwork2Ref.current], {
        scale: 0,
        opacity: 0,
        x: 50,
        rotation: 15,
        stagger: 0.3,
        duration: 1.3,
        ease: 'power2.out'
      }, 1.2);

      // 5. 艺术标签浮现 (1.8s-3.0s)
      artTimeline.from([primaryTagRef.current, secondaryTagRef.current], {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power2.out'
      }, 1.8);

      // 鼠标跟随光源效果
      if (galleryRef.current) {
        galleryRef.current.addEventListener('mousemove', (e) => {
          const rect = galleryRef.current!.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          gsap.to(lightingRef.current, {
            backgroundPosition: `${x}% ${y}%`,
            duration: 0.8,
            ease: 'power2.out'
          });
        });
      }

      // 视差滚动效果
      gsap.to(mainArtworkRef.current, {
        y: -60,
        rotation: -1,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });

      gsap.to([smallArtwork1Ref.current, smallArtwork2Ref.current], {
        y: -30,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3
        }
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={galleryRef}
      className={`godly-artistic-gallery-v2 ${className}`}
    >
      {/* 背景氛围层 - 画廊墙面质感 */}
      <div className="gallery-wall-layer"></div>
      
      {/* 动态光源系统 */}
      <div 
        ref={lightingRef}
        className="dynamic-lighting"
      ></div>
      
      {/* 主展区 - 倾斜艺术展示 */}
      <div className="main-artwork-section">
        <motion.div
          ref={mainArtworkRef}
          className="artwork-frame"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="tilted-artwork">
            <div className="artwork-container">
              <Image
                src="/illustrations/new-pets-collection.jpg"
                alt="温馨的宠物大家庭"
                width={800}
                height={533}
                className="artwork-image"
                priority
              />
            </div>
            <div className="artwork-shadow"></div>
          </div>
        </motion.div>
      </div>
      
      {/* 侧展区 - 装饰性小幅作品 */}
      <div className="side-artworks">
        <motion.div
          ref={smallArtwork1Ref}
          className="small-artwork artwork-1"
          whileHover={{ scale: 1.05, rotate: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <motion.div
          ref={smallArtwork2Ref}
          className="small-artwork artwork-2"
          whileHover={{ scale: 1.05, rotate: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      
      {/* 叙事层 - 艺术标签和文字 */}
      <div className="narrative-tags">
        <motion.div
          ref={primaryTagRef}
          className="art-label primary-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          你的契合之选
        </motion.div>
        <motion.div
          ref={secondaryTagRef}
          className="art-label secondary-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
        >
          温馨的宠物大家庭
        </motion.div>
      </div>
    </section>
  );
}