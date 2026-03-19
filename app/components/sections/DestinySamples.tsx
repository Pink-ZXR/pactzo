'use client';

import { motion } from 'framer-motion';

/**
 * Destiny Samples 缘分案例展示模块 - 极简风格
 */

interface DestinyCase {
  id: string;
  personWuxing: string;
  personWuxingCn: string;
  petName: string;
  petBreed: string;
  matchScore: number;
  story: string;
}

const sampleCases: DestinyCase[] = [
  {
    id: 'case-001',
    personWuxing: 'EARTH',
    personWuxingCn: '土命',
    petName: '元宝',
    petBreed: '萨摩耶',
    matchScore: 96,
    story: '土命之人稳重踏实，与金系萨摩耶的忠诚温顺完美契合。元宝的到来，让主人的家充满了温暖与欢笑。',
  },
  {
    id: 'case-002',
    personWuxing: 'WATER',
    personWuxingCn: '水命',
    petName: '墨墨',
    petBreed: '俄罗斯蓝猫',
    matchScore: 94,
    story: '水命之人聪慧内敛，与同样优雅的蓝猫墨墨一见如故。它们都享受安静的陪伴，彼此心灵相通。',
  },
  {
    id: 'case-003',
    personWuxing: 'FIRE',
    personWuxingCn: '火命',
    petName: '阳阳',
    petBreed: '金毛寻回犬',
    matchScore: 98,
    story: '火命之人热情开朗，与火系金毛的活泼友善相得益彰。阳阳每天都用它的热情治愈着主人的心。',
  },
];

function DestinyCard({ caseItem, index }: { caseItem: DestinyCase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="group"
    >
      {/* 卡片 */}
      <div className="border border-[var(--sand)] bg-[var(--cream)] p-6 md:p-8 relative overflow-hidden transition-all duration-400 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lg)] group-hover:-translate-y-1">
        {/* 匹配分数 - 右上角 */}
        <div className="absolute top-6 right-6 text-right">
          <p className="text-[var(--text-muted)] text-xs tracking-[0.2em] mb-1">MATCH</p>
          <p className="text-3xl font-extralight text-[var(--accent)]">{caseItem.matchScore}<span className="text-sm">%</span></p>
        </div>

        {/* 五行标签 */}
        <div className="inline-block mb-6">
          <span className="text-xs tracking-[0.3em] text-[var(--primary)] font-medium border-b border-[var(--primary)]/20 pb-1">
            {caseItem.personWuxing} · {caseItem.personWuxingCn}
          </span>
        </div>

        {/* 宠物信息 */}
        <div className="mb-6">
          <h3 className="text-xl font-light text-[var(--foreground)] tracking-wide mb-1">
            {caseItem.petName}
          </h3>
          <p className="text-[var(--text-muted)] text-xs tracking-[0.15em]">{caseItem.petBreed}</p>
        </div>

        {/* 分隔线 */}
        <div className="w-12 h-px bg-[var(--sand)] mb-6 group-hover:w-20 group-hover:bg-[var(--primary)]/30 transition-all duration-500" />

        {/* 故事 */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {caseItem.story}
        </p>
      </div>
    </motion.div>
  );
}

export function DestinySamples() {
  return (
    <section className="py-24 md:py-32 bg-[var(--background-alt)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[var(--text-muted)] text-xs tracking-[0.3em] uppercase mb-4">
            Destiny Stories
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight text-[var(--foreground)] tracking-wide mb-4">
            他们的缘分故事
          </h2>
          <p className="text-[var(--text-secondary)] text-xs max-w-md mx-auto tracking-wide">
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
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-muted)] text-xs tracking-[0.2em]">
            下一个故事，也许就是你和你的命定之宠
          </p>
        </motion.div>
      </div>
    </section>
  );
}
