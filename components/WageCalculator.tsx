 'use client';                                             

  import { useState, useMemo } from 'react';                                         
  import {
    Calculator,                                                                      
    Building2,                                              
    ChevronRight,
    AlertTriangle,
    CheckCircle,                                                                     
    Info,
    Minus,                                                                           
    Plus,                                                   
  } from 'lucide-react';

  const MIN_WAGE_2026 = 10320;                                                       
  
  function formatKRW(n: number) {                                                    
    return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
  }                                                                                  
                                                            
  function calcWages(                                                                
    hourlyRate: number,                                     
    dailyHours: number,
    breakMinutes: number,                                                            
    workDays: number,
    isOver5: boolean,                                                                
  ) {                                                                                
    if (hourlyRate <= 0 || dailyHours <= 0 || workDays <= 0) return null;
                                                                                     
    const net = Math.max(0, dailyHours - breakMinutes / 60);                         
    const weekly = net * workDays;                                                   
    const basic = hourlyRate * weekly;                                               
                                                                                     
    let overtime = 0;
    if (isOver5) {                                                                   
      const over = Math.max(0, net - 8);                    
      overtime = over * workDays * hourlyRate * 0.5;                                 
    }                                                                                
                                                                                     
    let holiday = 0;                                                                 
    if (weekly >= 15) {                                     
      holiday = Math.min(weekly / 40, 1) * 8 * hourlyRate;                           
    }
                                                                                     
    const total = basic + overtime + holiday;               
                                                                                     
    return {                                                
      net,
      weekly,
      basic,
      overtime,
      holiday,
      total,
      monthly: total * (365 / 7 / 12),
      isBelowMin: hourlyRate < MIN_WAGE_2026,                                        
      diff: Math.max(0, (MIN_WAGE_2026 - hourlyRate) * weekly),                      
    };                                                                               
  }                                                                                  
                                                                                     
  function Stepper({                                                                 
    value,
    onChange,                                                                        
    min = 0,                                                
    max = 24,
    step = 0.5,
    unit = '시간',
  }: {                                                                               
    value: number;
    onChange: (v: number) => void;                                                   
    min?: number;                                           
    max?: number;
    step?: number;
    unit?: string;                                                                   
  }) {
    return (                                                                         
      <div className="flex items-center gap-2">             
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center 
  hover:bg-gray-200 active:scale-95 transition-all"                                  
        >                                                                            
          <Minus style={{ width: 14, height: 14 }} />                                
        </button>                                                                    
        <div className="flex-1 text-center">
          <span className="text-lg font-bold text-gray-900">{value}</span>           
          <span className="text-sm text-gray-400 ml-1">{unit}</span>                 
        </div>
        <button                                                                      
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center 
  hover:bg-gray-200 active:scale-95 transition-all"                                  
        >                                                                            
          <Plus style={{ width: 14, height: 14 }} />                                 
        </button>                                           
      </div>
    );
  }

  function ResultRow({
    label,
    amount,
    highlight,                                                                       
    sub,
  }: {                                                                               
    label: string;                                          
    amount: number;
    highlight?: boolean;
    sub?: string;
  }) {                                                                               
    const rowClass = highlight
    ? 'flex items-center justify-between py-3 border-t border-dashed border-gray-200 mt-1'                                              
      : 'flex items-center justify-between py-3';
                                                                                     
    const textClass = highlight                             
      ? 'text-sm font-bold text-gray-900'
      : 'text-sm text-gray-600';                                                     
  
    const amountClass = highlight                                                    
      ? 'font-bold tabular-nums text-primary text-lg'       
      : 'font-bold tabular-nums text-gray-800 text-sm';                              
                                                                                     
    return (
      <div className={rowClass}>                                                     
        <div>                                               
          <p className={textClass}>{label}</p>
          {sub && (
            <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
          )}                                                                         
        </div>
        <span className={amountClass}>{formatKRW(amount)}</span>                     
      </div>                                                                         
    );
  }                                                                                  
                                                            
  export default function WageCalculator() {
    const [hourlyRate, setHourlyRate] = useState<string>('10320');
    const [dailyHours, setDailyHours] = useState(8);                                 
    const [breakMinutes, setBreakMinutes] = useState(60);
    const [workDays, setWorkDays] = useState(5);                                     
    const [isOver5, setIsOver5] = useState(true);           
                                                                                     
    const rate = Number(hourlyRate) || 0;                                            
  
    const result = useMemo(                                                          
      () => calcWages(rate, dailyHours, breakMinutes, workDays, isOver5),
      [rate, dailyHours, breakMinutes, workDays, isOver5],                           
    );
                                                                                     
    const wageRatio = Math.min((rate / MIN_WAGE_2026) * 100, 100);                   
  
    const toggleClass = isOver5 ? 'bg-primary' : 'bg-gray-300';                      
    const knobClass = isOver5                               
      ? 'translate-x-6'                                                              
      : 'translate-x-1';                                    

    return (
      <section>
        <div className="flex items-center gap-2 mb-3 px-0.5">                        
          <Calculator                                                                
            style={{ width: 16, height: 16 }}                                        
            className="text-primary"                                                 
          />                                                
          <h2 className="text-sm font-semibold text-gray-500">                       
            AI 임금 계산기                                  
          </h2>                                                                      
          <span className="badge-info ml-auto">실시간 계산</span>
        </div>                                                                       
                                                            
        <div className="grid lg:grid-cols-2 gap-4">                                  
          <div className="card space-y-5">                  
            <div className="flex items-center justify-between">                      
              <h3 className="font-bold text-gray-900">근무 조건 입력</h3>            
              <div className="flex items-center gap-1.5">                            
                <Building2                                                           
                  style={{ width: 14, height: 14 }}                                  
                  className="text-gray-400"                                          
                />
                <span className="text-xs text-gray-500">사업장 규모</span>           
                <button                                     
                  onClick={() => setIsOver5(!isOver5)}                               
                  className={`relative inline-flex h-6 w-11 items-center rounded-full
   transition-colors duration-200 ${toggleClass}`}                                   
                >                                           
                  <span                                                              
                    className={`inline-block h-4 w-4 transform rounded-full bg-white
  shadow transition-transform duration-200 ${knobClass}`}                            
                  />
                </button>                                                            
                <span                                       
                  className={`text-xs font-semibold ${isOver5 ? 'text-primary' :
  'text-gray-400'}`}                                                                 
                >
                  {isOver5 ? '5인 이상' : '5인 미만'}                                
                </span>                                                              
              </div>
            </div>                                                                   
                                                            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                시급                                                                 
                {result?.isBelowMin && (
                  <span className="ml-2 badge-warning">                              
                    <AlertTriangle style={{ width: 10, height: 10 }} />
                    최저임금 미달                                                    
                  </span>                                   
                )}                                                                   
                {result && !result.isBelowMin && (          
                  <span className="ml-2 badge-success">                              
                    <CheckCircle style={{ width: 10, height: 10 }} />
                    최저임금 충족                                                    
                  </span>                                                            
                )}
              </label>                                                               
              <div className="relative">                    
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="10320"                                                
                  className="input-field pr-8"
                />                                                                   
                <span className="absolute right-3 top-1/2 -translate-y-1/2
  text-gray-400 text-sm">                                                            
                  원                                        
                </span>                                                              
              </div>                                        
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>0원</span>                                                   
                  <span>최저임금 {formatKRW(MIN_WAGE_2026)}</span>                   
                </div>                                                               
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">     
                  <div                                                               
                    className={`h-full rounded-full transition-all duration-500
  ${result?.isBelowMin ? 'bg-accent' : 'bg-green-400'}`}                             
                    style={{ width: `${wageRatio}%` }}      
                  />                                                                 
                </div>                                      
              </div>                                                                 
            </div>                                          

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                일일 근무시간 (휴게 포함)                                            
              </label>                                                               
              <Stepper                                                               
                value={dailyHours}                                                   
                onChange={setDailyHours}                    
                min={1}
                max={24}
                step={0.5}
                unit="시간"                                                          
              />
            </div>                                                                   
                                                            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                휴게시간
                <span className="ml-1 font-normal text-gray-400">                    
                  (4시간 30분, 8시간 1시간 의무)                                     
                </span>                                                              
              </label>                                                               
              <Stepper                                                               
                value={breakMinutes}                        
                onChange={setBreakMinutes}
                min={0}
                max={120}
                step={30}                                                            
                unit="분"
              />                                                                     
            </div>                                          

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                주 근무일수
              </label>                                                               
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (                                  
                  <button                                                            
                    key={d}
                    onClick={() => setWorkDays(d)}                                   
                    className={`flex-1 py-2 rounded-xl text-sm font-bold
  transition-all duration-150 ${                                                     
                      workDays === d
                        ? 'bg-primary text-white shadow-sm'                          
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}                                                              
                  >
                    {d}                                                              
                  </button>                                 
                ))}
              </div>
            </div>

            {!isOver5 && (                                                           
              <div className="flex gap-2 bg-orange-50 rounded-xl p-3">
                <Info                                                                
                  style={{ width: 14, height: 14 }}         
                  className="text-accent shrink-0 mt-0.5"                            
                />                                                                   
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold text-accent-dark">                  
                    5인 미만 사업장                                                  
                  </span>
                  은 연장 가산수당(1.5배)이 적용되지 않습니다.                       
                  주휴수당과 최저임금은 동일하게 적용됩니다.                         
                </p>                                                                 
              </div>                                                                 
            )}                                                                       
          </div>                                                                     
                                                            
          <div className="card flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">예상 수령액</h3>               
              <span className="text-xs text-gray-400">주(週) 기준</span>
            </div>                                                                   
                                                                                     
            {result ? (                                                              
              <>                                                                     
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-primary-50 rounded-xl p-3">                     
                    <p className="text-[11px] text-primary font-medium">             
                      주 근무시간                                                    
                    </p>                                                             
                    <p className="text-xl font-bold text-primary mt-1">
                      {result.weekly.toFixed(1)}                                     
                      <span className="text-sm font-medium ml-1">시간</span>         
                    </p>                                                             
                  </div>                                                             
                  <div className="bg-accent-light rounded-xl p-3">                   
                    <p className="text-[11px] text-accent-dark font-medium">         
                      월 예상 수령액
                    </p>                                                             
                    <p className="text-base font-bold text-accent-dark mt-1
  leading-tight">                                                                    
                      {formatKRW(result.monthly)}
                    </p>                                                             
                  </div>                                                             
                </div>
                                                                                     
                <div className="divide-y divide-gray-100 flex-1">
                  <ResultRow
                    label="기본급"                                                   
                    amount={result.basic}
                    sub={`${result.net}시간 × ${workDays}일 × ${formatKRW(rate)}`}   
                  />                                                                 
                  <ResultRow
                    label="연장근로수당"                                             
                    amount={result.overtime}                
                    sub={                                                            
                      isOver5
                        ? '시급 × 1.5배 (5인 이상 적용)'                             
                        : '5인 미만 사업장 - 미적용'                                 
                    }                                                                
                  />                                                                 
                  <ResultRow                                                         
                    label="주휴수당"                        
                    amount={result.holiday}
                    sub={
                      result.weekly >= 15
                        ? '주 15시간 이상 근무 충족'                                 
                        : '주 15시간 미만 - 미발생'                                  
                    }                                                                
                  />                                                                 
                  <ResultRow                                
                    label="주간 총 수령액"
                    amount={result.total}                                            
                    highlight
                  />                                                                 
                </div>                                      

                {result.isBelowMin && result.diff > 0 && (                           
                  <div className="mt-4 flex gap-2 bg-red-50 border border-red-100 
  rounded-xl p-3">                                                                   
                    <AlertTriangle                          
                      style={{ width: 14, height: 14 }}                              
                      className="text-red-500 shrink-0 mt-0.5"                       
                    />
                    <div>                                                            
                      <p className="text-xs font-semibold text-red-700">
                        최저임금 위반 의심                                           
                      </p>                                                           
                      <p className="text-[11px] text-red-500 mt-0.5">                
                        주간 기준 약{' '}                                            
                        <strong>{formatKRW(result.diff)}</strong>의                  
                        임금 차액이 발생하고 있습니다.                               
                      </p>                                                           
                    </div>                                                           
                  </div>                                                             
                )}                                          

                <div className="mt-4 grid grid-cols-2 gap-2">                        
                  <button className="btn-primary text-sm flex items-center 
  justify-center gap-1.5">                                                           
                    진정서 생성                             
                    <ChevronRight style={{ width: 14, height: 14 }} />               
                  </button>                                                          
                  <button className="btn-outline text-sm flex items-center 
  justify-center gap-1.5">                                                           
                    협상 메시지                             
                    <ChevronRight style={{ width: 14, height: 14 }} />               
                  </button>
                </div>                                                               
              </>                                           
            ) : (                                                                    
              <div className="flex-1 flex flex-col items-center justify-center 
  text-center py-10 text-gray-400 gap-3">                                            
                <Calculator                                 
                  style={{ width: 40, height: 40 }}                                  
                  className="text-gray-200"                 
                />
                <div>
                  <p className="text-sm font-medium">
                    시급과 근무 조건을 입력하면
                  </p>                                                               
                  <p className="text-sm">실시간으로 수당이 계산됩니다</p>
                </div>                                                               
              </div>                                        
            )}
          </div>
        </div>
      </section>
    );
  }
