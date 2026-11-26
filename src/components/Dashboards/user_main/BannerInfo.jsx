import styles from "../../../dashboard.module.css";
import {
  FaLocationDot,
  FaRotateRight,
} from "react-icons/fa6";

export default function BannerInformativo({ isPainelRefresh, zonaDetalhes }) {
  return (
    <section className={styles.banner_zona}>
      <div className={styles.banner_detalhes}>
        <div className={styles.banner_icon}>
          <i>
            <FaLocationDot />
          </i>
        </div>
        <div className={styles.banner_texto}>
          <h2>
            Zona Atual:&nbsp; 
            <span id="zona-atual" className={styles.texto_destaque}>
              {zonaDetalhes.zonaAtual}
            </span>
          </h2>
          <p>
            Nível de Risco:&nbsp; 
            <span className={styles.texto_alerta}>{zonaDetalhes.nivelDeRisco}</span>
          </p>
        </div>
      </div>
      <button
        onClick={isPainelRefresh}
        className={styles.btn_atualizar}
      >
        <i id="icone-atualizar">
          <FaRotateRight />
        </i>
        <span>Atualizar Dados</span>
      </button>
    </section>
  );
}
