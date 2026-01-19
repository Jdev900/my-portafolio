import { useState } from 'react';
import { 
  XAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { TrendingUp, ArrowRightLeft, DollarSign, Zap } from 'lucide-react';

// Datos históricos simulados para el gráfico (Variación de la semana)
const HISTORIAL_TASAS = [
  { dia: 'Lun', ves: 37.5, cop: 3850 },
  { dia: 'Mar', ves: 37.8, cop: 3880 },
  { dia: 'Mie', ves: 38.2, cop: 3900 },
  { dia: 'Jue', ves: 38.0, cop: 3920 },
  { dia: 'Vie', ves: 38.5, cop: 3950 },
  { dia: 'Sab', ves: 38.9, cop: 3980 },
  { dia: 'Hoy', ves: 39.1, cop: 4010 },
];

export const MonitorTasas = () => {
  const [monto, setMonto] = useState<number>(100);
  
  // Tasas actuales (En un proyecto real, esto vendría de una API)
  const tasas = {
    paralelo: 39.10,
    bcv: 36.60,
    cop: 4010, // Tasa Cúcuta
    binance: 38.50
  };

  const tasaCruzada = (tasas.cop / tasas.paralelo).toFixed(2);

  return (
    <div className="space-y-6 pb-10">
      {/* Cabecera Técnica */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
            <Zap className="text-yellow-500 fill-yellow-500" size={28} />
            FINTECH MONITOR
          </h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Frontera Táchira - Cúcuta</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">Live API</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase">v2.0.4</span>
        </div>
      </div>

      {/* Gráfico de Tendencia */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" />
            Tendencia de Mercado (7D)
          </h3>
          <div className="flex gap-4 text-[10px] font-bold">
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> VES</div>
            <div className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> COP</div>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORIAL_TASAS}>
              <defs>
                <linearGradient id="colorVes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="ves" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calculadora Inteligente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/5 group-hover:scale-110 transition-transform duration-700">
            <ArrowRightLeft size={160} />
          </div>
          
          <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-6">Conversor Multi-Moneda</h4>
          
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-slate-500 text-[10px] font-bold mb-2">ENTRADA (USDC/USDT)</p>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <DollarSign className="text-blue-500" />
                <input 
                  type="number" 
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="bg-transparent text-3xl font-black focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-slate-500 text-[10px] font-bold mb-1">BOLÍVARES (VES)</p>
                <p className="text-xl font-black text-white">{(monto * tasas.paralelo).toLocaleString()} <span className="text-xs text-slate-500">Bs</span></p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-slate-500 text-[10px] font-bold mb-1">PESOS (COP)</p>
                <p className="text-xl font-black text-white">{(monto * tasas.cop).toLocaleString()} <span className="text-xs text-slate-500">$</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasa Cruzada Directa */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center">
          <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-2">Relación de Cambio Directa</p>
          <h3 className="text-4xl font-black mb-4">1 BS = {tasaCruzada} COP</h3>
          <p className="text-emerald-50 text-sm leading-relaxed opacity-80">
            Este valor representa la tasa de intercambio real entre San Cristóbal y Cúcuta, calculada mediante arbitraje de mercado.
          </p>
          <div className="mt-6 flex gap-2">
            <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[70%]"></div>
            </div>
            <span className="text-[10px] font-bold">STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};