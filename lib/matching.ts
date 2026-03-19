/**
 * 宠物匹配算法 v2
 * 
 * @context 四维匹配模型：五行 + 天时 + 地利 + 人和
 * @version 2.0.0
 * 
 * 权重分配：
 * - 五行 20%：命理契合度
 * - 天时 20%：作息 + 精力
 * - 地利 25%：空间 + 稳定性
 * - 人和 35%：陪伴 + 情感 + 责任
 */

import type { 
  WuxingElement, 
  UserProfile, 
  PetCategory,
  TianshiProfile,
  DiliProfile,
  RenheProfile,
  MatchReason,
} from '@/hooks/useTestStore';
import { PetBreed, getBreedsByCategory, getAllBreeds } from './pet-database';

// ===== 配置常量 =====

/** 四维权重配置 */
const WEIGHTS = {
  wuxing: 0.20,    // 五行权重
  tianshi: 0.20,   // 天时权重
  dili: 0.25,      // 地利权重
  renhe: 0.35,     // 人和权重（最重要）
};

/** 天时子维度权重 */
const TIANSHI_WEIGHTS = {
  schedule: 0.5,   // 作息
  energy: 0.5,     // 精力
};

/** 地利子维度权重 */
const DILI_WEIGHTS = {
  space: 0.6,      // 空间（更重要）
  stability: 0.4,  // 稳定性
};

/** 人和子维度权重 */
const RENHE_WEIGHTS = {
  companion: 0.35,     // 陪伴需求
  attachment: 0.35,    // 情感依赖
  responsibility: 0.30, // 责任意愿
};

/** 五行关系分数 */
const WUXING_SCORES = {
  generate: 95,  // 相生
  same: 85,      // 同属
  neutral: 75,   // 无关
  restrain: 60,  // 相克
};

// ===== 五行关系表 =====

/** 相生关系：A生B */
const WUXING_GENERATE: Record<WuxingElement, WuxingElement> = {
  metal: 'water', // 金生水
  water: 'wood',  // 水生木
  wood: 'fire',   // 木生火
  fire: 'earth',  // 火生土
  earth: 'metal', // 土生金
};

/** 相克关系：A克B */
const WUXING_RESTRAIN: Record<WuxingElement, WuxingElement> = {
  metal: 'wood',  // 金克木
  wood: 'earth',  // 木克土
  earth: 'water', // 土克水
  water: 'fire',  // 水克火
  fire: 'metal',  // 火克金
};

// ===== 核心算法 =====

/**
 * 计算五行匹配分数
 */
function calculateWuxingScore(userWuxing: WuxingElement, petWuxing: WuxingElement): number {
  // 同属性
  if (userWuxing === petWuxing) {
    return WUXING_SCORES.same;
  }
  
  // 用户生宠物（用户的五行生宠物的五行）
  if (WUXING_GENERATE[userWuxing] === petWuxing) {
    return WUXING_SCORES.generate;
  }
  
  // 宠物生用户（宠物的五行生用户的五行）
  if (WUXING_GENERATE[petWuxing] === userWuxing) {
    return WUXING_SCORES.generate;
  }
  
  // 用户克宠物
  if (WUXING_RESTRAIN[userWuxing] === petWuxing) {
    return WUXING_SCORES.restrain;
  }
  
  // 宠物克用户
  if (WUXING_RESTRAIN[petWuxing] === userWuxing) {
    return WUXING_SCORES.restrain;
  }
  
  // 无关
  return WUXING_SCORES.neutral;
}

/**
 * 获取五行关系描述
 */
function getWuxingRelation(userWuxing: WuxingElement, petWuxing: WuxingElement): string {
  if (userWuxing === petWuxing) {
    return '同属';
  }
  if (WUXING_GENERATE[userWuxing] === petWuxing || WUXING_GENERATE[petWuxing] === userWuxing) {
    return '相生';
  }
  if (WUXING_RESTRAIN[userWuxing] === petWuxing || WUXING_RESTRAIN[petWuxing] === userWuxing) {
    return '相克';
  }
  return '无关';
}

/**
 * 计算天时匹配分数
 */
function calculateTianshiScore(tianshi: TianshiProfile, pet: PetBreed): number {
  const scheduleMatch = 1 - Math.abs(tianshi.schedule - pet.schedule) / 2;
  const energyMatch = 1 - Math.abs(tianshi.energy - pet.energy) / 2;
  
  const score = (
    scheduleMatch * TIANSHI_WEIGHTS.schedule +
    energyMatch * TIANSHI_WEIGHTS.energy
  ) * 100;
  
  return score;
}

/**
 * 计算地利匹配分数
 */
function calculateDiliScore(dili: DiliProfile, pet: PetBreed): number {
  const spaceMatch = 1 - Math.abs(dili.space - pet.space) / 2;
  const stabilityMatch = 1 - Math.abs(dili.stability - pet.stability) / 2;
  
  const score = (
    spaceMatch * DILI_WEIGHTS.space +
    stabilityMatch * DILI_WEIGHTS.stability
  ) * 100;
  
  return score;
}

/**
 * 计算人和匹配分数
 */
function calculateRenheScore(renhe: RenheProfile, pet: PetBreed): number {
  const companionMatch = 1 - Math.abs(renhe.companion - pet.companion) / 2;
  const attachmentMatch = 1 - Math.abs(renhe.attachment - pet.attachment) / 2;
  const responsibilityMatch = 1 - Math.abs(renhe.responsibility - pet.responsibility) / 2;
  
  const score = (
    companionMatch * RENHE_WEIGHTS.companion +
    attachmentMatch * RENHE_WEIGHTS.attachment +
    responsibilityMatch * RENHE_WEIGHTS.responsibility
  ) * 100;
  
  return score;
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
} {
  const wuxingScore = calculateWuxingScore(userWuxing, pet.wuxing);
  const tianshiScore = calculateTianshiScore(userProfile.tianshi, pet);
  const diliScore = calculateDiliScore(userProfile.dili, pet);
  const renheScore = calculateRenheScore(userProfile.renhe, pet);
  
  const totalScore = 
    wuxingScore * WEIGHTS.wuxing + 
    tianshiScore * WEIGHTS.tianshi +
    diliScore * WEIGHTS.dili +
    renheScore * WEIGHTS.renhe;
  
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
  reasons.push({
    dimension: 'tianshi',
    text: tianshiText,
    score: tianshiScore,
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
    score: diliScore,
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
    score: renheScore,
  });
  
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
function generateEmotionalSummary(pet: PetBreed, totalScore: number): string {
  // 从宠物的模板中随机选择一个
  const templates = pet.emotionalTemplates;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template;
}

/**
 * 获取指定类型的最佳匹配
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
    const emotionalSummary = generateEmotionalSummary(breed, scores.total);
    
    return {
      breed,
      scores,
      matchReasons,
      emotionalSummary,
    };
  });
  
  // 按总分排序
  return results.sort((a, b) => b.scores.total - a.scores.total);
}

/**
 * 获取所有类型的最佳匹配（跨类推荐）
 */
export function matchAllPets(
  userWuxing: WuxingElement,
  userProfile: UserProfile
): MatchResult[] {
  const breeds = getAllBreeds();
  
  const results: MatchResult[] = breeds.map((breed) => {
    const scores = calculateTotalScore(userWuxing, userProfile, breed);
    const matchReasons = generateMatchReasons(userWuxing, userProfile, breed);
    const emotionalSummary = generateEmotionalSummary(breed, scores.total);
    
    return {
      breed,
      scores,
      matchReasons,
      emotionalSummary,
    };
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
  };
  return icons[dimension];
}
