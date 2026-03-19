/**
 * 理由列表组件
 * 极简编号列表
 */

'use client';

interface ReasonListProps {
  reasons: string[];
}

export function ReasonList({ reasons }: ReasonListProps) {
  return (
    <div className="border-t border-[#e8e6e0] pt-10 space-y-6">
      {reasons.map((reason, index) => (
        <div key={index} className="flex items-start gap-4">
          <span className="text-[10px] text-[#c4c0b8] mt-1.5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p 
            className="text-sm font-normal leading-[2] text-[#666]"
            style={{ 
              fontFamily: "'Noto Serif SC', 'ZCOOL XiaoWei', serif",
              letterSpacing: '0.02em'
            }}
          >
            {reason}
          </p>
        </div>
      ))}
    </div>
  );
}
