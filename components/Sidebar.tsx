  'use client';

  import { LayoutDashboard, Calculator, Image, FileText, MessageSquare, Shield } from
   'lucide-react';
                                                                                     
  const NAV_ITEMS = [                                       
    { id: 'home',       label: '대시보드',      icon: LayoutDashboard },
    { id: 'evidence',   label: '증거 관리',      icon: Image },                      
    { id: 'complaint',  label: '진정서 생성',    icon: FileText },                   
    { id: 'negotiate',  label: '협상 도우미',    icon: MessageSquare },              
  ];

  interface Props {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }

  export default function Sidebar({ activeTab, onTabChange }: Props) {
    return (
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white border-r
  border-gray-100 py-6 px-4">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center
  justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-primary text-base
  leading-tight">일터지킴이</p>
            <p className="text-[10px] text-gray-400 leading-tight">LaborGuard</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
  font-medium transition-all duration-150 text-left w-full ${
                  isActive
                    ? 'bg-primary-50 text-primary font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon style={{ width: 18, height: 18 }} className={isActive ?
  'text-primary' : 'text-gray-400'} />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto mx-2 p-3 rounded-xl bg-accent-light border
  border-orange-100">
          <p className="text-xs font-semibold text-accent-dark mb-0.5">무료 법률
  상담</p>
          <p className="text-[11px] text-gray-500">고용노동부 ☎ 1350</p>
          <p className="text-[11px] text-gray-500">법률구조공단 ☎ 132</p>
        </div>
      </aside>
    );
  }
