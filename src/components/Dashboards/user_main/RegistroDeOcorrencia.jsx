import "tailwindcss";
import styles from "../dashboard.module.css";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function RegistroDeOcorrencias() {
  return (
    <div className={styles.bento_card && styles.bento_history && "flex flex-col justify-between"}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <i className="text-sky-600"><FaClockRotateLeft />9*</i>
          <h2 className="font-bold text-slate-800">Meu Histórico</h2>
        </div>
        <span className="text-xs text-slate-500">Minhas participações</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <p
            className="text-lg font-bold text-slate-800"
            id="estatistica-total"
          >
            0
          </p>
          <p className="text-[10px] text-slate-500 uppercase">Enviados</p>
        </div>
        <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
          <p
            className="text-lg font-bold text-amber-600"
            id="estatistica-pendentes"
          >
            0
          </p>
          <p className="text-[10px] text-amber-600 uppercase">Em Análise</p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
          <p
            className="text-lg font-bold text-emerald-600"
            id="estatistica-resolvidos"
          >
            0
          </p>
          <p className="text-[10px] text-emerald-600 uppercase">Resolvidos</p>
        </div>
      </div>

      <div
        id="lista-historico-utilizador"
        className="space-y-2 overflow-y-auto max-h-[120px] barra-scroll-personalizada"
      ></div>
    </div>
  );
}
