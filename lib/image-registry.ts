/**
 * 图片资源注册表
 * 自动归纳管理所有图片资源，按用途分类
 */

export const imageRegistry = {
  // 宠物头像 - 用于匹配结果展示
  avatars: {
    // 猫咪头像 (28张，缺3张)
    // 缺失: cat-british-shorthair, cat-american-shorthair, cat-orange
    'cat-abyssinian': '/pets/avatars/cat-abyssinian.png',
    'cat-american-cheese': '/pets/avatars/cat-american-cheese.png',
    'cat-american-curl': '/pets/avatars/cat-american-curl.png',
    'cat-american-tabby': '/pets/avatars/cat-american-tabby.png',
    'cat-bengal': '/pets/avatars/cat-bengal.png',
    'cat-birman': '/pets/avatars/cat-birman.png',
    'cat-british-blue-white': '/pets/avatars/cat-british-blue-white.png',
    'cat-british-blue': '/pets/avatars/cat-british-blue.png',
    'cat-british-golden': '/pets/avatars/cat-british-golden.png',
    'cat-british-silver': '/pets/avatars/cat-british-silver.png',
    'cat-chinese-cow': '/pets/avatars/cat-chinese-cow.png',
    'cat-chinese-lihua': '/pets/avatars/cat-chinese-lihua.png',
    'cat-chinese-orange': '/pets/avatars/cat-chinese-orange.png',
    'cat-chinese-sanhua': '/pets/avatars/cat-chinese-sanhua.png',
    'cat-devon': '/pets/avatars/cat-devon.png',
    'cat-exotic': '/pets/avatars/cat-exotic.png',
    'cat-maine-coon': '/pets/avatars/cat-maine-coon.png',
    'cat-munchkin': '/pets/avatars/cat-munchkin.png',
    'cat-napoleon': '/pets/avatars/cat-napoleon.png',
    'cat-norwegian': '/pets/avatars/cat-norwegian.png',
    'cat-oriental': '/pets/avatars/cat-oriental.png',
    'cat-persian-chinchilla': '/pets/avatars/cat-persian-chinchilla.png',
    'cat-persian': '/pets/avatars/cat-persian.png',
    'cat-ragdoll': '/pets/avatars/cat-ragdoll.png',
    'cat-russian-blue': '/pets/avatars/cat-russian-blue.png',
    'cat-scottish-fold': '/pets/avatars/cat-scottish-fold.png',
    'cat-siamese': '/pets/avatars/cat-siamese.png',
    'cat-sphynx': '/pets/avatars/cat-sphynx.png',
    // 狗狗头像 (58种)
    'dog-akita': '/pets/avatars/dog-akita.png',
    'dog-alaskan-malamute': '/pets/avatars/dog-alaskan-malamute.png',
    'dog-aussie-shepherd': '/pets/avatars/dog-aussie-shepherd.png',
    'dog-australian-shepherd': '/pets/avatars/dog-australian-shepherd.png',
    'dog-beagle': '/pets/avatars/dog-beagle.png',
    'dog-beagle-cn': '/pets/avatars/dog-beagle-cn.png',
    'dog-bedlington': '/pets/avatars/dog-bedlington.png',
    'dog-bernese': '/pets/avatars/dog-bernese.png',
    'dog-bichon': '/pets/avatars/dog-bichon.png',
    'dog-border-collie': '/pets/avatars/dog-border-collie.png',
    'dog-border-collie-merle': '/pets/avatars/dog-border-collie-merle.png',
    'dog-bull-terrier': '/pets/avatars/dog-bull-terrier.png',
    'dog-bulldog': '/pets/avatars/dog-bulldog.png',
    'dog-cavalier': '/pets/avatars/dog-cavalier.png',
    'dog-central-asian': '/pets/avatars/dog-central-asian.png',
    'dog-chihuahua': '/pets/avatars/dog-chihuahua.png',
    'dog-chinese-pastoral': '/pets/avatars/dog-chinese-pastoral.png',
    'dog-chinese-rural': '/pets/avatars/dog-chinese-rural.png',
    'dog-cockapoo': '/pets/avatars/dog-cockapoo.png',
    'dog-cocker-spaniel': '/pets/avatars/dog-cocker-spaniel.png',
    'dog-corgi': '/pets/avatars/dog-corgi.png',
    'dog-czech-wolfdog': '/pets/avatars/dog-czech-wolfdog.png',
    'dog-dachshund': '/pets/avatars/dog-dachshund.png',
    'dog-dachshund-long': '/pets/avatars/dog-dachshund-long.png',
    'dog-dachshund-short': '/pets/avatars/dog-dachshund-short.png',
    'dog-dalmatian': '/pets/avatars/dog-dalmatian.png',
    'dog-doberman': '/pets/avatars/dog-doberman.png',
    'dog-english-springer': '/pets/avatars/dog-english-springer.png',
    'dog-french-bulldog': '/pets/avatars/dog-french-bulldog.png',
    'dog-german-shepherd': '/pets/avatars/dog-german-shepherd.png',
    'dog-german-shorthaired': '/pets/avatars/dog-german-shorthaired.png',
    'dog-golden-retriever': '/pets/avatars/dog-golden-retriever.png',
    'dog-greyhound': '/pets/avatars/dog-greyhound.png',
    'dog-husky': '/pets/avatars/dog-husky.png',
    'dog-jack-russell': '/pets/avatars/dog-jack-russell.png',
    'dog-labrador': '/pets/avatars/dog-labrador.png',
    'dog-maltese': '/pets/avatars/dog-maltese.png',
    'dog-maltipoo': '/pets/avatars/dog-maltipoo.png',
    'dog-miniature-pinscher': '/pets/avatars/dog-miniature-pinscher.png',
    'dog-newfoundland': '/pets/avatars/dog-newfoundland.png',
    'dog-papillon': '/pets/avatars/dog-papillon.png',
    'dog-pharaoh-hound': '/pets/avatars/dog-pharaoh-hound.png',
    'dog-pitbull': '/pets/avatars/dog-pitbull.png',
    'dog-pomeranian': '/pets/avatars/dog-pomeranian.png',
    'dog-poodle': '/pets/avatars/dog-poodle.png',
    'dog-pug': '/pets/avatars/dog-pug.png',
    'dog-rottweiler': '/pets/avatars/dog-rottweiler.png',
    'dog-samoyed': '/pets/avatars/dog-samoyed.png',
    'dog-schnauzer': '/pets/avatars/dog-schnauzer.png',
    'dog-scottish-terrier': '/pets/avatars/dog-scottish-terrier.png',
    'dog-shetland-sheepdog': '/pets/avatars/dog-shetland-sheepdog.png',
    'dog-shiba': '/pets/avatars/dog-shiba.png',
    'dog-shih-tzu': '/pets/avatars/dog-shih-tzu.png',
    'dog-staffordshire': '/pets/avatars/dog-staffordshire.png',
    'dog-teddy': '/pets/avatars/dog-teddy.png',
    'dog-westie': '/pets/avatars/dog-westie.png',
    'dog-whippet': '/pets/avatars/dog-whippet.png',
    'dog-wire-fox-terrier': '/pets/avatars/dog-wire-fox-terrier.png',
    'dog-yorkshire': '/pets/avatars/dog-yorkshire.png',
    // 其他宠物头像（待补充）
    // 兔子、小宠、鸟类、爬宠、水族、两栖、异宠头像待上传
  },

  // 宠物插画 - 艺术风格展示
  pets: {
    'cat-ink': '/pets/cat-ink.png',
    'dog-ink': '/pets/dog-ink.png',
    'dog-white': '/pets/dog-white.png',
    'dog-art': '/pets/dog-art.png',
  },
  
  // 油画作品 - 用于缘分解读、艺术装饰
  paintings: {
    'lady-with-pets': '/painting/lady-with-pets.png',
    'cat-dog-portrait': '/paintings/cat-dog-portrait.png',
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
