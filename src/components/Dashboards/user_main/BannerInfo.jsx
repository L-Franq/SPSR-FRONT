import styles from "../dashboard.module.css";
import {
  FaLocationDot,
  FaRotateRight,
} from "react-icons/fa6";

export default function BannerInformativo({ isPainelRefresh, zonaDetalhes }) {
  return (
    <section classNameName={styles.banner_zona}>
      <div classNameName={styles.banner_detalhes}>
        <div classNameName={styles.banner_icone}>
          <i>
            <FaLocationDot />
          </i>
        </div>
        <div classNameName={styles.banner_texto}>
          <h2>
            Zona Atual:
            <span id="zona-atual" classNameName={styles.texto_destaque}>
              {zonaDetalhes.zonaAtual}
            </span>
          </h2>
          <p>
            Nível de Risco:
            <span classNameName={styles.texto_alerta}>{zonaDetalhes.nivelDeRisco}</span>
          </p>
        </div>
      </div>
      <button
        onClick={isPainelRefresh}
        classNameName={styles.btn_atualizar}
      >
        <i id="icone-atualizar">
          <FaRotateRight />
        </i>
        <span>Atualizar Dados</span>
      </button>
    </section>
  );
}
