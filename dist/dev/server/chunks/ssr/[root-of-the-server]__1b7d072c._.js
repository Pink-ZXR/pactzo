module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/wuxing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WUXING_DESCRIPTIONS",
    ()=>WUXING_DESCRIPTIONS,
    "WUXING_NAMES",
    ()=>WUXING_NAMES,
    "calculateWuxing",
    ()=>calculateWuxing,
    "getMonthGanZhi",
    ()=>getMonthGanZhi,
    "getWuxingInfo",
    ()=>getWuxingInfo,
    "getYearGanZhi",
    ()=>getYearGanZhi
]);
// 天干
const TIAN_GAN = [
    '甲',
    '乙',
    '丙',
    '丁',
    '戊',
    '己',
    '庚',
    '辛',
    '壬',
    '癸'
];
// 地支
const DI_ZHI = [
    '子',
    '丑',
    '寅',
    '卯',
    '辰',
    '巳',
    '午',
    '未',
    '申',
    '酉',
    '戌',
    '亥'
];
// 天干对应五行
const TIAN_GAN_WUXING = {
    '甲': 'wood',
    '乙': 'wood',
    '丙': 'fire',
    '丁': 'fire',
    '戊': 'earth',
    '己': 'earth',
    '庚': 'metal',
    '辛': 'metal',
    '壬': 'water',
    '癸': 'water'
};
// 地支对应五行
const DI_ZHI_WUXING = {
    '子': 'water',
    '亥': 'water',
    '寅': 'wood',
    '卯': 'wood',
    '巳': 'fire',
    '午': 'fire',
    '丑': 'earth',
    '辰': 'earth',
    '未': 'earth',
    '戌': 'earth',
    '申': 'metal',
    '酉': 'metal'
};
const WUXING_NAMES = {
    metal: '金',
    wood: '木',
    water: '水',
    fire: '火',
    earth: '土'
};
const WUXING_DESCRIPTIONS = {
    metal: '金主义，代表收敛、肃杀、坚毅。金命之人性格刚毅果断，做事有条理，讲究原则，适合与温顺体贴的宠物相伴。',
    wood: '木主仁，代表生发、条达、舒展。木命之人性格温和有爱心，富有同情心，喜欢照顾他人，适合与活泼好动的宠物相伴。',
    water: '水主智，代表润下、寒凉、闭藏。水命之人聪明灵活，善于应变，内心细腻，适合与聪明独立的宠物相伴。',
    fire: '火主礼，代表炎上、明亮、热情。火命之人热情开朗，积极向上，充满活力，适合与热情粘人的宠物相伴。',
    earth: '土主信，代表稳重、承载、包容。土命之人稳重踏实，诚信可靠，包容心强，适合与温和稳重的宠物相伴。'
};
function getYearGanZhi(year) {
    // 以1984年(甲子年)为基准
    const baseYear = 1984;
    const offset = year - baseYear;
    const ganIndex = (offset % 10 + 10) % 10;
    const zhiIndex = (offset % 12 + 12) % 12;
    return {
        gan: TIAN_GAN[ganIndex],
        zhi: DI_ZHI[zhiIndex]
    };
}
function getMonthGanZhi(year, month) {
    // 地支：正月寅，二月卯...
    const monthZhiMap = [
        '寅',
        '卯',
        '辰',
        '巳',
        '午',
        '未',
        '申',
        '酉',
        '戌',
        '亥',
        '子',
        '丑'
    ];
    const zhi = monthZhiMap[(month - 1) % 12];
    // 天干根据年干推算（简化）
    const yearGan = getYearGanZhi(year).gan;
    const yearGanIndex = TIAN_GAN.indexOf(yearGan);
    const monthGanBase = (yearGanIndex % 5 * 2 + 2) % 10;
    const ganIndex = (monthGanBase + month - 1) % 10;
    return {
        gan: TIAN_GAN[ganIndex],
        zhi
    };
}
function calculateWuxing(year, month, day) {
    const yearGanZhi = getYearGanZhi(year);
    const monthGanZhi = getMonthGanZhi(year, month);
    // 收集五行权重
    const wuxingWeights = {
        metal: 0,
        wood: 0,
        water: 0,
        fire: 0,
        earth: 0
    };
    // 年柱五行（权重较高）
    wuxingWeights[TIAN_GAN_WUXING[yearGanZhi.gan]] += 3;
    wuxingWeights[DI_ZHI_WUXING[yearGanZhi.zhi]] += 2;
    // 月柱五行
    wuxingWeights[TIAN_GAN_WUXING[monthGanZhi.gan]] += 2;
    wuxingWeights[DI_ZHI_WUXING[monthGanZhi.zhi]] += 1;
    // 根据日期补充（简化算法）
    const dayWuxing = [
        'metal',
        'wood',
        'water',
        'fire',
        'earth'
    ];
    wuxingWeights[dayWuxing[(day - 1) % 5]] += 1;
    // 找出权重最高的五行
    let maxWeight = 0;
    let dominantElement = 'earth';
    for (const [element, weight] of Object.entries(wuxingWeights)){
        if (weight > maxWeight) {
            maxWeight = weight;
            dominantElement = element;
        }
    }
    return dominantElement;
}
function getWuxingInfo(element) {
    return {
        element,
        name: WUXING_NAMES[element],
        description: WUXING_DESCRIPTIONS[element]
    };
}
}),
"[project]/lib/pet-database.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 宠物品种数据库
 * 
 * @context 测试版本 - 通用数据，支持9大类宠物
 * @version 3.0.0 - 五维匹配模型（新增外观维度）
 */ __turbopack_context__.s([
    "PET_CATEGORIES",
    ()=>PET_CATEGORIES,
    "PET_DATABASE",
    ()=>PET_DATABASE,
    "getAllBreeds",
    ()=>getAllBreeds,
    "getAllCategories",
    ()=>getAllCategories,
    "getBreedById",
    ()=>getBreedById,
    "getBreedsByCategory",
    ()=>getBreedsByCategory
]);
const PET_CATEGORIES = {
    cat: {
        name: '猫咪',
        icon: '🐱',
        desc: '独立优雅的小精灵'
    },
    dog: {
        name: '狗狗',
        icon: '🐕',
        desc: '忠诚热情的伙伴'
    },
    rabbit: {
        name: '兔子',
        icon: '🐰',
        desc: '安静可爱的小天使'
    },
    small: {
        name: '小宠',
        icon: '🐹',
        desc: '小巧迷人的萌物'
    },
    bird: {
        name: '鸟类',
        icon: '🐦',
        desc: '灵动有趣的朋友'
    },
    reptile: {
        name: '爬宠',
        icon: '🦎',
        desc: '佛系独特的存在'
    },
    fish: {
        name: '水族',
        icon: '🐟',
        desc: '治愈观赏的艺术'
    },
    amphibian: {
        name: '两栖',
        icon: '🐸',
        desc: '呆萌治愈的小生灵'
    },
    exotic: {
        name: '异宠',
        icon: '🦊',
        desc: '少见却令人着迷'
    }
};
const PET_DATABASE = [
    // ===== 猫咪 (11种) =====
    {
        id: 'cat-british-shorthair',
        name: '英国短毛猫',
        nameEn: 'British Shorthair',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '灰色',
            '蓝色'
        ],
        size: 'medium',
        traits: [
            '独立',
            '安静',
            '适应力强',
            '温顺'
        ],
        description: '英短性格温和稳定，不需要过多关注，非常适合忙碌的都市人。',
        emotionalTemplates: [
            '英短会成为你最安静的知己，在每个独处的时光里，不打扰便是最好的陪伴。',
            '它圆圆的眼睛注视着你，无需言语，便已是最好的默契。'
        ]
    },
    {
        id: 'cat-ragdoll',
        name: '布偶猫',
        nameEn: 'Ragdoll',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'wood',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'long',
        colorTags: [
            '白色',
            '棕色',
            '蓝色'
        ],
        size: 'large',
        traits: [
            '温柔',
            '粘人',
            '亲人',
            '安静'
        ],
        description: '布偶猫被称为"小狗猫"，喜欢跟随主人，性格温顺如布偶。',
        emotionalTemplates: [
            '布偶会成为你最温柔的倾听者，在每个疲惫的夜晚，静静陪在身边。',
            '它蓝色的眼睛像一汪深海，你可以把所有的心事都倾诉给它。'
        ]
    },
    {
        id: 'cat-orange',
        name: '橘猫',
        nameEn: 'Orange Tabby',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'fire',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '橘黄',
            '斑纹'
        ],
        size: 'medium',
        traits: [
            '活泼',
            '亲人',
            '贪吃',
            '聪明'
        ],
        description: '橘猫以其开朗的性格和圆润的身材闻名，适应力强，是新手养猫的好选择。',
        emotionalTemplates: [
            '橘猫会用它的热情感染你的生活，让每一天都充满阳光和欢笑。',
            '看着它圆滚滚的身体，你会不自觉地嘴角上扬——这就是简单的幸福。'
        ]
    },
    {
        id: 'cat-siamese',
        name: '暹罗猫',
        nameEn: 'Siamese',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'water',
        schedule: 2,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '白色',
            '棕色',
            '黑色'
        ],
        size: 'medium',
        traits: [
            '聪明',
            '话痨',
            '粘人',
            '好奇'
        ],
        description: '暹罗猫是最会"说话"的猫咪，它们忠诚且依恋主人，如同一只小狗。',
        emotionalTemplates: [
            '暹罗会用它独特的嗓音与你对话，让你的生活从此不再寂静。',
            '它深邃的蓝眼睛里藏着神秘，就像你们注定相遇的缘分。'
        ]
    },
    {
        id: 'cat-american-shorthair',
        name: '美国短毛猫',
        nameEn: 'American Shorthair',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'earth',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '银色',
            '斑纹'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '健康',
            '好养',
            '友善'
        ],
        description: '美短性格温和，身体健壮，适应力强，是最省心的家庭猫咪之一。',
        emotionalTemplates: [
            '美短会给你最踏实的陪伴，它的存在就像家的一部分，自然而温暖。',
            '简单的相处，就是最长久的幸福——美短深谙此道。'
        ]
    },
    {
        id: 'cat-scottish-fold',
        name: '苏格兰折耳猫',
        nameEn: 'Scottish Fold',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'earth',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '灰色',
            '白色',
            '棕色'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '安静',
            '好奇',
            '甜美'
        ],
        description: '折耳猫以其标志性的折耳和圆脸闻名，性格温顺甜美，喜欢安静陪伴。',
        emotionalTemplates: [
            '折耳猫会用它圆圆的大眼睛注视着你，像一个安静的守护者。',
            '那对小小的折耳，仿佛在说：我愿意低下头，只为更靠近你。'
        ]
    },
    {
        id: 'cat-maine-coon',
        name: '缅因猫',
        nameEn: 'Maine Coon',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'wood',
        schedule: 2,
        energy: 2,
        space: 3,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '棕色',
            '斑纹',
            '多彩'
        ],
        size: 'large',
        traits: [
            '温柔巨人',
            '聪明',
            '独立',
            '忠诚'
        ],
        description: '缅因猫是最大的家猫品种之一，被称为"温柔的巨人"，性格稳重又亲人。',
        emotionalTemplates: [
            '缅因猫会用它庞大的身躯给你最温暖的拥抱，让你感受被守护的安心。',
            '它威风凛凛的外表下，藏着一颗最柔软的心。'
        ]
    },
    {
        id: 'cat-persian',
        name: '波斯猫',
        nameEn: 'Persian',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '白色',
            '灰色',
            '橘黄'
        ],
        size: 'medium',
        traits: [
            '优雅',
            '安静',
            '温顺',
            '高贵'
        ],
        description: '波斯猫是猫中贵族，优雅高贵，性格安静温和，需要定期梳毛护理。',
        emotionalTemplates: [
            '波斯猫会用它的优雅告诉你：生活值得被认真对待。',
            '梳理它长长的毛发时，你会发现慢下来的时光格外美好。'
        ]
    },
    {
        id: 'cat-russian-blue',
        name: '俄罗斯蓝猫',
        nameEn: 'Russian Blue',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '蓝色',
            '灰色'
        ],
        size: 'medium',
        traits: [
            '优雅',
            '害羞',
            '忠诚',
            '安静'
        ],
        description: '俄罗斯蓝猫有着独特的银蓝色毛发和翡翠绿眼睛，性格内敛但对主人忠诚。',
        emotionalTemplates: [
            '蓝猫会在你不经意间悄悄靠近，用它的方式告诉你：我在。',
            '它翡翠般的双眼里，藏着只属于你的温柔。'
        ]
    },
    {
        id: 'cat-sphynx',
        name: '无毛猫',
        nameEn: 'Sphynx',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'fire',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'hairless',
        colorTags: [
            '肤色',
            '灰色',
            '黑色'
        ],
        size: 'medium',
        traits: [
            '粘人',
            '活泼',
            '聪明',
            '独特'
        ],
        description: '无毛猫外表独特，性格极其粘人热情，喜欢钻被窝，是最像狗的猫。',
        emotionalTemplates: [
            '无毛猫会用它温热的身体紧贴着你，让你感受最直接的温暖。',
            '它独特的外表下，是一颗比任何猫都热烈的心。'
        ]
    },
    {
        id: 'cat-munchkin',
        name: '曼基康矮脚猫',
        nameEn: 'Munchkin',
        category: 'cat',
        categoryName: '猫咪',
        wuxing: 'earth',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '多彩',
            '斑纹'
        ],
        size: 'small',
        traits: [
            '活泼',
            '好奇',
            '可爱',
            '友善'
        ],
        description: '曼基康以其标志性的短腿闻名，性格活泼好奇，是社交媒体上的人气明星。',
        emotionalTemplates: [
            '曼基康会用它的小短腿追逐你的脚步，每一步都是对你的喜欢。',
            '看着它努力够高处的样子，你会明白：努力本身就是最可爱的事。'
        ]
    },
    // ===== 狗狗 (12种) =====
    {
        id: 'dog-golden-retriever',
        name: '金毛寻回犬',
        nameEn: 'Golden Retriever',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'metal',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 3,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '金色',
            '棕色'
        ],
        size: 'large',
        traits: [
            '友善',
            '忠诚',
            '温顺',
            '聪明'
        ],
        description: '金毛是最受欢迎的家庭犬之一，性格温顺友善，对人类充满热情。',
        emotionalTemplates: [
            '金毛会成为你最忠诚的伙伴，无论何时回家，它的尾巴总为你摇摆。',
            '它温暖的眼神告诉你：无论发生什么，我都在这里。'
        ]
    },
    {
        id: 'dog-shiba',
        name: '柴犬',
        nameEn: 'Shiba Inu',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'wood',
        schedule: 3,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '橘黄',
            '白色'
        ],
        size: 'medium',
        traits: [
            '独立',
            '忠诚',
            '倔强',
            '机警'
        ],
        description: '柴犬有着狐狸般的外表和猫一样的独立性格，忠于主人但不过分粘人。',
        emotionalTemplates: [
            '柴犬会用它的方式爱你——不过分表达，却无比忠诚。',
            '它微笑的脸庞藏着一颗倔强又温暖的心，只为你一人敞开。'
        ]
    },
    {
        id: 'dog-corgi',
        name: '柯基',
        nameEn: 'Corgi',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'earth',
        schedule: 3,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '橘黄',
            '白色',
            '黑色'
        ],
        size: 'medium',
        traits: [
            '活泼',
            '聪明',
            '粘人',
            '友善'
        ],
        description: '柯基以其短腿和大屁股闻名，性格活泼开朗，非常适合公寓饲养。',
        emotionalTemplates: [
            '柯基会用它的小短腿追随你的每一步，让你永远不会感到孤单。',
            '看着它摇晃的屁股，再坏的心情也会烟消云散。'
        ]
    },
    {
        id: 'dog-poodle',
        name: '贵宾犬',
        nameEn: 'Poodle',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'water',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'wool',
        colorTags: [
            '白色',
            '棕色',
            '黑色',
            '灰色'
        ],
        size: 'small',
        traits: [
            '聪明',
            '活泼',
            '优雅',
            '亲人'
        ],
        description: '贵宾犬智商极高，不掉毛，是最适合城市公寓的狗狗品种之一。',
        emotionalTemplates: [
            '贵宾会用它的聪明才智逗你开心，每天都有新惊喜。',
            '优雅的外表下，是一颗渴望被爱的真挚内心。'
        ]
    },
    {
        id: 'dog-labrador',
        name: '拉布拉多',
        nameEn: 'Labrador Retriever',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'fire',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 3,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'short',
        colorTags: [
            '黑色',
            '棕色',
            '白色'
        ],
        size: 'large',
        traits: [
            '友善',
            '温顺',
            '活泼',
            '忠诚'
        ],
        description: '拉布拉多性格温和友善，是最受欢迎的导盲犬和家庭犬。',
        emotionalTemplates: [
            '拉布拉多会给你无条件的爱，让你体会到被完全信任的幸福。',
            '它的热情像阳光一样温暖，照亮你生活的每一个角落。'
        ]
    },
    {
        id: 'dog-husky',
        name: '哈士奇',
        nameEn: 'Siberian Husky',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'water',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '灰色',
            '白色',
            '黑色'
        ],
        size: 'large',
        traits: [
            '活泼',
            '独立',
            '搞怪',
            '精力旺盛'
        ],
        description: '哈士奇以其狼一般的外貌和搞笑的性格闻名，精力充沛，需要大量运动。',
        emotionalTemplates: [
            '哈士奇会用它无穷的精力和搞怪的表情，让你的生活永远充满欢笑。',
            '它蓝色的眼睛像冰雪世界的入口，带你进入一个充满冒险的旅程。'
        ]
    },
    {
        id: 'dog-samoyed',
        name: '萨摩耶',
        nameEn: 'Samoyed',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'metal',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '白色'
        ],
        size: 'large',
        traits: [
            '微笑天使',
            '友善',
            '活泼',
            '粘人'
        ],
        description: '萨摩耶被称为"微笑天使"，纯白的毛发和标志性的笑容让人无法抗拒。',
        emotionalTemplates: [
            '萨摩耶会用它的微笑融化你所有的坏心情，每一天都是阳光灿烂。',
            '它雪白的毛发像云朵一样，拥抱它就像拥抱了整个冬天的温暖。'
        ]
    },
    {
        id: 'dog-pomeranian',
        name: '博美',
        nameEn: 'Pomeranian',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'fire',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'long',
        colorTags: [
            '橘黄',
            '白色',
            '棕色'
        ],
        size: 'tiny',
        traits: [
            '活泼',
            '勇敢',
            '粘人',
            '机灵'
        ],
        description: '博美虽然体型小巧，却有着大狗的勇气和自信，毛发蓬松如小狐狸。',
        emotionalTemplates: [
            '博美会用它小小的身体给你大大的爱，勇气和忠诚不分大小。',
            '它蓬松的毛球外表下，藏着一颗骄傲又深情的心。'
        ]
    },
    {
        id: 'dog-bichon',
        name: '比熊',
        nameEn: 'Bichon Frise',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'metal',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'wool',
        colorTags: [
            '白色'
        ],
        size: 'small',
        traits: [
            '开朗',
            '粘人',
            '不掉毛',
            '可爱'
        ],
        description: '比熊犬性格开朗，毛发雪白不掉毛，像一团行走的棉花糖。',
        emotionalTemplates: [
            '比熊会用它棉花糖般的拥抱，让你忘记所有的烦恼。',
            '它圆圆的黑眼睛里满是欢喜，看着你就是它最快乐的事。'
        ]
    },
    {
        id: 'dog-french-bulldog',
        name: '法国斗牛犬',
        nameEn: 'French Bulldog',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'earth',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '黑色',
            '白色',
            '棕色',
            '斑纹'
        ],
        size: 'small',
        traits: [
            '温顺',
            '粘人',
            '安静',
            '憨厚'
        ],
        description: '法斗性格温顺安静，运动需求低，蝙蝠耳和扁脸让它充满喜感。',
        emotionalTemplates: [
            '法斗会用它憨憨的表情和打呼噜的声音，给你最踏实的陪伴。',
            '它不需要跑很远，只想安静地窝在你身边——这就够了。'
        ]
    },
    {
        id: 'dog-border-collie',
        name: '边境牧羊犬',
        nameEn: 'Border Collie',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'wood',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 2,
        companion: 3,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '黑色',
            '白色'
        ],
        size: 'large',
        traits: [
            '最聪明',
            '精力旺',
            '忠诚',
            '敏捷'
        ],
        description: '边牧是公认智商最高的犬种，学习能力极强，需要大量运动和智力游戏。',
        emotionalTemplates: [
            '边牧会用它超凡的智慧和你心意相通，成为真正的灵魂伙伴。',
            '它的眼神里满是专注，当它注视你时，全世界只剩下你一个人。'
        ]
    },
    {
        id: 'dog-german-shepherd',
        name: '德国牧羊犬',
        nameEn: 'German Shepherd',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'metal',
        schedule: 3,
        energy: 3,
        space: 3,
        stability: 3,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'short',
        colorTags: [
            '黑色',
            '棕色'
        ],
        size: 'large',
        traits: [
            '忠诚',
            '勇敢',
            '聪明',
            '可靠'
        ],
        description: '德牧是最全能的工作犬，忠诚勇敢，是最可靠的守护者和家庭伙伴。',
        emotionalTemplates: [
            '德牧会成为你最坚实的后盾，它的忠诚是这个世界上最纯粹的信任。',
            '有它在身边，你永远不用害怕——因为它会替你勇敢。'
        ]
    },
    {
        id: 'dog-beagle',
        name: '比格犬',
        nameEn: 'Beagle',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'fire',
        schedule: 3,
        energy: 3,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '三色',
            '白色',
            '棕色',
            '黑色'
        ],
        size: 'medium',
        traits: [
            '友善',
            '活泼',
            '好奇',
            '温顺'
        ],
        description: '比格犬性格友善活泼，嗅觉灵敏，是最受欢迎的家庭伴侣犬之一。',
        emotionalTemplates: [
            '比格犬会用它无忧无虑的笑容，治愈你所有的疲惫。',
            '它好奇的眼神会带你重新发现生活中被忽略的美好。'
        ]
    },
    {
        id: 'dog-dachshund',
        name: '腊肠犬',
        nameEn: 'Dachshund',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'earth',
        schedule: 2,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '棕色',
            '黑色',
            '奶油色'
        ],
        size: 'small',
        traits: [
            '勇敢',
            '活泼',
            '忠诚',
            '倔强'
        ],
        description: '腊肠犬以其独特的长身体和短腿闻名，性格勇敢活泼，对主人忠诚。',
        emotionalTemplates: [
            '腊肠犬小小的身体里装着大大的勇气，它会成为你最勇敢的小卫士。',
            '它摇摆的小短腿和热情的尾巴，是每天回家最温暖的欢迎仪式。'
        ]
    },
    {
        id: 'dog-cocker-spaniel',
        name: '美国可卡犬',
        nameEn: 'American Cocker Spaniel',
        category: 'dog',
        categoryName: '狗狗',
        wuxing: 'wood',
        schedule: 2,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'long',
        colorTags: [
            '金色',
            '棕色',
            '白色',
            '黑色'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '优雅',
            '亲人',
            '活泼'
        ],
        description: '美国可卡犬拥有华丽的被毛和温顺的性格，是最优雅的家庭伴侣犬之一。',
        emotionalTemplates: [
            '可卡犬会用它温柔的眼神和飘逸的毛发，为你的生活增添一抹优雅。',
            '它温顺的性格会让你感受到被无条件爱着的幸福。'
        ]
    },
    // ===== 兔子 (5种) =====
    {
        id: 'rabbit-holland-lop',
        name: '荷兰垂耳兔',
        nameEn: 'Holland Lop',
        category: 'rabbit',
        categoryName: '兔子',
        wuxing: 'wood',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '白色',
            '棕色',
            '灰色'
        ],
        size: 'small',
        traits: [
            '温顺',
            '亲人',
            '可爱',
            '安静'
        ],
        description: '垂耳兔以其下垂的耳朵和温顺的性格著称，是最受欢迎的宠物兔品种之一。',
        emotionalTemplates: [
            '垂耳兔会用它柔软的毛发和安静的陪伴，治愈你所有的疲惫。',
            '那对下垂的耳朵像在说：我听着呢，慢慢讲给我听吧。'
        ]
    },
    {
        id: 'rabbit-lionhead',
        name: '狮子兔',
        nameEn: 'Lionhead Rabbit',
        category: 'rabbit',
        categoryName: '兔子',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'long',
        colorTags: [
            '棕色',
            '白色',
            '灰色'
        ],
        size: 'small',
        traits: [
            '独立',
            '安静',
            '可爱',
            '好养'
        ],
        description: '狮子兔因头部的鬃毛像狮子而得名，性格独立安静，适合新手饲养。',
        emotionalTemplates: [
            '狮子兔会安静地陪在你身边，不打扰却无比治愈。',
            '它小小的身体里藏着一颗独立的灵魂，你们会成为最好的室友。'
        ]
    },
    {
        id: 'rabbit-dwarf',
        name: '侏儒兔',
        nameEn: 'Netherland Dwarf',
        category: 'rabbit',
        categoryName: '兔子',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '多彩'
        ],
        size: 'tiny',
        traits: [
            '机灵',
            '活泼',
            '小巧',
            '好奇'
        ],
        description: '侏儒兔是最小的宠物兔品种之一，性格活泼好奇，虽然体型迷你但精力不小。',
        emotionalTemplates: [
            '侏儒兔小小的身体里装满了好奇，会让你的生活充满惊喜。',
            '看着它探索世界的样子，你会想起生活中那些被遗忘的美好。'
        ]
    },
    {
        id: 'rabbit-angora',
        name: '安哥拉兔',
        nameEn: 'Angora Rabbit',
        category: 'rabbit',
        categoryName: '兔子',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '白色',
            '灰色'
        ],
        size: 'medium',
        traits: [
            '优雅',
            '温顺',
            '毛发华丽',
            '安静'
        ],
        description: '安哥拉兔拥有极其华丽的长毛，像一团飘逸的云朵，需要精心打理。',
        emotionalTemplates: [
            '安哥拉兔会用它如云朵般的毛发，为你编织一个柔软的梦。',
            '照顾它的过程，就是学会用心对待美好事物的过程。'
        ]
    },
    {
        id: 'rabbit-rex',
        name: '迷你雷克斯兔',
        nameEn: 'Mini Rex',
        category: 'rabbit',
        categoryName: '兔子',
        wuxing: 'earth',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '棕色',
            '黑色',
            '白色'
        ],
        size: 'small',
        traits: [
            '丝绒触感',
            '温顺',
            '好奇',
            '亲人'
        ],
        description: '迷你雷克斯拥有天鹅绒般的独特毛发触感，性格温和亲人，体型适中。',
        emotionalTemplates: [
            '摸到雷克斯那丝绒般的毛发时，你会明白什么叫"触手可及的幸福"。',
            '它用柔软回应你的每一次抚摸，这是最朴素的温柔。'
        ]
    },
    // ===== 小宠 (6种) =====
    {
        id: 'small-hamster',
        name: '仓鼠',
        nameEn: 'Hamster',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'earth',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 1,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '白色',
            '棕色',
            '灰色'
        ],
        size: 'tiny',
        traits: [
            '独立',
            '夜行',
            '可爱',
            '好养'
        ],
        description: '仓鼠是最适合新手的小宠，空间需求小，照顾简单，适合学生和上班族。',
        emotionalTemplates: [
            '仓鼠会在夜晚的寂静中陪伴你，它的小世界里有着大大的快乐。',
            '看着它塞满颊囊的样子，你会被这份认真生活的态度治愈。'
        ]
    },
    {
        id: 'small-guinea-pig',
        name: '豚鼠',
        nameEn: 'Guinea Pig',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'earth',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'short',
        colorTags: [
            '棕色',
            '白色',
            '多彩'
        ],
        size: 'small',
        traits: [
            '温顺',
            '亲人',
            '爱叫',
            '友善'
        ],
        description: '豚鼠性格温顺，会用叫声表达情绪，喜欢群居，是很好的陪伴宠物。',
        emotionalTemplates: [
            '豚鼠会用它独特的叫声欢迎你回家，让你感受到被期待的温暖。',
            '它软软的身体和温柔的眼神，会融化你所有的疲惫。'
        ]
    },
    {
        id: 'small-chinchilla',
        name: '龙猫',
        nameEn: 'Chinchilla',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'metal',
        schedule: 1,
        energy: 2,
        space: 2,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'wool',
        colorTags: [
            '灰色',
            '白色'
        ],
        size: 'small',
        traits: [
            '活泼',
            '胆小',
            '柔软',
            '可爱'
        ],
        description: '龙猫有着世界上最柔软的毛发，性格活泼但胆小，需要稳定的环境。',
        emotionalTemplates: [
            '龙猫会用它云朵般的毛发和跳跃的身影，为你编织一个童话。',
            '当它终于愿意在你手心安睡，你会明白什么是被信任的幸福。'
        ]
    },
    {
        id: 'small-hedgehog',
        name: '刺猬',
        nameEn: 'Hedgehog',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'metal',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'quill',
        colorTags: [
            '棕色',
            '白色'
        ],
        size: 'tiny',
        traits: [
            '独立',
            '夜行',
            '独特',
            '胆小'
        ],
        description: '刺猬是独特的异宠选择，外表带刺内心柔软，适合喜欢独特宠物的人。',
        emotionalTemplates: [
            '刺猬教会你：即使带着刺，也值得被温柔以待。',
            '当它对你放下防备，你会看到那颗柔软的心。'
        ]
    },
    {
        id: 'small-squirrel',
        name: '魔王松鼠',
        nameEn: 'Prevost Squirrel',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'wood',
        schedule: 3,
        energy: 3,
        space: 2,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '棕色',
            '灰色'
        ],
        size: 'small',
        traits: [
            '活泼',
            '机灵',
            '好动',
            '聪明'
        ],
        description: '魔王松鼠精力充沛，动作敏捷，从小养起可以非常亲人，是活力满满的小伙伴。',
        emotionalTemplates: [
            '松鼠会用它灵巧的身影和闪亮的眼睛，为你的生活注入无限活力。',
            '看着它在你肩头跳跃，你会觉得自己拥有了整座森林。'
        ]
    },
    {
        id: 'small-ferret',
        name: '雪貂',
        nameEn: 'Ferret',
        category: 'small',
        categoryName: '小宠',
        wuxing: 'water',
        schedule: 2,
        energy: 3,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '白色',
            '棕色',
            '黑色'
        ],
        size: 'small',
        traits: [
            '活泼',
            '粘人',
            '好奇',
            '爱玩'
        ],
        description: '雪貂性格极其活泼好动，好奇心强，喜欢和人互动，像一只永远长不大的小猫。',
        emotionalTemplates: [
            '雪貂会用它无穷的好奇心带你重新发现生活的乐趣。',
            '它柔软的身体钻进你怀里时，整个世界都变得柔软了。'
        ]
    },
    // ===== 鸟类 (6种) =====
    {
        id: 'bird-budgie',
        name: '虎皮鹦鹉',
        nameEn: 'Budgerigar',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'wood',
        schedule: 3,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 1,
        furType: 'feather',
        colorTags: [
            '绿色',
            '蓝色',
            '黄色'
        ],
        size: 'tiny',
        traits: [
            '活泼',
            '会说话',
            '好养',
            '聪明'
        ],
        description: '虎皮鹦鹉是最受欢迎的入门鸟类，可以学说话，性格活泼，易于饲养。',
        emotionalTemplates: [
            '虎皮会学会叫你的名字，让回家变成一件期待的事。',
            '它的歌声会成为你生活的背景音乐，轻快而美好。'
        ]
    },
    {
        id: 'bird-cockatiel',
        name: '玄凤鹦鹉',
        nameEn: 'Cockatiel',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'fire',
        schedule: 3,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'feather',
        colorTags: [
            '灰色',
            '黄色',
            '白色'
        ],
        size: 'small',
        traits: [
            '温柔',
            '粘人',
            '会唱',
            '亲人'
        ],
        description: '玄凤是最温柔的鹦鹉之一，喜欢依偎在主人身边，会学口哨和简单的歌曲。',
        emotionalTemplates: [
            '玄凤会用它的小脑袋蹭你的脸颊，让你感受什么是纯粹的爱。',
            '当它为你歌唱时，整个世界都变得温柔起来。'
        ]
    },
    {
        id: 'bird-lovebird',
        name: '牡丹鹦鹉',
        nameEn: 'Lovebird',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'fire',
        schedule: 3,
        energy: 2,
        space: 1,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'feather',
        colorTags: [
            '绿色',
            '红色',
            '黄色',
            '多彩'
        ],
        size: 'tiny',
        traits: [
            '活泼',
            '粘人',
            '色彩艳丽',
            '好奇'
        ],
        description: '牡丹鹦鹉因成双成对的习性得名，颜色艳丽，性格活泼好动。',
        emotionalTemplates: [
            '牡丹会用它鲜艳的羽毛点亮你的生活，每一天都色彩斑斓。',
            '它对你的依恋像它的名字一样，是最美的承诺。'
        ]
    },
    {
        id: 'bird-canary',
        name: '金丝雀',
        nameEn: 'Canary',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'metal',
        schedule: 3,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'feather',
        colorTags: [
            '黄色',
            '橘黄'
        ],
        size: 'tiny',
        traits: [
            '歌声优美',
            '独立',
            '优雅',
            '好养'
        ],
        description: '金丝雀以悠扬的歌声闻名，性格独立，不需要过多互动，是纯观赏型鸟类。',
        emotionalTemplates: [
            '金丝雀会用它的歌声为你的生活配上最美的旋律。',
            '它的存在就像一首诗，不需要解读，只需感受美。'
        ]
    },
    {
        id: 'bird-african-grey',
        name: '非洲灰鹦鹉',
        nameEn: 'African Grey Parrot',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'water',
        schedule: 3,
        energy: 2,
        space: 2,
        stability: 3,
        companion: 3,
        attachment: 3,
        responsibility: 3,
        furType: 'feather',
        colorTags: [
            '灰色',
            '红色'
        ],
        size: 'medium',
        traits: [
            '极聪明',
            '会对话',
            '敏感',
            '忠诚'
        ],
        description: '灰鹦鹉是鸟类中智商最高的，可以学会上百个词语进行真正的对话，情感丰富。',
        emotionalTemplates: [
            '灰鹦鹉会成为你真正的对话伙伴，它的智慧会让你惊叹生命的奇迹。',
            '当它用你的语言说出"你好"时，那不只是模仿，是它在回应你。'
        ]
    },
    {
        id: 'bird-finch',
        name: '十姐妹',
        nameEn: 'Society Finch',
        category: 'bird',
        categoryName: '鸟类',
        wuxing: 'earth',
        schedule: 3,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'feather',
        colorTags: [
            '棕色',
            '白色'
        ],
        size: 'tiny',
        traits: [
            '群居',
            '安静',
            '好养',
            '温顺'
        ],
        description: '十姐妹是最温顺的小型鸟类之一，喜欢群居，叫声轻柔，非常适合新手。',
        emotionalTemplates: [
            '十姐妹会用它们轻柔的呢喃，为你的空间增添一份生动。',
            '看着它们依偎在一起的样子，你会懂得什么是简单的幸福。'
        ]
    },
    // ===== 爬宠 (6种) =====
    {
        id: 'reptile-turtle',
        name: '乌龟',
        nameEn: 'Turtle',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 3,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'shell',
        colorTags: [
            '绿色',
            '棕色'
        ],
        size: 'small',
        traits: [
            '长寿',
            '安静',
            '独立',
            '省心'
        ],
        description: '乌龟是最省心的宠物之一，寿命长，不需要太多互动，适合忙碌的人。',
        emotionalTemplates: [
            '乌龟会教你慢下来，在忙碌的生活中找到自己的节奏。',
            '它安静地陪伴可能比你想象的更长久——这是一份跨越时间的承诺。'
        ]
    },
    {
        id: 'reptile-leopard-gecko',
        name: '豹纹守宫',
        nameEn: 'Leopard Gecko',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'earth',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'scale',
        colorTags: [
            '黄色',
            '斑纹'
        ],
        size: 'small',
        traits: [
            '温顺',
            '夜行',
            '好养',
            '独特'
        ],
        description: '豹纹守宫是最适合新手的爬宠，性格温顺，颜色漂亮，易于饲养。',
        emotionalTemplates: [
            '守宫会用它独特的方式陪伴你，让你发现另一种生命的美。',
            '它的存在会让你成为朋友圈里最独特的那个人。'
        ]
    },
    {
        id: 'reptile-bearded-dragon',
        name: '鬃狮蜥',
        nameEn: 'Bearded Dragon',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'fire',
        schedule: 3,
        energy: 1,
        space: 2,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 2,
        furType: 'scale',
        colorTags: [
            '棕色',
            '橘黄'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '亲人',
            '独特',
            '日行'
        ],
        description: '鬃狮蜥是最亲人的爬宠之一，喜欢被抚摸，是爬宠中的"小狗"。',
        emotionalTemplates: [
            '鬃狮蜥会打破你对爬宠的偏见，它的温顺会让你惊喜。',
            '当它舒服地趴在你手上晒太阳，你会明白：被信任是最珍贵的礼物。'
        ]
    },
    {
        id: 'reptile-ball-python',
        name: '球蟒',
        nameEn: 'Ball Python',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'water',
        schedule: 1,
        energy: 1,
        space: 2,
        stability: 3,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'scale',
        colorTags: [
            '棕色',
            '黑色',
            '斑纹'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '独立',
            '独特',
            '神秘'
        ],
        description: '球蟒是最温顺的蛇类之一，胆小时会缩成球状，适合喜欢独特宠物的人。',
        emotionalTemplates: [
            '球蟒会用它独特的美丽和安静，为你的生活增添一份神秘。',
            '养一条蛇，是在学习与不同的生命和谐相处的智慧。'
        ]
    },
    {
        id: 'reptile-corn-snake',
        name: '玉米蛇',
        nameEn: 'Corn Snake',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'fire',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'scale',
        colorTags: [
            '橘黄',
            '红色',
            '斑纹'
        ],
        size: 'medium',
        traits: [
            '温顺',
            '好养',
            '花纹美',
            '入门级'
        ],
        description: '玉米蛇是最适合入门的蛇类，性格温顺，花纹漂亮，照料简单。',
        emotionalTemplates: [
            '玉米蛇会用它绚丽的花纹告诉你：美丽有千种形态。',
            '它安静地缠绕在你手臂上时，你会感受到一种独特的信任。'
        ]
    },
    {
        id: 'reptile-king-snake',
        name: '王蛇',
        nameEn: 'King Snake',
        category: 'reptile',
        categoryName: '爬宠',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'scale',
        colorTags: [
            '黑色',
            '白色',
            '红色',
            '多彩'
        ],
        size: 'medium',
        traits: [
            '色彩鲜艳',
            '温和',
            '适应力强',
            '独特'
        ],
        description: '王蛇颜色鲜艳夺目，性格温和好养，是蛇类爱好者的热门选择。',
        emotionalTemplates: [
            '王蛇用它斑斓的色彩，诠释着自然界最大胆的审美。',
            '它的名字里有"王"，它的气场配得上这个称号。'
        ]
    },
    // ===== 水族 (6种) =====
    {
        id: 'fish-goldfish',
        name: '金鱼',
        nameEn: 'Goldfish',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'none',
        colorTags: [
            '红色',
            '金色',
            '白色'
        ],
        size: 'small',
        traits: [
            '吉祥',
            '好养',
            '观赏',
            '治愈'
        ],
        description: '金鱼是最传统的观赏鱼，寓意吉祥，色彩绚丽，养护简单。',
        emotionalTemplates: [
            '金鱼会在水中为你舞蹈，每一次摆尾都是一首无声的诗。',
            '看着它们悠游自在，你的心也会慢慢平静下来。'
        ]
    },
    {
        id: 'fish-betta',
        name: '斗鱼',
        nameEn: 'Betta Fish',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'fire',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 1,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'none',
        colorTags: [
            '红色',
            '蓝色',
            '多彩'
        ],
        size: 'tiny',
        traits: [
            '华丽',
            '独居',
            '好养',
            '个性'
        ],
        description: '斗鱼以其绚丽的颜色和飘逸的鳍著称，适合独养，是桌面宠物的绝佳选择。',
        emotionalTemplates: [
            '斗鱼会用它华丽的舞姿，成为你桌面上最美的风景。',
            '它独自绽放的美丽，会提醒你：独处也可以很精彩。'
        ]
    },
    {
        id: 'fish-tropical',
        name: '热带鱼',
        nameEn: 'Tropical Fish',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'none',
        colorTags: [
            '多彩'
        ],
        size: 'tiny',
        traits: [
            '缤纷',
            '群游',
            '观赏',
            '治愈'
        ],
        description: '热带鱼种类繁多，颜色缤纷，适合打造一个小型水族生态系统。',
        emotionalTemplates: [
            '热带鱼会在你的家中创造一片海洋，那是你专属的治愈空间。',
            '看着它们穿梭在水草间，一天的疲惫都会随水波散去。'
        ]
    },
    {
        id: 'fish-shrimp',
        name: '观赏虾',
        nameEn: 'Ornamental Shrimp',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'none',
        colorTags: [
            '红色',
            '白色',
            '多彩'
        ],
        size: 'tiny',
        traits: [
            '可爱',
            '勤劳',
            '观赏',
            '独特'
        ],
        description: '观赏虾以其独特的外形和有趣的行为受到欢迎，可以和水草缸完美搭配。',
        emotionalTemplates: [
            '观赏虾会用它们勤劳的身影，让你感受微观世界的奇妙。',
            '看着它们认真生活的样子，你会被这份专注打动。'
        ]
    },
    {
        id: 'fish-koi',
        name: '锦鲤',
        nameEn: 'Koi',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'metal',
        schedule: 2,
        energy: 1,
        space: 3,
        stability: 3,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'none',
        colorTags: [
            '红色',
            '白色',
            '金色',
            '多彩'
        ],
        size: 'large',
        traits: [
            '吉祥',
            '长寿',
            '优雅',
            '大气'
        ],
        description: '锦鲤是最高贵的观赏鱼之一，寓意吉祥如意，寿命可达数十年。',
        emotionalTemplates: [
            '锦鲤在水中游弋的姿态，是东方美学最优雅的诠释。',
            '养一池锦鲤，是在家中安放一片活的水墨画。'
        ]
    },
    {
        id: 'fish-coral-tank',
        name: '珊瑚生态缸',
        nameEn: 'Coral Reef Tank',
        category: 'fish',
        categoryName: '水族',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 2,
        stability: 3,
        companion: 1,
        attachment: 1,
        responsibility: 3,
        furType: 'none',
        colorTags: [
            '多彩'
        ],
        size: 'medium',
        traits: [
            '绚丽',
            '生态',
            '治愈',
            '进阶'
        ],
        description: '珊瑚生态缸是水族爱好者的终极追求，打造一个微型海洋生态系统。',
        emotionalTemplates: [
            '珊瑚缸是你在家中养的一片海——每次凝视都是一次深海潜行。',
            '维护它的过程就像经营一个小世界，你会从中找到创造的快乐。'
        ]
    },
    // ===== 两栖 (4种) =====
    {
        id: 'amphibian-horned-frog',
        name: '角蛙',
        nameEn: 'Horned Frog',
        category: 'amphibian',
        categoryName: '两栖',
        wuxing: 'earth',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'none',
        colorTags: [
            '绿色',
            '棕色',
            '多彩'
        ],
        size: 'small',
        traits: [
            '呆萌',
            '省心',
            '吃货',
            '独特'
        ],
        description: '角蛙因圆滚滚的体型和呆萌的表情走红，养护简单，被称为"招财蛙"。',
        emotionalTemplates: [
            '角蛙会用它圆鼓鼓的身体和无辜的表情，成为你最治愈的桌面伙伴。',
            '它只需要安静地待着，就足以让你嘴角上扬。'
        ]
    },
    {
        id: 'amphibian-axolotl',
        name: '六角恐龙',
        nameEn: 'Axolotl',
        category: 'amphibian',
        categoryName: '两栖',
        wuxing: 'water',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 3,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'none',
        colorTags: [
            '粉色',
            '白色',
            '黑色'
        ],
        size: 'small',
        traits: [
            '呆萌',
            '再生能力',
            '独特',
            '水生'
        ],
        description: '六角恐龙（美西钝口螈）以其永远微笑的脸和神奇的再生能力爆红网络。',
        emotionalTemplates: [
            '六角恐龙永恒的微笑会提醒你：保持快乐，是一种了不起的能力。',
            '它粉嫩的外鳃像小天使的翅膀，在水中为你轻轻舞动。'
        ]
    },
    {
        id: 'amphibian-tree-frog',
        name: '树蛙',
        nameEn: 'Tree Frog',
        category: 'amphibian',
        categoryName: '两栖',
        wuxing: 'wood',
        schedule: 1,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 2,
        furType: 'none',
        colorTags: [
            '绿色',
            '红色',
            '蓝色'
        ],
        size: 'tiny',
        traits: [
            '色彩绚丽',
            '安静',
            '观赏',
            '热带感'
        ],
        description: '树蛙颜色鲜艳独特，配合热带雨林生态缸，是最具观赏性的两栖宠物。',
        emotionalTemplates: [
            '树蛙鲜艳的色彩，是大自然最大胆的配色方案。',
            '为它打造一座雨林缸，就是在桌上种下了一片热带森林。'
        ]
    },
    {
        id: 'amphibian-fire-belly-newt',
        name: '东方蝾螈',
        nameEn: 'Fire Belly Newt',
        category: 'amphibian',
        categoryName: '两栖',
        wuxing: 'fire',
        schedule: 2,
        energy: 1,
        space: 1,
        stability: 2,
        companion: 1,
        attachment: 1,
        responsibility: 1,
        furType: 'none',
        colorTags: [
            '黑色',
            '橘黄',
            '红色'
        ],
        size: 'tiny',
        traits: [
            '好养',
            '独特',
            '安静',
            '长寿'
        ],
        description: '东方蝾螈腹部鲜艳，背部暗色，养护简单，寿命可达十年以上。',
        emotionalTemplates: [
            '蝾螈安静地游弋在水中，像一个来自远古的小精灵。',
            '它不急不缓的生活节奏，会让你重新审视"慢"的意义。'
        ]
    },
    // ===== 异宠 (4种) =====
    {
        id: 'exotic-mini-pig',
        name: '迷你猪',
        nameEn: 'Mini Pig',
        category: 'exotic',
        categoryName: '异宠',
        wuxing: 'earth',
        schedule: 3,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '粉色',
            '黑色',
            '白色',
            '斑纹'
        ],
        size: 'medium',
        traits: [
            '聪明',
            '粘人',
            '爱干净',
            '社交'
        ],
        description: '迷你猪智商极高（比狗还聪明），性格亲人爱撒娇，可以学会各种指令。',
        emotionalTemplates: [
            '迷你猪会用它超乎想象的聪明和撒娇，颠覆你对"猪"的所有偏见。',
            '当它哼着鼻音跑向你时，你会明白什么叫"真香"。'
        ]
    },
    {
        id: 'exotic-alpaca',
        name: '羊驼',
        nameEn: 'Alpaca',
        category: 'exotic',
        categoryName: '异宠',
        wuxing: 'earth',
        schedule: 3,
        energy: 2,
        space: 3,
        stability: 3,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'wool',
        colorTags: [
            '白色',
            '棕色',
            '黑色'
        ],
        size: 'large',
        traits: [
            '温顺',
            '治愈',
            '呆萌',
            '社群性'
        ],
        description: '羊驼以其呆萌的表情和柔软的毛发闻名，性格温顺，是近年最火的治愈系异宠。',
        emotionalTemplates: [
            '羊驼会用它标志性的呆萌表情，治愈你所有的焦虑和不安。',
            '它柔软的毛发和温和的眼神，就是世界上最好的减压器。'
        ]
    },
    {
        id: 'exotic-sugar-glider',
        name: '蜜袋鼯',
        nameEn: 'Sugar Glider',
        category: 'exotic',
        categoryName: '异宠',
        wuxing: 'wood',
        schedule: 1,
        energy: 2,
        space: 2,
        stability: 3,
        companion: 3,
        attachment: 3,
        responsibility: 2,
        furType: 'short',
        colorTags: [
            '灰色',
            '白色'
        ],
        size: 'tiny',
        traits: [
            '粘人',
            '夜行',
            '会滑翔',
            '社群性'
        ],
        description: '蜜袋鼯可以从高处滑翔，极其粘人，认主后喜欢待在主人口袋里。',
        emotionalTemplates: [
            '蜜袋鼯会从高处滑翔到你身上，用最特别的方式告诉你：我信任你。',
            '它小小的身体窝在你口袋里时，你会感到一种被依赖的幸福。'
        ]
    },
    {
        id: 'exotic-fox',
        name: '宠物狐狸',
        nameEn: 'Domesticated Fox',
        category: 'exotic',
        categoryName: '异宠',
        wuxing: 'fire',
        schedule: 1,
        energy: 2,
        space: 2,
        stability: 2,
        companion: 2,
        attachment: 2,
        responsibility: 3,
        furType: 'long',
        colorTags: [
            '白色',
            '红色',
            '银色'
        ],
        size: 'medium',
        traits: [
            '聪明',
            '独立',
            '灵动',
            '神秘'
        ],
        description: '宠物狐狸（如耳廓狐）外形精致，性格介于猫狗之间，聪明好奇。',
        emotionalTemplates: [
            '狐狸会用它灵动的眼神和优雅的身姿，让你感受野性与温柔的交融。',
            '小王子说得对：你驯养了它，它就是你独一无二的狐狸。'
        ]
    }
];
function getBreedsByCategory(category) {
    return PET_DATABASE.filter((breed)=>breed.category === category);
}
function getBreedById(id) {
    return PET_DATABASE.find((breed)=>breed.id === id);
}
function getAllBreeds() {
    return PET_DATABASE;
}
function getAllCategories() {
    return Object.keys(PET_CATEGORIES);
}
}),
"[project]/lib/matching.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 宠物匹配算法 v3
 * 
 * @context 五维匹配模型：五行 + 天时 + 地利 + 人和 + 外观
 * @version 3.0.0 - 新增外观维度，输出Top3
 * 
 * 权重分配（有外观偏好时）：
 * - 五行 15%：命理契合度
 * - 天时 18%：作息 + 精力
 * - 地利 22%：空间 + 稳定性
 * - 人和 30%：陪伴 + 情感 + 责任
 * - 外观 15%：毛发 + 颜色 + 体型
 * 
 * 无外观偏好时，权重回归四维：
 * - 五行 20% | 天时 20% | 地利 25% | 人和 35%
 */ __turbopack_context__.s([
    "getDimensionIcon",
    ()=>getDimensionIcon,
    "getDimensionName",
    ()=>getDimensionName,
    "getMatchDescription",
    ()=>getMatchDescription,
    "matchAllPets",
    ()=>matchAllPets,
    "matchPetByCategory",
    ()=>matchPetByCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pet-database.ts [app-ssr] (ecmascript)");
;
// ===== 配置常量 =====
/** 五维权重配置（有外观偏好） */ const WEIGHTS_5D = {
    wuxing: 0.15,
    tianshi: 0.18,
    dili: 0.22,
    renhe: 0.30,
    appearance: 0.15
};
/** 四维权重配置（无外观偏好） */ const WEIGHTS_4D = {
    wuxing: 0.20,
    tianshi: 0.20,
    dili: 0.25,
    renhe: 0.35
};
/** 天时子维度权重 */ const TIANSHI_WEIGHTS = {
    schedule: 0.5,
    energy: 0.5
};
/** 地利子维度权重 */ const DILI_WEIGHTS = {
    space: 0.6,
    stability: 0.4
};
/** 人和子维度权重 */ const RENHE_WEIGHTS = {
    companion: 0.35,
    attachment: 0.35,
    responsibility: 0.30
};
/** 外观子维度权重 */ const APPEARANCE_WEIGHTS = {
    fur: 0.35,
    color: 0.35,
    size: 0.30
};
/** 五行关系分数 */ const WUXING_SCORES = {
    generate: 95,
    same: 85,
    neutral: 75,
    restrain: 60
};
// ===== 五行关系表 =====
const WUXING_GENERATE = {
    metal: 'water',
    water: 'wood',
    wood: 'fire',
    fire: 'earth',
    earth: 'metal'
};
const WUXING_RESTRAIN = {
    metal: 'wood',
    wood: 'earth',
    earth: 'water',
    water: 'fire',
    fire: 'metal'
};
// ===== 外观匹配映射 =====
/** 毛发偏好映射：用户选择 → 匹配的宠物 furType */ const FUR_PREFERENCE_MAP = {
    1: [
        'long',
        'wool'
    ],
    2: [
        'short'
    ],
    3: [
        'hairless',
        'scale',
        'feather',
        'shell',
        'quill',
        'none'
    ]
};
/** 颜色偏好映射：用户选择 → 匹配的 colorTags */ const COLOR_PREFERENCE_MAP = {
    1: [
        '橘黄',
        '棕色',
        '金色',
        '红色',
        '粉色'
    ],
    2: [
        '灰色',
        '蓝色',
        '银色',
        '绿色'
    ],
    3: [
        '黑色',
        '白色'
    ],
    4: [
        '多彩',
        '斑纹'
    ]
};
/** 体型偏好映射：用户选择 → 匹配的 PetSize */ const SIZE_PREFERENCE_MAP = {
    1: [
        'tiny'
    ],
    2: [
        'small'
    ],
    3: [
        'medium'
    ],
    4: [
        'large'
    ]
};
// ===== 核心算法 =====
function calculateWuxingScore(userWuxing, petWuxing) {
    if (userWuxing === petWuxing) return WUXING_SCORES.same;
    if (WUXING_GENERATE[userWuxing] === petWuxing) return WUXING_SCORES.generate;
    if (WUXING_GENERATE[petWuxing] === userWuxing) return WUXING_SCORES.generate;
    if (WUXING_RESTRAIN[userWuxing] === petWuxing) return WUXING_SCORES.restrain;
    if (WUXING_RESTRAIN[petWuxing] === userWuxing) return WUXING_SCORES.restrain;
    return WUXING_SCORES.neutral;
}
function getWuxingRelation(userWuxing, petWuxing) {
    if (userWuxing === petWuxing) return '同属';
    if (WUXING_GENERATE[userWuxing] === petWuxing || WUXING_GENERATE[petWuxing] === userWuxing) return '相生';
    if (WUXING_RESTRAIN[userWuxing] === petWuxing || WUXING_RESTRAIN[petWuxing] === userWuxing) return '相克';
    return '无关';
}
function calculateTianshiScore(tianshi, pet) {
    const scheduleMatch = 1 - Math.abs(tianshi.schedule - pet.schedule) / 2;
    const energyMatch = 1 - Math.abs(tianshi.energy - pet.energy) / 2;
    return (scheduleMatch * TIANSHI_WEIGHTS.schedule + energyMatch * TIANSHI_WEIGHTS.energy) * 100;
}
function calculateDiliScore(dili, pet) {
    const spaceMatch = 1 - Math.abs(dili.space - pet.space) / 2;
    const stabilityMatch = 1 - Math.abs(dili.stability - pet.stability) / 2;
    return (spaceMatch * DILI_WEIGHTS.space + stabilityMatch * DILI_WEIGHTS.stability) * 100;
}
function calculateRenheScore(renhe, pet) {
    const companionMatch = 1 - Math.abs(renhe.companion - pet.companion) / 2;
    const attachmentMatch = 1 - Math.abs(renhe.attachment - pet.attachment) / 2;
    const responsibilityMatch = 1 - Math.abs(renhe.responsibility - pet.responsibility) / 2;
    return (companionMatch * RENHE_WEIGHTS.companion + attachmentMatch * RENHE_WEIGHTS.attachment + responsibilityMatch * RENHE_WEIGHTS.responsibility) * 100;
}
/**
 * 计算外观匹配分数
 */ function calculateAppearanceScore(appearance, pet) {
    let furScore = 75; // 默认中等
    let colorScore = 75;
    let sizeScore = 75;
    // 毛发匹配
    if (appearance.furPreference !== 0) {
        const matchedFurs = FUR_PREFERENCE_MAP[appearance.furPreference] || [];
        furScore = matchedFurs.includes(pet.furType) ? 95 : 55;
    }
    // 颜色匹配
    if (appearance.colorPreference !== 0) {
        const matchedColors = COLOR_PREFERENCE_MAP[appearance.colorPreference] || [];
        const hasMatch = pet.colorTags.some((tag)=>matchedColors.includes(tag));
        colorScore = hasMatch ? 95 : 55;
    }
    // 体型匹配
    if (appearance.sizePreference !== 0) {
        const matchedSizes = SIZE_PREFERENCE_MAP[appearance.sizePreference] || [];
        sizeScore = matchedSizes.includes(pet.size) ? 95 : 55;
    }
    return furScore * APPEARANCE_WEIGHTS.fur + colorScore * APPEARANCE_WEIGHTS.color + sizeScore * APPEARANCE_WEIGHTS.size;
}
/**
 * 判断是否有有效的外观偏好
 */ function hasAppearancePreference(appearance) {
    if (!appearance) return false;
    return appearance.furPreference !== 0 || appearance.colorPreference !== 0 || appearance.sizePreference !== 0;
}
/**
 * 计算总匹配分数
 */ function calculateTotalScore(userWuxing, userProfile, pet) {
    const wuxingScore = calculateWuxingScore(userWuxing, pet.wuxing);
    const tianshiScore = calculateTianshiScore(userProfile.tianshi, pet);
    const diliScore = calculateDiliScore(userProfile.dili, pet);
    const renheScore = calculateRenheScore(userProfile.renhe, pet);
    const useAppearance = hasAppearancePreference(userProfile.appearance);
    if (useAppearance && userProfile.appearance) {
        const appearanceScore = calculateAppearanceScore(userProfile.appearance, pet);
        const totalScore = wuxingScore * WEIGHTS_5D.wuxing + tianshiScore * WEIGHTS_5D.tianshi + diliScore * WEIGHTS_5D.dili + renheScore * WEIGHTS_5D.renhe + appearanceScore * WEIGHTS_5D.appearance;
        return {
            total: Math.round(totalScore),
            wuxing: Math.round(wuxingScore),
            tianshi: Math.round(tianshiScore),
            dili: Math.round(diliScore),
            renhe: Math.round(renheScore),
            appearance: Math.round(appearanceScore)
        };
    }
    // 无外观偏好，回归四维
    const totalScore = wuxingScore * WEIGHTS_4D.wuxing + tianshiScore * WEIGHTS_4D.tianshi + diliScore * WEIGHTS_4D.dili + renheScore * WEIGHTS_4D.renhe;
    return {
        total: Math.round(totalScore),
        wuxing: Math.round(wuxingScore),
        tianshi: Math.round(tianshiScore),
        dili: Math.round(diliScore),
        renhe: Math.round(renheScore)
    };
}
/**
 * 生成3条匹配原因
 */ function generateMatchReasons(userWuxing, userProfile, pet) {
    const reasons = [];
    // 五行原因
    const wuxingRelation = getWuxingRelation(userWuxing, pet.wuxing);
    const wuxingTexts = {
        '相生': `你们五行相生，${pet.name}能为你带来好运与和谐`,
        '同属': `你们五行同属，气质相近，容易产生默契`,
        '无关': `五行互不干扰，相处会比较轻松自在`,
        '相克': `虽然五行相克，但互补也是一种平衡`
    };
    reasons.push({
        dimension: 'wuxing',
        text: wuxingTexts[wuxingRelation],
        score: calculateWuxingScore(userWuxing, pet.wuxing)
    });
    // 天时原因
    const tianshiScore = calculateTianshiScore(userProfile.tianshi, pet);
    let tianshiText = '';
    if (Math.abs(userProfile.tianshi.schedule - pet.schedule) <= 1) {
        tianshiText = `${pet.name}的作息节奏与你同频，生活会更和谐`;
    } else {
        tianshiText = `虽然作息略有差异，但${pet.name}适应力强`;
    }
    if (Math.abs(userProfile.tianshi.energy - pet.energy) <= 1) {
        tianshiText = `你的精力状态与${pet.name}的活跃度很匹配`;
    }
    reasons.push({
        dimension: 'tianshi',
        text: tianshiText,
        score: tianshiScore
    });
    // 地利原因
    const diliScore = calculateDiliScore(userProfile.dili, pet);
    let diliText = '';
    if (Math.abs(userProfile.dili.space - pet.space) <= 1) {
        diliText = `你的居住空间非常适合养${pet.name}`;
    } else if (userProfile.dili.space < pet.space) {
        diliText = `${pet.name}空间需求适中，能适应你的居住环境`;
    } else {
        diliText = `${pet.name}在你的空间里会很舒适自在`;
    }
    reasons.push({
        dimension: 'dili',
        text: diliText,
        score: diliScore
    });
    // 人和原因
    const renheScore = calculateRenheScore(userProfile.renhe, pet);
    let renheText = '';
    if (Math.abs(userProfile.renhe.companion - pet.companion) <= 1) {
        renheText = `${pet.name}的陪伴方式正是你所期待的`;
    } else if (userProfile.renhe.companion > pet.companion) {
        renheText = `${pet.name}独立但不失温情，给你恰到好处的陪伴`;
    } else {
        renheText = `${pet.name}热情的性格会让你的生活更有温度`;
    }
    if (Math.abs(userProfile.renhe.responsibility - pet.responsibility) <= 1) {
        renheText = `${pet.name}的照顾难度与你的投入意愿很匹配`;
    }
    reasons.push({
        dimension: 'renhe',
        text: renheText,
        score: renheScore
    });
    // 外观原因（如果有偏好）
    if (hasAppearancePreference(userProfile.appearance) && userProfile.appearance) {
        const appearanceScore = calculateAppearanceScore(userProfile.appearance, pet);
        let appearanceText = '';
        if (appearanceScore >= 80) {
            appearanceText = `${pet.name}的外观特征完美符合你的审美偏好`;
        } else if (appearanceScore >= 65) {
            appearanceText = `${pet.name}的外观与你的偏好有不少契合之处`;
        } else {
            appearanceText = `${pet.name}的外观独具魅力，或许会带来意外惊喜`;
        }
        reasons.push({
            dimension: 'appearance',
            text: appearanceText,
            score: appearanceScore
        });
    }
    // 按分数排序，选择分数最高的3个
    reasons.sort((a, b)=>b.score - a.score);
    return [
        {
            dimension: reasons[0].dimension,
            text: reasons[0].text
        },
        {
            dimension: reasons[1].dimension,
            text: reasons[1].text
        },
        {
            dimension: reasons[2].dimension,
            text: reasons[2].text
        }
    ];
}
/**
 * 生成情绪化总结
 */ function generateEmotionalSummary(pet) {
    const templates = pet.emotionalTemplates;
    return templates[Math.floor(Math.random() * templates.length)];
}
function matchPetByCategory(category, userWuxing, userProfile) {
    const breeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBreedsByCategory"])(category);
    const results = breeds.map((breed)=>{
        const scores = calculateTotalScore(userWuxing, userProfile, breed);
        const matchReasons = generateMatchReasons(userWuxing, userProfile, breed);
        const emotionalSummary = generateEmotionalSummary(breed);
        return {
            breed,
            scores,
            matchReasons,
            emotionalSummary
        };
    });
    return results.sort((a, b)=>b.scores.total - a.scores.total);
}
function matchAllPets(userWuxing, userProfile) {
    const breeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllBreeds"])();
    const results = breeds.map((breed)=>{
        const scores = calculateTotalScore(userWuxing, userProfile, breed);
        const matchReasons = generateMatchReasons(userWuxing, userProfile, breed);
        const emotionalSummary = generateEmotionalSummary(breed);
        return {
            breed,
            scores,
            matchReasons,
            emotionalSummary
        };
    });
    return results.sort((a, b)=>b.scores.total - a.scores.total);
}
function getMatchDescription(score) {
    if (score >= 90) return '天作之合';
    if (score >= 80) return '非常契合';
    if (score >= 70) return '相当适合';
    if (score >= 60) return '比较合适';
    return '可以尝试';
}
function getDimensionName(dimension) {
    const names = {
        wuxing: '五行契合',
        tianshi: '天时相应',
        dili: '地利相宜',
        renhe: '人和相合',
        appearance: '外观契合'
    };
    return names[dimension];
}
function getDimensionIcon(dimension) {
    const icons = {
        wuxing: '☯',
        tianshi: '🕐',
        dili: '🏠',
        renhe: '💝',
        appearance: '🎨'
    };
    return icons[dimension];
}
}),
"[project]/lib/pet-avatars.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 宠物头像映射表
 * 
 * @description 独立于宠物数据库的头像映射，便于灵活管理和渐进式添加
 * @version 1.0.0
 * 
 * 使用方式：
 * import { getPetAvatar } from '@/lib/pet-avatars';
 * const avatar = getPetAvatar('cat-british-shorthair');
 */ /**
 * 宠物头像映射表
 * key: 宠物 ID（与 pet-database.ts 中的 id 对应）
 * value: 头像图片路径
 */ __turbopack_context__.s([
    "DEFAULT_AVATAR",
    ()=>DEFAULT_AVATAR,
    "PET_AVATARS",
    ()=>PET_AVATARS,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getPetAvatar",
    ()=>getPetAvatar,
    "hasPetAvatar",
    ()=>hasPetAvatar
]);
const PET_AVATARS = {
    // ===== 猫咪 =====
    'cat-british-shorthair': '/pets/avatars/cat-british-shorthair.png',
    'cat-ragdoll': '/pets/avatars/cat-ragdoll.png',
    'cat-orange': '/pets/avatars/cat-orange.png',
    'cat-siamese': '/pets/avatars/cat-siamese.png',
    'cat-american-shorthair': '/pets/avatars/cat-american-shorthair.png',
    'cat-scottish-fold': '/pets/avatars/cat-scottish-fold.png',
    'cat-maine-coon': '/pets/avatars/cat-maine-coon.png',
    'cat-persian': '/pets/avatars/cat-persian.png',
    'cat-russian-blue': '/pets/avatars/cat-russian-blue.png',
    'cat-sphynx': '/pets/avatars/cat-sphynx.png',
    'cat-munchkin': '/pets/avatars/cat-munchkin.png',
    // ===== 狗狗 =====
    'dog-golden-retriever': '/pets/avatars/dog-golden-retriever.png',
    'dog-shiba': '/pets/avatars/dog-shiba.png',
    'dog-corgi': '/pets/avatars/dog-corgi.png',
    'dog-poodle': '/pets/avatars/dog-poodle.png',
    'dog-labrador': '/pets/avatars/dog-labrador.png',
    'dog-husky': '/pets/avatars/dog-husky.jpg',
    'dog-samoyed': '/pets/avatars/dog-samoyed.png',
    'dog-pomeranian': '/pets/avatars/dog-pomeranian.png',
    'dog-bichon': '/pets/avatars/dog-bichon.png',
    'dog-french-bulldog': '/pets/avatars/dog-french-bulldog.png',
    'dog-border-collie': '/pets/avatars/dog-border-collie.png',
    'dog-german-shepherd': '/pets/avatars/dog-german-shepherd.png',
    'dog-beagle': '/pets/avatars/dog-beagle.png',
    'dog-dachshund': '/pets/avatars/dog-dachshund.png',
    'dog-cocker-spaniel': '/pets/avatars/dog-cocker-spaniel.png',
    // ===== 兔子 =====
    'rabbit-holland-lop': '/pets/avatars/rabbit-holland-lop.png',
    'rabbit-lionhead': '/pets/avatars/rabbit-lionhead.png',
    'rabbit-dwarf': '/pets/avatars/rabbit-dwarf.png',
    'rabbit-angora': '/pets/avatars/rabbit-angora.png',
    'rabbit-rex': '/pets/avatars/rabbit-rex.png',
    // ===== 小宠 =====
    'small-hamster': '/pets/avatars/small-hamster.png',
    'small-guinea-pig': '/pets/avatars/small-guinea-pig.png',
    'small-chinchilla': '/pets/avatars/small-chinchilla.png',
    'small-hedgehog': '/pets/avatars/small-hedgehog.png',
    'small-squirrel': '/pets/avatars/small-squirrel.png',
    'small-ferret': '/pets/avatars/small-ferret.png',
    // ===== 鸟类 =====
    'bird-budgie': '/pets/avatars/bird-budgie.png',
    'bird-cockatiel': '/pets/avatars/bird-cockatiel.png',
    'bird-lovebird': '/pets/avatars/bird-lovebird.png',
    'bird-canary': '/pets/avatars/bird-canary.png',
    'bird-african-grey': '/pets/avatars/bird-african-grey.png',
    'bird-finch': '/pets/avatars/bird-finch.png',
    // ===== 爬宠 =====
    'reptile-turtle': '/pets/avatars/reptile-turtle.png',
    'reptile-leopard-gecko': '/pets/avatars/reptile-leopard-gecko.png',
    'reptile-bearded-dragon': '/pets/avatars/reptile-bearded-dragon.png',
    'reptile-ball-python': '/pets/avatars/reptile-ball-python.png',
    'reptile-corn-snake': '/pets/avatars/reptile-corn-snake.png',
    'reptile-king-snake': '/pets/avatars/reptile-king-snake.png',
    // ===== 水族 =====
    'fish-goldfish': '/pets/avatars/fish-goldfish.png',
    'fish-betta': '/pets/avatars/fish-betta.png',
    'fish-tropical': '/pets/avatars/fish-tropical.png',
    'fish-shrimp': '/pets/avatars/fish-shrimp.png',
    'fish-koi': '/pets/avatars/fish-koi.png',
    'fish-coral-tank': '/pets/avatars/fish-coral-tank.png',
    // ===== 两栖 =====
    'amphibian-horned-frog': '/pets/avatars/amphibian-horned-frog.png',
    'amphibian-axolotl': '/pets/avatars/amphibian-axolotl.png',
    'amphibian-tree-frog': '/pets/avatars/amphibian-tree-frog.png',
    'amphibian-fire-belly-newt': '/pets/avatars/amphibian-fire-belly-newt.png',
    // ===== 异宠 =====
    'exotic-mini-pig': '/pets/avatars/exotic-mini-pig.png',
    'exotic-alpaca': '/pets/avatars/exotic-alpaca.png',
    'exotic-sugar-glider': '/pets/avatars/exotic-sugar-glider.png',
    'exotic-fox': '/pets/avatars/exotic-fox.png'
};
const DEFAULT_AVATAR = '/pets/avatars/default-pet.png';
function getPetAvatar(breedId) {
    return PET_AVATARS[breedId] || DEFAULT_AVATAR;
}
function hasPetAvatar(breedId) {
    return breedId in PET_AVATARS;
}
const __TURBOPACK__default__export__ = PET_AVATARS;
}),
"[project]/app/result/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wuxing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wuxing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$matching$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/matching.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pet-database.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pet-avatars.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
/**
 * @experiment result-v4
 * @base 结果页 Top 3 升级版
 * @date 2026-03-22
 * @changes 接入真实匹配算法, Top3展示, 五维/四维动态维度, 保持原有配色体系
 */ 'use client';
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
// CountUpNumber component with spring physics
function CountUpNumber({ value }) {
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const springValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(0, {
        stiffness: 50,
        damping: 30
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        springValue.set(value);
        const unsubscribe = springValue.on('change', (latest)=>{
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [
        value,
        springValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: displayValue
    }, void 0, false);
}
// 五行金句数据
const wisdomQuotes = {
    metal: {
        element: '金',
        pinyin: 'Jīn',
        english: 'Metal',
        quote: 'True gold fears no fire; true bond fears no time.',
        chinese: '真金不怕火炼，真情不怕时间。',
        source: '《增广贤文》/ Ancient Wisdom'
    },
    wood: {
        element: '木',
        pinyin: 'Mù',
        english: 'Wood',
        quote: 'Like a tree, love grows deep in silence.',
        chinese: '如树般，爱在静默中深根。',
        source: '《道德经》/ Tao Te Ching'
    },
    water: {
        element: '水',
        pinyin: 'Shuǐ',
        english: 'Water',
        quote: 'Water flows to the heart; fate flows to the soul.',
        chinese: '水流入心，缘流入魂。',
        source: '《庄子》/ Zhuangzi'
    },
    fire: {
        element: '火',
        pinyin: 'Huǒ',
        english: 'Fire',
        quote: 'A spark ignites; a heart unites.',
        chinese: '星火点燃，心灵相连。',
        source: '《易经》/ I Ching'
    },
    earth: {
        element: '土',
        pinyin: 'Tǔ',
        english: 'Earth',
        quote: 'Earth nurtures all; love nurtures the soul.',
        chinese: '大地滋养万物，爱滋养灵魂。',
        source: '《礼记》/ Book of Rites'
    }
};
// 和谐指南数据
const harmonyGuide = {
    metal: {
        luckyColors: [
            '白色',
            '金色',
            '银色'
        ],
        luckyColorsEn: [
            'White',
            'Gold',
            'Silver'
        ],
        direction: '西方 · 西北方',
        directionEn: 'West · Northwest',
        vibeQuote: "It's not just a pet; it's a mirror to your soul.",
        vibeChinese: '它不是你的一部分，你是它的全部。'
    },
    wood: {
        luckyColors: [
            '绿色',
            '青色'
        ],
        luckyColorsEn: [
            'Green',
            'Cyan'
        ],
        direction: '东方 · 东南方',
        directionEn: 'East · Southeast',
        vibeQuote: "In silence, roots intertwine; in love, souls align.",
        vibeChinese: '静默中根系交织，爱意中灵魂相依。'
    },
    water: {
        luckyColors: [
            '黑色',
            '深蓝色'
        ],
        luckyColorsEn: [
            'Black',
            'Deep Blue'
        ],
        direction: '北方',
        directionEn: 'North',
        vibeQuote: "Water finds its way; fate finds its home.",
        vibeChinese: '水自有其道，缘自有其归。'
    },
    fire: {
        luckyColors: [
            '红色',
            '橙色',
            '紫色'
        ],
        luckyColorsEn: [
            'Red',
            'Orange',
            'Purple'
        ],
        direction: '南方',
        directionEn: 'South',
        vibeQuote: "A flame shared is a flame doubled.",
        vibeChinese: '分享的火焰，成倍的温暖。'
    },
    earth: {
        luckyColors: [
            '黄色',
            '棕色',
            '米色'
        ],
        luckyColorsEn: [
            'Yellow',
            'Brown',
            'Beige'
        ],
        direction: '中央 · 西南方 · 东北方',
        directionEn: 'Center · Southwest · Northeast',
        vibeQuote: "Grounded in earth, lifted by love.",
        vibeChinese: '扎根大地，被爱托起。'
    }
};
// Silk transition constant
const SILK = {
    duration: 1.4,
    ease: [
        0.19,
        1,
        0.22,
        1
    ]
};
const RARITY_MAP = {
    cat: 'COMMON',
    dog: 'COMMON',
    rabbit: 'RARE',
    small: 'RARE',
    bird: 'RARE',
    reptile: 'LEGENDARY',
    fish: 'RARE',
    amphibian: 'LEGENDARY',
    exotic: 'LEGENDARY'
};
const RARITY_LABEL = {
    COMMON: {
        en: 'COMMON',
        cn: '常见'
    },
    RARE: {
        en: 'RARE',
        cn: '稀有'
    },
    LEGENDARY: {
        en: 'LEGENDARY',
        cn: '传说'
    }
};
function getRarityLevel(category) {
    return RARITY_MAP[category] || 'COMMON';
}
function generateDestinyId(year, month, day, breedId) {
    let hash = 0;
    const seed = `${year}${month}${day}${breedId}`;
    for(let i = 0; i < seed.length; i++){
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    const letter = String.fromCharCode(65 + Math.abs(hash) % 26);
    const num = String(Math.abs(hash) % 100000).padStart(5, '0');
    return `#${letter}${num}`;
}
// 数据节点位置（模块级常量，确保 hooks 顶层调用数量固定）
const DATA_NODE_POSITIONS = [
    {
        top: '18%',
        left: '12%',
        right: undefined,
        bottom: undefined,
        depth: 1.5
    },
    {
        top: '12%',
        right: '15%',
        left: undefined,
        bottom: undefined,
        depth: 0.8
    },
    {
        bottom: '22%',
        left: '15%',
        top: undefined,
        right: undefined,
        depth: 2.0
    },
    {
        bottom: '18%',
        right: '12%',
        top: undefined,
        left: undefined,
        depth: 1.2
    },
    {
        top: '50%',
        left: '5%',
        right: undefined,
        bottom: undefined,
        depth: 1.0
    }
];
function ResultPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [top3, setTop3] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [element, setElement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('earth');
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [subscribed, setSubscribed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedCard, setExpandedCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPetIndex, setSelectedPetIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shareCardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 分享仪式系统
    const [sharePhase, setSharePhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [shareCardUrl, setShareCardUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedIndex, setCopiedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [birthYear, setBirthYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(2000);
    const [birthMonth, setBirthMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [birthDay, setBirthDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    // ===== 3D 悬浮视差 =====
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const smoothX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, {
        stiffness: 150,
        damping: 20
    });
    const smoothY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, {
        stiffness: 150,
        damping: 20
    });
    const _cardRotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        5,
        -5
    ]);
    const _cardRotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        -5,
        5
    ]);
    const _cardX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        20,
        -20
    ]);
    const _cardY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        10,
        -10
    ]);
    const _chineseRotateX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        3,
        -3
    ]);
    const _chineseRotateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        -3,
        3
    ]);
    const _chineseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        15,
        -15
    ]);
    // 背景水印位移（提升至顶层，不在 JSX 内调用 hook）
    const bgWatermarkX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        -30,
        30
    ]);
    const bgWatermarkY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        -15,
        15
    ]);
    // Seal Section 视差变量
    const sealBgX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        -30,
        30
    ]);
    const sealBgY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        -15,
        15
    ]);
    const sealCardX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        8,
        -8
    ]);
    const sealCardY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        4,
        -4
    ]);
    const sealContentX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        4,
        -4
    ]);
    const sealContentY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        2,
        -2
    ]);
    // 数据节点位移（5 个固定数量，不可在 map 内调用 hooks，需逐一声明）
    const node0X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        40 * DATA_NODE_POSITIONS[0].depth,
        -40 * DATA_NODE_POSITIONS[0].depth
    ]);
    const node0Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        30 * DATA_NODE_POSITIONS[0].depth,
        -30 * DATA_NODE_POSITIONS[0].depth
    ]);
    const node1X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        40 * DATA_NODE_POSITIONS[1].depth,
        -40 * DATA_NODE_POSITIONS[1].depth
    ]);
    const node1Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        30 * DATA_NODE_POSITIONS[1].depth,
        -30 * DATA_NODE_POSITIONS[1].depth
    ]);
    const node2X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        40 * DATA_NODE_POSITIONS[2].depth,
        -40 * DATA_NODE_POSITIONS[2].depth
    ]);
    const node2Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        30 * DATA_NODE_POSITIONS[2].depth,
        -30 * DATA_NODE_POSITIONS[2].depth
    ]);
    const node3X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        40 * DATA_NODE_POSITIONS[3].depth,
        -40 * DATA_NODE_POSITIONS[3].depth
    ]);
    const node3Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        30 * DATA_NODE_POSITIONS[3].depth,
        -30 * DATA_NODE_POSITIONS[3].depth
    ]);
    const node4X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothX, [
        -0.5,
        0.5
    ], [
        40 * DATA_NODE_POSITIONS[4].depth,
        -40 * DATA_NODE_POSITIONS[4].depth
    ]);
    const node4Y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(smoothY, [
        -0.5,
        0.5
    ], [
        30 * DATA_NODE_POSITIONS[4].depth,
        -30 * DATA_NODE_POSITIONS[4].depth
    ]);
    const _nodeXTransforms = [
        node0X,
        node1X,
        node2X,
        node3X,
        node4X
    ];
    const _nodeYTransforms = [
        node0Y,
        node1Y,
        node2Y,
        node3Y,
        node4Y
    ];
    // ===== 读取数据 + 执行匹配 =====
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const init = ()=>{
            try {
                const birthdateStr = sessionStorage.getItem('birthdate');
                const tianshiStr = sessionStorage.getItem('tianshi');
                const diliStr = sessionStorage.getItem('dili');
                const renheStr = sessionStorage.getItem('renhe');
                const appearanceStr = sessionStorage.getItem('appearance');
                const categoryStr = sessionStorage.getItem('pet_category');
                if (!birthdateStr || !tianshiStr || !diliStr || !renheStr || !categoryStr) {
                    const missing = [
                        !birthdateStr && 'birthdate',
                        !tianshiStr && 'tianshi',
                        !diliStr && 'dili',
                        !renheStr && 'renhe',
                        !categoryStr && 'pet_category'
                    ].filter(Boolean).join(', ');
                    console.error('[Result] 缺失 sessionStorage 字段:', missing);
                    setErrorMsg(`数据缺失：${missing}`);
                    return;
                }
                const birthdate = JSON.parse(birthdateStr);
                const tianshi = JSON.parse(tianshiStr);
                const dili = JSON.parse(diliStr);
                const renhe = JSON.parse(renheStr);
                const appearance = appearanceStr ? JSON.parse(appearanceStr) : undefined;
                const category = categoryStr;
                const userWuxing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wuxing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateWuxing"])(birthdate.year, birthdate.month, birthdate.day);
                setElement(userWuxing);
                setBirthYear(birthdate.year);
                setBirthMonth(birthdate.month);
                setBirthDay(birthdate.day);
                const userProfile = {
                    tianshi,
                    dili,
                    renhe,
                    appearance
                };
                const results = category === 'all' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$matching$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchAllPets"])(userWuxing, userProfile) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$matching$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchPetByCategory"])(category, userWuxing, userProfile);
                setTop3(results.slice(0, 3));
                setLoaded(true);
            } catch (e) {
                console.error('[Result] 计算异常:', e);
                setErrorMsg(e instanceof Error ? e.message : String(e));
            }
        };
        init();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>setRevealed(true), 500);
        return ()=>clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>window.removeEventListener('mousemove', handleMouseMove);
    }, [
        mouseX,
        mouseY
    ]);
    // ===== 分享仪式：5步电影动画 =====
    const handleSealShare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (sharePhase !== 'idle') return;
        setShareCardUrl(null);
        // Phase 1: 暗幕
        setSharePhase('dimming');
        await new Promise((r)=>setTimeout(r, 600));
        // Phase 2: 召唤
        setSharePhase('summoning');
        await new Promise((r)=>setTimeout(r, 600));
        // Phase 3: 金句
        setSharePhase('quoting');
        await new Promise((r)=>setTimeout(r, 800));
        // Phase 4: 微光
        setSharePhase('glowing');
        await new Promise((r)=>setTimeout(r, 1000));
        // Phase 5: 截图生成
        setSharePhase('card-ready');
        if (shareCardRef.current) {
            try {
                const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(shareCardRef.current, {
                    scale: 2,
                    backgroundColor: '#f5f4f0',
                    useCORS: true,
                    logging: false
                });
                setShareCardUrl(canvas.toDataURL('image/png'));
            } catch (err) {
                console.error('[Share] html2canvas error:', err);
            }
        }
    }, [
        sharePhase
    ]);
    const closeShareOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setSharePhase('idle');
        setShareCardUrl(null);
        setCopiedIndex(null);
    }, []);
    const handleCopyText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text, index)=>{
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(()=>setCopiedIndex(null), 1500);
        } catch  {}
    }, []);
    const handleDownloadCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!shareCardUrl) return;
        const a = document.createElement('a');
        a.href = shareCardUrl;
        a.download = `pactzo-destiny-card.png`;
        a.click();
    }, [
        shareCardUrl
    ]);
    // ESC 关闭
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleEsc = (e)=>{
            if (e.key === 'Escape' && sharePhase !== 'idle') closeShareOverlay();
        };
        window.addEventListener('keydown', handleEsc);
        return ()=>window.removeEventListener('keydown', handleEsc);
    }, [
        sharePhase,
        closeShareOverlay
    ]);
    // ===== 错误状态 =====
    if (errorMsg) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-[#f5f4f0] flex flex-col items-center justify-center gap-6 px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs tracking-[0.3em] text-[#8B2635]",
                    style: {
                        fontFamily: "'Space Mono', monospace"
                    },
                    children: "ERROR"
                }, void 0, false, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 300,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-[#666] text-center max-w-sm",
                    children: errorMsg
                }, void 0, false, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-[#999] text-center max-w-sm",
                    children: "请打开浏览器控制台查看详细错误（F12 → Console）"
                }, void 0, false, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.replace('/questionnaire/birthday'),
                    className: "mt-4 px-8 py-3 border border-[#1A2E2A] text-xs tracking-[0.2em] text-[#1A2E2A] hover:bg-[#1A2E2A] hover:text-white transition-colors",
                    children: "重新开始问卷"
                }, void 0, false, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/result/page.tsx",
            lineNumber: 299,
            columnNumber: 7
        }, this);
    }
    // ===== Loading 状态 =====
    if (!loaded || top3.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-[#f5f4f0] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                animate: {
                    opacity: [
                        0.3,
                        1,
                        0.3
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Infinity
                },
                className: "text-sm tracking-[0.3em] text-[#999]",
                style: {
                    fontFamily: "'Space Mono', monospace"
                },
                children: "READING DESTINY..."
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 317,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/result/page.tsx",
            lineNumber: 316,
            columnNumber: 7
        }, this);
    }
    // ===== 准备数据（依赖 selectedPetIndex，随用户选择动态切换）=====
    const best = top3[selectedPetIndex] ?? top3[0];
    const wisdom = wisdomQuotes[best.breed.wuxing] ?? wisdomQuotes[element];
    const harmony = harmonyGuide[element];
    // 动态维度 (4 or 5)
    const dimensions = [
        {
            en: 'WUXING',
            zh: '五行',
            score: best.scores.wuxing
        },
        {
            en: 'TIANSHI',
            zh: '天时',
            score: best.scores.tianshi
        },
        {
            en: 'DILI',
            zh: '地利',
            score: best.scores.dili
        },
        {
            en: 'RENHE',
            zh: '人和',
            score: best.scores.renhe
        },
        ...best.scores.appearance != null ? [
            {
                en: 'APPEARANCE',
                zh: '外观',
                score: best.scores.appearance
            }
        ] : []
    ];
    const _generateCard = async ()=>{
        setIsGenerating(true);
        await new Promise((resolve)=>setTimeout(resolve, 1500));
        setIsGenerating(false);
        alert('Destiny Card 已生成！');
    };
    const handleSubscribe = (e)=>{
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(()=>setSubscribed(false), 3000);
            setEmail('');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#f5f4f0] snap-y snap-mandatory overflow-y-auto",
        style: {
            scrollBehavior: 'smooth'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "snap-section relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F6F5F2] snap-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        style: {
                            x: bgWatermarkX,
                            y: bgWatermarkY,
                            zIndex: -1
                        },
                        className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[25vw] font-black whitespace-nowrap",
                            style: {
                                fontFamily: "'Noto Serif SC', serif",
                                letterSpacing: '0.05em',
                                color: '#1A1A1A',
                                opacity: 0.02
                            },
                            children: "百澤契約"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay",
                        style: {
                            backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full h-screen px-6 md:px-12 lg:px-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 50
                                },
                                animate: revealed ? {
                                    opacity: 1,
                                    y: 0
                                } : {},
                                transition: {
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 20,
                                    delay: 0.2
                                },
                                className: "absolute top-[15%] left-6 md:left-12 lg:left-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 60
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -60
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.19,
                                                1,
                                                0.22,
                                                1
                                            ]
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                className: "tabular-nums tracking-tighter",
                                                style: {
                                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                    fontWeight: 500,
                                                    fontSize: '25vh',
                                                    lineHeight: 0.85,
                                                    color: '#1A1A1A'
                                                },
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: revealed ? {
                                                    opacity: 1
                                                } : {},
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CountUpNumber, {
                                                    value: best.scores.total
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 align-top",
                                                style: {
                                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                    fontWeight: 300,
                                                    fontSize: '5vh',
                                                    color: '#1A1A1A',
                                                    opacity: 0.15,
                                                    lineHeight: 1.2
                                                },
                                                children: "%"
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-8 flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                                                            fontWeight: 700,
                                                            fontSize: '13px',
                                                            letterSpacing: '0.2em',
                                                            color: '#1A1A1A',
                                                            opacity: 1
                                                        },
                                                        children: "契合度"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                            fontStyle: 'italic',
                                                            fontWeight: 300,
                                                            fontSize: '9px',
                                                            letterSpacing: '0.35em',
                                                            color: 'rgba(26,26,26,0.22)',
                                                            textTransform: 'uppercase'
                                                        },
                                                        children: "MATCH SCORE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `score-${selectedPetIndex}`, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 30
                                },
                                animate: revealed ? {
                                    opacity: 1,
                                    y: 0
                                } : {},
                                transition: {
                                    ...SILK,
                                    delay: 0.6
                                },
                                className: "absolute bottom-[20%] right-6 md:right-12 lg:right-20 text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 60
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -60
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.19,
                                                1,
                                                0.22,
                                                1
                                            ]
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold tracking-[0.15em] mb-4",
                                                style: {
                                                    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                                                    fontWeight: 700,
                                                    color: '#7A2E2E',
                                                    opacity: 1
                                                },
                                                children: [
                                                    best.breed.categoryName,
                                                    " · ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wuxing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WUXING_NAMES"][element]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 473,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: 'clamp(36px, 5vw, 72px)',
                                                    letterSpacing: '0.08em',
                                                    color: '#1A1A1A',
                                                    lineHeight: 1.1,
                                                    opacity: 1
                                                },
                                                children: best.breed.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 485,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-3 italic",
                                                style: {
                                                    fontFamily: "'Playfair Display', 'Cormorant', serif",
                                                    fontWeight: 300,
                                                    fontSize: '14px',
                                                    letterSpacing: '0.2em',
                                                    color: 'rgba(26,26,26,0.3)',
                                                    textTransform: 'uppercase'
                                                },
                                                children: best.breed.nameEn
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `identity-${selectedPetIndex}`, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 464,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scaleY: 0
                                },
                                animate: revealed ? {
                                    scaleY: 1
                                } : {},
                                transition: {
                                    ...SILK,
                                    delay: 0.8
                                },
                                className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[30vh] origin-center",
                                style: {
                                    backgroundColor: 'rgba(26,26,26,0.06)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-[8%] left-6 md:left-12 lg:left-20 flex gap-6",
                                children: dimensions.slice(0, 3).map((dim, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        animate: revealed ? {
                                            opacity: 1,
                                            y: 0
                                        } : {},
                                        transition: {
                                            ...SILK,
                                            delay: 0.9 + idx * 0.05
                                        },
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[8px] tracking-[0.3em] uppercase mb-1",
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    color: '#1A1A1A',
                                                    opacity: 0.2
                                                },
                                                children: dim.en
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl tabular-nums",
                                                style: {
                                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                    fontWeight: 500,
                                                    color: '#1A1A1A'
                                                },
                                                children: dim.score
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, dim.en, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 2
                        },
                        className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                animate: {
                                    opacity: [
                                        0.35,
                                        0.7,
                                        0.35
                                    ]
                                },
                                transition: {
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                },
                                style: {
                                    fontFamily: "'Times New Roman', 'Source Han Serif CN', serif",
                                    fontSize: '10px',
                                    letterSpacing: '0.5em',
                                    color: '#1A1A1A',
                                    fontStyle: 'italic'
                                },
                                children: "SCROLL"
                            }, void 0, false, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-px overflow-hidden",
                                style: {
                                    height: '48px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0",
                                        style: {
                                            backgroundColor: 'rgba(26,26,26,0.08)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        animate: {
                                            y: [
                                                '-100%',
                                                '200%'
                                            ]
                                        },
                                        transition: {
                                            duration: 1.6,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            repeatDelay: 0.4
                                        },
                                        className: "absolute left-0 w-full",
                                        style: {
                                            height: '40%',
                                            background: 'linear-gradient(to bottom, transparent, rgba(26,26,26,0.45), transparent)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 580,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/result/page.tsx",
                                lineNumber: 576,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 360,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "snap-section py-20 md:py-32 px-6 md:px-12 bg-[#F6F5F2] snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
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
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs tracking-[0.4em] text-[#1A1A1A] mb-4",
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        opacity: 0.3
                                    },
                                    children: "WHICH ONE IS YOURS"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 597,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-[0.08em]",
                                    style: {
                                        fontFamily: "'Noto Serif SC', serif"
                                    },
                                    children: "你的三种可能"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 596,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-[65%_1fr] gap-6 md:gap-8",
                            children: [
                                top3[0] && (()=>{
                                    const match = top3[0];
                                    const idx = 0;
                                    const isExpanded = expandedCard === idx;
                                    const isSelected = selectedPetIndex === idx;
                                    const isDimmed = selectedPetIndex !== idx;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                            ...SILK,
                                            delay: 0
                                        },
                                        animate: {
                                            opacity: isDimmed ? 0.2 : 1,
                                            scale: isSelected ? 1.015 : 1
                                        },
                                        className: "relative row-span-2 cursor-pointer group",
                                        onClick: ()=>{
                                            setSelectedPetIndex(idx);
                                            setExpandedCard(isExpanded ? null : idx);
                                        },
                                        style: {
                                            transition: 'all 1.4s cubic-bezier(0.19, 1, 0.22, 1)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-full p-10 md:p-14 flex flex-col justify-between transition-all duration-[1400ms]",
                                            style: {
                                                backgroundColor: isSelected ? '#FFFFFF' : '#E0EAE9',
                                                boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
                                                transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                                                transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-8",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                            fontWeight: 400,
                                                            fontSize: '10px',
                                                            letterSpacing: '0.4em',
                                                            opacity: 0.4
                                                        },
                                                        children: "RANK_01"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 flex flex-col justify-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-24 h-24 md:w-32 md:h-32 mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#E8E0D5] to-[#D4C8B8] shadow-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPetAvatar"])(match.breed.id),
                                                                alt: match.breed.name,
                                                                fill: true,
                                                                className: "object-cover",
                                                                sizes: "(max-width: 768px) 96px, 128px"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 649,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-2 italic",
                                                            style: {
                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                fontWeight: 300,
                                                                fontSize: '11px',
                                                                letterSpacing: '0.35em',
                                                                color: 'rgba(26,26,26,0.25)',
                                                                textTransform: 'uppercase'
                                                            },
                                                            children: match.breed.nameEn
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 658,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "mb-3",
                                                            style: {
                                                                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                                                                fontWeight: 700,
                                                                fontSize: 'clamp(28px, 4vw, 48px)',
                                                                letterSpacing: '0.04em',
                                                                color: '#1A1A1A',
                                                                lineHeight: 1.1,
                                                                opacity: 1
                                                            },
                                                            children: match.breed.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 662,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2",
                                                            style: {
                                                                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                                fontWeight: 300,
                                                                fontSize: '12px',
                                                                color: 'rgba(26,26,26,0.4)',
                                                                lineHeight: 1.8
                                                            },
                                                            children: [
                                                                match.breed.categoryName,
                                                                " · ",
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PET_CATEGORIES"][match.breed.category]?.icon,
                                                                " · ",
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wuxing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WUXING_NAMES"][match.breed.wuxing]
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 665,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 646,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-8 flex items-baseline gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-6xl md:text-7xl tabular-nums tracking-tight",
                                                            style: {
                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                fontWeight: 500,
                                                                color: '#1A1A1A'
                                                            },
                                                            children: match.scores.total
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 672,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            style: {
                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                fontWeight: 400,
                                                                color: '#1A1A1A',
                                                                opacity: 0.25
                                                            },
                                                            children: "%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 675,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-4 text-xs tracking-[0.2em] uppercase",
                                                            style: {
                                                                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                                color: '#1A1A1A',
                                                                opacity: 0.3
                                                            },
                                                            children: "best match"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 676,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 h-px bg-[#1A1A1A]/8"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 flex flex-wrap gap-3",
                                                    children: match.breed.traits.slice(0, 4).map((trait)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] tracking-[0.1em] text-[#1A1A1A]/40 border-b border-[#1A1A1A]/8 pb-1",
                                                            style: {
                                                                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                                fontWeight: 300
                                                            },
                                                            children: trait
                                                        }, trait, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: false,
                                                    animate: {
                                                        height: isExpanded ? 'auto' : 0,
                                                        opacity: isExpanded ? 1 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: [
                                                            0.19,
                                                            1,
                                                            0.22,
                                                            1
                                                        ]
                                                    },
                                                    className: "overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-8 space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] tracking-[0.4em] text-[#1A1A1A]/30 uppercase mb-4",
                                                                style: {
                                                                    fontFamily: "var(--font-inter), 'Inter', sans-serif"
                                                                },
                                                                children: "DIMENSION ANALYSIS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 25
                                                            }, this),
                                                            [
                                                                {
                                                                    label: '五行',
                                                                    en: 'Wuxing',
                                                                    score: match.scores.wuxing
                                                                },
                                                                {
                                                                    label: '天时',
                                                                    en: 'Tianshi',
                                                                    score: match.scores.tianshi
                                                                },
                                                                {
                                                                    label: '地利',
                                                                    en: 'Dili',
                                                                    score: match.scores.dili
                                                                },
                                                                {
                                                                    label: '人和',
                                                                    en: 'Renhe',
                                                                    score: match.scores.renhe
                                                                },
                                                                ...match.scores.appearance != null ? [
                                                                    {
                                                                        label: '外观',
                                                                        en: 'Appearance',
                                                                        score: match.scores.appearance
                                                                    }
                                                                ] : []
                                                            ].map((d, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        opacity: 0,
                                                                        x: -10
                                                                    },
                                                                    animate: isExpanded ? {
                                                                        opacity: 1,
                                                                        x: 0
                                                                    } : {
                                                                        opacity: 0,
                                                                        x: -10
                                                                    },
                                                                    transition: {
                                                                        delay: di * 0.05,
                                                                        duration: 0.5
                                                                    },
                                                                    className: "flex items-center gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-8 text-[9px] tracking-[0.1em] text-[#1A1A1A]/40 shrink-0",
                                                                            style: {
                                                                                fontFamily: "var(--font-inter), 'Inter', sans-serif"
                                                                            },
                                                                            children: d.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 712,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 h-[2px] bg-[#1A1A1A]/6 relative rounded-full overflow-hidden",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                initial: {
                                                                                    width: 0
                                                                                },
                                                                                animate: isExpanded ? {
                                                                                    width: `${d.score}%`
                                                                                } : {
                                                                                    width: 0
                                                                                },
                                                                                transition: {
                                                                                    duration: 0.8,
                                                                                    delay: di * 0.05,
                                                                                    ease: [
                                                                                        0.19,
                                                                                        1,
                                                                                        0.22,
                                                                                        1
                                                                                    ]
                                                                                },
                                                                                className: "absolute top-0 left-0 h-full bg-[#1A1A1A]/40 rounded-full"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/result/page.tsx",
                                                                                lineNumber: 714,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 713,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[11px] tabular-nums w-8 text-right",
                                                                            style: {
                                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                                fontWeight: 500,
                                                                                color: '#1A1A1A',
                                                                                opacity: 0.6
                                                                            },
                                                                            children: d.score
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 721,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, d.en, true, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 705,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-4 pt-4 border-t border-[#1A1A1A]/8 text-sm leading-[1.8] italic",
                                                                style: {
                                                                    fontFamily: "'Noto Serif SC', serif",
                                                                    color: '#1A1A1A',
                                                                    opacity: 0.5
                                                                },
                                                                children: [
                                                                    "“",
                                                                    match.emotionalSummary,
                                                                    "”"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-4 right-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] tracking-[0.2em] text-[#1A1A1A]/20 group-hover:text-[#1A1A1A]/40 transition-opacity",
                                                        style: {
                                                            fontFamily: "var(--font-inter), 'Inter', sans-serif"
                                                        },
                                                        children: isExpanded ? 'COLLAPSE' : 'EXPAND'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 733,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-4 right-4 w-6 h-6 border-t border-r border-[#1A1A1A]/8"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#1A1A1A]/8"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 631,
                                            columnNumber: 19
                                        }, this)
                                    }, match.breed.id, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 17
                                    }, this);
                                })(),
                                top3.slice(1, 3).map((match, i)=>{
                                    const idx = i + 1;
                                    const isExpanded = expandedCard === idx;
                                    const isSelected = selectedPetIndex === idx;
                                    const isDimmed = selectedPetIndex !== idx;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                            ...SILK,
                                            delay: idx * 0.1
                                        },
                                        animate: {
                                            opacity: isDimmed ? 0.2 : 1,
                                            scale: isSelected ? 1.015 : 1
                                        },
                                        className: "relative cursor-pointer group",
                                        onClick: ()=>{
                                            setSelectedPetIndex(idx);
                                            setExpandedCard(isExpanded ? null : idx);
                                        },
                                        style: {
                                            transition: 'all 1.4s cubic-bezier(0.19, 1, 0.22, 1)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative p-8 md:p-10 transition-all duration-[1400ms]",
                                            style: {
                                                backgroundColor: isSelected ? '#FFFFFF' : '#E0EAE9',
                                                boxShadow: isSelected ? '0 25px 50px rgba(0,0,0,0.08)' : 'none',
                                                transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                                                transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                            fontWeight: 400,
                                                            fontSize: '10px',
                                                            letterSpacing: '0.4em',
                                                            opacity: 0.4
                                                        },
                                                        children: [
                                                            "RANK_0",
                                                            idx + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-4 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-[#E8E0D5] to-[#D4C8B8] shadow-md",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPetAvatar"])(match.breed.id),
                                                                alt: match.breed.name,
                                                                fill: true,
                                                                className: "object-cover",
                                                                sizes: "(max-width: 768px) 64px, 80px"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 788,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 787,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "italic mb-1",
                                                                    style: {
                                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                        fontWeight: 300,
                                                                        fontSize: '10px',
                                                                        letterSpacing: '0.35em',
                                                                        color: 'rgba(26,26,26,0.25)',
                                                                        textTransform: 'uppercase'
                                                                    },
                                                                    children: match.breed.nameEn
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 798,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    style: {
                                                                        fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Serif SC', sans-serif",
                                                                        fontWeight: 700,
                                                                        fontSize: 'clamp(22px, 3vw, 36px)',
                                                                        letterSpacing: '0.04em',
                                                                        color: '#1A1A1A',
                                                                        lineHeight: 1.1,
                                                                        opacity: 1
                                                                    },
                                                                    children: match.breed.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-4xl md:text-5xl tabular-nums",
                                                                    style: {
                                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                        fontWeight: 500,
                                                                        color: '#1A1A1A'
                                                                    },
                                                                    children: match.scores.total
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm ml-0.5",
                                                                    style: {
                                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                        color: '#1A1A1A',
                                                                        opacity: 0.2
                                                                    },
                                                                    children: "%"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 806,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                        fontWeight: 300,
                                                        fontSize: '12px',
                                                        opacity: 0.5,
                                                        lineHeight: 1.8
                                                    },
                                                    children: [
                                                        match.breed.categoryName,
                                                        " · ",
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$database$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PET_CATEGORIES"][match.breed.category]?.icon
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 815,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 h-px bg-[#1A2E2A]/10"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 820,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex flex-wrap gap-2",
                                                    children: match.breed.traits.slice(0, 3).map((trait)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] tracking-[0.1em] text-[#1A2E2A]/50 border-b border-[#1A2E2A]/10 pb-0.5",
                                                            style: {
                                                                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                                fontWeight: 300
                                                            },
                                                            children: trait
                                                        }, trait, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 825,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 823,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: false,
                                                    animate: {
                                                        height: isExpanded ? 'auto' : 0,
                                                        opacity: isExpanded ? 1 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: [
                                                            0.19,
                                                            1,
                                                            0.22,
                                                            1
                                                        ]
                                                    },
                                                    className: "overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-6 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] tracking-[0.3em] text-[#1A2E2A]/40 uppercase mb-3",
                                                                style: {
                                                                    fontFamily: "var(--font-inter), 'Inter', sans-serif"
                                                                },
                                                                children: "DIMENSIONS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 837,
                                                                columnNumber: 25
                                                            }, this),
                                                            [
                                                                {
                                                                    label: '五行',
                                                                    score: match.scores.wuxing
                                                                },
                                                                {
                                                                    label: '天时',
                                                                    score: match.scores.tianshi
                                                                },
                                                                {
                                                                    label: '地利',
                                                                    score: match.scores.dili
                                                                },
                                                                {
                                                                    label: '人和',
                                                                    score: match.scores.renhe
                                                                },
                                                                ...match.scores.appearance != null ? [
                                                                    {
                                                                        label: '外观',
                                                                        score: match.scores.appearance
                                                                    }
                                                                ] : []
                                                            ].map((d, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        opacity: 0,
                                                                        x: -10
                                                                    },
                                                                    animate: isExpanded ? {
                                                                        opacity: 1,
                                                                        x: 0
                                                                    } : {
                                                                        opacity: 0,
                                                                        x: -10
                                                                    },
                                                                    transition: {
                                                                        delay: di * 0.08,
                                                                        duration: 0.5
                                                                    },
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-7 text-[9px] tracking-[0.1em] text-[#1A2E2A]/50 shrink-0",
                                                                            children: d.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 852,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 h-[2px] bg-[#1A2E2A]/8 relative rounded-full overflow-hidden",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                initial: {
                                                                                    width: 0
                                                                                },
                                                                                animate: isExpanded ? {
                                                                                    width: `${d.score}%`
                                                                                } : {
                                                                                    width: 0
                                                                                },
                                                                                transition: {
                                                                                    duration: 0.8,
                                                                                    delay: di * 0.1,
                                                                                    ease: [
                                                                                        0.19,
                                                                                        1,
                                                                                        0.22,
                                                                                        1
                                                                                    ]
                                                                                },
                                                                                className: "absolute top-0 left-0 h-full bg-[#1A2E2A]/50 rounded-full"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/result/page.tsx",
                                                                                lineNumber: 854,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 853,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] tabular-nums w-7 text-right",
                                                                            style: {
                                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                                fontWeight: 500,
                                                                                color: '#1A1A1A',
                                                                                opacity: 0.6
                                                                            },
                                                                            children: d.score
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 861,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, d.label, true, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 845,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-3 pt-3 border-t border-[#1A1A1A]/8 text-xs leading-[1.8] italic",
                                                                style: {
                                                                    fontFamily: "'Noto Serif SC', serif",
                                                                    color: '#1A1A1A',
                                                                    opacity: 0.4
                                                                },
                                                                children: [
                                                                    "“",
                                                                    match.emotionalSummary,
                                                                    "”"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 864,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 836,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-3 right-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[8px] tracking-[0.2em] text-[#1A2E2A]/15 group-hover:text-[#1A2E2A]/35 transition-opacity",
                                                        style: {
                                                            fontFamily: "var(--font-inter), 'Inter', sans-serif"
                                                        },
                                                        children: isExpanded ? 'COLLAPSE' : 'EXPAND'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 872,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 770,
                                            columnNumber: 19
                                        }, this)
                                    }, match.breed.id, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 753,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 604,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 595,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "snap-section relative py-20 md:py-32 px-6 md:px-12 bg-[#1A2E2A] snap-start",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto",
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
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs tracking-[0.4em] text-[#7a8f82] mb-4",
                                    style: {
                                        fontFamily: "'Space Mono', monospace"
                                    },
                                    children: "DIMENSION ANALYSIS"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 889,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-5xl font-black tracking-[0.08em] text-[#f5f4f0]",
                                    style: {
                                        fontFamily: "'Noto Serif SC', serif",
                                        textShadow: '0 0 8px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)'
                                    },
                                    children: "维度解析"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 890,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 888,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-[60%_1fr] gap-8 md:gap-12 items-center",
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
                                        ...SILK,
                                        delay: 0
                                    },
                                    className: "relative flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        viewBox: "0 0 300 300",
                                        className: "w-full max-w-[380px] mx-auto",
                                        children: [
                                            [
                                                0.2,
                                                0.4,
                                                0.6,
                                                0.8,
                                                1.0
                                            ].map((scale, i)=>{
                                                const pts = dimensions.map((_, idx)=>{
                                                    const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                    const r = 120 * scale;
                                                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                                                });
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    points: pts.join(' '),
                                                    fill: "none",
                                                    stroke: "rgba(255,255,255,0.08)",
                                                    strokeWidth: "0.5"
                                                }, i, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 914,
                                                    columnNumber: 26
                                                }, this);
                                            }),
                                            dimensions.map((_, idx)=>{
                                                const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "150",
                                                    y1: "150",
                                                    x2: 150 + 120 * Math.cos(angle),
                                                    y2: 150 + 120 * Math.sin(angle),
                                                    stroke: "rgba(255,255,255,0.06)",
                                                    strokeWidth: "0.5"
                                                }, idx, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 26
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].polygon, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                whileInView: {
                                                    opacity: 1
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 1,
                                                    delay: 0.3
                                                },
                                                points: dimensions.map((d, idx)=>{
                                                    const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                    const r = d.score / 100 * 120;
                                                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                                                }).join(' '),
                                                fill: "rgba(224, 234, 233, 0.4)",
                                                stroke: "rgba(224, 234, 233, 0.7)",
                                                strokeWidth: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 922,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].polygon, {
                                                initial: {
                                                    pathLength: 0,
                                                    opacity: 0
                                                },
                                                whileInView: {
                                                    pathLength: 1,
                                                    opacity: 1
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    duration: 1.2,
                                                    delay: 0.5
                                                },
                                                points: dimensions.map((d, idx)=>{
                                                    const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                    const r = d.score / 100 * 120;
                                                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                                                }).join(' '),
                                                fill: "none",
                                                stroke: "rgba(224, 234, 233, 0.9)",
                                                strokeWidth: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 937,
                                                columnNumber: 17
                                            }, this),
                                            dimensions.map((d, idx)=>{
                                                const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                const r = d.score / 100 * 120;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].circle, {
                                                    cx: 150 + r * Math.cos(angle),
                                                    cy: 150 + r * Math.sin(angle),
                                                    r: "2",
                                                    fill: "#E0EAE9",
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0
                                                    },
                                                    whileInView: {
                                                        opacity: 1,
                                                        scale: 1
                                                    },
                                                    viewport: {
                                                        once: true
                                                    },
                                                    transition: {
                                                        delay: 0.6 + idx * 0.1
                                                    }
                                                }, d.en, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 956,
                                                    columnNumber: 21
                                                }, this);
                                            }),
                                            dimensions.map((d, idx)=>{
                                                const angle = Math.PI * 2 * idx / dimensions.length - Math.PI / 2;
                                                const labelR = 140;
                                                const x = 150 + labelR * Math.cos(angle);
                                                const y = 150 + labelR * Math.sin(angle);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: x,
                                                    y: y,
                                                    textAnchor: "middle",
                                                    dominantBaseline: "central",
                                                    fill: "rgba(255,255,255,0.35)",
                                                    fontSize: "8",
                                                    fontFamily: "'Space Mono', monospace",
                                                    letterSpacing: "0.1em",
                                                    children: d.en
                                                }, d.en, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 976,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 906,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 899,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        ...SILK,
                                        delay: 0.2
                                    },
                                    className: "space-y-0",
                                    children: [
                                        dimensions.map((d, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: 15
                                                },
                                                whileInView: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                viewport: {
                                                    once: true
                                                },
                                                transition: {
                                                    delay: 0.3 + idx * 0.1
                                                },
                                                className: "group",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4 py-5 border-b border-white/[0.06]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-white/20 w-10 shrink-0",
                                                            style: {
                                                                fontFamily: "'Space Mono', monospace"
                                                            },
                                                            children: [
                                                                "[DIM_0",
                                                                idx + 1,
                                                                "]"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1013,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-px h-8 bg-white/10 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1017,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-baseline gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs tracking-[0.3em] text-white/50 uppercase",
                                                                            style: {
                                                                                fontFamily: "'Space Mono', monospace",
                                                                                textShadow: '0 0 8px rgba(255,255,255,0.15)'
                                                                            },
                                                                            children: d.en
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 1021,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] tracking-[0.15em] text-white/25",
                                                                            children: d.zh
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 1024,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 1020,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 h-px bg-white/10 relative",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                initial: {
                                                                                    width: 0
                                                                                },
                                                                                whileInView: {
                                                                                    width: `${d.score}%`
                                                                                },
                                                                                viewport: {
                                                                                    once: true
                                                                                },
                                                                                transition: {
                                                                                    duration: 0.8,
                                                                                    delay: 0.5 + idx * 0.1,
                                                                                    ease: [
                                                                                        0.19,
                                                                                        1,
                                                                                        0.22,
                                                                                        1
                                                                                    ]
                                                                                },
                                                                                className: "absolute top-0 left-0 h-full bg-[#E0EAE9]/60"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/result/page.tsx",
                                                                                lineNumber: 1029,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 1028,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm tabular-nums text-white/70 w-8 text-right",
                                                                            style: {
                                                                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                                fontWeight: 500,
                                                                                textShadow: '0 0 8px rgba(255,255,255,0.15)'
                                                                            },
                                                                            children: d.score
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 1037,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 1027,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1019,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1011,
                                                    columnNumber: 19
                                                }, this)
                                            }, d.en, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 1003,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-6",
                                            children: best.matchReasons.map((reason, index)=>{
                                                const dimLabels = {
                                                    wuxing: 'Element',
                                                    tianshi: 'Timing',
                                                    dili: 'Space',
                                                    renhe: 'Character',
                                                    appearance: 'Appearance'
                                                };
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    whileInView: {
                                                        opacity: 1
                                                    },
                                                    viewport: {
                                                        once: true
                                                    },
                                                    transition: {
                                                        delay: 0.8 + index * 0.15
                                                    },
                                                    className: "text-sm leading-[1.8] text-white/40 mb-3",
                                                    style: {
                                                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                        fontWeight: 300
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] tracking-[0.2em] text-[#c9a87c]/60 uppercase mr-2",
                                                            style: {
                                                                fontFamily: "'Space Mono', monospace"
                                                            },
                                                            children: dimLabels[reason.dimension] || 'Fate'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1060,
                                                            columnNumber: 23
                                                        }, this),
                                                        reason.text
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1051,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 995,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 896,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            className: "mt-20 bg-[#f5f4f0] py-12 md:py-16 px-8 md:px-12 text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[#e5e3dd]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] tracking-[0.4em] text-[#8B4513] mb-4 uppercase font-bold",
                                    children: "A Destiny Sealed"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1076,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm tracking-[0.3em] text-[#8b3232] mb-6 font-bold",
                                    children: "命定之约"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1077,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base md:text-lg font-medium leading-[1.8] text-[#1A2E2A] max-w-2xl mx-auto mb-6",
                                    style: {
                                        fontFamily: "'Noto Serif SC', serif"
                                    },
                                    children: best.emotionalSummary
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-px bg-[#1A2E2A]/30"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1082,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs tracking-[0.3em] text-[#666] font-bold",
                                            children: "百澤 PACTZO"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1083,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-px bg-[#1A2E2A]/30"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1084,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1081,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1070,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 887,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 886,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "snap-section relative min-h-screen flex items-center justify-center bg-[#F6F5F2] overflow-hidden snap-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 text-center px-[8vw] md:px-[20vw] max-w-5xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                ...SILK,
                                delay: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] tracking-[0.5em] mb-10 uppercase",
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        color: '#1A1A1A',
                                        opacity: 0.3
                                    },
                                    children: [
                                        "ANCIENT WISDOM · ",
                                        wisdom.english.toUpperCase()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 60
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -60
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.19,
                                                1,
                                                0.22,
                                                1
                                            ]
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                                className: "relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-2xl md:text-[32px] leading-[1.8] italic",
                                                    style: {
                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                        fontWeight: 400,
                                                        color: '#1A1A1A',
                                                        opacity: 0.8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[2em] not-italic font-medium float-left leading-[0.8] mr-3 mt-1",
                                                            style: {
                                                                color: '#7A2E2E'
                                                            },
                                                            children: wisdom.quote.charAt(0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1118,
                                                            columnNumber: 21
                                                        }, this),
                                                        wisdom.quote.slice(1)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1114,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-8 text-base md:text-lg tracking-[0.2em]",
                                                style: {
                                                    fontFamily: "'Noto Serif SC', serif",
                                                    lineHeight: 1.8,
                                                    color: '#1A1A1A',
                                                    opacity: 0.45
                                                },
                                                children: wisdom.chinese
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 1126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-6 text-xs tracking-[0.2em]",
                                                style: {
                                                    fontFamily: "'Space Mono', monospace",
                                                    color: '#1A1A1A',
                                                    opacity: 0.2
                                                },
                                                children: [
                                                    "— ",
                                                    wisdom.source
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `quote-${selectedPetIndex}`, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.8
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        delay: 0.8
                                    },
                                    className: "mt-12 flex items-center justify-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-px bg-[#1A1A1A]/10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-3xl",
                                            style: {
                                                fontFamily: "'Noto Serif SC', serif",
                                                color: '#1A1A1A',
                                                opacity: 0.12
                                            },
                                            children: wisdom.element
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-px bg-[#1A1A1A]/10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1093,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 1092,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-16 left-1/2 -translate-x-1/2 z-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].svg, {
                            width: "120",
                            height: "120",
                            viewBox: "0 0 120 120",
                            animate: {
                                rotate: 360
                            },
                            transition: {
                                duration: 60,
                                repeat: Infinity,
                                ease: 'linear'
                            },
                            className: "opacity-[0.08]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "56",
                                    fill: "none",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "50",
                                    fill: "none",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "44",
                                    fill: "none",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        id: "sealTextPath",
                                        d: "M 60,60 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1173,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    fill: "#1A1A1A",
                                    fontSize: "6",
                                    fontFamily: "'Space Mono', monospace",
                                    letterSpacing: "0.3em",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textPath", {
                                        href: "#sealTextPath",
                                        startOffset: "0%",
                                        children: "PACTZO · OFFICIAL · DESTINY · CONTRACT · 2026 ·"
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1176,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "60",
                                    y: "62",
                                    textAnchor: "middle",
                                    dominantBaseline: "central",
                                    fill: "#1A1A1A",
                                    fontSize: "20",
                                    fontFamily: "'Noto Serif SC', serif",
                                    fontWeight: "900",
                                    children: "澤"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "40",
                                    y1: "42",
                                    x2: "40",
                                    y2: "48",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "37",
                                    y1: "45",
                                    x2: "43",
                                    y2: "45",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "77",
                                    y1: "72",
                                    x2: "77",
                                    y2: "78",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "74",
                                    y1: "75",
                                    x2: "80",
                                    y2: "75",
                                    stroke: "#1A1A1A",
                                    strokeWidth: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1160,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 1159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1091,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative min-h-screen bg-[#F6F5F2] overflow-hidden flex items-center justify-center select-none py-24 snap-start",
                onMouseMove: (e)=>{
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
                    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
                },
                onMouseLeave: ()=>{
                    mouseX.set(0);
                    mouseY.set(0);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none z-1 flex items-center justify-center overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: false,
                            animate: {
                                skewX: (selectedPetIndex - 1) * -2
                            },
                            transition: {
                                duration: 2.5,
                                ease: [
                                    0.23,
                                    1,
                                    0.32,
                                    1
                                ]
                            },
                            className: "absolute whitespace-nowrap",
                            style: {
                                x: sealBgX,
                                y: sealBgY,
                                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                fontSize: 'clamp(100px, 15vw, 220px)',
                                fontWeight: 900,
                                color: 'rgba(0,0,0,0.03)',
                                letterSpacing: '-0.05em',
                                lineHeight: 1,
                                userSelect: 'none',
                                transform: 'rotate(-5deg)'
                            },
                            children: "PACTZO DESTINY 2026"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1208,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 1206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-[1100px] px-6 md:px-[8%]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:grid md:grid-cols-[1fr_380px] md:gap-20 md:items-start gap-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                    className: "md:pt-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].header, {
                                            initial: {
                                                opacity: 0,
                                                y: 24
                                            },
                                            whileInView: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            viewport: {
                                                once: true
                                            },
                                            transition: {
                                                duration: 1.2,
                                                ease: [
                                                    0.19,
                                                    1,
                                                    0.22,
                                                    1
                                                ]
                                            },
                                            className: "mb-10 md:mb-20 relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10 pl-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "leading-[1.0] mb-1",
                                                            style: {
                                                                fontFamily: "'Noto Serif SC', serif",
                                                                fontWeight: 700,
                                                                fontSize: 'clamp(28px, 4vw, 38px)',
                                                                color: '#1A1A1A',
                                                                letterSpacing: '-0.01em'
                                                            },
                                                            children: "保存你的"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1246,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-baseline gap-2 leading-[1.0]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                        fontWeight: 400,
                                                                        fontStyle: 'italic',
                                                                        fontSize: 'clamp(36px, 5.5vw, 52px)',
                                                                        color: '#1A1A1A',
                                                                        letterSpacing: '-0.02em',
                                                                        opacity: 0.85
                                                                    },
                                                                    children: "缘分"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 1260,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontFamily: "'Noto Serif SC', serif",
                                                                        fontWeight: 700,
                                                                        fontSize: 'clamp(28px, 4vw, 38px)',
                                                                        color: '#1A1A1A',
                                                                        letterSpacing: '-0.01em'
                                                                    },
                                                                    children: "卡片"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 1273,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1259,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1244,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-6 text-[13px] leading-relaxed max-w-[280px]",
                                                    style: {
                                                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                        color: '#1A1A1A',
                                                        opacity: 0.28,
                                                        letterSpacing: '0.06em'
                                                    },
                                                    children: "将这一份宿命的共鸣封存于档案。分享至广阔的世界，让缘分在此刻定格。"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1287,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1236,
                                            columnNumber: 15
                                        }, this),
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
                                            transition: {
                                                duration: 1.2,
                                                ease: [
                                                    0.19,
                                                    1,
                                                    0.22,
                                                    1
                                                ],
                                                delay: 0.15
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block italic text-[11px] mb-3",
                                                    style: {
                                                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                        color: '#1A1A1A',
                                                        opacity: 0.28,
                                                        letterSpacing: '0.15em'
                                                    },
                                                    children: "WHICH DESTINY CALLS TO YOU?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1302,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[9px] font-bold mb-6 uppercase",
                                                    style: {
                                                        fontFamily: "'PingFang SC', sans-serif",
                                                        color: '#1A1A1A',
                                                        letterSpacing: '0.55em'
                                                    },
                                                    children: "哪一份缘分在指引你？"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1308,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                    className: "relative flex gap-10 items-start",
                                                    children: [
                                                        [
                                                            0,
                                                            1,
                                                            2
                                                        ].map((idx)=>{
                                                            const isActive = selectedPetIndex === idx;
                                                            const pet = top3[idx];
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setSelectedPetIndex(idx),
                                                                className: "relative pb-3 text-left transition-all duration-500",
                                                                style: {
                                                                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                                                                    transformOrigin: 'bottom left'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mb-2 transition-all duration-500",
                                                                        style: {
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '50%',
                                                                            overflow: 'hidden',
                                                                            opacity: isActive ? 1 : 0.5,
                                                                            border: isActive ? '2px solid #1A1A1A' : '2px solid transparent'
                                                                        },
                                                                        children: pet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPetAvatar"])(pet.breed.id),
                                                                            alt: pet.breed.name,
                                                                            style: {
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                objectFit: 'cover'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/result/page.tsx",
                                                                            lineNumber: 1338,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1326,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block transition-all duration-500",
                                                                        style: {
                                                                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                            fontStyle: 'italic',
                                                                            fontSize: '20px',
                                                                            fontWeight: 700,
                                                                            color: isActive ? '#1A1A1A' : '#ccc'
                                                                        },
                                                                        children: [
                                                                            "0",
                                                                            idx + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1349,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-[10px] mt-1 transition-all duration-500",
                                                                        style: {
                                                                            fontFamily: "var(--font-inter), 'Inter', sans-serif",
                                                                            fontWeight: 300,
                                                                            color: '#bbb',
                                                                            opacity: isActive ? 1 : 0,
                                                                            transform: isActive ? 'translateY(0)' : 'translateY(5px)'
                                                                        },
                                                                        children: pet?.breed.nameEn || '—'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1361,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 1319,
                                                                columnNumber: 23
                                                            }, this);
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            layoutId: "seal-underline",
                                                            className: "absolute bottom-0",
                                                            style: {
                                                                height: '2px',
                                                                backgroundColor: '#1A1A1A',
                                                                width: '48px',
                                                                left: `${selectedPetIndex * 88}px`
                                                            },
                                                            transition: {
                                                                type: 'spring',
                                                                stiffness: 300,
                                                                damping: 30
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1377,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1314,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1296,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            ref: cardRef,
                                            animate: {
                                                translateY: (selectedPetIndex - 1) * -8
                                            },
                                            transition: {
                                                duration: 1.2,
                                                ease: [
                                                    0.23,
                                                    1,
                                                    0.32,
                                                    1
                                                ]
                                            },
                                            className: "relative overflow-hidden",
                                            style: {
                                                x: sealCardX,
                                                y: sealCardY,
                                                aspectRatio: '3/4.5',
                                                width: '100%',
                                                maxWidth: '380px',
                                                backgroundColor: '#E8EDEB',
                                                boxShadow: `
                    0 2px 4px rgba(0,0,0,0.04),
                    0 8px 16px rgba(0,0,0,0.06),
                    0 24px 48px rgba(0,0,0,0.07),
                    0 60px 100px -20px rgba(0,0,0,0.09),
                    inset 0 1px 0 rgba(255,255,255,0.6)
                  `,
                                                padding: '36px 32px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 pointer-events-none z-0",
                                                    style: {
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                                                        backgroundSize: '200px 200px',
                                                        opacity: 0.6
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1420,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 border border-[#1A1A1A]/6 pointer-events-none z-20"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1430,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-2 border border-[#1A1A1A]/[0.03] pointer-events-none z-20"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-0 left-0 right-0 pointer-events-none z-1 overflow-hidden",
                                                    style: {
                                                        height: '40%'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                opacity: 1
                                                            },
                                                            exit: {
                                                                opacity: 0
                                                            },
                                                            transition: {
                                                                duration: 0.6
                                                            },
                                                            className: "absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden",
                                                            style: {
                                                                height: '100%'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "whitespace-nowrap uppercase",
                                                                style: {
                                                                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                    fontWeight: 700,
                                                                    fontSize: 'clamp(48px, 9vw, 72px)',
                                                                    WebkitTextStroke: '0.5px rgba(26,26,26,0.1)',
                                                                    color: 'transparent',
                                                                    letterSpacing: '-0.03em',
                                                                    lineHeight: 0.85,
                                                                    paddingBottom: '8px'
                                                                },
                                                                children: best.breed.nameEn
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 1448,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, `bg-name-${selectedPetIndex}`, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1439,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1434,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[8px] tracking-[0.5em] relative z-10",
                                                    style: {
                                                        fontFamily: "'Space Mono', monospace",
                                                        color: '#1A1A1A',
                                                        opacity: 0.25
                                                    },
                                                    children: "PACTZO · EDITION_2026"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1468,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                    mode: "wait",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            filter: 'blur(12px)',
                                                            y: 8
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            filter: 'blur(0px)',
                                                            y: 0
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            filter: 'blur(8px)',
                                                            y: -8
                                                        },
                                                        transition: {
                                                            duration: 0.7,
                                                            ease: [
                                                                0.23,
                                                                1,
                                                                0.32,
                                                                1
                                                            ]
                                                        },
                                                        className: "flex flex-col relative z-10",
                                                        style: {
                                                            x: sealContentX,
                                                            y: sealContentY
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 mb-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPetAvatar"])(best.breed.id),
                                                                    alt: best.breed.name,
                                                                    style: {
                                                                        width: '80px',
                                                                        height: '80px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '50%',
                                                                        border: '2px solid rgba(26,26,26,0.1)',
                                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/result/page.tsx",
                                                                    lineNumber: 1491,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 1490,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "italic text-[12px] tracking-[0.12em] block mb-2",
                                                                        style: {
                                                                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                            color: '#1A1A1A',
                                                                            opacity: 0.28
                                                                        },
                                                                        children: [
                                                                            wisdom.english,
                                                                            " · ",
                                                                            best.breed.nameEn
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1507,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-[26px] tracking-[0.15em] leading-tight",
                                                                        style: {
                                                                            fontFamily: "'Noto Serif SC', 'PingFang SC', serif",
                                                                            fontWeight: 700,
                                                                            color: '#1A1A1A'
                                                                        },
                                                                        children: [
                                                                            wisdom.element,
                                                                            " · ",
                                                                            best.breed.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1513,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 1506,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "my-8 p-4 relative",
                                                                style: {
                                                                    backgroundColor: 'rgba(26,26,26,0.03)',
                                                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(255,255,255,0.5)',
                                                                    borderRadius: '2px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute left-0 top-3 bottom-3 w-px",
                                                                        style: {
                                                                            backgroundColor: 'rgba(122,46,46,0.2)'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1531,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "italic text-[15px] leading-snug mb-2 pl-3",
                                                                        style: {
                                                                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                                                                            color: '#1A1A1A',
                                                                            opacity: 0.55
                                                                        },
                                                                        children: [
                                                                            "“",
                                                                            wisdom.quote,
                                                                            "”"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1532,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[9px] tracking-[0.25em] pl-3",
                                                                        style: {
                                                                            fontFamily: "'Noto Serif SC', serif",
                                                                            color: '#1A1A1A',
                                                                            opacity: 0.3
                                                                        },
                                                                        children: wisdom.chinese
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/result/page.tsx",
                                                                        lineNumber: 1538,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/result/page.tsx",
                                                                lineNumber: 1522,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, `seal-card-${selectedPetIndex}`, true, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 1477,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[8px] tracking-[0.4em] relative z-10",
                                                    style: {
                                                        fontFamily: "'Space Mono', monospace",
                                                        color: '#1A1A1A',
                                                        opacity: 0.18
                                                    },
                                                    children: [
                                                        "MATCH_INDEX // ",
                                                        best.scores.total,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1549,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-4 right-4 z-20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[7px] tracking-[0.3em] uppercase",
                                                        style: {
                                                            fontFamily: "'Space Mono', monospace",
                                                            color: '#1A1A1A',
                                                            opacity: 0.22
                                                        },
                                                        children: "百澤"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 1558,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1557,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1394,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                            onClick: handleSealShare,
                                            disabled: isGenerating || sharePhase !== 'idle',
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
                                                duration: 1.2,
                                                ease: [
                                                    0.19,
                                                    1,
                                                    0.22,
                                                    1
                                                ],
                                                delay: 0.3
                                            },
                                            className: "mt-8 w-full disabled:opacity-50 transition-all duration-700 relative",
                                            style: {
                                                padding: '4px',
                                                backgroundColor: 'transparent'
                                            },
                                            onMouseEnter: (e)=>{
                                                const outer = e.currentTarget.querySelector('[data-outer]');
                                                const inner = e.currentTarget.querySelector('[data-inner]');
                                                if (outer) outer.style.borderColor = 'rgba(26,26,26,0.22)';
                                                if (inner) {
                                                    inner.style.borderColor = 'rgba(26,26,26,0.12)';
                                                    inner.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                                                }
                                            },
                                            onMouseLeave: (e)=>{
                                                const outer = e.currentTarget.querySelector('[data-outer]');
                                                const inner = e.currentTarget.querySelector('[data-inner]');
                                                if (outer) outer.style.borderColor = 'rgba(26,26,26,0.10)';
                                                if (inner) {
                                                    inner.style.borderColor = 'rgba(26,26,26,0.06)';
                                                    inner.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    "data-outer": "",
                                                    className: "absolute inset-0 transition-all duration-700",
                                                    style: {
                                                        border: '0.5px solid rgba(26,26,26,0.10)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1597,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    "data-inner": "",
                                                    className: "relative transition-all duration-700",
                                                    style: {
                                                        border: '0.5px solid rgba(26,26,26,0.06)',
                                                        backgroundColor: '#FFFFFF',
                                                        padding: '20px 24px 18px',
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "italic text-center mb-1",
                                                            style: {
                                                                fontFamily: "'Times New Roman', 'Source Han Serif CN', serif",
                                                                fontWeight: 300,
                                                                fontSize: '10px',
                                                                letterSpacing: '0.3em',
                                                                color: 'rgba(122,46,46,0.5)'
                                                            },
                                                            children: isGenerating ? 'GENERATING...' : 'Seal the Destiny'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1614,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-center",
                                                            style: {
                                                                fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', serif",
                                                                fontWeight: 700,
                                                                fontSize: '15px',
                                                                letterSpacing: '0.45em',
                                                                color: '#1A1A1A'
                                                            },
                                                            children: isGenerating ? '生成中...' : '分享此刻'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1627,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1603,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1568,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1393,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/result/page.tsx",
                        lineNumber: 1231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-24 px-6 md:px-12 bg-[#f5f4f0]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: "text-xs tracking-[0.4em] text-[#999] mb-4 text-center",
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: true
                            },
                            children: "THE HARMONY GUIDE"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1649,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                            className: "text-2xl md:text-3xl font-extralight text-[#2a2a2a] mb-12 text-center",
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                delay: 0.1
                            },
                            children: "人宠和谐指南"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1650,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "p-6 border border-[#e5e3dd] text-center bg-white",
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
                                        delay: 0.1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs tracking-[0.2em] text-[#999] mb-2",
                                            children: "LUCKY COLOR"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1655,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-light mb-4",
                                            children: "幸运色"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1656,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-2 mb-4",
                                            children: harmony.luckyColors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-[#666]",
                                                    children: c
                                                }, i, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1657,
                                                    columnNumber: 98
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1657,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-2",
                                            children: harmony.luckyColorsEn.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-[#999]",
                                                    children: c
                                                }, i, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1658,
                                                    columnNumber: 95
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1658,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1654,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "p-6 border border-[#e5e3dd] text-center bg-white",
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
                                        delay: 0.2
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs tracking-[0.2em] text-[#999] mb-2",
                                            children: "FORTUNATE DIRECTION"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1661,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-light mb-4",
                                            children: "吉位"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1662,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#666] mb-2",
                                            children: harmony.direction
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1663,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#999]",
                                            children: harmony.directionEn
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1664,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1660,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "p-6 border border-[#e5e3dd] text-center bg-white",
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
                                        delay: 0.3
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs tracking-[0.2em] text-[#999] mb-2",
                                            children: "VIBE SYNC"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1667,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-light mb-4",
                                            children: "性格共振"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1668,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm italic text-[#666] mb-2",
                                            children: [
                                                "“",
                                                harmony.vibeQuote,
                                                "”"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1669,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-[#999]",
                                            children: harmony.vibeChinese
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1670,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1666,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1653,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 1648,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1647,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-24 px-6 md:px-12 bg-[#1A2E2A]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: "text-xs tracking-[0.4em] text-white/50 mb-4",
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: true
                            },
                            children: "SPIRIT & PET MONTHLY"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1679,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                            className: "text-2xl md:text-3xl font-extralight text-white mb-2",
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                delay: 0.1
                            },
                            children: "灵宠月刊"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1680,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: "text-sm text-white/60 mb-8",
                            initial: {
                                opacity: 0
                            },
                            whileInView: {
                                opacity: 1
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                delay: 0.2
                            },
                            children: "每月一封，关于你和它的命理指南"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1681,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].form, {
                            onSubmit: handleSubscribe,
                            className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto",
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
                                delay: 0.3
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    placeholder: "your@email.com",
                                    className: "flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1683,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "px-6 py-3 bg-white text-[#3a4d42] text-sm tracking-[0.15em] hover:bg-white/90 transition-colors",
                                    children: subscribed ? '已订阅' : '开启缘分追踪'
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1684,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1682,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 1678,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1677,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "py-12 px-6 md:px-12 bg-[#F6F5F2]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs tracking-[0.3em]",
                            style: {
                                color: 'rgba(26,26,26,0.4)'
                            },
                            children: "百澤 Pactzo"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1694,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs tracking-[0.1em]",
                            style: {
                                color: 'rgba(26,26,26,0.25)'
                            },
                            children: "测试结果仅供参考"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1695,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 1693,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1692,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    left: '-9999px',
                    top: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: shareCardRef,
                    style: {
                        width: '750px',
                        height: '1050px',
                        backgroundColor: '#f5f4f0',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '60px 56px',
                        fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                                backgroundSize: '256px 256px',
                                opacity: 0.35,
                                pointerEvents: 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1717,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)',
                                pointerEvents: 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1728,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '120px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.04) 0%, transparent 100%)',
                                pointerEvents: 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1736,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                inset: '16px',
                                border: '1px solid rgba(0,0,0,0.07)',
                                pointerEvents: 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1744,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '14px',
                                        letterSpacing: '0.35em',
                                        color: '#8B7355',
                                        fontWeight: 700
                                    },
                                    children: "A DESTINY SEALED"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '14px',
                                        letterSpacing: '0.35em',
                                        color: '#8B7355',
                                        fontWeight: 700
                                    },
                                    children: "BAIZE PACTZO"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1751,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1747,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                zIndex: 1,
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '15px',
                                        letterSpacing: '0.25em',
                                        color: '#8B7355',
                                        fontWeight: 700,
                                        marginBottom: '14px'
                                    },
                                    children: [
                                        generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id).replace('#', 'NO. '),
                                        " / ",
                                        best.breed.nameEn?.toUpperCase()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1759,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '24px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pet$2d$avatars$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPetAvatar"])(best.breed.id),
                                        alt: best.breed.name,
                                        style: {
                                            width: '160px',
                                            height: '160px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            border: '3px solid rgba(139, 115, 85, 0.3)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1765,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1764,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '68px',
                                        fontWeight: 700,
                                        color: '#1A2E2A',
                                        letterSpacing: '0.12em',
                                        lineHeight: 1.1,
                                        marginBottom: '40px',
                                        fontFamily: "'Noto Serif SC', serif"
                                    },
                                    children: best.breed.name
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1780,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '16px',
                                        marginBottom: '40px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Times New Roman', serif",
                                                fontSize: '56px',
                                                fontWeight: 400,
                                                color: '#1A1A1A',
                                                letterSpacing: '-0.02em'
                                            },
                                            children: [
                                                best.scores.total,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1786,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Space Mono', monospace",
                                                fontSize: '14px',
                                                letterSpacing: '0.25em',
                                                color: '#888',
                                                fontWeight: 700
                                            },
                                            children: "SOUL CONNECTION"
                                        }, void 0, false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1787,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1785,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        marginBottom: '32px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1791,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Noto Serif SC', 'Times New Roman', serif",
                                        fontSize: '18px',
                                        lineHeight: 2,
                                        color: '#3a3a3a',
                                        maxWidth: '540px'
                                    },
                                    children: best.emotionalSummary
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1794,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1757,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: '12px',
                                            letterSpacing: '0.15em',
                                            color: '#999',
                                            fontWeight: 700
                                        },
                                        children: RARITY_LABEL[getRarityLevel(best.breed.category)].en
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1802,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1801,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'right'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "'Space Mono', monospace",
                                            fontSize: '12px',
                                            letterSpacing: '0.2em',
                                            color: '#999',
                                            fontWeight: 700
                                        },
                                        children: "pactzo.com"
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1807,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1806,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1800,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 1701,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1700,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: sharePhase !== 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    className: "fixed inset-0 z-[100] flex items-center justify-center",
                    style: {
                        backdropFilter: 'blur(24px)',
                        backgroundColor: 'rgba(0,0,0,0.35)'
                    },
                    onClick: (e)=>{
                        if (e.target === e.currentTarget) closeShareOverlay();
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeShareOverlay,
                            className: "absolute top-6 right-6 z-[110] text-white/30 hover:text-white/70 transition-colors",
                            style: {
                                fontFamily: "'Times New Roman', serif",
                                fontSize: '22px',
                                fontStyle: 'italic',
                                lineHeight: 1
                            },
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1826,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.7,
                                ease: [
                                    0.19,
                                    1,
                                    0.22,
                                    1
                                ]
                            },
                            className: "flex flex-col items-center text-center px-6",
                            style: {
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                scrollbarWidth: 'none'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-8 tracking-[0.4em] uppercase",
                                    style: {
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '13px',
                                        color: 'rgba(255,255,255,0.8)',
                                        letterSpacing: '0.4em'
                                    },
                                    children: "A Destiny Sealed"
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1843,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        boxShadow: sharePhase === 'glowing' || sharePhase === 'card-ready' ? '0 0 60px rgba(255,255,255,0.12), 0 0 120px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)' : '0 40px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.35)'
                                    },
                                    transition: {
                                        duration: 1
                                    },
                                    style: {
                                        borderRadius: '2px',
                                        outline: '1px solid rgba(255,255,255,0.08)',
                                        outlineOffset: '0px'
                                    },
                                    children: shareCardUrl ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: shareCardUrl,
                                        alt: "Destiny Card",
                                        style: {
                                            width: '380px',
                                            height: 'auto',
                                            display: 'block',
                                            borderRadius: '2px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1871,
                                        columnNumber: 19
                                    }, this) : /* 动画阶段预览卡 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '380px',
                                            padding: '1px',
                                            background: 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent)',
                                            borderRadius: '4px'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: '36px 24px',
                                                background: '#f5f4f0',
                                                borderRadius: '3px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '28px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "'Space Mono', monospace",
                                                                fontSize: '8px',
                                                                letterSpacing: '0.3em',
                                                                color: '#8B7355'
                                                            },
                                                            children: "A DESTINY SEALED"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1895,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "'Space Mono', monospace",
                                                                fontSize: '8px',
                                                                letterSpacing: '0.3em',
                                                                color: '#8B7355'
                                                            },
                                                            children: "BAIZE PACTZO"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1898,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1894,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "'Space Mono', monospace",
                                                        fontSize: '9px',
                                                        letterSpacing: '0.2em',
                                                        color: '#8B7355',
                                                        marginBottom: '6px'
                                                    },
                                                    children: best.breed.nameEn?.toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1902,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "'Noto Serif SC', serif",
                                                        fontSize: '28px',
                                                        fontWeight: 700,
                                                        color: '#1A2E2A',
                                                        letterSpacing: '0.1em',
                                                        marginBottom: '16px'
                                                    },
                                                    children: best.breed.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1905,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "'Times New Roman', serif",
                                                        fontSize: '24px',
                                                        color: '#1A1A1A',
                                                        marginBottom: '16px'
                                                    },
                                                    children: [
                                                        best.scores.total,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1908,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '100%',
                                                        height: '1px',
                                                        backgroundColor: 'rgba(0,0,0,0.06)',
                                                        marginBottom: '16px'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1911,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "'Noto Serif SC', serif",
                                                        fontSize: '11px',
                                                        color: '#4a4a4a',
                                                        lineHeight: 1.8
                                                    },
                                                    children: wisdom.quote
                                                }, void 0, false, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1912,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1889,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1883,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1856,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: [
                                        (sharePhase === 'summoning' || sharePhase === 'quoting' || sharePhase === 'glowing') && !shareCardUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.6
                                            },
                                            className: "mt-6 tracking-[0.2em]",
                                            style: {
                                                fontFamily: "'Times New Roman', serif",
                                                fontStyle: 'italic',
                                                fontSize: '13px',
                                                color: 'rgba(255,255,255,0.4)'
                                            },
                                            children: [
                                                sharePhase === 'summoning' && 'Summoning your destiny...',
                                                sharePhase === 'quoting' && 'Recording the bond...',
                                                sharePhase === 'glowing' && 'Sealing the moment...'
                                            ]
                                        }, "ritual-text", true, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1923,
                                            columnNumber: 19
                                        }, this),
                                        sharePhase === 'card-ready' && !shareCardUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: [
                                                    0.3,
                                                    0.7,
                                                    0.3
                                                ]
                                            },
                                            transition: {
                                                duration: 1.4,
                                                repeat: Infinity
                                            },
                                            className: "mt-6",
                                            style: {
                                                fontFamily: "'Space Mono', monospace",
                                                fontSize: '10px',
                                                letterSpacing: '0.3em',
                                                color: 'rgba(255,255,255,0.3)'
                                            },
                                            children: "GENERATING..."
                                        }, "generating", false, {
                                            fileName: "[project]/app/result/page.tsx",
                                            lineNumber: 1938,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1921,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: sharePhase === 'card-ready' && shareCardUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 16
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.6,
                                            delay: 0.2
                                        },
                                        className: "flex flex-col items-center mt-8 w-full",
                                        style: {
                                            maxWidth: '280px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleDownloadCard,
                                                className: "w-full py-3 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)]",
                                                style: {
                                                    fontFamily: "'PingFang SC', 'Hiragino Sans GB', serif",
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    letterSpacing: '0.3em',
                                                    backgroundColor: '#ffffff',
                                                    color: '#000000',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)'
                                                },
                                                children: "保存图片"
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 1962,
                                                columnNumber: 21
                                            }, this),
                                            (()=>{
                                                const destinyId = generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id);
                                                const rarity = RARITY_LABEL[getRarityLevel(best.breed.category)].cn;
                                                // 小红书/微博 中文富文案
                                                const shareTextFull = `【百澤灵宠匹配】五行缘分测试 ✨\n\n我的命定灵宠是 ${wisdom.element}行 · ${best.breed.name}\n契合度 ${best.scores.total}% · ${rarity}\n\n"${best.emotionalSummary}"\n\n${wisdom.chinese}\n\n测出你的灵宠 → pactzo.com\n\n#百澤 #宠物匹配 #五行缘分 #${best.breed.name} #灵宠`;
                                                // X 推文简版（字数限制）
                                                const shareTextX = `${wisdom.element} · ${best.breed.name} — ${best.scores.total}% soul match\n"${best.emotionalSummary.slice(0, 50)}..."\n\npactzo.com`;
                                                const u = encodeURIComponent('https://pactzo.com');
                                                const tX = encodeURIComponent(shareTextX);
                                                const tWeibo = encodeURIComponent(shareTextFull);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex gap-6",
                                                    style: {
                                                        fontFamily: "'Space Mono', monospace",
                                                        fontSize: '12px',
                                                        letterSpacing: '0.2em',
                                                        color: 'rgba(255,255,255,0.8)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `https://twitter.com/intent/tweet?text=${tX}&url=${u}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "hover:text-white/60 transition-colors cursor-pointer",
                                                            children: "X"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1993,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `https://service.weibo.com/share/share.php?title=${tWeibo}&url=${u}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "hover:text-white/60 transition-colors cursor-pointer",
                                                            children: "Weibo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1994,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "hover:text-white/60 transition-colors cursor-pointer",
                                                            onClick: ()=>handleCopyText(shareTextFull, 1),
                                                            children: copiedIndex === 1 ? 'Copied ✓' : 'Copy'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/result/page.tsx",
                                                            lineNumber: 1995,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/result/page.tsx",
                                                    lineNumber: 1992,
                                                    columnNumber: 25
                                                }, this);
                                            })(),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "'Space Mono', monospace",
                                                            fontSize: '12px',
                                                            letterSpacing: '0.15em',
                                                            color: 'rgba(255,255,255,0.7)'
                                                        },
                                                        children: generateDestinyId(birthYear, birthMonth, birthDay, best.breed.id)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 2007,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-0.5",
                                                        style: {
                                                            fontFamily: "'Space Mono', monospace",
                                                            fontSize: '10px',
                                                            letterSpacing: '0.2em',
                                                            color: getRarityLevel(best.breed.category) === 'LEGENDARY' ? '#c9a87c' : 'rgba(255,255,255,0.7)',
                                                            border: `0.5px solid ${getRarityLevel(best.breed.category) === 'LEGENDARY' ? 'rgba(201,168,124,0.4)' : 'rgba(255,255,255,0.35)'}`
                                                        },
                                                        children: RARITY_LABEL[getRarityLevel(best.breed.category)].en
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/result/page.tsx",
                                                        lineNumber: 2010,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 2006,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-6 mb-2",
                                                style: {
                                                    fontFamily: "'Times New Roman', serif",
                                                    fontStyle: 'italic',
                                                    fontSize: '13px',
                                                    color: 'rgba(255,255,255,0.6)',
                                                    letterSpacing: '0.05em'
                                                },
                                                children: "Your destiny is now recorded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/result/page.tsx",
                                                lineNumber: 2025,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/result/page.tsx",
                                        lineNumber: 1954,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/result/page.tsx",
                                    lineNumber: 1952,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/result/page.tsx",
                            lineNumber: 1835,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/result/page.tsx",
                    lineNumber: 1816,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/result/page.tsx",
                lineNumber: 1814,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/result/page.tsx",
        lineNumber: 357,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b7d072c._.js.map