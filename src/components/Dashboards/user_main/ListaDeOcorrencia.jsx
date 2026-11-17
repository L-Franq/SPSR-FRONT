import styles from "../dashboard.module.css";
import { FaListUl } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

export default function ListaDeOcorrencias(){
    return (
        <article className={styles.bento_card && styles.bento_zona}>
                <div className={styles.card_cabecalho}>
                    <div className={styles.card_titulo}>
                        <i className={styles.icone_sky}><FaListUl /></i>
                        <h2>Ocorrências na Zona</h2>
                    </div>
                    <span id="contador-ocorrencias-zona" className={styles.badge_contador}>2</span>
                </div>

                <div id="lista-ocorrencias-zona" className={styles.lista_scroll}>
                    <div className={styles.item_ocorrencia}>
                        <div className={styles.item_left}>
                            <i className={styles.icone_sky}><FaTriangleExclamation /></i>
                            <div>
                                <h4 className={styles.item_titulo}>Obras na Pista</h4>
                                <p className={styles.item_subtitulo}>Via Expressa - KM 14</p>
                            </div>
                        </div>
                        <span className={styles.badge_status && styles.badge_sky}>Em Análise</span>
                    </div>
                    <div className={styles.item_ocorrencia}>
                        <div className={styles.item_left}>
                            <i className={styles.icone_sky}><FaTriangleExclamation /></i>
                            <div>
                                <h4 className={styles.item_titulo}>Buraco Grave</h4>
                                <p className={styles.item_subtitulo}>Avenida Fidel Castro</p>
                            </div>
                        </div>
                        <span className={styles.badge_status && styles.badge_sky}>Pendente</span>
                    </div>
                </div>
            </article>
    );
}