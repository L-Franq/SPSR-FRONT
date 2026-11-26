import { FaRoad } from "react-icons/fa";
import styles from "../../../ocorrencia.module.css";

export default function OcorrenciaSide() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logo_icon}>
          <i>
            <FaRoad />
          </i>
        </div>
        <div>
          SAPAR<small>Sistema de Alertas e Prevenção de Acidentes Rodoviários</small>
        </div>
      </div>

      <div className={styles.side_bottom}>
        SAPAR · Sistema de Alertas e Prevenção de Acidentes Rodoviários
      </div>
    </aside>
  );
}
