import { useEffect, useRef, useState } from "react";

/**
 * useBreath - 呼吸节奏统一系统（全局时间源版）
 * 
 * 核心改进：
 * - 使用模块级全局时间源，确保所有组件完全同步
 * - 基于 sin 波生成 0~1 的周期值
 * - 支持 phase 偏移，让不同组件形成呼吸相位差
 * - 默认周期 7 秒，模拟自然呼吸节奏
 * 
 * 设计原则：
 * - 变化幅度 ≤ 5%，克制不干扰
 * - 所有元素共享同一频率，形成统一生命感
 * - 相位差创造层次感，而非混乱
 */

interface UseBreathOptions {
  /** 呼吸周期（毫秒），默认 7000ms（7秒） */
  duration?: number;
  /** 相位偏移（0~1），0 表示从头开始，0.5 表示半周期偏移 */
  phase?: number;
}

// 全局统一时间源 - 模块级变量，确保所有组件使用相同的时间基准
// 延迟 1.5 秒启动，等待入场动画完成，实现"先入场，后呼吸"的丝滑衔接
const GLOBAL_START_TIME = performance.now() + 1500;

export function useBreath(duration = 7000, phase = 0): number {
  const [value, setValue] = useState(0.5); // 初始值设为 0.5（sin 波中间值），避免突兀跳动
  // 使用全局时间源，确保所有组件同步
  const startTimeRef = useRef<number>(GLOBAL_START_TIME);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      const now = performance.now();
      
      // 如果还没到启动时间，保持初始值
      if (now < startTimeRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      
      // 计算当前时间在周期中的位置（0~1）
      const elapsed = (now - startTimeRef.current) % duration;
      const t = elapsed / duration;

      // sin 波生成平滑的 0~1 值
      // (sin(θ) + 1) / 2 将 -1~1 映射到 0~1
      const v = (Math.sin((t + phase) * Math.PI * 2) + 1) / 2;

      setValue(v);
      rafId = requestAnimationFrame(animate);
    };

    // 启动动画循环
    rafId = requestAnimationFrame(animate);

    // 清理
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [duration, phase]);

  return value;
}

/**
 * 辅助函数：将呼吸值映射到指定范围
 * 
 * @param breathValue 0~1 的呼吸值
 * @param min 目标范围最小值
 * @param max 目标范围最大值
 * @returns 映射后的值
 */
export function mapBreath(breathValue: number, min: number, max: number): number {
  return min + (max - min) * breathValue;
}

export default useBreath;
