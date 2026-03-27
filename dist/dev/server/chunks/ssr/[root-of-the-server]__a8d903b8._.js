module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/hooks/useParallax.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useParallax",
    ()=>useParallax
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useParallax(lerpFactor = 0.05) {
    const [target, setTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const isActiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Lerp 插值函数
    const lerp = (start, end, factor)=>{
        return start + (end - start) * factor;
    };
    // 动画循环
    const animate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!isActiveRef.current) return;
        setCurrent((prev)=>({
                x: lerp(prev.x, target.x, lerpFactor),
                y: lerp(prev.y, target.y, lerpFactor)
            }));
        rafRef.current = requestAnimationFrame(animate);
    }, [
        target,
        lerpFactor
    ]);
    // 启动动画循环
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        isActiveRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
        return ()=>{
            isActiveRef.current = false;
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [
        animate
    ]);
    // 监听鼠标移动
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // 归一化到 -0.5 ~ 0.5，再映射到目标范围
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;
            setTarget({
                x,
                y
            });
        };
        window.addEventListener('mousemove', handleMouseMove, {
            passive: true
        });
        return ()=>window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return current;
}
const __TURBOPACK__default__export__ = useParallax;
}),
"[project]/hooks/useBreath.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "mapBreath",
    ()=>mapBreath,
    "useBreath",
    ()=>useBreath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
// 全局统一时间源 - 模块级变量，确保所有组件使用相同的时间基准
// 延迟 1.5 秒启动，等待入场动画完成，实现"先入场，后呼吸"的丝滑衔接
const GLOBAL_START_TIME = performance.now() + 1500;
function useBreath(duration = 7000, phase = 0) {
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.5); // 初始值设为 0.5（sin 波中间值），避免突兀跳动
    // 使用全局时间源，确保所有组件同步
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(GLOBAL_START_TIME);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let rafId;
        const animate = ()=>{
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
        return ()=>{
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [
        duration,
        phase
    ]);
    return value;
}
function mapBreath(breathValue, min, max) {
    return min + (max - min) * breathValue;
}
const __TURBOPACK__default__export__ = useBreath;
}),
"[project]/components/hero/Background.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Background",
    ()=>Background,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useParallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useParallax.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBreath.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Background() {
    const { x, y } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useParallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParallax"])(0.05);
    const breath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBreath"])(7000, 0); // 7秒周期，起始相位
    // 映射到像素偏移 (±10px)
    const offsetX = x * 10;
    const offsetY = y * 10;
    // 呼吸值映射
    const breathScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 1, 1.015); // 1 → 1.015
    const breathOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0.94, 0.98); // 0.94 → 0.98（反向：呼出时更亮）
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        style: {
            // 精细 radial-gradient 营造深度（8层过渡）
            background: `
          radial-gradient(
            circle at ${68 + x * 2}% ${52 + y * 2}%,
            rgba(255,255,255,${0.98 * breathOpacity}) 0%,
            rgba(250,250,250,${0.92 * breathOpacity}) 18%,
            rgba(240,240,240,${0.75 * breathOpacity}) 32%,
            rgba(225,225,225,${0.55 * breathOpacity}) 48%,
            rgba(205,205,205,${0.38 * breathOpacity}) 65%,
            rgba(185,185,185,${0.28 * breathOpacity}) 82%,
            rgba(170,170,170,${0.22 * breathOpacity}) 100%
          )
        `,
            // 整体轻微跟随鼠标 + 呼吸缩放
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${1.05 * breathScale})`,
            zIndex: 0
        }
    }, void 0, false, {
        fileName: "[project]/components/hero/Background.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Background;
}),
"[project]/components/hero/BgText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BgText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBreath.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function BgText() {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const breath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBreath"])(7000, 0.8); // 7秒周期，接近完成相位
    // 避免 SSR 问题
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // 呼吸值映射（极其微妙）
    const breathBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 1.4, 1.8); // 1.4px → 1.8px
    const breathOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0.7, 0.8); // 0.7 → 0.8（反向）
    // 未挂载时不渲染，避免 SSR 样式问题
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22vw',
            fontWeight: 700,
            letterSpacing: '0.1em',
            backgroundImage: `linear-gradient(
          90deg,
          rgba(0,0,0,${0.02 * breathOpacity}),
          rgba(0,0,0,${0.08 * breathOpacity}),
          rgba(0,0,0,${0.02 * breathOpacity})
        )`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            filter: `blur(${breathBlur}px)`,
            transform: 'scale(1.08)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 2
        },
        className: "jsx-a8af9a32b7b6724b" + " " + "bg-text",
        children: [
            "PACTZO",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "a8af9a32b7b6724b",
                children: ".bg-text.jsx-a8af9a32b7b6724b{opacity:0;animation:1.6s cubic-bezier(.22,1,.36,1) .6s forwards bgTextEnter}@keyframes bgTextEnter{0%{opacity:0;letter-spacing:.3em;filter:blur(8px);transform:scale(1.15)}to{opacity:1;letter-spacing:.1em;filter:blur(1.6px);transform:scale(1.08)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/hero/BgText.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/hero/Glow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Glow",
    ()=>Glow,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useParallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useParallax.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBreath.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Glow({ size = 600, color = 'rgba(255,255,255,0.35)' }) {
    const { x, y } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useParallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParallax"])(0.04); // 稍快一点的跟随
    const breath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBreath"])(7000, 0.2); // 7秒周期，滞后相位
    // 映射到像素偏移 (±30px)，光斑移动幅度更大
    const offsetX = x * 30;
    const offsetY = y * 30;
    // 呼吸值映射
    const breathOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0.25, 0.35); // 0.25 → 0.35
    const breathBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 30, 40); // 30px → 40px
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute pointer-events-none",
        style: {
            width: size,
            height: size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0.15) 40%, transparent 70%)`,
            filter: `blur(${breathBlur}px)`,
            opacity: breathOpacity,
            // 初始位置偏右（靠近标题区域）
            left: '55%',
            top: '45%',
            transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
            zIndex: 3
        }
    }, void 0, false, {
        fileName: "[project]/components/hero/Glow.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Glow;
}),
"[project]/components/hero/TailGlow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TailGlow",
    ()=>TailGlow,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBreath.ts [app-ssr] (ecmascript)");
'use client';
;
;
function TailGlow({ color = 'rgba(255,255,255,0.25)' }) {
    const breath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBreath"])(7000, 0.4); // 7秒周期，中等相位
    // 呼吸值映射
    const breathOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0.2, 0.32); // 0.2 → 0.32
    const breathScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 1, 1.03); // 1 → 1.03
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute pointer-events-none",
        style: {
            // 宽而扁的椭圆，位于底部
            width: '80vw',
            height: '30vh',
            borderRadius: '50%',
            // 柔和的径向渐变
            background: `radial-gradient(ellipse at center, ${color} 0%, rgba(255,255,255,0.1) 50%, transparent 80%)`,
            // 位置：底部中央
            left: '50%',
            bottom: '-5vh',
            transform: `translateX(-50%) scale(${breathScale})`,
            opacity: breathOpacity,
            filter: 'blur(60px)',
            zIndex: 1
        }
    }, void 0, false, {
        fileName: "[project]/components/hero/TailGlow.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = TailGlow;
}),
"[project]/components/hero/Hero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hero",
    ()=>Hero,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Background.tsx [app-ssr] (ecmascript)");
// Noise 已移除 - 用户参考截图无噪点
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$BgText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/BgText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Glow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Glow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$TailGlow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/TailGlow.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Hero({ children, className = '' }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 避免 SSR 抖动，客户端挂载后再显示
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // 未挂载时返回占位，避免闪烁
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: `relative w-full h-screen overflow-hidden ${className}`,
            style: {
                backgroundColor: '#F2F0EB'
            }
        }, void 0, false, {
            fileName: "[project]/components/hero/Hero.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            backgroundColor: '#F2F0EB'
        },
        className: "jsx-34d913df2b0972e0" + " " + `relative w-full h-screen overflow-hidden ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-34d913df2b0972e0" + " " + "hero-bg-layer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Background"], {}, void 0, false, {
                        fileName: "[project]/components/hero/Hero.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    "  ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$TailGlow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TailGlow"], {}, void 0, false, {
                        fileName: "[project]/components/hero/Hero.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    "    ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$BgText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/hero/Hero.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    "      ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Glow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Glow"], {}, void 0, false, {
                        fileName: "[project]/components/hero/Hero.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    "        "
                ]
            }, void 0, true, {
                fileName: "[project]/components/hero/Hero.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-34d913df2b0972e0" + " " + "relative z-10 w-full h-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/hero/Hero.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "34d913df2b0972e0",
                children: ".hero-bg-layer.jsx-34d913df2b0972e0{animation:1.2s cubic-bezier(.22,1,.36,1) forwards bgFadeIn;position:absolute;inset:0}@keyframes bgFadeIn{0%{opacity:0;filter:blur(8px);transform:scale(1.08)}60%{opacity:.9;filter:blur(2px)}to{opacity:1;filter:blur();transform:scale(1)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/hero/Hero.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Hero;
}),
"[project]/components/hero/Noise.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Noise",
    ()=>Noise,
    "default",
    ()=>__TURBOPACK__default__export__
]);
'use client';
function Noise() {
    return null;
}
const __TURBOPACK__default__export__ = Noise;
}),
"[project]/components/hero/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Hero 背景系统组件导出
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Hero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Hero.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Background.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Noise$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Noise.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$BgText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/BgText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Glow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Glow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$TailGlow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/TailGlow.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/app/(home)/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/hero/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Hero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/hero/Hero.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBreath.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
// 注册 GSAP 插件
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
/**
 * 百澤 BAIZE - 极简风格首页
 * 
 * Maison Margiela 风格 + 莫兰迪森林绿
 * - 大量留白
 * - 细体字体 + 大字间距
 * - 全屏区块
 */ /**
 * ScrollHint - 呼吸节奏统一的滚动提示
 * 
 * 呼吸节奏：
 * - phase: 0.6（中等滞后）
 * - translateY: 0px → 4px（轻微下沉）
 * - opacity: 0.3 → 0.6（呼吸显现）
 */ function ScrollHint() {
    const breath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBreath"])(7000, 0.6); // 7秒周期，中等滞后相位
    // 呼吸值映射
    const breathY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0, 4); // 0px → 4px 下沉
    const breathOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBreath$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBreath"])(breath, 0.6, 0.9); // 0.6 → 0.9 显现
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
        href: "/questionnaire/birthday",
        className: "mt-16 group relative flex flex-col items-center scroll-hint-anchor",
        whileHover: {
            y: 3
        },
        transition: {
            duration: 0.3
        },
        style: {
            transform: `translateY(${breathY}px)`,
            opacity: breathOpacity
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] tracking-[0.12em] uppercase mb-4",
                style: {
                    color: 'rgba(20, 40, 30, 0.85)',
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                },
                children: "开始探索"
            }, void 0, false, {
                fileName: "[project]/app/(home)/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-px h-12 bg-[#1A2E2A]/20 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-0 left-0 w-full bg-[#1A2E2A]",
                    animate: {
                        height: [
                            '0%',
                            '100%',
                            '0%'
                        ],
                        top: [
                            '0%',
                            '0%',
                            '100%'
                        ]
                    },
                    transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(home)/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "text-lg text-[#1A2E2A] mt-2",
                animate: {
                    y: [
                        0,
                        4,
                        0
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                children: "↓"
            }, void 0, false, {
                fileName: "[project]/app/(home)/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(home)/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function Home() {
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredCat, setHoveredCat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Hero 鼠标视差
    const heroSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, {
        stiffness: 50,
        damping: 40
    });
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, {
        stiffness: 50,
        damping: 40
    });
    const farX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springX, [
        -500,
        500
    ], [
        -15,
        15
    ]);
    const farY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springY, [
        -500,
        500
    ], [
        -10,
        10
    ]);
    const mainX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springX, [
        -500,
        500
    ], [
        -8,
        8
    ]);
    const mainY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springY, [
        -500,
        500
    ], [
        -5,
        5
    ]);
    const titleXMouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springX, [
        -500,
        500
    ], [
        -3,
        3
    ]);
    const titleYMouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(springY, [
        -500,
        500
    ], [
        -2,
        2
    ]);
    // Hero 滚动进度
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: heroSectionRef,
        offset: [
            'start start',
            'end start'
        ]
    });
    const titleScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        1,
        0.8
    ]);
    const titleYScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        -100
    ]);
    const titleOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        0.5
    ], [
        1,
        0
    ]);
    const beastScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        1,
        1.15
    ]);
    const titleY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])([
        titleYMouse,
        titleYScroll
    ], ([mouse, scroll])=>mouse + scroll);
    const handleHeroMouseMove = (e)=>{
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
    };
    // ═══════════════════════════════════════════════════════════════
    // 四维匹配体系 - GSAP ScrollTrigger refs
    // ═══════════════════════════════════════════════════════════════
    const dimensionsSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionItem1Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionItem2Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionItem3Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionItem4Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionLine1Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionLine2Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionLine3Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dimensionLine4Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Lenis 丝滑滚动初始化（与 GSAP ticker 联动）
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            duration: 1.8,
            easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add((time)=>{
            lenis.raf(time * 1000);
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.lagSmoothing(0);
        return ()=>{
            lenis.destroy();
        };
    }, []);
    // ═══════════════════════════════════════════════════════════════
    // 四维匹配体系 - GSAP ScrollTrigger 动效
    // ═══════════════════════════════════════════════════════════════
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // 确保元素初始隐藏，避免 SSR 闪烁
        const items = [
            dimensionItem1Ref.current,
            dimensionItem2Ref.current,
            dimensionItem3Ref.current,
            dimensionItem4Ref.current
        ];
        items.forEach((item)=>{
            if (item) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(item, {
                opacity: 0,
                y: 60
            });
        });
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].context(()=>{
            // 四个维度的独立 ScrollTrigger 配置
            const dimensions = [
                {
                    item: dimensionItem1Ref.current,
                    line: dimensionLine1Ref.current
                },
                {
                    item: dimensionItem2Ref.current,
                    line: dimensionLine2Ref.current
                },
                {
                    item: dimensionItem3Ref.current,
                    line: dimensionLine3Ref.current
                },
                {
                    item: dimensionItem4Ref.current,
                    line: dimensionLine4Ref.current
                }
            ];
            dimensions.forEach(({ item, line }, index)=>{
                if (!item) return;
                // 创建时间线，绑定 ScrollTrigger
                const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });
                // 内容入场动画 - 从下往上浮现
                tl.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: index * 0.08
                });
                // 分割线宽度从0%到100%
                if (line) {
                    tl.fromTo(line, {
                        scaleX: 0
                    }, {
                        scaleX: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    }, '-=0.6');
                }
            });
        }, dimensionsSectionRef);
        return ()=>ctx.revert();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "jsx-f81ff6ace4af3407" + " " + "min-h-screen bg-[var(--background)] text-[var(--primary)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "jsx-f81ff6ace4af3407" + " " + "fixed top-0 left-0 right-0 z-50 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f81ff6ace4af3407" + " " + "flex items-center justify-between px-6 md:px-12 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-xs tracking-[0.3em] font-light text-[var(--foreground)]",
                                children: "百澤"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMenuOpen(!menuOpen),
                                className: "jsx-f81ff6ace4af3407" + " " + "text-xs tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en",
                                children: menuOpen ? 'Close' : 'Menu'
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 227,
                    columnNumber: 7
                }, this),
                menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    className: "fixed inset-0 z-40 bg-[var(--background)] flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "jsx-f81ff6ace4af3407" + " " + "text-center space-y-8",
                        children: [
                            'Begin',
                            'About',
                            'Method'
                        ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: i * 0.1
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item === 'Begin' ? '/questionnaire/birthday' : item === 'About' ? '/about' : '/method',
                                    className: "block text-4xl md:text-6xl font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-en",
                                    onClick: ()=>setMenuOpen(false),
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 17
                                }, this)
                            }, item, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: heroSectionRef,
                    onMouseMove: handleHeroMouseMove,
                    className: "jsx-f81ff6ace4af3407" + " " + "relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$hero$2f$Hero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hero"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-f81ff6ace4af3407" + " " + "relative w-full h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "hero-beast-main absolute z-[5] w-full h-full pointer-events-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        style: {
                                            x: mainX,
                                            y: mainY,
                                            scale: beastScale
                                        },
                                        animate: {
                                            y: [
                                                0,
                                                -8,
                                                0
                                            ]
                                        },
                                        transition: {
                                            y: {
                                                duration: 12,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }
                                        },
                                        className: "w-full h-full flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                transform: 'translateY(5%)'
                                            },
                                            className: "jsx-f81ff6ace4af3407" + " " + "relative w-[70vw]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/illustrations/hero/baize-gold-new.png",
                                                alt: "Main Beast",
                                                width: 1400,
                                                height: 1000,
                                                className: "w-full h-auto",
                                                style: {
                                                    filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.06))',
                                                    maskImage: 'radial-gradient(ellipse 70% 80% at 45% 50%, black 50%, transparent 85%)',
                                                    WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 45% 50%, black 50%, transparent 85%)'
                                                },
                                                priority: true
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "hero-title absolute z-[10] flex flex-col items-center justify-center pointer-events-none",
                                    style: {
                                        x: titleXMouse,
                                        y: titleY,
                                        scale: titleScale,
                                        opacity: titleOpacity,
                                        right: '12%',
                                        bottom: '22%'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "text-center mb-8 hero-subtitle",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-f81ff6ace4af3407" + " " + "font-serif tracking-[0.2em] text-[#1A2E2A] text-xs mb-2",
                                                    children: "洞察万物生息"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(home)/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-f81ff6ace4af3407" + " " + "font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px] mb-1",
                                                    children: "基于东方五行智慧的灵宠匹配"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(home)/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-f81ff6ace4af3407" + " " + "font-serif tracking-[0.15em] text-[#1A2E2A] text-[10px]",
                                                    children: "为你推荐最合适的陪伴"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(home)/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "hero-title-text",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                                                animate: {
                                                    scale: [
                                                        1,
                                                        1.015,
                                                        1
                                                    ]
                                                },
                                                transition: {
                                                    duration: 6,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut'
                                                },
                                                className: "font-black m-0",
                                                style: {
                                                    fontFamily: '"Noto Serif SC", serif',
                                                    fontSize: 'clamp(80px, 10vw, 140px)',
                                                    color: '#1A2E2A',
                                                    letterSpacing: '-0.02em',
                                                    lineHeight: 0.9,
                                                    textShadow: '0 4px 30px rgba(242, 240, 235, 0.8)',
                                                    backdropFilter: 'blur(2px)'
                                                },
                                                children: "百 澤"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "hero-scroll-hint",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollHint, {}, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 330,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(home)/page.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 270,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "f81ff6ace4af3407",
                    children: ".hero-beast-main.jsx-f81ff6ace4af3407{opacity:0;animation:1.4s cubic-bezier(.22,1,.36,1) .3s forwards beastEnter}@keyframes beastEnter{0%{opacity:0;filter:blur(10px);transform:scale(.95)translateY(20px)}50%{opacity:.8;filter:blur(3px)}to{opacity:1;filter:blur();transform:scale(1)translateY(0)}}.hero-title-text.jsx-f81ff6ace4af3407{opacity:0;animation:1.2s cubic-bezier(.16,1,.3,1) .8s forwards titleReveal}@keyframes titleReveal{0%{opacity:0;letter-spacing:.15em;filter:blur(4px);transform:translateY(30px)scale(.95)}40%{opacity:.6;filter:blur(2px)}to{opacity:1;letter-spacing:-.02em;filter:blur();transform:translateY(0)scale(1)}}.hero-subtitle.jsx-f81ff6ace4af3407{opacity:0;animation:.8s cubic-bezier(.22,1,.36,1) 1.3s forwards subtitleFade}@keyframes subtitleFade{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.hero-scroll-hint.jsx-f81ff6ace4af3407{opacity:0;animation:.8s cubic-bezier(.22,1,.36,1) 1.8s forwards hintEnter}@keyframes hintEnter{0%{opacity:0}to{opacity:1}}.hero-beast-far.jsx-f81ff6ace4af3407{opacity:0;animation:1.2s cubic-bezier(.22,1,.36,1) .3s forwards beastFarEnter}@keyframes beastFarEnter{0%{opacity:0;filter:blur(10px)}to{opacity:1;filter:blur()}}.godly-title.jsx-f81ff6ace4af3407{letter-spacing:.5em;color:#2d2926;text-shadow:0 0 15px #f2f0ebcc;font-family:Source Han Serif SC,Noto Serif SC,serif;font-weight:300;animation:3s ease-out forwards grainReveal}@keyframes grainReveal{0%{filter:blur(10px);opacity:0;transform:scale(1.05)}to{filter:blur();opacity:1;transform:scale(1)}}"
                }, void 0, false, void 0, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    ref: dimensionsSectionRef,
                    className: "jsx-f81ff6ace4af3407" + " " + "py-32 px-6 md:px-12 lg:px-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f81ff6ace4af3407" + " " + "max-w-7xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-f81ff6ace4af3407" + " " + "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "lg:col-span-4 relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f81ff6ace4af3407" + " " + "lg:sticky lg:top-[33vh]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.9
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 0.8,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                },
                                                className: "relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[var(--sand)] mb-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/pets/cat-ink.png",
                                                    alt: "百澤",
                                                    fill: true,
                                                    className: "object-cover object-top"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(home)/page.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 20
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 0.6,
                                                    delay: 0.1
                                                },
                                                className: "text-xs tracking-[0.4em] text-[var(--text-muted)] mb-4 font-en uppercase",
                                                children: "Our Method"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 30
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 0.8,
                                                    delay: 0.2,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                },
                                                className: "text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.06em] text-[var(--foreground)] leading-tight",
                                                children: [
                                                    "四维",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "jsx-f81ff6ace4af3407"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 19
                                                    }, this),
                                                    "匹配体系"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 485,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scaleX: 0
                                                },
                                                whileInView: {
                                                    scaleX: 1
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 1,
                                                    delay: 0.4,
                                                    ease: [
                                                        0.16,
                                                        1,
                                                        0.3,
                                                        1
                                                    ]
                                                },
                                                className: "w-16 h-px bg-[var(--accent)] mt-8 origin-left"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "lg:col-span-8 relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f81ff6ace4af3407" + " " + "space-y-32 lg:space-y-40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: dimensionItem1Ref,
                                                className: "jsx-f81ff6ace4af3407" + " " + "relative group text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "w-full h-px bg-gray-200/40 mb-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: 'Inter, system-ui, sans-serif'
                                                        },
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700",
                                                        children: "01"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative pt-12 pl-6 md:pl-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2",
                                                                children: "WUXING"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8",
                                                                children: "五行契合"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                ref: dimensionLine1Ref,
                                                                className: "jsx-f81ff6ace4af3407" + " " + "h-px bg-gray-400/60 w-32 mb-8 origin-left"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500",
                                                                children: "根据你的出生日期推算五行属性，从命理层面解读你与宠物的能量契合。金木水火土，万物皆有归属。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: dimensionItem2Ref,
                                                className: "jsx-f81ff6ace4af3407" + " " + "relative group text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "w-full h-px bg-gray-200/40 mb-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: 'Inter, system-ui, sans-serif'
                                                        },
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700",
                                                        children: "02"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 551,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative pt-12 pl-6 md:pl-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2",
                                                                children: "TIANSHI"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8",
                                                                children: "天时相应"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 561,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                ref: dimensionLine2Ref,
                                                                className: "jsx-f81ff6ace4af3407" + " " + "h-px bg-gray-400/60 w-32 mb-8 origin-left"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500",
                                                                children: "分析你的作息习惯与精力状态，找到与你生活节奏同频的宠物伙伴。时间的韵律，是相处的基础。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: dimensionItem3Ref,
                                                className: "jsx-f81ff6ace4af3407" + " " + "relative group text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "w-full h-px bg-gray-200/40 mb-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: 'Inter, system-ui, sans-serif'
                                                        },
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700",
                                                        children: "03"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative pt-12 pl-6 md:pl-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2",
                                                                children: "DILI"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8",
                                                                children: "地利相宜"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                ref: dimensionLine3Ref,
                                                                className: "jsx-f81ff6ace4af3407" + " " + "h-px bg-gray-400/60 w-32 mb-8 origin-left"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500",
                                                                children: "考量你的居住空间与环境稳定性，匹配最适应你生活场景的宠物。空间的边界，是舒适的起点。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 589,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 572,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: dimensionItem4Ref,
                                                className: "jsx-f81ff6ace4af3407" + " " + "relative group text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "w-full h-px bg-gray-200/40 mb-12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: 'Inter, system-ui, sans-serif'
                                                        },
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -top-8 -left-4 md:-left-8 text-[10rem] md:text-[12rem] lg:text-[14rem] font-thin leading-none pointer-events-none select-none text-gray-200/50 group-hover:text-gray-300/60 transition-colors duration-700",
                                                        children: "04"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 598,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative pt-12 pl-6 md:pl-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] text-gray-900 group-hover:text-gray-800 transition-colors duration-500 font-en mb-2",
                                                                children: "RENHE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 606,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-2xl tracking-[0.15em] text-gray-800 font-medium mb-8",
                                                                children: "人和缘定"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 609,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                ref: dimensionLine4Ref,
                                                                className: "jsx-f81ff6ace4af3407" + " " + "h-px bg-gray-400/60 w-32 mb-8 origin-left"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 612,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "text-lg font-light leading-loose text-gray-600 max-w-md group-hover:text-gray-700 transition-colors duration-500",
                                                                children: "洞察你的陪伴需求与情感期待，寻找与你灵魂契合的命定之宠。关系的本质，是彼此的成全。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 613,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 596,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(home)/page.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 450,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 449,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-f81ff6ace4af3407" + " " + "py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-[#F9F8F6] relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f81ff6ace4af3407" + " " + "max-w-7xl mx-auto relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: true
                                },
                                className: "mb-24 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "godly-title text-3xl md:text-4xl lg:text-5xl",
                                    children: "你的契合之选"
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 639,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 40,
                                    scale: 0.98
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                },
                                viewport: {
                                    once: true,
                                    margin: "-100px"
                                },
                                transition: {
                                    duration: 1.4,
                                    ease: [
                                        0.19,
                                        1,
                                        0.22,
                                        1
                                    ]
                                },
                                className: "relative w-full overflow-hidden rounded-lg",
                                style: {
                                    // 视差滚动：以 0.8 速度跟随，创造空间深度
                                    transform: "translateZ(0)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "relative w-full",
                                    animate: {
                                        scale: [
                                            1,
                                            1.02,
                                            1
                                        ]
                                    },
                                    transition: {
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/illustrations/pets-family-gathering.jpg",
                                            alt: "宠物全家福",
                                            width: 1400,
                                            height: 933,
                                            className: "w-full h-auto",
                                            priority: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 668,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: "linear-gradient(to top, #F9F8F6 0%, transparent 100%)"
                                            },
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 677,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 645,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 631,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 630,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-f81ff6ace4af3407" + " " + "py-32 px-6 md:px-12 relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f81ff6ace4af3407" + " " + "max-w-3xl mx-auto text-center relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                duration: 0.8,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1
                                ]
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm md:text-base font-light leading-loose text-[var(--text-secondary)] tracking-wide",
                                children: [
                                    "百澤相信，人与宠物的相遇并非偶然。",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 699,
                                        columnNumber: 21
                                    }, this),
                                    "我们将东方五行智慧与现代算法相结合，",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 701,
                                        columnNumber: 15
                                    }, this),
                                    "通过",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-f81ff6ace4af3407" + " " + "text-[var(--primary)] font-medium",
                                        children: "天时、地利、人和"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 702,
                                        columnNumber: 17
                                    }, this),
                                    "三重维度，",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 703,
                                        columnNumber: 15
                                    }, this),
                                    "为你寻找命中注定的伴侣。",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 705,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "jsx-f81ff6ace4af3407"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 705,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-f81ff6ace4af3407" + " " + "text-xs tracking-[0.2em] text-[var(--warm-gray)]",
                                        children: "BAIZE — WHERE DESTINY MEETS COMPANIONSHIP"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 706,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 697,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(home)/page.tsx",
                            lineNumber: 691,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 690,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 689,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "jsx-f81ff6ace4af3407" + " " + "py-24 md:py-32 bg-[var(--background)] relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-f81ff6ace4af3407" + " " + "flex flex-col md:flex-row min-h-[60vh]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    whileInView: {
                                        opacity: 1
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    className: "md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--background-alt)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-0 flex items-center justify-center p-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "relative w-full h-full max-w-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/pets/cat-ink.png",
                                                alt: "百澤",
                                                fill: true,
                                                className: "object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 726,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 725,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 719,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "md:w-1/2 flex items-center justify-center p-8 md:p-16",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        whileInView: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        viewport: {
                                            once: true
                                        },
                                        className: "max-w-sm text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm italic text-[var(--text-secondary)] mb-6",
                                                children: "Pactzo / begin"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 744,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm leading-relaxed text-[var(--foreground)] mb-4",
                                                children: "我们相信，每一只宠物都是命中注定的相遇。通过四维匹配体系，从五行、天时、地利、人和四个维度，为你寻找最契合的灵魂伴侣。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 745,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm leading-relaxed text-[var(--text-secondary)]",
                                                children: "仅需 2 分钟，开启你的缘分之旅。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 737,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(home)/page.tsx",
                            lineNumber: 717,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-f81ff6ace4af3407" + " " + "flex flex-col md:flex-row-reverse min-h-[60vh]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    whileInView: {
                                        opacity: 1
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    className: "md:w-1/2 relative h-[50vh] md:h-auto bg-[var(--primary)] overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-8 border border-white/10 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 765,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-12 border border-white/5 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 766,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 769,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 770,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 771,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 772,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-0 flex items-center justify-center p-12",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "relative w-64 h-64 md:w-72 md:h-72",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -inset-4 border-2 border-white/20 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 777,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -inset-8 border border-white/10 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -inset-12 border border-dashed border-white/5 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 780,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative w-full h-full rounded-full overflow-hidden bg-[var(--primary-dark)]/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/pets/dog-white.png",
                                                                alt: "宠物",
                                                                fill: true,
                                                                className: "object-contain scale-110"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(42,56,50,0.5)]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(home)/page.tsx",
                                                                lineNumber: 791,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(home)/page.tsx",
                                            lineNumber: 774,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 758,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f81ff6ace4af3407" + " " + "md:w-1/2 flex items-center justify-center p-8 md:p-16",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        whileInView: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        viewport: {
                                            once: true
                                        },
                                        className: "max-w-sm text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm italic text-[var(--text-secondary)] mb-6",
                                                children: "Destiny / awaits"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm leading-relaxed text-[var(--foreground)] mb-4",
                                                children: "百澤，通万物之情，知鬼神之事。我们以百澤为名，愿成为连接你与命定之宠的桥梁。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 805,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f81ff6ace4af3407" + " " + "text-sm leading-relaxed text-[var(--text-secondary)] mb-8",
                                                children: "每一次匹配，都是一段新故事的开始。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 808,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/questionnaire/birthday",
                                                className: "group/cta relative inline-block px-10 py-4 transition-all duration-500 hover:translate-y-[-2px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-0 border-2 border-[#1A2E2A] bg-[#1A2E2A] transition-all duration-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute inset-[5px] border border-white/40 transition-all duration-500 group-hover/cta:border-white/55"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "absolute -bottom-2 -right-2 w-full h-full bg-[#1A2E2A]/10 -z-10 transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:translate-y-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f81ff6ace4af3407" + " " + "relative text-xs tracking-[0.3em] uppercase text-white font-medium",
                                                        children: "Start Journey"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(home)/page.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(home)/page.tsx",
                                                lineNumber: 811,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(home)/page.tsx",
                                        lineNumber: 798,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(home)/page.tsx",
                                    lineNumber: 797,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(home)/page.tsx",
                            lineNumber: 756,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 715,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].footer, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: "py-16 px-6 md:px-12 border-t border-[var(--sand)] relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f81ff6ace4af3407" + " " + "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-f81ff6ace4af3407" + " " + "text-xs tracking-[0.3em] text-[var(--text-muted)]",
                                children: "百澤 PACTZO © 2026"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 835,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-f81ff6ace4af3407" + " " + "text-xs tracking-[0.1em] text-[var(--text-muted)]",
                                children: "测试结果仅供参考，选择宠物请结合实际情况"
                            }, void 0, false, {
                                fileName: "[project]/app/(home)/page.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(home)/page.tsx",
                        lineNumber: 834,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(home)/page.tsx",
                    lineNumber: 827,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(home)/page.tsx",
            lineNumber: 225,
            columnNumber: 5
        }, this)
    }, void 0, false);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a8d903b8._.js.map