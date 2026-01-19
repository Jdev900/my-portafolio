import { TrendingUp, Users, Search, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SEO_DATA = [
  { path: "Youtube", clicks: 1200, ctr: "4.2%", position: 1.2 },
  { path: "Twitter", clicks: 850, ctr: "3.1%", position: 2.5 },
  { path: "Instagram", clicks: 430, ctr: "5.8%", position: 1.1 },
];

export const SEODashboard = () => {
  return (
    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Search className="text-blue-600" size={20} />
          Rendimiento SEO - Enero 2026
        </h3>
        <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full animate-pulse">
          • LIVE DATA
        </span>
      </div>

      {/* Grid de Métricas (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Clicks Totales" value="2,482" change="+12%" icon={<Users size={20}/>} up={true} />
        <MetricCard title="Impresiones" value="45.2K" change="+5%" icon={<Globe size={20}/>} up={true} />
        <MetricCard title="CTR Promedio" value="3.8%" change="-2%" icon={<TrendingUp size={20}/>} up={false} />
        <MetricCard title="Posición Media" value="1.8" change="+0.4" icon={<Search size={20}/>} up={true} />
      </div>

      {/* Tabla de Páginas Top */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-600">Página</th>
              <th className="p-4 font-bold text-slate-600">Clicks</th>
              <th className="p-4 font-bold text-slate-600">CTR</th>
              <th className="p-4 font-bold text-slate-600">Posición</th>
            </tr>
          </thead>
          <tbody>
            {SEO_DATA.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono text-blue-600">{row.path}</td>
                <td className="p-4 font-bold">{row.clicks}</td>
                <td className="p-4">{row.ctr}</td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">
                    #{row.position}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente pequeño para las tarjetas de métricas
const MetricCard = ({ title, value, change, icon, up }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</div>
      <div className={`flex items-center text-xs font-bold ${up ? 'text-green-600' : 'text-red-600'}`}>
        {change} {up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
      </div>
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);