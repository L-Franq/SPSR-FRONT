import styles from "../../../userprofile.module.css";

export default function ProfileFooter() {
  const anoAtual = new Date();
  return (
    <footer className={styles.rodape_principal}>
      <p>&copy; {anoAtual} SPR - Sistema de Prevenção Rodoviária.</p>
    </footer>
  );
}
