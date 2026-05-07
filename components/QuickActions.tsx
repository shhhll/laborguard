'use client';
import { Image, FileText, MessageSquare, ChevronRight, Shield, LucideIcon } from 'lucide-react';

const ACTIONS: {
  icon: LucideIcon;
  color: string;
  iconColor: string;
  title: string;
  desc: string;
  badge: string | null;
}[] = [
  {
    icon: Image,
    color: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: '증거 관리',
    desc: '카톡·문자·사진을 날짜별 타임라인으로 정리',
    badge: null,
  },
  {
    icon: FileText,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: '진정서 생성',
    desc: '고용노동부 표준 양식 자동 작성',
    badge: '빠른 생성',
  },
  {
    icon: MessageSquare,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    title: '협상 메시지',
    desc: '정중하지만 단호한 카톡/문자 템플릿',
    badge: null,
  },
  {
    icon: Shield,
    color: 'bg-orange-50',
    iconColor: 'text-accent',
    title: '권리 가이드',
    desc: '2026 근로기준법 핵심 요약',
    badge: '업데이트',
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 mb-3 px-0.5">빠른 메뉴</h2>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ icon: Icon, color, iconColor, title, desc, badge }) => (
          <button
            key={title}
            className="card text-left hover:shadow-card-hover active:scale-[0.98] transition-all duration-150 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className={iconColor} style={{ width: 18, height: 18 }} />
              </div>
              {badge && (
                <span className="text-[10px] font-bold bg-accent text-white px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
            </div>
            <div className="flex items-center text-primary text-xs font-semibold gap-0.5">
              시작하기
              <ChevronRight style={{ width: 12, height: 12 }} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
