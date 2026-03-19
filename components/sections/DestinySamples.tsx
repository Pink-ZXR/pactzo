'use client';

import { motion } from 'framer-motion';
import { BulyPlantBorder, BulyMysticSymbol, BulyStar } from '@/components/illustrations';
import { CatIllustration, DogIllustration } from '@/components/illustrations';
import { WUXING_NAMES } from '@/lib/wuxing';
import type { WuxingElement } from '@/hooks/useTestStore';

/**
 * Destiny Samples 缘分案例展示模块
 * 
 * @context 首页营销模块 - 激发用户对结果的期待
 * @style Buly风格 - 复古神秘、星座元素、植物边框
 */

interface DestinyCase {
  id: string;
  personWuxing: WuxingElement;
  petName: string;
  petType: 'cat' | 'dog';
  petBreed: string;
  matchScore: number;
  story: string;
}

const sampleCases: DestinyCase[] = [
  {
    id: 'case-001',
    personWuxing: 'earth',
    petName: '元宝',
    petType: 'dog',
    petBreed: '萨摩耶',
    matchScore: 96,
    story: '土命之人稳重踏实，与金系萨摩耶的忠诚温顺完美契合。元宝的到来，让主人的家充满了温暖与欢笑。',
  },
  {
    id: 'case-002',
    personWuxing: 'water',
    petName: '墨墨',
    petType: 'cat',
    petBreed: '俄罗斯蓝猫',
    matchScore: 94,
    story: '水命之人聪慧内敛，与同样优雅的蓝猫墨墨一见如故。它们都享受安静的陪伴，彼此心灵相通。',
  },
  {
    id: 'case-003',
    personWuxing: 'fire',
    petName: '阳阳',
    petType: 'dog',
    petBreed: '金毛寻回犬',
    matchScore: 98,
    story: '火命之人热情开朗，与火系金毛的活泼友善相得益彰。阳阳每天都用它的热情治愈着主人的心。',
  },
];

const wuxingColors: Record<WuxingElement, string> = {
  metal: 'text-wuxing-metal border-wuxing-metal/30',
  wood: 'text-wuxing-wood border-wuxing-wood/30',
  water: 'text-wuxing-water border-wuxing-water/30',
  fire: 'text-wuxing-fire border-wuxing-fire/30',
  earth: 'text-wuxing-earth border-wuxing-earth/30',
};

function DestinyCard({ caseItem, index }: { caseItem: DestinyCase; index: number }) {
  const PetIcon = caseItem.petType === 'cat' ? CatIllustration : DogIllustration;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative"
    >
      {/* 卡片边框装饰 */}
      <div className="absolute -top-2 -left-2 w-8 h-8 opacity-40">
        <BulyMysticSymbol className={`w-full h-full ${wuxingColors[caseItem.personWuxing].split(' ')[0]}`} />
      </div>
      
      <div className="bg-cream border border-sand rounded-[20px] p-6 md:p-8 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          <PetIcon className="w-full h-full text-primary" animate={false} />
        </div>

        {/* 匹配分数 */}
        <div className="flex items-center gap-2 mb-4">
          <BulyStar className="w-5 h-5 text-accent" />
          <span className="text-accent font-medium">匹配指数</span>
          <span className="text-2xl font-light text-primary">{caseItem.matchScore}%</span>
        </div>

        {/* 五行标签 */}
        <div className={`inline-block px-3 py-1 rounded-full border ${wuxingColors[caseItem.personWuxing]} bg-white/50 mb-4`}>
          <span className="text-sm font-medium">
            {WUXING_NAMES[caseItem.personWuxing]}命之人
          </span>
        </div>

        {/* 宠物信息 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 text-primary">
            <PetIcon className="w-full h-full" animate={false} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">
              {caseItem.petName}
            </h3>
            <p className="text-text-secondary text-sm">{caseItem.petBreed}</p>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="my-4 opacity-30">
          <BulyPlantBorder className="w-full h-6 text-sand" />
        </div>

        {/* 故事 */}
        <p className="text-text-secondary text-sm leading-relaxed italic">
          "{caseItem.story}"
        </p>
      </div>
    </motion.div>
  );
}

export function DestinySamples() {
  return (
    <section className="py-20 md:py-28 bg-background-alt/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Destiny Stories
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
            他们的缘分故事
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            每一个匹配都是一段独特的缘分，看看他们的故事
          </p>
        </motion.div>

        {/* 案例卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleCases.map((caseItem, index) => (
            <DestinyCard key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm">
            下一个故事，也许就是你和你的命定之宠
          </p>
        </motion.div>
      </div>
    </section>
  );
}
