import styles from "../dashboard.module.css";
import { FaRectangleAd, FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function Anuncios() {
  return (
    <div className={styles.bento_card && styles.bento_ads && "flex flex-col justify-between border-sky-100 bg-sky-50/30"}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
            Parceiros
          </span>
          <i className="text-slate-400"><FaRectangleAd /></i>
        </div>
        <h3 className="font-bold text-slate-800 text-sm">
          Portal de Serviços & Seguros
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Consulte planos de assistência rodoviária e serviços mecânicos
          parceiros.
        </p>
      </div>
      <a
        href="#portal-anuncios"
        className="mt-4 w-full border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white font-medium py-2 px-3 rounded-lg text-xs transition text-center flex items-center justify-center gap-2"
      >
        Aceder ao Portal{" "}
        <i><FaArrowUpRightFromSquare /></i>
      </a>
    </div>
  );
}
