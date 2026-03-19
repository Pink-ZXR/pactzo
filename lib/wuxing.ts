import { WuxingElement } from '@/hooks/useTestStore';

// 天干
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干对应五行
const TIAN_GAN_WUXING: Record<string, WuxingElement> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
};

// 地支对应五行
const DI_ZHI_WUXING: Record<string, WuxingElement> = {
  '子': 'water', '亥': 'water',
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '丑': 'earth', '辰': 'earth', '未': 'earth', '戌': 'earth',
  '申': 'metal', '酉': 'metal',
};

// 五行名称
export const WUXING_NAMES: Record<WuxingElement, string> = {
  metal: '金',
  wood: '木',
  water: '水',
  fire: '火',
  earth: '土',
};

// 五行描述
export const WUXING_DESCRIPTIONS: Record<WuxingElement, string> = {
  metal: '金主义，代表收敛、肃杀、坚毅。金命之人性格刚毅果断，做事有条理，讲究原则，适合与温顺体贴的宠物相伴。',
  wood: '木主仁，代表生发、条达、舒展。木命之人性格温和有爱心，富有同情心，喜欢照顾他人，适合与活泼好动的宠物相伴。',
  water: '水主智，代表润下、寒凉、闭藏。水命之人聪明灵活，善于应变，内心细腻，适合与聪明独立的宠物相伴。',
  fire: '火主礼，代表炎上、明亮、热情。火命之人热情开朗，积极向上，充满活力，适合与热情粘人的宠物相伴。',
  earth: '土主信，代表稳重、承载、包容。土命之人稳重踏实，诚信可靠，包容心强，适合与温和稳重的宠物相伴。',
};

// 简化的公历年份转天干地支（仅用于娱乐，非真实命理计算）
export function getYearGanZhi(year: number): { gan: string; zhi: string } {
  // 以1984年(甲子年)为基准
  const baseYear = 1984;
  const offset = year - baseYear;
  
  const ganIndex = ((offset % 10) + 10) % 10;
  const zhiIndex = ((offset % 12) + 12) % 12;
  
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex],
  };
}

// 根据月份获取大致的月柱（简化版）
export function getMonthGanZhi(year: number, month: number): { gan: string; zhi: string } {
  // 地支：正月寅，二月卯...
  const monthZhiMap = [
    '寅', '卯', '辰', '巳', '午', '未', 
    '申', '酉', '戌', '亥', '子', '丑'
  ];
  
  const zhi = monthZhiMap[(month - 1) % 12];
  
  // 天干根据年干推算（简化）
  const yearGan = getYearGanZhi(year).gan;
  const yearGanIndex = TIAN_GAN.indexOf(yearGan);
  const monthGanBase = ((yearGanIndex % 5) * 2 + 2) % 10;
  const ganIndex = (monthGanBase + month - 1) % 10;
  
  return {
    gan: TIAN_GAN[ganIndex],
    zhi,
  };
}

// 计算主要五行属性（基于年月综合分析）
export function calculateWuxing(year: number, month: number, day: number): WuxingElement {
  const yearGanZhi = getYearGanZhi(year);
  const monthGanZhi = getMonthGanZhi(year, month);
  
  // 收集五行权重
  const wuxingWeights: Record<WuxingElement, number> = {
    metal: 0,
    wood: 0,
    water: 0,
    fire: 0,
    earth: 0,
  };
  
  // 年柱五行（权重较高）
  wuxingWeights[TIAN_GAN_WUXING[yearGanZhi.gan]] += 3;
  wuxingWeights[DI_ZHI_WUXING[yearGanZhi.zhi]] += 2;
  
  // 月柱五行
  wuxingWeights[TIAN_GAN_WUXING[monthGanZhi.gan]] += 2;
  wuxingWeights[DI_ZHI_WUXING[monthGanZhi.zhi]] += 1;
  
  // 根据日期补充（简化算法）
  const dayWuxing: WuxingElement[] = ['metal', 'wood', 'water', 'fire', 'earth'];
  wuxingWeights[dayWuxing[(day - 1) % 5]] += 1;
  
  // 找出权重最高的五行
  let maxWeight = 0;
  let dominantElement: WuxingElement = 'earth';
  
  for (const [element, weight] of Object.entries(wuxingWeights)) {
    if (weight > maxWeight) {
      maxWeight = weight;
      dominantElement = element as WuxingElement;
    }
  }
  
  return dominantElement;
}

// 获取五行详细信息
export function getWuxingInfo(element: WuxingElement) {
  return {
    element,
    name: WUXING_NAMES[element],
    description: WUXING_DESCRIPTIONS[element],
  };
}
