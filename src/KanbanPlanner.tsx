import React, { useState, useRef } from 'react';
import { 
  Plus, MessageSquare, Paperclip, ChevronRight, 
  X, Send, File, Loader2, CloudUpload
} from 'lucide-react';

// --- Interfaces ---
interface Task {
  id: string;
  content: string;
  priority: 'Baja' | 'Media' | 'Alta';
  comments: string[]; 
  attachments: string[];
}

interface Column {
  id: 'todo' | 'doing' | 'done';
  title: string;
  tasks: Task[];
}

export const KanbanPlanner = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'Backlog Proyecto',
      tasks: [{ id: '1', content: 'Optimización de carga LCP', priority: 'Alta', comments: [], attachments: [] }]
    },
    { id: 'doing', title: 'En Desarrollo', tasks: [] },
    { id: 'done', title: 'Finalizado', tasks: [] }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false); // Estado para la barra del modal
  const [createProgress, setCreateProgress] = useState(0);
  
  const [taskDetail, setTaskDetail] = useState<Task | null>(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] = useState<'Baja' | 'Media' | 'Alta'>('Media');
  const [commentInput, setCommentInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const totalTareas = columns.reduce((acc, col) => acc + col.tasks.length, 0);
  const tareasFinalizadas = columns.find(c => c.id === 'done')?.tasks.length || 0;
  const porcentaje = totalTareas > 0 ? Math.round((tareasFinalizadas / totalTareas) * 100) : 0;

  // --- Lógica de Creación con Progreso ---
  const handleAddTask = () => {
    if (!newTaskText.trim() || isCreatingTask) return;
    
    setIsCreatingTask(true);
    setCreateProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setCreateProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            content: newTaskText,
            priority: newPriority,
            comments: [],
            attachments: []
          };
          setColumns(columns.map(col => col.id === 'todo' ? { ...col, tasks: [...col.tasks, newTask] } : col));
          setNewTaskText('');
          setIsCreatingTask(false);
          setShowCreateModal(false);
        }, 400);
      }
    }, 100);
  };

  const moverTarea = (e: React.MouseEvent, taskId: string, currentColId: string) => {
    e.stopPropagation();
    const newCols = [...columns];
    const sourceColIndex = newCols.findIndex(c => c.id === currentColId);
    const targetColIndex = sourceColIndex + 1;
    if (targetColIndex < newCols.length) {
      const sourceCol = newCols[sourceColIndex];
      const taskIndex = sourceCol.tasks.findIndex(t => t.id === taskId);
      const [task] = sourceCol.tasks.splice(taskIndex, 1);
      newCols[targetColIndex].tasks.push(task);
      setColumns([...newCols]);
    }
  };

  const handleAddComment = () => {
    if (!commentInput.trim() || !taskDetail) return;
    const updatedCols = columns.map(col => ({
      ...col,
      tasks: col.tasks.map(t => {
        if (t.id === taskDetail.id) {
          const updatedTask = { ...t, comments: [...t.comments, commentInput] };
          setTaskDetail(updatedTask);
          return updatedTask;
        }
        return t;
      })
    }));
    setColumns(updatedCols);
    setCommentInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !taskDetail || isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setColumns(prevCols => prevCols.map(col => ({
          ...col,
          tasks: col.tasks.map(t => {
            if (t.id === taskDetail.id) {
              const updatedTask = { ...t, attachments: [...t.attachments, file.name] };
              setTaskDetail(updatedTask);
              return updatedTask;
            }
            return t;
          })
        })));
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }, 150);
  };

  return (
    <div className="relative min-h-screen w-full pb-10 bg-white font-sans text-slate-900">
      
      {/* Banner Superior */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 mb-8 text-white relative overflow-hidden shadow-2xl border border-slate-800 mx-4 mt-4">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em]">Project Dashboard</span>
            <h2 className="text-3xl font-black mt-2 tracking-tighter italic">FLOW ENGINE</h2>
          </div>
          <div className="text-right">
            <span className="text-5xl font-black text-blue-500">{porcentaje}%</span>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Status</p>
          </div>
        </div>
      </div>

      {/* Tablero Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-slate-50 p-5 rounded-[2.5rem] border border-slate-100 min-h-[500px]">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">{column.title}</h3>
              {column.id === 'todo' && (
                <button onClick={() => setShowCreateModal(true)} className="p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform">
                  <Plus size={18} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {column.tasks.map((task) => (
                <div key={task.id} onClick={() => setTaskDetail(task)} className="bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                  <div className={`w-12 h-1 rounded-full mb-4 ${task.priority === 'Alta' ? 'bg-red-500' : task.priority === 'Media' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                  <p className="text-sm font-bold text-slate-700 mb-6">{task.content}</p>
                  <div className="flex justify-between items-center text-slate-400">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold"><MessageSquare size={13}/> {task.comments.length}</div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold"><Paperclip size={13}/> {task.attachments.length}</div>
                    </div>
                    {column.id !== 'done' && (
                      <button onClick={(e) => moverTarea(e, task.id, column.id)} className="p-2 bg-blue-50 text-blue-600 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal con Barra de Progreso Interna */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            
            {!isCreatingTask && (
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            )}

            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">Nueva Tarea</h3>
            
            <div className="space-y-6">
              <div className={isCreatingTask ? "opacity-40 pointer-events-none transition-opacity" : ""}>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest px-1">Descripción</label>
                <textarea 
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none transition-all" 
                  placeholder="Detalles del ticket..." 
                  value={newTaskText} 
                  onChange={e => setNewTaskText(e.target.value)} 
                />
              </div>

              <div className={isCreatingTask ? "opacity-40 pointer-events-none transition-opacity" : ""}>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest px-1">Prioridad</label>
                <div className="flex gap-2">
                  {(['Baja', 'Media', 'Alta'] as const).map((p) => {
                    const isActive = newPriority === p;
                    const colorClasses = {
                      Baja: isActive ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border-emerald-100 text-emerald-600',
                      Media: isActive ? 'bg-amber-400 border-amber-400 text-white shadow-lg shadow-amber-100' : 'bg-white border-amber-100 text-amber-600',
                      Alta: isActive ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-100' : 'bg-white border-red-100 text-red-600',
                    };
                    return (
                      <button key={p} onClick={() => setNewPriority(p)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${colorClasses[p]}`}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Barra de progreso de creación */}
              {isCreatingTask ? (
                <div className="py-4 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Sincronizando con Servidor...</span>
                    <span className="text-[10px] font-black text-slate-400">{createProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300 ease-out"
                      style={{ width: `${createProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleAddTask} 
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all mt-4"
                >
                  Insertar Registro
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Panel Detalle Lateral */}
      {taskDetail && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setTaskDetail(null)} />
          <div className="relative bg-white h-screen w-full max-w-md shadow-2xl p-10 flex flex-col animate-in slide-in-from-right duration-500">
            <button onClick={() => setTaskDetail(null)} className="w-fit p-3 bg-slate-50 rounded-full mb-8 hover:bg-slate-100 transition-colors"><X size={20} /></button>
            <div className="flex-1 overflow-y-auto pr-2 custom-scroll">
              <div className={`w-12 h-1.5 rounded-full mb-6 ${taskDetail.priority === 'Alta' ? 'bg-red-500' : taskDetail.priority === 'Media' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
              <h3 className="text-3xl font-black text-slate-900 leading-tight mb-10 tracking-tighter">{taskDetail.content}</h3>
              
              <div className="mb-12">
                <h4 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2"><Paperclip size={14}/> Adjuntos</h4>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full p-6 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all mb-4"
                >
                  {isUploading ? <Loader2 size={24} className="animate-spin text-blue-500" /> : <CloudUpload size={24} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{isUploading ? `Subiendo ${uploadProgress}%` : 'Vincular Documento'}</span>
                </button>
                <div className="space-y-2">
                  {taskDetail.attachments.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600"><File size={14} className="text-blue-500" /> {f}</div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-[11px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2"><MessageSquare size={14}/> Feed de Notas</h4>
                <div className="space-y-4">
                  {taskDetail.comments.map((msg, i) => (
                    <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500">U</div>
                      <div className="flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 text-sm text-slate-600 font-medium">{msg}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
               <div className="relative">
                  <input 
                    type="text" 
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddComment()}
                    placeholder="Escribir nota..."
                    className="w-full p-4 pr-14 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                  <button onClick={handleAddComment} className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all"><Send size={18} /></button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};