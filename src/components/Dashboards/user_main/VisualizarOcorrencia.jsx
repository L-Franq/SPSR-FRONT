import "tailwindcss";
import "../dashboard.module.css";

export default function VisualizarOcorrencia() {

  return (
    <div className="bento-card bento-zone flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-list-ul text-sky-600"></i>
          <h2 className="font-bold text-slate-800">Ocorrências na Zona</h2>
        </div>
        <span
          id="contador-ocorrencias-zona"
          className="bg-sky-100 text-sky-700 text-xs px-2.5 py-0.5 rounded-full font-semibold"
        >
          0
        </span>
      </div>

      <div
        id="lista-ocorrencias-zona"
        className="space-y-3 flex-1 overflow-y-auto max-h-[320px] barra-scroll-personalizada pr-1"
      >
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-slate-100 rounded-xl"></div>
          <div className="h-16 bg-slate-100 rounded-xl"></div>
          <div className="h-16 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
