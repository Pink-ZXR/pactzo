'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ExperimentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // 从路径中提取版本号，如 /experiments/v1 -> v1
  const version = pathname.split('/')[2] || 'unknown'

  return (
    <>
      {/* 实验版本顶部横条 */}
      <div
        className="fixed top-0 left-0 right-0 z-60 flex items-center justify-between px-6 py-2 border-b"
        style={{
          backgroundColor: 'var(--background)',
          borderColor: 'var(--sand)',
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs tracking-wide font-light uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            实验版本
          </span>
          <span
            className="text-xs tracking-wide font-medium"
            style={{ color: 'var(--primary)' }}
          >
            {version.toUpperCase()}
          </span>
        </div>
        
        <Link
          href="/"
          className="text-xs tracking-wide font-light transition-opacity hover:opacity-60"
          style={{ color: 'var(--foreground)' }}
        >
          返回首页
        </Link>
      </div>

      {/* 主内容区域，留出顶部横条空间 */}
      <main className="pt-12">
        {children}
      </main>
    </>
  )
}
