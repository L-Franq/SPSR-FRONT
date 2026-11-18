import { FaArrowLeft, FaShieldHalved } from "react-icons/fa6";
import styles from "../../../userprofile.module.css";

export default function ProfileHeader() {
  return (
    <header className={styles.cabecalho_principal}>
      <div className={styles.cabecalho_conteudo}>
        <div className={styles.brand_area}>
          <div className={styles.brand_icone}>
            <i>
              <FaShieldHalved />
            </i>
          </div>
          <div className={styles.brand_texto}>
            <h1 className={styles.brand_titulo}>SPR</h1>
            <p className={styles.brand_subtitulo}>
              Sistema de Prevenção Rodoviária
            </p>
          </div>
        </div>

        <nav className={styles.nav_voltar}>
          <a href="/dashboard" className={styles.link_voltar}>
            <i>
              <FaArrowLeft />
            </i>{" "}
            Voltar à Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}
