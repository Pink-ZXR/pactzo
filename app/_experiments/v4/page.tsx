'use client'

import Link from 'next/link'

const v4Modules = [
  {
    id: 'ui',
    title: 'UI 全局优化',
    desc: 'Minimal / Contemporary / Calm Tech 风格迭代',
    status: '准备中',
    routes: [
      { path: '/test/v4/ui/home', label: '首页优化', status: 'pending' },
      { path: '/test/v4/ui/questionnaire', label: '问卷流程', status: 'pending' },
      { path: '/test/v4/ui/result', label: '结果页', status: 'pending' },
      { path: '/test/v4/ui/components', label: '组件库', status: 'pending' },
    ]
  },
  {
    id: 'pet',
    title: '宠物系统重构',
    desc: '待重新构思设计',
    status: '准备中',
    routes: [
      { path: '#', label: '宠物系统（待开始）', status: 'pending' },
    ]
  },
  {
    id: 'integrated',
    title: '整合测试',
    desc: 'UI + 宠物系统完整流程',
    status: '待开始',
    routes: [
      { path: '#', label: '完整流程', status: 'pending' },
    ]
  }
]

export default function V4IndexPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] p-8 md:p-16 font-light">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-xs tracking-[0.3em] text-[#999]">V4</span>
          <h1 className="text-2xl md:text-3xl font-extralight tracking-tight">
            实验迭代中心
          </h1>
        </div>
        <p className="text-sm text-[#666]">
          UI 优化 + 宠物系统重构 · 测试阶段
        </p>
      </header>

      {/* 主版本保护提示 */}
      <div className="mb-12 p-4 border border-[#e5e3dd] bg-white">
        <p className="text-xs tracking-[0.15em] text-[#666] mb-2">PROTECTION STATUS</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm">主版本已保护 — 所有改动仅在测试环境生效</span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-8">
        {v4Modules.map((module) => (
          <section key={module.id} className="border-t border-[#e5e3dd] pt-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-lg font-normal tracking-wide">{module.title}</h2>
              <span className="text-xs text-[#999] tracking-[0.1em]">{module.status}</span>
            </div>
            <p className="text-sm text-[#666] mb-4">{module.desc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {module.routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group flex items-center justify-between p-4 border border-[#e5e3dd] hover:border-[#1a1a1a] transition-colors bg-white"
                >
                  <span className="text-sm">{route.label}</span>
                  <span className={`text-xs ${
                    route.status === 'ready' ? 'text-green-600' : 'text-[#999]'
                  }`}>
                    {route.status === 'pending' ? '待开始' : 
                     route.status === 'ready' ? '可用' : '进行中'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#e5e3dd]">
        <p className="text-xs text-[#999] tracking-[0.1em]">
          所有改动需经确认后才可合并至主版本
        </p>
      </footer>
    </div>
  )
}
