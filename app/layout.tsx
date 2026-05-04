import type { Metadata } from 'next';
  import './globals.css';              
                                                                                     
  export const metadata: Metadata = {
    title: '일터지킴이 | 근로자 권익 보호',                                          
    description: '임금 체불 해결 · 수당 계산 · 진정서 작성을 한 번에',
  };                                                                                 
                                                                                     
  export default function RootLayout({ children }: { children: React.ReactNode }) {  
    return (                                                                         
      <html lang="ko">                                      
        <body>{children}</body>
      </html>                                                                        
    );
  }
