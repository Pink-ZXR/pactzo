'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ParallaxState {
  x: number;
  y: number;
}

/**
 * useParallax - 平滑视差 Hook
 * 
 * 使用 requestAnimationFrame + lerp 实现丝滑跟随
 * lerpFactor: 0.05 (极慢，神性稳重)
 */
export function useParallax(lerpFactor: number = 0.05): ParallaxState {
  const [target, setTarget] = useState<ParallaxState>({ x: 0, y: 0 });
  const [current, setCurrent] = useState<ParallaxState>({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const isActiveRef = useRef<boolean>(true);

  // Lerp 插值函数
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // 动画循环
  const animate = useCallback(() => {
    if (!isActiveRef.current) return;

    setCurrent(prev => ({
      x: lerp(prev.x, target.x, lerpFactor),
      y: lerp(prev.y, target.y, lerpFactor)
    }));

    rafRef.current = requestAnimationFrame(animate);
  }, [target, lerpFactor]);

  // 启动动画循环
  useEffect(() => {
    isActiveRef.current = true;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isActiveRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // 归一化到 -0.5 ~ 0.5，再映射到目标范围
      const x = ((clientX / innerWidth) - 0.5) * 2;
      const y = ((clientY / innerHeight) - 0.5) * 2;
      
      setTarget({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return current;
}

export default useParallax;
