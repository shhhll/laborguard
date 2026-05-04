'use client';
                                                                                     
  import { LayoutDashboard, Calculator, Image, FileText, MessageSquare } from
  'lucide-react';                                                                    
                                                            
  const NAV_ITEMS = [
    { id: 'home',       label: '홈',      icon: LayoutDashboard },
    { id: 'calculator', label: '계산기',  icon: Calculator },     
    { id: 'evidence',   label: '증거',    icon: Image },                             
    { id: 'complaint',  label: '진정서',  icon: FileText },                          
    { id: 'negotiate',  label: '협상',    icon: MessageSquare },                     
  ];                                                                                 
                                                                                     
  interface Props {
    activeTab: string;                                                               
    onTabChange: (tab: string) => void;                     
  }                                    
   
  export default function BottomNav({ activeTab, onTabChange }: Props) {
    return (                                                                         
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t 
  border-gray-100 flex">                                                             
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {                              
          const isActive = activeTab === id;           
          return (                                                                   
            <button                                                                  
              key={id}
              onClick={() => onTabChange(id)}                                        
              className="flex-1 flex flex-col items-center justify-center py-2.5
  gap-1"                                                                        
            >                                                                        
              <Icon style={{ width: 20, height: 20 }} className={isActive ? 
  'text-primary' : 'text-gray-400'} />                                               
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' :
   'text-gray-400'}`}>                                                               
                {label}                                                              
              </span>                                       
            </button>                                                                
          );                                                
        })} 
      </nav>
    );      
  }
