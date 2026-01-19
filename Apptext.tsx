import { useState, useEffect } from 'react';
import { X, Github, LayoutPanelLeft, Mail} from 'lucide-react';
import { SEODashboard } from './SEODashboard';
import { MonitorTasas } from './MonitorTasas';
import { KanbanPlanner } from './KanbanPlanner';

// 1. Las interfaces y datos se quedan AFUERA (están bien ahí)
interface ArtWork {
  id: number;
  title: string;
  category: string;
  url: string;
  desc: string;
}

const ART_DATA: ArtWork[] = [
  {
    id: 1,
    title: "Monitor Frontera en Tiempo Real",
    category: "Fintech / Ingeniería",
    url: "https://images.unsplash.com/photo-1611974717483-36009c3132bc?auto=format&fit=crop&q=80&w=1000",
    desc: "Sistema de monitoreo de divisas (VES/COP/USDC) diseñado para transacciones en la zona fronteriza Táchira-Cúcuta."
  },
  {
    id: 2,
    title: "Proyecto SEO Dashboard",
    category: "Ingeniería",
    url: "https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=1000",
    desc: "Panel interactivo desarrollado en React para el monitoreo de métricas orgánicas y análisis de datos en tiempo real."
  },
  {
    id: 3,
    title: "Canvas Planner",
    category: "Software / Productividad",
    url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000",
    desc: "Aplicación de gestión de tareas con visualización de progreso dinámico y categorización de flujos de trabajo."
  }
];

export default function App() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarEmail = () => {
    navigator.clipboard.writeText("tu-correo@real.com"); // Cambia por tu correo real
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };
  
  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // FUNCIÓN DE LIMPIEZA: Se ejecuta cuando el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalAbierto]);

  return (
    <div id="yo" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Navegación */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ing. Portfolio & Art
        </h1>
        <div className="flex gap-6 items-center">
          <a href="#yo" className="text-sm font-medium hover:text-blue-600 transition">Sobre mí</a>
          <a href="#galeria" className="text-sm font-medium hover:text-blue-600 transition">Galería</a>
          <a 
            href="#contacto" 
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all shadow-md inline-block"
          >
            Contacto
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        
        {/* Header / Hero */}
        <header className="flex flex-col md:flex-row items-center gap-8 mb-20 mt-10">
          <div className="relative">
            <img 
              src="/yo.png" 
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl ring-1 ring-slate-200" 
              alt="Avatar"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150" }}
            />
            <span className="absolute bottom-3 right-3 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white"></span>
            </span>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Ingeniero de Software & <span className="text-blue-600">Artista Digital</span>
            </h2>
            <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
              Especializado en construir aplicaciones robustas con <span className="text-slate-900 font-semibold underline decoration-blue-500/30">React</span> y diseños con alma. 
            </p>
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a href="https://github.com/Jdev900" target="_blank" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
                <Github size={18} /> GitHub
              </a>
              <button onClick={copiarEmail} className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition">
                <Mail size={18} /> Email
              </button>
            </div>
          </div>
        </header>

        {/* Galería */}
        <section id="galeria">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <LayoutPanelLeft size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Trabajos Destacados</h3>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ART_DATA.map((art) => {
          // Definimos qué proyectos son "interactivos" (los que abren modal)
          const esProyectoInteractivo = [1,2,3].includes(art.id);

          return (
            <div 
              key={art.id} 
              onClick={() => {
                if (esProyectoInteractivo) {
                  // Ahora pasamos el ID o el objeto completo al estado
                  setProyectoSeleccionado(art); 
                  setModalAbierto(true);
                }
              }}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                esProyectoInteractivo ? 'cursor-pointer' : ''
              }`}
            >
              {/* Contenedor de Imagen */}
              <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
                <img 
                  src={art.url} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Efecto visual para CUALQUIER proyecto interactivo */}
                {esProyectoInteractivo && (
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/90 text-blue-600 px-5 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      Lanzar Demo
                    </div>
                  </div>
                )}
              </div>

              {/* Información de la Tarjeta */}
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">
                  {art.category}
                </span>
                <h4 className="text-xl font-bold text-slate-800">{art.title}</h4>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {art.desc}
                </p>
                
                {/* Footer dinámico según el tipo de proyecto */}
                {esProyectoInteractivo && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {art.id === 2 ? 'React + Recharts' : 'Fintech + Live API'}
                    </span>
                    <div className="text-blue-600 font-bold text-[10px] flex items-center gap-1">
                      PROYECTO VIVO →
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
        {modalAbierto && proyectoSeleccionado && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setModalAbierto(false)} />
            
            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto  rounded-3xl z-10 p-6 
              scrollbar-thin 
              scrollbar-thumb-slate-300 
              scrollbar-track-transparent 
              hover:scrollbar-thumb-blue-400">
              {/* Lógica para intercambiar el contenido */}
              {proyectoSeleccionado.id === 1 && <MonitorTasas />}
              {proyectoSeleccionado.id === 2 && <SEODashboard />}
              {proyectoSeleccionado.id === 3 && <KanbanPlanner />}
              
              <button onClick={() => setModalAbierto(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20 mt-20 border-t border-slate-100 bg-white rounded-3xl">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-slate-900">¿Tienes un proyecto en mente?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-6">Canales Directos</h4>
                
                {/* BOTÓN COPIAR EMAIL */}
                <button 
                  onClick={copiarEmail}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all group relative overflow-hidden"
                >
                  <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-blue-600 transition-colors">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase">{copiado ? "¡Listo!" : "Email"}</p>
                    <p className="text-slate-700 font-medium text-sm">{copiado ? "Copiado al portapapeles" : "Haz clic para copiar email"}</p>
                  </div>
                  {copiado && (
                    <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="text-blue-700 font-bold text-sm">✓ COPIADO</span>
                    </div>
                  )}
                </button>

                <a href="https://github.com/Jdev900" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all group">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-slate-900"><Github size={24} /></div>
                  <div>
                    <p className="text-xs opacity-50 font-bold uppercase">GitHub</p>
                    <p className="font-medium text-sm">github.com/tu-usuario</p>
                  </div>
                </a>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Tu nombre" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                <textarea rows={4} placeholder="Tu mensaje" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-slate-200 bg-white p-12 text-center text-slate-400">
        <p>© 2026 • San Cristóbal, Venezuela</p>
      </footer>
    </div>
  );
}