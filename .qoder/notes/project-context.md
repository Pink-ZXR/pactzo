# PACTZO 项目上下文备忘录

> 最后更新：2026-03-27（方案B宠物头像集成完成）

---

## 当前状态总览

**项目**：百澤（PACTZO）— 基于东方五行智慧的灵宠匹配工具
**运行**：`cd pactzo && npx next dev --turbopack -p 3000` → http://localhost:3000
**测试页**：http://localhost:3000/_experiments/hero-ui（Hero 参考标准）

| 模块 | 状态 | 说明 |
|------|------|------|
| Hero 区 | ✅ 已完成 | 组件化架构，Framer Motion 动画，视差效果正常 |
| 四维匹配体系 Section | ✅ 正常 | GSAP ScrollTrigger 驱动 |
| 问卷流程 | ✅ 正常 | /questionnaire/* 多步骤流程 |
| 结果页 | ✅ 正常 | /result，已集成宠物头像（4处显示） |
| 宠物头像系统 | ✅ 方案B完成 | 6只宠物头像已配置，映射表独立管理 |
| PC 端适配 | ⚠️ 待优化 | 部分元素受移动端适配影响 |

---

## 架构与关键文件

### Hero 组件化架构（当前版本）

Hero 已从旧版"page.tsx 内联 GSAP"重构为 **独立组件 + Framer Motion**：

```
components/hero/           # 已迁移到根目录 components
├── index.ts               # 统一导出入口
├── Hero.tsx               # 主容器（5层背景系统）
├── Background.tsx         # 渐变背景层
├── BgText.tsx             # "PACTZO" 大号水印文字
├── Glow.tsx               # 光晕效果层
├── TailGlow.tsx           # 尾部光晕
└── Noise.tsx              # 噪点层（已禁用，return null）
```

**导入方式**：`import { Hero } from '@/components/hero'`

**Hero 背景分层顺序**：Background → TailGlow → BgText → Glow（Noise 已移除）

### 首页结构 `app/(home)/page.tsx`（~766 行）

> 注意：首页已移至 `app/(home)/` 路由组

```
页面结构：
├── 导航栏（固定顶部）
├── Hero 区（<Hero> 组件 + 内嵌白泽神兽 Image + 右侧文案）
│   ├── 神兽：Framer Motion 视差（useTransform + useSpring）
│   ├── 文案：「洞察万物生息」+「百澤」+ CTA「开始探索 ↓」
│   └── 滚动指示器
├── 四维匹配体系 Section（GSAP ScrollTrigger）
├── 七种命定宠物 Section
├── 匹配流程 Section
└── Footer
```

### 动画系统（双系统共存）

| 系统 | 用途 | 范围 |
|------|------|------|
| **Framer Motion** | Hero 区入场、视差、缩放 | `app/components/hero/*` + `page.tsx` Hero 部分 |
| **GSAP + ScrollTrigger** | 四维匹配等下方 section 滚动动效 | `page.tsx` useEffect |
| **Lenis** | 全局平滑滚动 | `page.tsx` useEffect，与 GSAP ticker 联动 |

### useEffect 清单（page.tsx）

| # | 功能 | 依赖数组 | 状态 |
|---|------|---------|------|
| 1 | Lenis 平滑滚动初始化 | `[]` | ✅ 正常 |
| 2 | 四维匹配 GSAP ScrollTrigger | `[]` | ✅ 正常 |
| ~~3~~ | ~~七种命定 GSAP ScrollTrigger~~ | - | ❌ 已删除（引用不存在的 DOM） |

---

## 技术栈

| 层级 | 技术 | 版本/说明 |
|------|------|----------|
| 框架 | Next.js | 16.1.7 (Turbopack) |
| 语言 | TypeScript | 严格模式 |
| 样式 | Tailwind CSS | v4 |
| 动画 | Framer Motion | Hero 组件动画 + 视差 |
| 动画 | GSAP + ScrollTrigger | 下方 sections 滚动动效 |
| 平滑滚动 | Lenis | 与 GSAP ticker 联动 |

---

## 关键文件路径

```
app/                                    # 路由页面
├── (home)/page.tsx                     # 正式首页（~766行）
├── layout.tsx                          # 根布局
├── globals.css                         # 全局样式
├── questionnaire/                      # 问卷流程页面
├── result/                             # 结果页
├── loading/                            # 加载页
└── _experiments/                       # 实验/测试页面（私有路由）
    ├── hero-ui/page.tsx                # Hero 测试参考页
    └── ...

components/                             # 统一组件目录
├── hero/                               # Hero 组件
├── sections/                           # 页面区块
├── ui/                                 # 基础 UI
├── illustrations/                      # 插画组件
├── result/                             # 结果页组件
└── index.ts                            # 统一导出

hooks/                                  # 全局 Hooks
├── useBreath.ts
├── useParallax.ts
├── useTestStore.tsx
└── index.ts                            # 统一导出

lib/                                    # 工具库
├── wuxing.ts
├── matching.ts
├── pet-database.ts
├── image-registry.ts
├── image-registry-auto.ts
└── index.ts                            # 统一导出

public/                                 # 静态资源
├── images/hero/                        # Hero 图片
├── images/pets/                        # 宠物图片
├── pets/avatars/                       # 宠物头像（方案B归档目录）
├── illustrations/                      # 插画资源
├── cards/                              # 卡片资源
└── painting/                           # 画作资源
```

---

## 响应式规范

| 断点 | 范围 | 用途 |
|------|------|------|
| 默认 | < 768px | 手机端样式 |
| `md:` | ≥ 768px | PC 端样式 |

---

## 重要约束（必须遵守）

1. **修改范围隔离**：修复 A 区域时，**禁止触碰** 已确认正确的 B 区域
2. **useEffect 必须有 `[]`**：每个 useEffect 必须显式写依赖数组，防止循环触发
3. **旧系统同步清理**：如果替换动画系统（GSAP → Framer Motion），必须同步删除旧 refs + useEffect
4. **验收以测试页为准**：UI 修改必须以 `/test/hero-ui` 截图为参考标准对比
5. **控制台零容忍**：修复后必须检查控制台，无红色错误才算完成
6. **Turbopack 缓存问题**：遇到 500 错误先执行 `rm -rf .next/cache .next/turbopack .next/trace` 再重启

---

## 已知问题

- 控制台有 1 条 Framer Motion 非阻塞警告：`"Please ensure that the container has a non-static position"`（不影响功能）
- PC 端部分元素可能受移动端适配代码影响（待排查）

---

## 历史记录

### 2026-03-27（今日）
- **方案B宠物头像集成完成**
  - 归档6只宠物头像：哈士奇、金毛、德牧、比格犬、腊肠犬、美国可卡犬
  - 新增3只宠物数据到数据库
  - 结果页4处显示头像：结果卡片、分享卡片、宠物选择器、Godly缘分卡片
  - 映射表独立管理：`/lib/pet-avatars.ts`
  - 支持jpg/png格式兼容

### 2026-03-26
- Hero 从测试页 `/test/hero-ui` 成功集成到正式首页
- 修复被其他智能体误改导致的 Hero 渲染问题：
  - 删除旧版 GSAP "七种命定" useEffect（引用不存在的 DOM 元素，导致 `GSAP target not found`）
  - 移除 `<Noise />` 噪点层（参考截图中无此元素）
  - 移除 `hero-beast-far` 模糊远景视差层（左上角残影）
  - 清理 Turbopack 损坏缓存，恢复 500 错误
- 验证通过：入场动画、鼠标视差、滚动过渡均正常

### 2026-03-25
- 修复 Tailwind v4 + Turbopack CSS变量编译错误
- 修复白泽不显示、三分五裂、滚动分裂等问题
- 鼠标视差调优

### 2026-03-24
- 完成 Hero 区 PC 端图片替换
- 创建备忘录系统
