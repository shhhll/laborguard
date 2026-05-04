'use client';

  import { AlertTriangle, TrendingUp, CheckCircle, Clock } from 'lucide-react';      
  
  const STATUS_CARDS = [                                                             
    {                                                       
      icon: AlertTriangle,                                                           
      iconBg: 'bg-orange-50',                               
      iconColor: 'text-accent',
      value: '산출 전',                                                              
      sub: '임금계산기를 먼저 사용해보세요',
      border: 'border-l-4 border-l-accent',                                          
    },                                                                               
    {                                                                                
      icon: CheckCircle,                                                             
      iconBg: 'bg-green-50',                                                         
      iconColor: 'text-green-600',                          
      label: '계약서 등록',                                                          
      value: '미등록',     
      sub: '계약서를 업로드하면 분석해드려요',                                       
      border: 'border-l-4 border-l-green-400',              
    },                                                                               
    {                                                       
      icon: Clock,                                                                   
      iconBg: 'bg-primary-50',                                                       
      iconColor: 'text-primary',
      label: '진정서 진행상태',                                                      
      value: '초안 대기',                                   
      sub: '임금계산 후 바로 생성 가능',                                             
      border: 'border-l-4 border-l-primary',
    },                                                                               
    {                                                                                
      icon: TrendingUp,                                                              
      iconBg: 'bg-blue-50',                                                          
      iconColor: 'text-blue-600',                           
      label: '2026 최저시급',    
      value: '10,320원',     
      sub: '이보다 낮으면 최저임금 위반',                                            
      border: 'border-l-4 border-l-blue-400',                                        
    },                                                                               
  ];                                                                                 
                                                            
  export default function StatusCards() {                                            
    return (                                                
      <section>
        <h2 className="text-sm font-semibold text-gray-500 mb-3 px-0.5">현재
  상태</h2>                                                                 
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">                      
          {STATUS_CARDS.map(({ icon: Icon, iconBg, iconColor, label, value, sub,
  border }) => (                                                                     
            <div key={label} className={`card ${border} flex flex-col gap-2`}>
              <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center        
  justify-center`}>                                                                  
                <Icon className={iconColor} style={{ width: 16, height: 16 }} />     
              </div>                                                                 
              <div>                                                                  
                <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">{value}</p>  
                <p className="text-[10px] text-gray-400 mt-0.5                       
  leading-snug">{sub}</p>                                                            
              </div>                                                                 
            </div>                                                                   
          ))}                                                                        
        </div>                                              
      </section>
    );          
  }
