# 首页 page.tsx 核心内容快照 — 2026.03.23

> **文件**: `app/page.tsx` (1270行)  
> **基线版本**: `2f09186` 集成正式版 (2026-03-24 01:24) + `4d2ee88` 手机端适配 (2026-03-24 16:51)  
> **本次修复**: PC端动效参数已恢复至集成版 `2f09186` 精确配置

---

## 一、技术栈

| 依赖 | 用途 |
|------|------|
| `react` (useState, useEffect, useRef) | 状态与生命周期 |
| `framer-motion` (motion) | 滚动入场动画、viewport检测 |
| `gsap` + `ScrollTrigger` | Hero视差、入场时间线、鼠标跟踪 |
| `lenis` | 平滑滚动 |
| `next/image` + `next/link` | 图片优化 + 路由 |

---

## 二、页面结构总览

```
page.tsx
├── heroStyles (CSS keyframes: scroll-float, scroll-line, pulse-dot, pulse-ring, breath-glow, line-grow, arrow-bounce, scroll-glow)
├── Home()
│   ├── [状态] menuOpen, hoveredCat
│   ├── [Refs] heroRef, titlesRef, titlesMobileRef, watermarkRef, baizeRef, baizeGhostRef, baizeHeadRef, baizeMobileRef, glowRef, dimensionItem1-4Ref, dimensionLine1-4Ref, dimensionsSectionRef, categoriesGridRef, categoryItemsRef
│   ├── [Effect 1] Lenis 平滑滚动初始化
│   ├── [Effect 2] Hero 入场 + ScrollTrigger + 鼠标视差
│   ├── [Effect 3] 四维匹配体系 ScrollTrigger
│   ├── [Effect 4] 七种命定 ScrollTrigger
│   └── [JSX]
│       ├── <nav> 固定顶栏 (百澤 | 开始匹配) + 全屏菜单overlay
│       ├── <section> Hero 全屏区 (5层视觉)
│       ├── <section> 四维匹配体系 (左粘性标题 + 右滚动4卡片)
│       ├── <section> 七种命定 - 宠物类别 (手机列表 / PC 5列Tarot卡片)
│       ├── <section> 品牌介绍 (百澤理念文案)
│       ├── <section> CTA 分屏排版 (左图右文 + 左文右图)
│       └── <footer> 版权信息
```

---

## 三、Hero 五层视觉系统 (核心)

### Layer 1: 背景底色
- `bg-[#F2F0EB]` 莫兰迪暖白

### Layer 2: PACTZO 品牌字母 (PC only)
- `fontSize: clamp(200px, 28vw, 400px)`
- `letterSpacing: 0.02em`
- `opacity: 0.05`
- `transform: scaleX(1.2)`
- `color: #1A2E2A`
- 无动画、无模糊

### Layer 3: 空气氛围渐变层
- `background: linear-gradient(to right, #F2F0EB 0%, #F2F0EB 40%, transparent 100%)`
- 无 blur、无 radial-gradient

### Layer 4: 神兽插画层 (4子层)

| 子层 | 图片 | 混合模式 | 遮罩 | 尺寸 |
|------|------|---------|------|------|
| 4a 幻影层 | `baize-gold.jpg` | `multiply` | `radial-gradient(ellipse 80%×80% at 65% 45%)` | 85vw×95vh |
| 4b-mobile | `baize-hero-v3.png` | 无 | 无 | 130vw×48vh |
| 4b 主神兽 | `baize-gold.jpg` | `multiply` | `radial-gradient` + `linear-gradient` + `maskComposite: intersect` | 75vw×90vh |
| 4c 头部聚焦 | `baize-gold.jpg` | `multiply` | `radial-gradient(ellipse 35%×40% at 60% 30%)` | 75vw×90vh |
| 4d 空气光晕 | 无(纯CSS) | `screen` | — | 70vw×80vh |

### Layer 5: 标题与文字层

**PC端标题**:
- 副标题: "洞察万物生息 / 基于东方五行智慧的灵宠匹配 / 为你推荐最合适的陪伴"
- 主标题: "百澤" (Noto Serif SC, clamp(80px, 12vw, 160px))
- 四角标签: "THE ART OF PET DESTINY" / "百澤 BAIZE 2026" / "EST. 2026" / "WUXING ALCHEMY"

**手机端标题** (独立布局, top:12%):
- 同文案, fontSize: clamp(60px, 18vw, 100px)

---

## 四、GSAP 动效参数

### 4.1 Hero 入场时间线 (delay: 0.3s)

| 顺序 | 目标 | 动画 | 时长 |
|------|------|------|------|
| 1 | baizeGhost | opacity 0→0.16, x 80→0 | 3s |
| 2 | baize主体 | opacity 0→0.35, x 100→0 | 2.5s, -=2.5 |
| 3 | baizeHead | opacity 0→0.4, scale 0.95→1 | 2s, -=2 |
| 4 | glow光晕 | opacity 0→1 | 2s, -=1.8 |
| 5 | 标题字符 | y 40→0, rotateX -20→0, stagger 0.15 | 1.2s, -=1.2 |
| 6 | 副标题 | y 20→0, opacity 0→0.7 | 0.8s, -=0.8 |
| 7 | 四角标签 | opacity 0→1, stagger 0.2 | 0.6s, -=0.6 |
| 8 | 滚动提示 | opacity 0→1, y 10→0 | 0.8s, -=0.4 |

### 4.2 Hero ScrollTrigger (滚动视差)

| 目标 | y偏移 | opacity | 备注 |
|------|-------|---------|------|
| titlesRef | scale→0.8, y→-100 | →0 | 标题缩小淡出 |
| baizeRef | -150 | →0 | 主神兽上移淡出 |
| baizeGhost | -100 | →0 | 幻影层 |
| baizeHead | -120 | →0 | 头部聚焦层 |
| glowRef | — | →0 | 光晕淡出 |
| watermarkRef | +200 | →0.02 | 水印**反向**下移 |

### 4.3 鼠标视差 (mousemove)

```
titlesRef:     x * 40,  y * 30,  rotateY: x*8,  rotateX: -y*8  (1.5s)
watermarkRef:  -x * 80, -y * 40                                 (2s)
baizeRef:      -x * 60, -y * 40                                 (2.5s)
baizeGhostRef: -x * 30, -y * 20                                 (3s)
```

### 4.4 四维匹配体系 (ScrollTrigger)
- 触发: `top 80%`, once
- 动画: 整体 opacity 0→1, y 60→0, duration 1s, delay index*0.08
- 分割线: scaleX 0→1, duration 0.8s

### 4.5 七种命定 (ScrollTrigger)
- 触发: `top 85%`, once  
- 动画: opacity 0→1, y 60→0, stagger 0.08

---

## 五、四维匹配体系

左栏 (粘性): 圆形神兽头像 + "Our Method" + "四维匹配体系" + 分割线

右栏 (滚动4卡片):

| # | 英文 | 中文 | 说明 |
|---|------|------|------|
| 01 | TIANSHI | 天时 | 出生时辰蕴含五行能量密码... |
| 02 | DILI | 地利 | 地域风水影响人宠气场共鸣... |
| 03 | DILI | 地利 | (实际为第3维) |
| 04 | RENHE | 人和 | 个性特征决定相处和谐度... |

---

## 六、七种命定 — 宠物类别

**PC端**: 5列 Tarot卡片网格 (aspectRatio 1:1.6), 奇偶列错落  
**手机端**: 杂志列表布局 (序号 + 中文 + 英文斜体 + →)

10个类别: CAT猫咪 / DOG狗狗 / RABBIT兔子 / SMALL PET小宠 / BIRD鸟类 / REPTILE爬宠 / FISH水族 / AMPHIBIAN两栖 / EXOTIC异宠 / ALL跨类推荐

---

## 七、CTA 区块 (Maison Margiela 分屏)

| 行 | 左侧 | 右侧 |
|----|------|------|
| 第一行 | 图片 `cat-ink.png` | "Pactzo / begin" + 理念文案 + [Discover More] |
| 第二行 | "Destiny / awaits" + 百澤理念 + [Start Journey] | 图片 `dog-white.png` (深色圆形装饰框) |

CTA按钮: 双层边框设计, hover上浮2px + 底部阴影偏移

---

## 八、色彩体系

| Token | 值 | 用途 |
|-------|-----|------|
| `--background` | #F2F0EB | 主背景 |
| `--primary` | #1A2E2A | 森林绿主色 |
| `--foreground` | #1A2E2A | 文字色 |
| `--sand` | — | 分割线 |
| `--text-secondary` | — | 次要文字 |
| `--text-muted` | — | 弱化文字 |
| `--warm-gray` | — | 辅助灰色 |
| `#F9F8F6` | — | 七种命定区块背景 |

---

## 九、响应式策略

- **断点**: `md:` (768px+)
- **PC-only**: Layer 2 PACTZO, Layer 4a/4b/4c 神兽, 四角标签, PC标题
- **Mobile-only**: 手机标题 (top 12%), 手机神兽 (baize-hero-v3.png), 杂志列表布局
- **菜单**: 手机端全屏 overlay + body scroll lock

---

## 十、关键图片资源

| 路径 | 用途 | 格式 |
|------|------|------|
| `/illustrations/hero/baize-gold.jpg` | PC端神兽 (配合multiply) | JPG |
| `/illustrations/hero/baize-hero-v3.png` | 手机端神兽 (透明底) | PNG |
| `/pets/cat-ink.png` | CTA区猫插画 | PNG |
| `/pets/dog-white.png` | CTA区狗插画 | PNG |
