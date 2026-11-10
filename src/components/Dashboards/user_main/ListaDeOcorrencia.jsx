import styles from "../dashboard.module.css";
import { FaBullhorn, FaPlusCircle } from "react-icons/fa";

export default function ListaDeOcorrencias(){
    return (
        <div className={styles.bento_card && styles.bento_report && "bg-gradient-to-br from-sky-600 to-sky-700 text-white flex flex-col justify-between"}>
                <div>
                    <div className="flex items-center gap-2 text-sky-200 mb-2">
                        <i className="text-white"><FaBullhorn /></i>
                        <span className="text-xs font-semibold uppercase tracking-wider text-sky-100">Ação Rápida</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Presenciou uma Ocorrência?</h2>
                    <p className="text-xs text-sky-100 leading-relaxed mb-4">
                        Reporte acidentes, vias bloqueadas ou buracos graves para alertar outros condutores.
                    </p>
                </div>
                <button className="w-full bg-white hover:bg-slate-100 text-sky-700 font-bold py-3 px-4 rounded-xl shadow transition text-sm flex items-center justify-center gap-2">
                    <i><FaPlusCircle /></i>
                    Reportar Nova Ocorrência
                </button>
            </div>
    );
}