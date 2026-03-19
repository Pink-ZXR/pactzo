'use client';

/**
 * 测试流程 Layout - 极简风格
 * 无额外装饰，各页面自行管理样式
 */
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
