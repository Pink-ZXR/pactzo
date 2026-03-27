# PACTZO 单图 Hero 极致重构 - 项目上下文备份

## 会话日期
2026-03-25

## 核心需求
- **现状美化优先级**：PACTZO 渐变过渡不自然，需优化
- **严禁改变**：莫兰迪色系色彩搭配
- **新白泽图**：全身站立姿态，全身图适配
- **动效**：三层视差 + 呼吸浮动，PC 专属
- **移动端**：零侵入，保持静态

## 专家角色分工（6人协作）

| 序号 | 角色 | 核心职责 |
|:---:|------|----------|
| 1 | UI/视觉专家 | 构图方案、视觉层次、留白平衡 |
| 2 | 内容专家 | 标题文案、神兽命名、文化注解 |
| 3 | 前端架构师 | 单图架构、GSAP 时间轴、性能 |
| 4 | 动效设计师 | 三层视差参数、缓动曲线 |
| 5 | 响应式专家 | PC/移动端隔离 |
| 6 | 图片优化师 | 图片压缩、加载策略 |

## 技术实现摘要

### 单图架构
- **图片路径**：`/illustrations/hero/baize-god-v2.png`
- **容器尺寸**：`min(900px, 60vw) x min(700px, 80vh)`
- **位置**：右侧 5vw，垂直居中

### 多维呼吸动画
```typescript
gsap.to(baizeRef.current, {
  scale: 1.02,
  rotation: 1,
  y: '+=10',
  duration: 5,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
});
```

### 三层视差（黄金比例）
| 层级 | 元素 | 视差系数 | 位移 |
|------|------|----------|------|
| 远景 | TZ 水印 | 0.2 | x*30, y*15 |
| 中景 | 白泽神兽 | 0.5 | x*-50, y*-30 |
| 前景 | 标题文字 | 1.2 | x*-90, y*-45 |

### 3D 偏转 + 动态阴影
```typescript
rotationY: x * 12,  // 左右侧身
rotationX: y * -8,  // 前后俯仰
filter: `drop-shadow(${x*-20}px ${y*-20}px 30px rgba(0,0,0,0.1))`
```

### 硬件加速
- `willChange: 'transform'`
- `transformStyle: 'preserve-3d'`
- `perspective: '1000px'`

## 关键文件变更

### 修改文件
- `app/page.tsx` - Hero 区域单图重构
- `app/globals.css` - 移除 `@theme inline`，添加 `@source not`
- `app/layout.tsx` - 背景色改为内联 style

### 新增资源
- `public/illustrations/hero/baize-god-v2.png` - 新白泽全身图

## 修复记录

### CSS 错误修复
- **问题**：Tailwind v4 + Turbopack `bg-[var()]` 非法 CSS 变量
- **方案**：
  1. 删除 `globals.css` 中的 `@theme inline` 块
  2. 全项目替换 `bg-[var()]` 为内联 `style`
  3. 清理 `dist/dev/cache/turbopack/` 旧缓存

### PACTZO 渐变优化
- **原代码**：纯色 `#1A2E2A` + 固定透明度 `0.05`
- **优化**：添加 `mask-image` 边缘自然淡出

## 性能优化
- 单张高清透明 PNG 代替碎片化切图
- 降低浏览器 Paint（重绘）压力
- GSAP `will-change` 硬件加速

## 响应式策略
```tsx
{/* PC端：动效全开 */}
<div ref={baizeRef} className="hidden md:block">
  <Image src="/baize-god-v2.png" ... />
</div>

{/* 移动端：静态展示 */}
<div className="md:hidden">
  <Image src="/baize-god-v2.png" ... />
</div>
```

## 待确认事项
- [ ] 白泽图构图是否需要微调（尺寸/位置）
- [ ] 视差参数是否需要根据实际体验调整
- [ ] 内容专家：标题文案、神兽命名、CTA 按钮文字

## 技术栈
- Next.js 16.1.7 + Turbopack
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion

## 访问地址
- 本地开发：http://localhost:3000
