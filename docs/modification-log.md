# 实验版本修改日志

| 版本 | 日期 | 修改点 | 备注 |
|------|------|--------|------|
| v1 | 2026-03-18 | 基线版本，与主版本 app/page.tsx 完全一致 | 初始创建 |
| v2 | 2026-03-21 | Hero Section 五层视觉结构重构 | 已集成至主版本 |
| v3 | 2026-03-21 | 结果页 UI 全面重构 | 已集成至主版本 |

---

## v2 详细修改记录

### 集成时间
2026-03-21

### 修改文件
- `app/page.tsx` - 主版本首页 Hero Section 全面重构

### 备份记录
- 旧版本备份：`app/page.tsx.backup.20260321_201003`
- 测试版备份：`app/test/hero-scroll-transition-backup/page.tsx`

### 五层视觉结构
| 层级 | zIndex | 内容 |
|------|--------|------|
| Layer 1 | 0 | 背景底色 #F2F0EB |
| Layer 2 | 2 | PACTZO 超大字母水印 (5%透明度) |
| Layer 3 | 3 | 空气氛围渐变遮罩 |
| Layer 4a | 4 | 幻影神兽 (16%, blur15px) |
| Layer 4b | 5 | 主神兽 (35%, 四向羽化) |
| Layer 4c | 6 | 头部聚焦 (40%, 径向遮罩) |
| Layer 4d | 7 | 空气光晕 (#F6F3EA, 7%) |
| Layer 5 | 10-50 | 标题、标签、SCROLL |

### 技术栈
- GSAP + ScrollTrigger 滚动动画
- CSS mask-image 羽化遮罩
- mix-blend-mode 融合模式
- 鼠标视差交互

### 文案调整
- 左上标签：`Spirit of Mountains`
- 副文案：`洞察万物生息 / 基于东方五行智慧的灵宠匹配`
- 标题尺寸：放大至 clamp(110px, 18vw, 185px)

---

## v3 详细修改记录

### 集成时间
2026-03-21

### 修改文件
- `app/result/page.tsx` - 新建结果页正式版
- `app/page.tsx` - 更新链接指向正式版问卷

### 备份记录
- 旧版本备份：`docs/archive/page.tsx.backup.20260321_230017`
- 测试版已删除：`app/test/result/v3/`

### 核心设计
| 模块 | 设计特点 |
|------|----------|
| Hero | 杂志风格 92% 卡片，错落 MATCH/SCORE，双层边框 + 3D 阴影 |
| 四维分析 | 异步视差悬浮，Cormorant 数字字体 |
| 缘分解读 | 复古椭圆头像框，双层金线边框，古典肖像风格 |
| 金句卡片 | 立体阴影，加粗字体 |
| Destiny Card | 档案卡片设计 |

### 字体统一
- 英文数字：Cormorant (衬线)
- 标签：Space Mono (等宽)
- 中文：Noto Serif SC (宋体)

### 图片资源
- `/public/pets/dog-art.png` - 缘分解读复古头像
