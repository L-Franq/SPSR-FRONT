import styles from "../../cadastro.module.css";
import { FaLocationDot, FaShieldHalved, FaMapLocationDot, FaBullhorn, FaUsers } from "react-icons/fa6";

export default function CadastroVisual(){
    return(
        <section className={styles.register_visual}>
        <div className={styles.visual_content}>
          <div className={styles.brand}>
            <div className={styles.brand_icon}>
              <i><FaLocationDot /></i>
            </div>

            <span>
              SPSR<span className={styles.brand_dot}>.</span>
            </span>
          </div>

          <div className={styles.visual_text}>
            <span className="tag">
              <i><FaShieldHalved /></i>&nbsp;
              SEGURANCA RODOVIARIA
            </span>

            <h1>Faça parte de uma comunidade mais segura.</h1>

            <p>
              Crie a sua conta e contribua para identificar, acompanhar e
              reportar ocorrências na sua zona.
            </p>
          </div>

          <div className={styles.visual_features}>
            <div className={styles.feature_item}>
              <div className={styles.feature_icon}>
                <i><FaMapLocationDot /></i>
              </div>

              <div>
                <h3>Monitorização local</h3>
                <p>Acompanhe ocorrências na sua comunidade.</p>
              </div>
            </div>

            <div className={styles.feature_item}>
              <div className={styles.feature_icon}>
                <i><FaBullhorn /></i>
              </div>

              <div>
                <h3>Reportes rápidos</h3>
                <p>Ajude a comunicar situações importantes.</p>
              </div>
            </div>
          </div>

          <div className={styles.visual_footer}>
            <i><FaUsers /></i>
            <span>Uma comunidade. Um propósito.</span>
          </div>
        </div>
      </section>
    )
}