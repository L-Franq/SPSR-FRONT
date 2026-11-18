import styles from "../../../userprofile.module.css";
import { FaUser, FaCamera, FaIdCard, FaCalendarDays } from "react-icons/fa6";

export default function ProfileMainAside() {
  return (
    <aside className={styles.perfil_card_lateral}>
      <div className={styles.avatar_grande_wrapper}>
        <div className={styles.avatar_grande}>
          <i>
            <FaUser />
          </i>
        </div>
        <button
          type="button"
          className={styles.btn_alterar_foto}
          title="Alterar fotografia"
        >
          <i>
            <FaCamera />
          </i>
        </button>
      </div>

      <h2 className={styles.perfil_nome_exibicao}>Nerissa Chindombe</h2>
      <p className={styles.perfil_cargo_exibicao}>Condutora Registada</p>

      <div className={styles.perfil_status_badge}>
        <span className={styles.ponto_status}></span> Conta Verificada
      </div>

      <div className={styles.perfil_info_rapida}>
        <div className={styles.info_item_rapido}>
          <i>
            <FaIdCard />
          </i>
          <span>BI: 004829182LA042</span>
        </div>
        <div className={styles.info_item_rapido}>
          <i>
            <FaCalendarDays />
          </i>
          <span>Membro desde: Outubro 2026</span>
        </div>
      </div>
    </aside>
  );
}
