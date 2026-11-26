import styles from "../../../dashboard.module.css";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function VisualizarOcorrencia() {
  return (
    <article className={`${styles.bento_card} ${styles.bento_historico}`}>
      <div className={styles.card_cabecalhos}>
        <div className={styles.card_titulo}>
          <i className={styles.icone_sky}>
            <FaClockRotateLeft />
          </i>
          <h2>Meu Histórico</h2>
        </div>
        <span className={styles.tag_status}>Minhas participações</span>
      </div>

      <div className={styles.estatistica_grid}>
        <div className={styles.estatistica_box}>
          <p className={styles.estatistica_numero} id="estatistica-total">
            3
          </p>
          <p className={styles.estatistica_label}>Enviados</p>
        </div>
        <div className={`${styles.estatistica_box} ${styles.box_alerta}`}>
          <p className={styles.estatistica_numero} id="estatistica-pendentes">
            1
          </p>
          <p className={styles.estatistica_label}>Em Análise</p>
        </div>
        <div className={`${styles.estatistica_box} ${styles.box_sucesso}`}>
          <p className={styles.estatistica_numero} id="estatistica-resolvidos">
            2
          </p>
          <p className={styles.estatistica_label}>Resolvidos</p>
        </div>
      </div>

      <div
        id="lista-historico-utilizador"
        className={`${styles.lista_scroll} ${styles.lista_curta}`}
      >
        <div className={styles.item_ocorrencia}>
          <span className={styles.item_titulo}>Obstáculo na Via</span>
          <span className={`${styles.badge_status} ${styles.badge_amber}`}>
            Resolvido
          </span>
        </div>
        <div className={styles.item_ocorrencia}>
          <span className={styles.item_titulo}>Semáforo Avariado</span>
          <span className={`${styles.badge_status} ${styles.badge_amber}`}>
            Em Análise
          </span>
        </div>
      </div>
    </article>
  );
}
