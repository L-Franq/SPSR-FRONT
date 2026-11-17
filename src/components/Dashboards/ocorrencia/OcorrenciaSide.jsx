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
          SPSR<small>Sistema de Prevenção e Segurança Rodoviário</small>
        </div>
      </div>

      <div className={styles.side_bottom}>
        SPSR · Sistema de Prevenção e Segurança Rodoviário
      </div>
    </aside>
  );
}
