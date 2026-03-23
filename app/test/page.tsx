'use client'

const routes = [
  { num: 'V4', path: '/test/v4', label: '【新】UI迭代 + 宠物系统重构', desc: '实验版本', highlight: true },
  { num: '01', path: '/', label: '首页', desc: '五层GSAP Hero + 七种命定' },
  { num: '02', path: '/questionnaire/birthday', label: '生日选择', desc: '' },
  { num: '03', path: '/questionnaire/tianshi', label: '天时问卷', desc: '羊皮纸主题' },
  { num: '04', path: '/questionnaire/dili', label: '地利问卷', desc: '羊皮纸主题' },
  { num: '05', path: '/questionnaire/renhe', label: '人和问卷', desc: '羊皮纸主题' },
  { num: '06', path: '/questionnaire/pet-category', label: '宠物类型选择', desc: '八大分类' },
  { num: '07', path: '/loading', label: '加载页', desc: '' },
  { num: '08', path: '/result', label: '结果页', desc: '精密契合档案' },
]

export default function TestIndexPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 font-mono">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1">
          进度确认 — PACTZO
        </h1>
        <p className="text-sm text-gray-500">2026.03.22</p>
      </header>

      {/* Divider */}
      <div className="text-gray-300 mb-8 select-none">
        ━━━━━━━━━━━━━━━━━━━━━━━━
      </div>

      {/* Routes */}
      <nav>
        <ul className="space-y-4">
          {routes.map((route) => (
            <li key={route.path}>
              <a
                href={route.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2 hover:underline underline-offset-4 decoration-gray-400 ${route.highlight ? 'bg-black text-white px-3 -mx-3' : ''}`}
              >
                <span className={`w-6 shrink-0 ${route.highlight ? 'text-white/60' : 'text-gray-400'}`}>{route.num}</span>
                <span className={`font-bold min-w-[200px] md:min-w-[280px] ${route.highlight ? 'text-white' : 'text-black'}`}>
                  {route.path}
                </span>
                <span className={`text-sm ${route.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {route.label}
                  {route.desc && <span className={route.highlight ? 'text-white/50' : 'text-gray-400'}> — {route.desc}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
