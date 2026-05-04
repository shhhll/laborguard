'use client';
               
  import { useState } from 'react';
  import Sidebar from '@/components/Sidebar';                                        
  import BottomNav from '@/components/BottomNav';
  import StatusCards from '@/components/StatusCards';                                
  import WageCalculator from '@/components/WageCalculator';                          
  import QuickActions from '@/components/QuickActions';    
                                                                                     
  export default function DashboardPage() {                                          
    const [activeTab, setActiveTab] = useState('home');
                                                                                     
    return (                                                                         
      <div className="min-h-screen flex bg-surface">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />                 
        <main className="flex-1 flex flex-col min-w-0">             
          <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5
   py-4 flex items-center justify-between">                                          
            <div className="flex items-center gap-3 lg:hidden">                      
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center 
  justify-center">                                                                   
                <span className="text-white font-bold text-sm">일</span>             
              </div>                                                                 
              <span className="font-bold text-primary text-base">일터지킴이</span>   
            </div>                                                                
            <div className="hidden lg:flex flex-col">                                
              <span className="text-xs text-gray-400">안녕하세요</span>
              <span className="text-sm font-semibold text-gray-800">오늘도 권리를    
  지키세요 💪</<spa>                                                                  
            </div>                                                                  ─
            <div className="flex items-center gap-2">                                
              <span className="badge-info">2026 최저임금 적용 중</span>              
            </div>                                                                   
          </header>                                                                  
          <div className="flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-7 space-y-6 
  pb-24 lg:pb-8">                                                                    
            <StatusCards />                                                          
            <WageCalculator />
            <QuickActions />                                                         
          </div>                                            
        </main>                                                                      
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );                                                                               
  }
