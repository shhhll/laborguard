import type { Config } from 'tailwindcss';
                                            
  const config: Config = {
    content: [                                                                       
      './app/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',                                                  
    ],                                                      
    theme: {
      extend: {
        colors: {                                                                    
          primary: {
            DEFAULT: '#1A365D',                                                      
            50:  '#EBF2FF',                                 
            100: '#BFDBFE',                                                          
            200: '#93C5FD',
            300: '#60A5FA',                                                          
            400: '#2D5282',                                 
            500: '#1A365D',                                                          
            600: '#153050',                                                          
            700: '#0F2340',
            800: '#0A1830',                                                          
            900: '#060E1E',                                                          
          },               
          accent: {                                                                  
            DEFAULT: '#F68522',                             
            light: '#FEF3E2',                                                        
            dark:  '#D4701A',                               
          },                                                                         
          surface: '#F0F4F8',                                                        
        },                                                                           
        fontFamily: {                                                                
          sans: ['Pretendard', 'Apple SD Gothic Neo', '-apple-system',               
  'BlinkMacSystemFont', 'sans-serif'],                                
        },                                                                           
        boxShadow: {                                        
          card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',     
          'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10)',                        
        },                                                                           
      },  
    },                                                                               
    plugins: [],                                            
  };            
                                                                                     
  export default config;
