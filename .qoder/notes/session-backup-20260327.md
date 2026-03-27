# PACTZO 项目对话上下文汇总

**备份时间**: 2026-03-27
**对话范围**: 项目结构整理 + 动画优化 + UI清理 + 宠物头像功能

---

## 一、项目概述

**项目名称**: PACTZO（百澤）
**项目定位**: 基于东方五行智慧的宠物匹配工具
**技术栈**: 
- Next.js 16.1.7 + Turbopack
- TypeScript
- Tailwind CSS
- Framer Motion（动画）
- GSAP + ScrollTrigger（滚动动效）
- Lenis（平滑滚动）

---

## 二、本次对话完成的工作

### 2.1 项目结构与组件管理重构

**问题**:
- 组件目录分散（`app/components/` 和 `components/` 并存）
- hooks 目录重复（`app/hooks/` 和 `hooks/` 并存）
- 备份文件未纳入版本控制
- 未使用的图片占用约 10MB 空间

**解决方案**:
1. 将 `app/components/hero/` 移动到 `components/hero/`
2. 将 `app/hooks/` 移动到 `hooks/`
3. 创建统一的 `index.ts` 导出文件
4. 删除备份文件 `page.tsx.backup.*`
5. 清理未使用图片：`hero-baize.png`, `hero-baize-new.png`, `hero-chinese.png`

**涉及文件**:
- `/pactzo/components/hero/` 目录
- `/pactzo/hooks/useBreath.ts`
- `/pactzo/hooks/useParallax.ts`
- `/pactzo/components/index.ts`（新建）
- `/pactzo/hooks/index.ts`（新建）
- `/pactzo/lib/index.ts`（新建）

### 2.2 Framer Motion 滚动警告修复

**问题**: 控制台警告 "Please ensure that the container has a non-static position"

**解决方案**:
- 在 `layout.tsx` 的 `<body>` 添加 `relative` 类
- 在 Hero 区域容器添加 `relative` 类
- 在所有使用 `whileInView` 的 section 添加 `relative` 类

### 2.3 动画同步优化（呼吸节拍器）

**问题**: 入场动画"各动各的"，缺乏协调感

**根本原因**:
1. 每个组件的 `useBreath` hook 独立初始化 `startTimeRef`
2. 入场动画与呼吸动画是两套独立系统

**解决方案**:
```typescript
// useBreath.ts - 全局统一时间源
const GLOBAL_START_TIME = performance.now() + 1500; // 延迟1.5秒启动

export function useBreath(duration = 7000, phase = 0) {
  const startTimeRef = useRef<number>(GLOBAL_START_TIME);
  const [value, setValue] = useState(0.5); // 初始值0.5，避免跳动
  // ...
}
```

### 2.4 【你的契合之选】区域视觉升级

**修改内容**:
1. 更换背景图片为 `pets-family-gathering.jpg`
2. 添加视差滚动效果（0.8x 速度）
3. 接入 7 秒呼吸节奏（scale: [1, 1.02, 1]）
4. 移除 CATEGORIES 英文标签
5. 新增 `.godly-title` 样式（东方古典美学）

**godly-title CSS**:
```css
.godly-title {
  font-family: 'Source Han Serif SC', 'Noto Serif SC', serif;
  letter-spacing: 0.5em;
  color: #2D2926;
  text-shadow: 0 0 15px rgba(242, 240, 235, 0.8);
  font-weight: 300;
  animation: grainReveal 3s ease-out forwards;
}

@keyframes grainReveal {
  0% { filter: blur(10px); opacity: 0; transform: scale(1.05); }
  100% { filter: blur(0); opacity: 1; transform: scale(1); }
}
```

### 2.5 问卷页面数字标签清理

**清理范围**:

| 页面 | 删除内容 |
|------|---------|
| `birthday/page.tsx` | 右下角 `01` |
| `tianshi/page.tsx` | 右下角 `02` + 底部 `Step 02` |
| `dili/page.tsx` | 右下角 `03` + 底部 `Step 03` |
| `renhe/page.tsx` | 右下角 `04` + 底部 `Step 04` |
| `appearance/page.tsx` | 右下角 `05` |
| `pet-category/page.tsx` | 右下角 `06` |

**保留**: 导航栏的 `02 / 07` 等标签（用户要求保留）

### 2.6 问卷页面交互性能优化

**优化内容**:

| 项目 | 优化前 | 优化后 |
|------|-------|-------|
| TRANSITION 时长 | 1.2s | 0.6s |
| birthday TRANSITION | 0.8s | 0.5s |
| AnimatePresence mode | "wait" | 移除 |
| 标题延迟 | 0.2s | 0.1s |
| 选项延迟 | 0.4+0.08n | 0.15+0.05n |

**涉及文件**:
- `app/questionnaire/birthday/page.tsx`
- `app/questionnaire/tianshi/page.tsx`
- `app/questionnaire/dili/page.tsx`
- `app/questionnaire/renhe/page.tsx`

### 2.7 宠物头像功能基础架构

**实现方案**: 方案 B（独立映射表）

**新建文件**: `/pactzo/lib/pet-avatars.ts`

```typescript
// 使用方式
import { getPetAvatar } from '@/lib/pet-avatars';

const avatar = getPetAvatar('cat-british-shorthair');
// 返回: '/pets/avatars/cat-british-shorthair.png'
// 或默认: '/pets/avatars/default-pet.png'
```

**头像目录**: `/pactzo/public/pets/avatars/`

---

## 三、关键文件清单

### 核心页面
- `/pactzo/app/(home)/page.tsx` - 首页
- `/pactzo/app/result/page.tsx` - 结果页
- `/pactzo/app/questionnaire/*/page.tsx` - 问卷页面

### 动画系统
- `/pactzo/hooks/useBreath.ts` - 全局呼吸节拍器
- `/pactzo/hooks/useParallax.ts` - 视差效果
- `/pactzo/components/hero/*.tsx` - Hero 组件

### 数据与匹配
- `/pactzo/lib/pet-database.ts` - 宠物数据库（942行）
- `/pactzo/lib/matching.ts` - 匹配算法
- `/pactzo/lib/pet-avatars.ts` - 头像映射表（新建）

---

## 四、待完成工作

### 宠物头像功能
1. **准备头像图片**（用户负责）
   - 规格：400×400px 或 600×600px
   - 格式：PNG/WebP
   - 存放：`/public/pets/avatars/`

2. **结果页集成**（下一轮）
   - 在结果卡片中显示宠物头像
   - 需修改 `app/result/page.tsx`

### 建议实验顺序
1. 先准备 3-5 个宠物头像
2. 在结果页做实验集成
3. 验证显示效果
4. 逐步补全所有宠物头像

---

## 五、项目备忘录

### 动画规范
- 呼吸周期：7 秒
- 呼吸幅度：≤ 5%
- 入场动画时长：0.5-0.6s
- AnimatePresence：不使用 mode="wait"

### 样式规范
- `.godly-title`：东方古典美学标题
- 字体：Source Han Serif SC / Noto Serif SC
- 颜色：#2D2926（墨灰）

### 执行原则
- 一切修改需征得用户同意
- 不擅自修改未涉及的内容
- 修改后验证构建是否成功

---

## 六、Git 状态

待提交的修改：
- 动画同步优化
- 视觉升级
- 数字标签清理
- 交互性能优化
- 宠物头像映射表

---

**下一轮对话提示**:
1. 引入此备份文件
2. 继续宠物头像结果页集成
3. 准备实验头像图片
