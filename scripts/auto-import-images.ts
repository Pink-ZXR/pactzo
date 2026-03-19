/**
 * 自动引入图片脚本
 * 扫描 public 目录，自动更新图片注册表和相关页面引用
 */

import * as fs from 'fs';
import * as path from 'path';

interface ImageInfo {
  filename: string;
  fullPath: string;
  relativePath: string;
  category: string;
  suggestedUse: string;
}

// 图片分类规则
const categoryRules = [
  {
    pattern: /cat|dog|pet/i,
    category: 'pets',
    usage: '匹配结果宠物展示',
  },
  {
    pattern: /paint|oil|art|lady|reading|scene|portrait/i,
    category: 'paintings',
    usage: '缘分解读艺术装饰',
  },
  {
    pattern: /hero|banner/i,
    category: 'hero',
    usage: '首页Hero区域',
  },
  {
    pattern: /icon|logo/i,
    category: 'icons',
    usage: '系统图标',
  },
];

// 扫描目录获取所有图片
function scanImages(dir: string, baseDir: string): ImageInfo[] {
  const images: ImageInfo[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 递归扫描子目录
      images.push(...scanImages(fullPath, baseDir));
    } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(item)) {
      const relativePath = fullPath.replace(baseDir, '').replace(/\\/g, '/');
      
      // 自动分类
      let category = 'uncategorized';
      let suggestedUse = '待分类';
      
      for (const rule of categoryRules) {
        if (rule.pattern.test(item)) {
          category = rule.category;
          suggestedUse = rule.usage;
          break;
        }
      }

      images.push({
        filename: path.parse(item).name,
        fullPath,
        relativePath,
        category,
        suggestedUse,
      });
    }
  }

  return images;
}

// 生成图片注册表代码
function generateRegistryCode(images: ImageInfo[]): string {
  const grouped = images.reduce((acc, img) => {
    if (!acc[img.category]) acc[img.category] = [];
    acc[img.category].push(img);
    return acc;
  }, {} as Record<string, ImageInfo[]>);

  let code = `/**
 * 图片资源注册表 - 自动生成
 * 最后更新: ${new Date().toLocaleString()}
 */

export const imageRegistry = {\n`;

  for (const [category, items] of Object.entries(grouped)) {
    code += `  // ${getCategoryComment(category)}\n`;
    code += `  ${category}: {\n`;
    for (const img of items) {
      code += `    '${img.filename}': '${img.relativePath}',\n`;
    }
    code += `  },\n`;
  }

  code += `} as const;\n`;
  
  // 添加辅助函数
  code += `
// 获取图片路径
export function getImagePath(category: keyof typeof imageRegistry, name: string): string {
  return imageRegistry[category]?.[name as keyof typeof imageRegistry[typeof category]] || '';
}
`;

  return code;
}

function getCategoryComment(category: string): string {
  const comments: Record<string, string> = {
    pets: '宠物插画 - 用于匹配结果展示',
    paintings: '油画作品 - 用于缘分解读、艺术装饰',
    hero: 'Hero区域大图',
    icons: '图标资源',
    uncategorized: '未分类图片',
  };
  return comments[category] || '其他图片';
}

// 主函数
function main() {
  const publicDir = path.join(process.cwd(), 'public');
  const outputFile = path.join(process.cwd(), 'lib', 'image-registry-auto.ts');

  console.log('🔍 扫描图片资源...');
  const images = scanImages(publicDir, publicDir);

  console.log(`✅ 发现 ${images.length} 张图片`);
  
  // 按分类统计
  const stats = images.reduce((acc, img) => {
    acc[img.category] = (acc[img.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  for (const [cat, count] of Object.entries(stats)) {
    console.log(`  - ${cat}: ${count}张`);
  }

  // 生成注册表
  const code = generateRegistryCode(images);
  fs.writeFileSync(outputFile, code);
  
  console.log(`\n📝 已生成注册表: ${outputFile}`);
}

main();
