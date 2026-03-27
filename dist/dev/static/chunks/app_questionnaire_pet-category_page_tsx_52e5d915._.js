(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/questionnaire/pet-category/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PetCategoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const categories = [
    {
        id: 'cat',
        label: 'CAT',
        meta: '猫咪 · 独立优雅的灵魂伴侣',
        icon: '◯'
    },
    {
        id: 'dog',
        label: 'DOG',
        meta: '狗狗 · 忠诚热情的挚友',
        icon: '△'
    },
    {
        id: 'rabbit',
        label: 'RABBIT',
        meta: '兔子 · 温柔安静的小精灵',
        icon: '◇'
    },
    {
        id: 'small',
        label: 'SMALL PET',
        meta: '小宠 · 仓鼠、龙猫、雪貂等',
        icon: '□'
    },
    {
        id: 'bird',
        label: 'BIRD',
        meta: '鸟类 · 灵动歌唱的羽友',
        icon: '✕'
    },
    {
        id: 'reptile',
        label: 'REPTILE',
        meta: '爬宠 · 佛系独特的存在',
        icon: '◐'
    },
    {
        id: 'fish',
        label: 'AQUATIC',
        meta: '水族 · 沉默而治愈的陪伴',
        icon: '◎'
    },
    {
        id: 'amphibian',
        label: 'AMPHIBIAN',
        meta: '两栖 · 角蛙、六角恐龙等',
        icon: '◑'
    },
    {
        id: 'exotic',
        label: 'EXOTIC',
        meta: '异宠 · 迷你猪、羊驼、蜜袋鼯等',
        icon: '✦'
    },
    {
        id: 'all',
        label: 'SURPRISE ME',
        meta: '跨类推荐 · 让命运来决定',
        icon: '?'
    }
];
const TRANSITION = {
    duration: 1.2,
    ease: [
        0.19,
        1,
        0.22,
        1
    ]
};
function PetCategoryPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSelect = (id)=>{
        setSelected(id);
        sessionStorage.setItem('pet_category', id);
        setTimeout(()=>{
            router.push('/loading');
        }, 400);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-screen w-full bg-[#F6F5F2] text-[#1A1A1A] overflow-hidden selection:bg-[#7A2E2E]/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay",
                style: {
                    backgroundImage: `url('/noise.svg')`
                }
            }, void 0, false, {
                fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/80 backdrop-blur-md border-b border-black/5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 md:px-12 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "font-inter-label text-[9px] opacity-50 hover:opacity-100 hover:text-[#7A2E2E] transition-all duration-300",
                        children: "百澤"
                    }, void 0, false, {
                        fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block absolute right-5 top-1/2 -translate-y-1/2 font-inter text-[7px] tracking-[0.6em] uppercase opacity-[0.06] pointer-events-none select-none",
                style: {
                    writingMode: 'vertical-rl'
                },
                children: "PACTZO_ARCHIVE_2026"
            }, void 0, false, {
                fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "fixed bottom-10 left-10 right-10 md:bottom-12 md:left-12 md:right-12 z-40 flex justify-between items-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-end gap-8 md:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/questionnaire/appearance",
                            className: "font-inter text-[9px] tracking-[0.2em] uppercase text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-all duration-300 pb-1",
                            children: "← Back"
                        }, void 0, false, {
                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter text-[9px] tracking-[0.2em] uppercase opacity-40",
                                    children: "CATEGORY"
                                }, void 0, false, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[1px] w-16 bg-[#7A2E2E]"
                                }, void 0, false, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full flex items-center justify-center px-[6%] md:px-[10%] lg:px-[14%]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-12 md:gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: -40
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            transition: {
                                ...TRANSITION,
                                delay: 0.2
                            },
                            className: "border-l-[1.5px] border-[#1A1A1A] pl-10 md:pl-12 lg:pl-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter-label block text-[9px] opacity-30 mb-6 md:mb-8",
                                    children: "Final Selection"
                                }, void 0, false, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-playfair text-[clamp(48px,8vw,100px)] leading-[0.85] mb-4 md:mb-6 whitespace-pre-line",
                                    children: 'Choose\nYour Path.'
                                }, void 0, false, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-inter text-[10px] md:text-xs tracking-[0.35em] opacity-30 uppercase font-light italic",
                                    children: "选择你心仪的宠物类型"
                                }, void 0, false, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:pl-8 lg:pl-16 grid grid-cols-2 gap-x-8 md:gap-x-12",
                            children: categories.map((cat, idx)=>{
                                const isSelected = selected === cat.id;
                                const isEvenCol = idx % 2 === 1;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    initial: {
                                        opacity: 0,
                                        y: 30
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        ...TRANSITION,
                                        delay: 0.3 + idx * 0.05
                                    },
                                    onClick: ()=>!selected && handleSelect(cat.id),
                                    className: `group relative w-full text-left py-6 md:py-8 transition-all duration-500
                    ${isSelected ? 'translate-x-[15px]' : 'hover:translate-x-[15px]'}
                    ${isEvenCol ? 'md:mt-10' : ''}`,
                                    style: {
                                        backgroundColor: isSelected ? '#E0EAE9' : 'transparent',
                                        transform: isSelected ? 'scale(1.05)' : undefined,
                                        boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.08)' : 'none'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 left-0 right-0 h-px bg-[#1A1A1A]/[0.06]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start px-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block mb-3 text-lg transition-all duration-300",
                                                            style: {
                                                                fontFamily: "'Inter', sans-serif",
                                                                fontWeight: 100,
                                                                color: isSelected ? '#7A2E2E' : 'rgba(26,26,26,0.2)'
                                                            },
                                                            children: cat.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-inter text-sm md:text-base lg:text-lg font-medium tracking-[0.15em] md:tracking-[0.2em] transition-colors duration-300",
                                                            style: {
                                                                color: isSelected ? '#7A2E2E' : '#1A1A1A'
                                                            },
                                                            children: cat.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-inter text-[7px] md:text-[8px] tracking-[0.15em] opacity-30 uppercase mt-2 font-light",
                                                            children: cat.meta
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    animate: {
                                                        rotate: isSelected ? 45 : 0,
                                                        opacity: isSelected ? 1 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.4,
                                                        ease: [
                                                            0.19,
                                                            1,
                                                            0.22,
                                                            1
                                                        ]
                                                    },
                                                    className: "text-xl font-thin text-[#7A2E2E]",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100",
                                            style: {
                                                backgroundColor: '#E0EAE9',
                                                transform: 'scale(1.05)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                                                zIndex: -1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, cat.id, true, {
                                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/questionnaire/pet-category/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/questionnaire/pet-category/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(PetCategoryPage, "v82BLMhx4mEQ7+aTGYK1fNJkxng=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PetCategoryPage;
var _c;
__turbopack_context__.k.register(_c, "PetCategoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_questionnaire_pet-category_page_tsx_52e5d915._.js.map