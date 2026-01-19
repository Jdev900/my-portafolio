import React, { useState, useEffect } from 'react';
import { 
  X, Github, Mail, Code2, Cpu, Globe, 
  ArrowUpRight, Terminal, Layers, Sun, Moon
} from 'lucide-react';
import { SEODashboard } from './SEODashboard';
import { MonitorTasas } from './MonitorTasas';
import { KanbanPlanner } from './KanbanPlanner';

const ART_DATA = [
  {
    id: 1,
    title: "Monitor Frontera Live",
    category: "Fintech & Data",
    stack: ["React", "WebSockets", "TypeScript"],
    githubUrl: "https://github.com/Jdev900",
    url: "/proyecto1.png",
    desc: "Infraestructura para el monitoreo de divisas en tiempo real con latencia mínima."
  },
  {
    id: 2,
    title: "SEO Analytics Engine",
    category: "Data Engineering",
    stack: ["TypeScript", "Recharts"],
    githubUrl: "https://github.com/Jdev900",
    url: "/proyecto2.png",
    desc: "Visualización de métricas SEO mediante algoritmos avanzados y gráficos interactivos."
  },
  {
    id: 3,
    title: "Agile Flow Planner",
    category: "Productivity SaaS",
    stack: ["React", "UX Design"],
    githubUrl: "https://github.com/Jdev900",
    url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    desc: "Gestor de flujos de trabajo con persistencia de estado y drag-and-drop."
  }
];

const TECH_ICONS: { [key: string]: React.ReactNode } = {
  "React": <Code2 size={18} />,
  "Next.js": <Globe size={18} />,
  "TypeScript": <Terminal size={18} />,
  "WebSockets": <Cpu size={18} />,
  "UX Design": <Layers size={18} />,
  "Recharts": <Layers size={18} />,
  "Tailwind": <Code2 size={18} />,
  "Default": <Code2 size={18} />
};

export default function App() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [indiceProyecto, setIndiceProyecto] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  // --- EFECTOS ---
  
  // Bloqueo de Scroll
  useEffect(() => {
    if (modalAbierto) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [modalAbierto]);

  // Auto-play Carrusel
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceProyecto((prev) => (prev + 1) % ART_DATA.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indiceProyecto]);

  // --- FUNCIONES ---
  const copiarEmail = () => {
    navigator.clipboard.writeText("joaedaniel@gmail.com");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const siguienteProyecto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndiceProyecto((prev) => (prev + 1) % ART_DATA.length);
  };

  const anteriorProyecto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndiceProyecto((prev) => (prev - 1 + ART_DATA.length) % ART_DATA.length);
  };

  return (
    <div className={`${darkMode ? 'dark bg-slate-950' : 'bg-[#ecf0f1]'} min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 selection:bg-blue-100`}>
      
      {/* Navbar Compacta */}
      <nav className={`sticky top-0 z-[100] ${darkMode ? 'bg-slate-950/70 border-slate-800' : 'bg-white/70 border-slate-200/60'} backdrop-blur-xl border-b px-6 py-3`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white font-black rotate-3 group-hover:rotate-0 transition-all">J</div>
            <h2 className={`text-xs font-black ${darkMode ? 'text-white' : 'text-black'} tracking-tighter uppercase`}>Engineer<span className="text-blue-600 dark:text-blue-400">.Lab</span></h2>
          </div>
          <div className="flex gap-3 items-center">
            {/* Toggle Dark Mode */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="https://github.com/Jdev900" target="_blank" className="text-slate-500 hover:text-blue-600 transition-colors"><Github size={18} /></a>
            <button onClick={copiarEmail} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all">
              {copiado ? "Copiado" : "Contacto"}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
          
          {/* 1. HERO COMPACTO */}
          <header className={`md:col-span-8 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm transition-colors`}>
            <div className="relative shrink-0">
              <img src="/yo.png" className={`w-32 h-32 rounded-full object-cover border-4 ${darkMode ? 'border-slate-50' : 'border-slate-800'}shadow-xl`} alt="Avatar" />
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50'} px-3 py-1.5 rounded-full shadow-md border flex items-center gap-2 whitespace-nowrap`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Disponible</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className={`text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-3 ${darkMode ? 'text-white' : 'text-slate-900'} transition-colors`}>
                Frontend Developer &<br/>
                <span className="text-blue-600 dark:text-blue-400"> SEO Specialist</span> 
                <span className={`text-[19px] tracking-tighter  ${darkMode ? 'text-white' : 'text-slate-900'}`}>I ng. José Rodríguez</span> 
              </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium max-w-md italic transition-colors">
                    "Especializado en interfaces de alto rendimiento y optimización SEO técnica."
                </p>
            </div>
          </header>

          {/* 2. TECH STACK PREMIUM */}
<section className="md:col-span-4 md:row-span-2 flex flex-col gap-4">
  {/* 1. CARD EXPERTISE: Efecto "Cyber-Glass" con Aura dinámica */}
  <div className="flex-1 bg-[#020617] rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl border border-white/10">
    {/* Orbe de luz animado de fondo */}
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/40 transition-all duration-1000 animate-pulse"></div>
    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px]"></div>

    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400/80">Stack Principal</h3>
          </div>
          <p className="text-3xl font-black tracking-tighter text-white">Frontend <span className="text-blue-500 italic">Core</span></p>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md group-hover:border-blue-500/50 transition-all duration-500 group-hover:rotate-6">
          <Code2 size={28} className="text-blue-400" />
        </div>
      </div>

      <div className="space-y-6">
        {[
          { name: 'React 19 Architecture', color: 'from-blue-600 to-cyan-400', icon: '⚛️' },
          { name: 'Next.js 15 / SEO-SSR', color: 'from-slate-400 to-white', icon: '🚀' },
          { name: 'TypeScript / Enterprise', color: 'from-blue-500 to-indigo-400', icon: '🔷' }
        ].map((tech) => (
          <div key={tech.name} className="group/item relative">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs grayscale group-hover/item:grayscale-0 transition-all">{tech.icon}</span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover/item:text-white transition-colors">{tech.name}</span>
              </div>
            </div>
            <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
              <div 
                className={`h-full bg-gradient-to-r ${tech.color} rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* 2. CARD PERFORMANCE: Estilo "Glass-List" */}
  <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'} border rounded-[2.5rem] p-7 shadow-sm group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden backdrop-blur-sm`}>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-all">
        <Globe size={22} />
      </div>
      <div>
        <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Optimization</h3>
        <p className={`font-black text-xl tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>SEO & Performance</p>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {['Core Web Vitals', 'Search Console', 'Semantic HTML', 'PageSpeed'].map((t, i) => (
        <div key={t} className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-blue-50'} rounded-xl border border-transparent group-hover:border-blue-500/20 transition-all cursor-default`}>
          <div className={`w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse`} style={{ animationDelay: `${i * 200}ms` }}></div>
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">{t}</span>
        </div>
      ))}
    </div>
  </div>

  {/* 3. CARD DESIGN: Estilo "Minimalist Floating" */}
  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-6 text-white flex items-center justify-between group overflow-hidden relative shadow-xl hover:shadow-indigo-500/20 transition-all">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
    
    <div className="relative z-10 flex flex-col gap-1">
      <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-200">Creative Ops</h3>
      <p className="text-xl font-black tracking-tighter leading-none italic group-hover:translate-x-1 transition-transform">Figma & Adobe</p>
    </div>
    
    <div className="relative z-10 flex items-center gap-3">
        <div className="flex -space-x-3">
            {[Layers, Globe].map((Icon, i) => (
                <div key={i} className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:z-20 hover:scale-110 hover:bg-white/20 transition-all">
                    <Icon size={18} />
                </div>
            ))}
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white text-indigo-600 transition-all">
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </div>
    </div>
  </div>
</section>

          {/* 3. CARRUSEL DE PROYECTOS */}
          <section className={`md:col-span-8 relative ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border rounded-[2.5rem] shadow-sm group overflow-hidden h-[500px] md:h-[400px] transition-colors`}>
            <div key={indiceProyecto} className="relative h-full w-full flex flex-col md:flex-row gap-8 p-8 animate-cross-fade">
              <div onClick={() => { setProyectoSeleccionado(ART_DATA[indiceProyecto]); setModalAbierto(true); }} className="w-full md:w-[45%] h-44 md:h-full shrink-0 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 relative cursor-pointer">
                <img src={ART_DATA[indiceProyecto].url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={ART_DATA[indiceProyecto].title} />
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">Explorar Proyecto</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[12px] font-black uppercase tracking-[0.2em] mb-3">{ART_DATA[indiceProyecto].category}</span>
                  <h4 className={`text-3xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>{ART_DATA[indiceProyecto].title}</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ART_DATA[indiceProyecto].stack.map(s => (
                      <div key={s} className={`flex items-center gap-1.5 px-2.5 py-1 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} border rounded-lg text-[13px] font-bold text-slate-500`}>
                        <span className="text-blue-500">{TECH_ICONS[s] || TECH_ICONS["Default"]}</span>{s}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3">{ART_DATA[indiceProyecto].desc}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <button onClick={() => { setProyectoSeleccionado(ART_DATA[indiceProyecto]); setModalAbierto(true); }} className="flex-1 bg-slate-900 dark:bg-blue-600 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg active:scale-95">Ver Detalles</button>
                  <a href={ART_DATA[indiceProyecto].githubUrl} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 flex items-center justify-center ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'} border rounded-2xl hover:text-blue-600 transition-all shadow-sm active:scale-95`}><Github size={20} /></a>
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-8 flex gap-2 z-30">
              <button onClick={anteriorProyecto} className={`w-10 h-10 flex items-center justify-center ${darkMode ? 'bg-slate-800/50 text-white' : 'bg-white/50 text-slate-900'} backdrop-blur-sm border border-transparent rounded-xl hover:bg-white hover:text-slate-900 transition-all`}><ArrowUpRight size={18} className="rotate-[225deg]" /></button>
              <button onClick={siguienteProyecto} className={`w-10 h-10 flex items-center justify-center ${darkMode ? 'bg-slate-800/50 text-white' : 'bg-white/50 text-slate-900'} backdrop-blur-sm border border-transparent rounded-xl hover:bg-white hover:text-slate-900 transition-all`}><ArrowUpRight size={18} className="rotate-[45deg]"/></button>
            </div>
          </section>

          {/* 4. BANNER CONTACTO */}
          <section className="md:col-span-12 bg-slate-900 bg-blue-900/20 border dark:border-blue-500/20 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-600/20 transition-all"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black tracking-tighter">¿Hacemos algo increíble?</h3>
              <p className="text-slate-400 dark:text-blue-200/60 text-sm mt-1">Escríbeme para colaborar en tu próximo proyecto.</p>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <button onClick={copiarEmail} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-2xl">{copiado ? "✓ Email Copiado" : "Copiar Correo"}</button>
            </div>
          </section>
        </div>
      </main>

      {/* MODAL */}
      {modalAbierto && proyectoSeleccionado && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => setModalAbierto(false)} />
          <div className="relative bg-white border-slate-800 border w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-white sticky top-0 backdrop-blur-md z-30">
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">{proyectoSeleccionado.title}</h4>
              <button onClick={() => setModalAbierto(false)} className='p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all'><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scroll text-slate-900">
              {proyectoSeleccionado.id === 1 && <MonitorTasas />}
              {proyectoSeleccionado.id === 2 && <SEODashboard />}
              {proyectoSeleccionado.id === 3 && <KanbanPlanner />}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER PREMIUM REIMAGINADO */}
        <footer className='mt-20 border-t border-slate-800 bg-slate-950 backdrop-blur-md pt-16 pb-12 transition-colors'>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
              
              {/* Columna 1: Identidad */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-black">J</div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] dark:text-white">Engineer.Lab</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-[200px]">
                  Arquitectura de software con enfoque en experiencias de usuario excepcionales.
                </p>
              </div>

              {/* Columna 2: Ubicación & Disponibilidad */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Localización</h5>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                    <Globe size={16} />
                  </div>
                  <div className="text-xs font-bold dark:text-slate-300">
                    San Cristóbal, <span className="text-slate-400 font-medium">Venezuela</span>
                  </div>
                </div>
              </div>

              {/* Columna 3: Conexión rápida */}
              <div className="space-y-4 md:text-right">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Social</h5>
                <div className="flex gap-4 md:justify-end">
                  <a href="https://github.com/Jdev900" target="_blank" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <Github size={18} />
                  </a>
                  <button onClick={copiarEmail} className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Línea final de Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
              <div className="flex gap-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <span>© 2026 J-DEV</span>
                <span className="hidden md:block">•</span>
                <span>All Rights Reserved</span>
              </div>
              
              <div className="flex items-center gap-2 group cursor-default">
                <div className="h-px w-8 bg-slate-200 dark:bg-slate-800 group-hover:w-12 transition-all"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-600 group-hover:text-blue-600 transition-colors">
                  Built with React & Tailwind
                </span>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}