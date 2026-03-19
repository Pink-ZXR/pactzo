/**
 * 图片资源注册表
 * 自动归纳管理所有图片资源，按用途分类
 */

export const imageRegistry = {
  // 宠物插画 - 用于匹配结果展示
  pets: {
    'cat-ink': '/pets/cat-ink.png',
    'cat-light': '/pets/cat-light.png',
    'dog-ink': '/pets/dog-ink.png',
    'dog-white': '/pets/dog-white.png',
  },
  
  // 油画作品 - 用于缘分解读、艺术装饰
  paintings: {
    'lady-with-pets': '/painting/lady-with-pets.png',
    'cat-dog-portrait': '/paintings/cat-dog-portrait.png', // 待添加
  },
  
  // Hero区域大图
  hero: {
    'baize': '/hero-baize.png',
    'chinese': '/hero-chinese.png',
  },
  
  // 图标资源
  icons: {
    'file': '/file.svg',
    'globe': '/globe.svg',
    'next': '/next.svg',
    'vercel': '/vercel.svg',
    'window': '/window.svg',
  },
} as const;

// 获取图片路径的辅助函数
export function getImagePath(
  category: keyof typeof imageRegistry,
  name: string
): string {
  const categoryImages = imageRegistry[category];
  const path = categoryImages[name as keyof typeof categoryImages];
  return path || '';
}

// 自动检测图片类型并返回推荐用途
export function suggestImageUsage(filename: string): {
  category: string;
  suggestedUse: string;
} {
  const lowerName = filename.toLowerCase();
  
  // 检测宠物相关
  if (lowerName.includes('cat') || lowerName.includes('dog') || lowerName.includes('pet')) {
    if (lowerName.includes('paint') || lowerName.includes('oil') || lowerName.includes('art')) {
      return { category: 'paintings', suggestedUse: '缘分解读艺术装饰' };
    }
    return { category: 'pets', suggestedUse: '匹配结果宠物展示' };
  }
  
  // 检测人物/场景油画
  if (lowerName.includes('lady') || lowerName.includes('reading') || lowerName.includes('scene')) {
    return { category: 'paintings', suggestedUse: '缘分解读氛围营造' };
  }
  
  // 检测Hero相关
  if (lowerName.includes('hero') || lowerName.includes('banner')) {
    return { category: 'hero', suggestedUse: '首页Hero区域' };
  }
  
  return { category: 'uncategorized', suggestedUse: '待分类' };
}

// 图片元数据类型
export interface ImageMetadata {
  filename: string;
  path: string;
  category: string;
  usage: string;
  dimensions?: { width: number; height: number };
  fileSize?: number;
  tags: string[];
}

// 扫描目录并生成图片清单
export async function scanImages(): Promise<ImageMetadata[]> {
  // 这里可以扩展为实际的文件系统扫描
  // 目前返回预定义的注册表数据
  const images: ImageMetadata[] = [];
  
  Object.entries(imageRegistry).forEach(([category, items]) => {
    Object.entries(items).forEach(([name, path]) => {
      const suggestion = suggestImageUsage(name);
      images.push({
        filename: name,
        path,
        category: suggestion.category,
        usage: suggestion.suggestedUse,
        tags: [category, suggestion.category],
      });
    });
  });
  
  return images;
}
