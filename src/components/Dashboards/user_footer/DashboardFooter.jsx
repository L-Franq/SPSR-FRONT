import styles from "../dashboard.module.css";

export default function DashboardFooter() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.rodape_principal}>
      <p>&copy; `${anoAtual} SPSR - Sistema de Prevenção e Segurança Rodoviária.`</p>
    </footer>
  );
}
