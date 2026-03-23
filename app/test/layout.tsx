'use client';

import { TestProvider } from '@/hooks/useTestStore';

/**
 * 测试流程 Layout - 极简风格
 * 包含 TestProvider 以支持状态管理
 */
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TestProvider>{children}</TestProvider>;
}
