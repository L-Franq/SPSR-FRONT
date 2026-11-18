import { FaUserPen } from "react-icons/fa6";
import styles from "../../../userprofile.module.css";
import ProfileMainAside from "./ProfileMainAside";
import ProfileForm from "./ProfileForm";

export default function ProfileMain() {
  return (
    <main className={styles.conteudo_principal}>
      <div className={styles.perfil_container}>
        <ProfileMainAside />

        <section className={styles.perfil_card_formulario}>
          <div className={styles.card_cabecalho_form}>
            <div className={styles.card_titulo}>
              <i className={styles.icone_sky}>
                <FaUserPen />
              </i>
              <h2>Dados Pessoais e de Conta</h2>
            </div>
            <p className={styles.card_subtitulo_form}>
              Consulte e atualize as suas informações de identificação e
              contacto.
            </p>
          </div>

          <ProfileForm />
        </section>
      </div>
    </main>
  );
}
