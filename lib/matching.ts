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
 */

import type { 
  WuxingElement, 
  UserProfile, 
  PetCategory,
  TianshiProfile,
  DiliProfile,
  RenheProfile,
  AppearanceProfile,
  MatchReason,
} from '@/hooks/useTestStore';
import { PetBreed, FurType, PetSize, getBreedsByCategory, getAllBreeds } from './pet-database';

// ===== 配置常量 =====

/** 五维权重配置（有外观偏好） */
const WEIGHTS_5D = {
  wuxing: 0.15,
  tianshi: 0.18,
  dili: 0.22,
  renhe: 0.30,
  appearance: 0.15,
};

/** 四维权重配置（无外观偏好） */
const WEIGHTS_4D = {
  wuxing: 0.20,
  tianshi: 0.20,
  dili: 0.25,
  renhe: 0.35,
};

/** 天时子维度权重 */
const TIANSHI_WEIGHTS = {
  schedule: 0.5,
  energy: 0.5,
};

/** 地利子维度权重 */
const DILI_WEIGHTS = {
  space: 0.6,
  stability: 0.4,
};

/** 人和子维度权重 */
const RENHE_WEIGHTS = {
  companion: 0.35,
  attachment: 0.35,
  responsibility: 0.30,
};

/** 外观子维度权重 */
const APPEARANCE_WEIGHTS = {
  fur: 0.35,
  color: 0.35,
  size: 0.30,
};

/** 五行关系分数 */
const WUXING_SCORES = {
  generate: 95,
  same: 85,
  neutral: 75,
  restrain: 60,
};

// ===== 五行关系表 =====

const WUXING_GENERATE: Record<WuxingElement, WuxingElement> = {
  metal: 'water',
  water: 'wood',
  wood: 'fire',
  fire: 'earth',
  earth: 'metal',
};

const WUXING_RESTRAIN: Record<WuxingElement, WuxingElement> = {
  metal: 'wood',
  wood: 'earth',
  earth: 'water',
  water: 'fire',
  fire: 'metal',
};

// ===== 外观匹配映射 =====

/** 毛发偏好映射：用户选择 → 匹配的宠物 furType */
const FUR_PREFERENCE_MAP: Record<number, FurType[]> = {
  1: ['long', 'wool'],          // 毛茸茸
  2: ['short'],                  // 光滑短毛
  3: ['hairless', 'scale', 'feather', 'shell', 'quill', 'none'], // 特殊
};

/** 颜色偏好映射：用户选择 → 匹配的 colorTags */
const COLOR_PREFERENCE_MAP: Record<number, string[]> = {
  1: ['橘黄', '棕色', '金色', '红色', '粉色'],  // 暖色
  2: ['灰色', '蓝色', '银色', '绿色'],          // 冷色
  3: ['黑色', '白色'],                           // 经典黑白
  4: ['多彩', '斑纹'],                           // 多彩
};

/** 体型偏好映射：用户选择 → 匹配的 PetSize */
const SIZE_PREFERENCE_MAP: Record<number, PetSize[]> = {
  1: ['tiny'],
  2: ['small'],
  3: ['medium'],
  4: ['large'],
};

// ===== 核心算法 =====

function calculateWuxingScore(userWuxing: WuxingElement, petWuxing: WuxingElement): number {
  if (userWuxing === petWuxing) return WUXING_SCORES.same;
  if (WUXING_GENERATE[userWuxing] === petWuxing) return WUXING_SCORES.generate;
  if (WUXING_GENERATE[petWuxing] === userWuxing) return WUXING_SCORES.generate;
  if (WUXING_RESTRAIN[userWuxing] === petWuxing) return WUXING_SCORES.restrain;
  if (WUXING_RESTRAIN[petWuxing] === userWuxing) return WUXING_SCORES.restrain;
  return WUXING_SCORES.neutral;
}

function getWuxingRelation(userWuxing: WuxingElement, petWuxing: WuxingElement): string {
  if (userWuxing === petWuxing) return '同属';
  if (WUXING_GENERATE[userWuxing] === petWuxing || WUXING_GENERATE[petWuxing] === userWuxing) return '相生';
  if (WUXING_RESTRAIN[userWuxing] === petWuxing || WUXING_RESTRAIN[petWuxing] === userWuxing) return '相克';
  return '无关';
}

function calculateTianshiScore(tianshi: TianshiProfile, pet: PetBreed): number {
  const scheduleMatch = 1 - Math.abs(tianshi.schedule - pet.schedule) / 2;
  const energyMatch = 1 - Math.abs(tianshi.energy - pet.energy) / 2;
  return (scheduleMatch * TIANSHI_WEIGHTS.schedule + energyMatch * TIANSHI_WEIGHTS.energy) * 100;
}

function calculateDiliScore(dili: DiliProfile, pet: PetBreed): number {
  const spaceMatch = 1 - Math.abs(dili.space - pet.space) / 2;
  const stabilityMatch = 1 - Math.abs(dili.stability - pet.stability) / 2;
  return (spaceMatch * DILI_WEIGHTS.space + stabilityMatch * DILI_WEIGHTS.stability) * 100;
}

function calculateRenheScore(renhe: RenheProfile, pet: PetBreed): number {
  const companionMatch = 1 - Math.abs(renhe.companion - pet.companion) / 2;
  const attachmentMatch = 1 - Math.abs(renhe.attachment - pet.attachment) / 2;
  const responsibilityMatch = 1 - Math.abs(renhe.responsibility - pet.responsibility) / 2;
  return (
    companionMatch * RENHE_WEIGHTS.companion +
    attachmentMatch * RENHE_WEIGHTS.attachment +
    responsibilityMatch * RENHE_WEIGHTS.responsibility
  ) * 100;
}

/**
 * 计算外观匹配分数
 */
function calculateAppearanceScore(appearance: AppearanceProfile, pet: PetBreed): number {
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
    const hasMatch = pet.colorTags.some(tag => matchedColors.includes(tag));
    colorScore = hasMatch ? 95 : 55;
  }

  // 体型匹配
  if (appearance.sizePreference !== 0) {
    const matchedSizes = SIZE_PREFERENCE_MAP[appearance.sizePreference] || [];
    sizeScore = matchedSizes.includes(pet.size) ? 95 : 55;
  }

  return (
    furScore * APPEARANCE_WEIGHTS.fur +
    colorScore * APPEARANCE_WEIGHTS.color +
    sizeScore * APPEARANCE_WEIGHTS.size
  );
}

/**
 * 判断是否有有效的外观偏好
 */
function hasAppearancePreference(appearance?: AppearanceProfile): boolean {
  if (!appearance) return false;
  return appearance.furPreference !== 0 || appearance.colorPreference !== 0 || appearance.sizePreference !== 0;
}

/**
 * 计算总匹配分数
 */
function calculateTotalScore(
  userWuxing: WuxingElement,
  userProfile: UserProfile,
  pet: PetBreed
): {
  total: number;
  wuxing: number;
  tianshi: number;
  dili: number;
  renhe: number;
  appearance?: number;
} {
  const wuxingScore = calculateWuxingScore(userWuxing, pet.wuxing);
  const tianshiScore = calculateTianshiScore(userProfile.tianshi, pet);
  const diliScore = calculateDiliScore(userProfile.dili, pet);
  const renheScore = calculateRenheScore(userProfile.renhe, pet);

  const useAppearance = hasAppearancePreference(userProfile.appearance);

  if (useAppearance && userProfile.appearance) {
    const appearanceScore = calculateAppearanceScore(userProfile.appearance, pet);
    const totalScore =
      wuxingScore * WEIGHTS_5D.wuxing +
      tianshiScore * WEIGHTS_5D.tianshi +
      diliScore * WEIGHTS_5D.dili +
      renheScore * WEIGHTS_5D.renhe +
      appearanceScore * WEIGHTS_5D.appearance;

    return {
      total: Math.round(totalScore),
      wuxing: Math.round(wuxingScore),
      tianshi: Math.round(tianshiScore),
      dili: Math.round(diliScore),
      renhe: Math.round(renheScore),
      appearance: Math.round(appearanceScore),
    };
  }

  // 无外观偏好，回归四维
  const totalScore =
    wuxingScore * WEIGHTS_4D.wuxing +
    tianshiScore * WEIGHTS_4D.tianshi +
    diliScore * WEIGHTS_4D.dili +
    renheScore * WEIGHTS_4D.renhe;

  return {
    total: Math.round(totalScore),
    wuxing: Math.round(wuxingScore),
    tianshi: Math.round(tianshiScore),
    dili: Math.round(diliScore),
    renhe: Math.round(renheScore),
  };
}

// ===== 匹配结果类型 =====

export interface MatchResult {
  breed: PetBreed;
  scores: {
    total: number;
    wuxing: number;
    tianshi: number;
    dili: number;
    renhe: number;
    appearance?: number;
  };
  matchReasons: [MatchReason, MatchReason, MatchReason];
  emotionalSummary: string;
}

/**
 * 生成3条匹配原因
 */
function generateMatchReasons(
  userWuxing: WuxingElement,
  userProfile: UserProfile,
  pet: PetBreed
): [MatchReason, MatchReason, MatchReason] {
  const reasons: { dimension: MatchReason['dimension']; text: string; score: number }[] = [];

  // 五行原因
  const wuxingRelation = getWuxingRelation(userWuxing, pet.wuxing);
  const wuxingTexts: Record<string, string> = {
    '相生': `你们五行相生，${pet.name}能为你带来好运与和谐`,
    '同属': `你们五行同属，气质相近，容易产生默契`,
    '无关': `五行互不干扰，相处会比较轻松自在`,
    '相克': `虽然五行相克，但互补也是一种平衡`,
  };
  reasons.push({
    dimension: 'wuxing',
    text: wuxingTexts[wuxingRelation],
    score: calculateWuxingScore(userWuxing, pet.wuxing),
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
  reasons.push({ dimension: 'tianshi', text: tianshiText, score: tianshiScore });

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
  reasons.push({ dimension: 'dili', text: diliText, score: diliScore });

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
  reasons.push({ dimension: 'renhe', text: renheText, score: renheScore });

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
    reasons.push({ dimension: 'appearance', text: appearanceText, score: appearanceScore });
  }

  // 按分数排序，选择分数最高的3个
  reasons.sort((a, b) => b.score - a.score);

  return [
    { dimension: reasons[0].dimension, text: reasons[0].text },
    { dimension: reasons[1].dimension, text: reasons[1].text },
    { dimension: reasons[2].dimension, text: reasons[2].text },
  ];
}

/**
 * 生成情绪化总结
 */
function generateEmotionalSummary(pet: PetBreed): string {
  const templates = pet.emotionalTemplates;
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * 获取指定类型的最佳匹配（返回Top3）
 */
export function matchPetByCategory(
  category: PetCategory,
  userWuxing: WuxingElement,
  userProfile: UserProfile
): MatchResult[] {
  const breeds = getBreedsByCategory(category);

  const results: MatchResult[] = breeds.map((breed) => {
    const scores = calculateTotalScore(userWuxing, userProfile, breed);
    const matchReasons = generateMatchReasons(userWuxing, userProfile, breed);
    const emotionalSummary = generateEmotionalSummary(breed);

    return { breed, scores, matchReasons, emotionalSummary };
  });

  return results.sort((a, b) => b.scores.total - a.scores.total);
}

/**
 * 获取所有类型的最佳匹配（跨类推荐，返回Top3）
 */
export function matchAllPets(
  userWuxing: WuxingElement,
  userProfile: UserProfile
): MatchResult[] {
  const breeds = getAllBreeds();

  const results: MatchResult[] = breeds.map((breed) => {
    const scores = calculateTotalScore(userWuxing, userProfile, breed);
    const matchReasons = generateMatchReasons(userWuxing, userProfile, breed);
    const emotionalSummary = generateEmotionalSummary(breed);

    return { breed, scores, matchReasons, emotionalSummary };
  });

  return results.sort((a, b) => b.scores.total - a.scores.total);
}

/**
 * 获取匹配度描述
 */
export function getMatchDescription(score: number): string {
  if (score >= 90) return '天作之合';
  if (score >= 80) return '非常契合';
  if (score >= 70) return '相当适合';
  if (score >= 60) return '比较合适';
  return '可以尝试';
}

/**
 * 获取维度名称
 */
export function getDimensionName(dimension: MatchReason['dimension']): string {
  const names: Record<MatchReason['dimension'], string> = {
    wuxing: '五行契合',
    tianshi: '天时相应',
    dili: '地利相宜',
    renhe: '人和相合',
    appearance: '外观契合',
  };
  return names[dimension];
}

/**
 * 获取维度图标
 */
export function getDimensionIcon(dimension: MatchReason['dimension']): string {
  const icons: Record<MatchReason['dimension'], string> = {
    wuxing: '☯',
    tianshi: '🕐',
    dili: '🏠',
    renhe: '💝',
    appearance: '🎨',
  };
  return icons[dimension];
}
