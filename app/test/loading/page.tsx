'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTest } from '@/hooks/useTestStore';
import { calculateWuxing, getWuxingInfo } from '@/lib/wuxing';
import { matchPetByCategory, matchAllPets } from '@/lib/matching';
import type { TestResult, UserProfile, PetCategory, BirthDate } from '@/hooks/useTestStore';

/**
 * 极简风格 - 加载页
 * 从 sessionStorage 读取数据，执行匹配算法并存储结果
 */

const loadingSteps = [
  { en: 'ANALYZING WUXING', zh: '解析五行属性' },
  { en: 'READING TIANSHI', zh: '推算天时' },
  { en: 'CALCULATING DILI', zh: '测量地利' },
  { en: 'SENSING RENHE', zh: '感应人和' },
  { en: 'FINDING MATCH', zh: '寻找命定之宠' },
];

export default function LoadingPage() {
  const router = useRouter();
  const { setResult } = useTest();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);

  // 执行匹配算法
  useEffect(() => {
    // 从 sessionStorage 读取数据
    const birthdateStr = sessionStorage.getItem('birthdate');
    const tianshiStr = sessionStorage.getItem('tianshi');
    const diliStr = sessionStorage.getItem('dili');
    const renheStr = sessionStorage.getItem('renhe');
    const petCategoryStr = sessionStorage.getItem('pet_category');
    const appearanceStr = sessionStorage.getItem('appearance');

    if (!birthdateStr || !tianshiStr || !diliStr || !renheStr) {
      // 数据不完整，返回问卷开始页
      router.push('/test/questionnaire/birthday');
      return;
    }

    // 解析数据
    const birthDate: BirthDate = JSON.parse(birthdateStr);
    const tianshi = JSON.parse(tianshiStr);
    const dili = JSON.parse(diliStr);
    const renhe = JSON.parse(renheStr);
    const petCategory: PetCategory | null = petCategoryStr && petCategoryStr !== 'all' 
      ? petCategoryStr as PetCategory 
      : null;
    const appearancePreference = appearanceStr 
      ? JSON.parse(appearanceStr) 
      : undefined;

    // 构建用户画像
    const userProfile: UserProfile = {
      tianshi: {
        schedule: tianshi.schedule as 1 | 2 | 3,
        energy: tianshi.energy as 1 | 2 | 3,
      },
      dili: {
        space: dili.space as 1 | 2 | 3,
        stability: dili.stability as 1 | 2 | 3,
      },
      renhe: {
        companion: renhe.companion as 1 | 2 | 3,
        attachment: renhe.attachment as 1 | 2 | 3,
        responsibility: renhe.responsibility as 1 | 2 | 3,
      },
    };

    // 计算五行属性
    const wuxingElement = calculateWuxing(birthDate.year, birthDate.month, birthDate.day);
    const wuxingInfo = getWuxingInfo(wuxingElement);

    // 执行匹配算法
    const matchResults = petCategory 
      ? matchPetByCategory(petCategory, wuxingElement, userProfile)
      : matchAllPets(wuxingElement, userProfile);

    // 获取最佳匹配
    const bestMatch = matchResults[0];

    // 构建其他候选列表（2-4名）
    const alternatives = matchResults.slice(1, 5).map(r => ({
      id: r.breed.id,
      name: r.breed.name,
      category: r.breed.category,
      score: r.scores.total,
    }));

    // 构建完整的测试结果
    const testResult: TestResult = {
      wuxingElement,
      wuxingDescription: wuxingInfo.description,
      recommendedPet: {
        id: bestMatch.breed.id,
        name: bestMatch.breed.name,
        nameEn: bestMatch.breed.nameEn,
        category: bestMatch.breed.category,
        categoryName: getCategoryName(bestMatch.breed.category),
        description: bestMatch.breed.description,
        traits: bestMatch.breed.traits,
      },
      matchScore: bestMatch.scores,
      matchReasons: bestMatch.matchReasons,
      emotionalSummary: bestMatch.emotionalSummary,
      alternatives,
    };

    // 存储结果到 store
    setResult(testResult);
    setIsCalculating(false);
  }, [setResult, router]);

  // 进度动画
  useEffect(() => {
    if (isCalculating) return;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 60);

    const timeout = setTimeout(() => {
      router.push('/test/result');
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [isCalculating, router]);

  // 获取宠物类别中文名
  function getCategoryName(category: string): string {
    const names: Record<string, string> = {
      cat: '猫咪',
      dog: '狗狗',
      rabbit: '兔子',
      small: '小宠',
      bird: '鸟类',
      reptile: '爬宠',
      fish: '水族',
    };
    return names[category] || category;
  }

  return (
    <main className="min-h-screen bg-[var(--primary)] text-white flex flex-col justify-center items-center px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 left-6 md:left-12"
      >
        <Link href="/" className="text-xs tracking-[0.3em] uppercase text-white/50">
          百澤
        </Link>
      </motion.div>

      {/* 主内容 */}
      <div className="max-w-md w-full text-center">
        {/* 进度圆环 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 mx-auto mb-16"
        >
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="square"
              strokeDasharray={377}
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
              transition={{ duration: 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-extralight tracking-wider">{progress}%</span>
          </div>
        </motion.div>

        {/* 当前步骤 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm tracking-[0.3em] mb-2">
            {loadingSteps[currentStep].en}
          </p>
          <p className="text-xs tracking-[0.2em] text-white/40">
            {loadingSteps[currentStep].zh}
          </p>
        </motion.div>

        {/* 步骤指示器 */}
        <div className="flex justify-center gap-2">
          {loadingSteps.map((_, i) => (
            <motion.div
              key={i}
              className={`w-8 h-px transition-colors ${
                i <= currentStep ? 'bg-white' : 'bg-white/20'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* 底部文案 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-xs tracking-[0.1em] text-white/30"
      >
        Reading the threads of fate...
      </motion.p>
    </main>
  );
}
