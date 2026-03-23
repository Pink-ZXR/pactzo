'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// ===== 基础类型 =====

export interface BirthDate {
  year: number;
  month: number;
  day: number;
  hour?: number;
}

export type WuxingElement = 'metal' | 'wood' | 'water' | 'fire' | 'earth';

// 宠物大类（9类）
export type PetCategory = 'cat' | 'dog' | 'rabbit' | 'small' | 'bird' | 'reptile' | 'fish' | 'amphibian' | 'exotic';

// ===== 四维模型类型 =====

// 天时（时间/精力）
export interface TianshiProfile {
  schedule: 1 | 2 | 3;    // 作息：1=夜猫子, 2=随性, 3=早起
  energy: 1 | 2 | 3;      // 精力：1=容易疲惫, 2=适中, 3=精力充沛
}

// 地利（空间/环境）
export interface DiliProfile {
  space: 1 | 2 | 3;       // 空间：1=小户型, 2=中等有阳台, 3=大空间有院子
  stability: 1 | 2 | 3;   // 稳定：1=经常变动, 2=可能搬家, 3=长期稳定
}

// 人和（关系/需求）
export interface RenheProfile {
  companion: 1 | 2 | 3;      // 陪伴：1=安静相处, 2=适度陪伴, 3=热情互动
  attachment: 1 | 2 | 3;     // 情感：1=保持距离, 2=平等关系, 3=希望被需要
  responsibility: 1 | 2 | 3; // 责任：1=尽量省心, 2=适度付出, 3=愿意高投入
}

// 外观偏好
export interface AppearanceProfile {
  furPreference: 0 | 1 | 2 | 3;    // 0=无所谓, 1=毛茸茸, 2=光滑短毛, 3=无毛/特殊
  colorPreference: 0 | 1 | 2 | 3 | 4; // 0=无所谓, 1=暖色, 2=冷色, 3=经典黑白, 4=多彩
  sizePreference: 0 | 1 | 2 | 3 | 4;  // 0=无所谓, 1=迷你, 2=小型, 3=中型, 4=大型
}

// 完整用户画像
export interface UserProfile {
  tianshi: TianshiProfile;
  dili: DiliProfile;
  renhe: RenheProfile;
  appearance?: AppearanceProfile; // 外观偏好（可选）
  climate?: 'north' | 'south' | 'other'; // 预留：气候（暂不启用）
}

// ===== 结果类型 =====

export interface MatchReason {
  dimension: 'wuxing' | 'tianshi' | 'dili' | 'renhe' | 'appearance';
  text: string;
}

export interface TestResult {
  wuxingElement: WuxingElement;
  wuxingDescription: string;
  // 最佳匹配
  recommendedPet: {
    id: string;
    name: string;
    nameEn: string;
    category: PetCategory;
    categoryName: string;
    description: string;
    traits: string[];
  };
  // 匹配分数
  matchScore: {
    total: number;
    wuxing: number;
    tianshi: number;
    dili: number;
    renhe: number;
    appearance?: number;
  };
  // 3条匹配原因
  matchReasons: [MatchReason, MatchReason, MatchReason];
  // 情绪化总结
  emotionalSummary: string;
  // 其他候选
  alternatives: Array<{
    id: string;
    name: string;
    category: PetCategory;
    score: number;
  }>;
}

// ===== 旧版兼容（逐步废弃）=====
export type PetType = PetCategory;
export type LifeRhythm = 'early' | 'night' | 'flexible';
export type CompanionStyle = 'quiet' | 'active' | 'caring';
export type LivingSpace = 'apartment' | 'garden' | 'mobile';
export interface PersonalityProfile {
  lifeRhythm: LifeRhythm;
  companionStyle: CompanionStyle;
  livingSpace: LivingSpace;
}

// ===== 状态管理 =====

interface TestState {
  birthDate: BirthDate | null;
  userProfile: UserProfile | null;
  petCategory: PetCategory | null;
  result: TestResult | null;
  currentStep: number;
  // 旧版兼容
  personality: PersonalityProfile | null;
  petType: PetType | null;
}

interface TestContextType extends TestState {
  setBirthDate: (date: BirthDate) => void;
  setUserProfile: (profile: UserProfile) => void;
  setTianshi: (tianshi: TianshiProfile) => void;
  setDili: (dili: DiliProfile) => void;
  setRenhe: (renhe: RenheProfile) => void;
  setAppearance: (appearance: AppearanceProfile) => void;
  setPetCategory: (category: PetCategory | null) => void;
  setResult: (result: TestResult) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
  // 旧版兼容
  setPersonality: (profile: PersonalityProfile) => void;
  setPetType: (type: PetType) => void;
}

const initialState: TestState = {
  birthDate: null,
  userProfile: null,
  petCategory: null,
  result: null,
  currentStep: 1,
  personality: null,
  petType: null,
};

const TestContext = createContext<TestContextType | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TestState>(initialState);

  const setBirthDate = (date: BirthDate) => {
    setState((prev) => ({ ...prev, birthDate: date }));
  };

  const setUserProfile = (profile: UserProfile) => {
    setState((prev) => ({ ...prev, userProfile: profile }));
  };

  const setTianshi = (tianshi: TianshiProfile) => {
    setState((prev) => ({
      ...prev,
      userProfile: prev.userProfile
        ? { ...prev.userProfile, tianshi }
        : { tianshi, dili: { space: 2, stability: 2 }, renhe: { companion: 2, attachment: 2, responsibility: 2 } },
    }));
  };

  const setDili = (dili: DiliProfile) => {
    setState((prev) => ({
      ...prev,
      userProfile: prev.userProfile
        ? { ...prev.userProfile, dili }
        : { tianshi: { schedule: 2, energy: 2 }, dili, renhe: { companion: 2, attachment: 2, responsibility: 2 } },
    }));
  };

  const setRenhe = (renhe: RenheProfile) => {
    setState((prev) => ({
      ...prev,
      userProfile: prev.userProfile
        ? { ...prev.userProfile, renhe }
        : { tianshi: { schedule: 2, energy: 2 }, dili: { space: 2, stability: 2 }, renhe },
    }));
  };

  const setAppearance = (appearance: AppearanceProfile) => {
    setState((prev) => ({
      ...prev,
      userProfile: prev.userProfile
        ? { ...prev.userProfile, appearance }
        : { tianshi: { schedule: 2, energy: 2 }, dili: { space: 2, stability: 2 }, renhe: { companion: 2, attachment: 2, responsibility: 2 }, appearance },
    }));
  };

  const setPetCategory = (category: PetCategory | null) => {
    setState((prev) => ({ ...prev, petCategory: category, petType: category }));
  };

  const setResult = (result: TestResult) => {
    setState((prev) => ({ ...prev, result }));
  };

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const reset = () => {
    setState(initialState);
  };

  // 旧版兼容
  const setPersonality = (profile: PersonalityProfile) => {
    setState((prev) => ({ ...prev, personality: profile }));
  };

  const setPetType = (type: PetType) => {
    setState((prev) => ({ ...prev, petType: type, petCategory: type as PetCategory }));
  };

  return (
    <TestContext.Provider
      value={{
        ...state,
        setBirthDate,
        setUserProfile,
        setTianshi,
        setDili,
        setRenhe,
        setAppearance,
        setPetCategory,
        setResult,
        setCurrentStep,
        reset,
        setPersonality,
        setPetType,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
