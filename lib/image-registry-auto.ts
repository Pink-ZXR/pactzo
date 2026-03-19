/**
 * 图片资源注册表 - 自动生成
 * 最后更新: 3/19/2026, 4:22:58 PM
 */

export const imageRegistry = {
  // 未分类图片
  uncategorized: {
    'file': '/file.svg',
    'globe': '/globe.svg',
    'next': '/next.svg',
    'vercel': '/vercel.svg',
    'window': '/window.svg',
  },
  // Hero区域大图
  hero: {
    'hero-baize': '/hero-baize.png',
    'hero-chinese': '/hero-chinese.png',
  },
  // 宠物插画 - 用于匹配结果展示
  pets: {
    'lady-with-pets': '/painting/lady-with-pets.png',
    'cat-ink': '/pets/cat-ink.png',
    'cat-light': '/pets/cat-light.png',
    'dog-ink': '/pets/dog-ink.png',
    'dog-white': '/pets/dog-white.png',
  },
} as const;

// 获取图片路径
export function getImagePath(category: keyof typeof imageRegistry, name: string): string {
  return imageRegistry[category]?.[name as keyof typeof imageRegistry[typeof category]] || '';
}
