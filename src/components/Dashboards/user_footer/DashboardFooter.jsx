import styles from "../../../dashboard.module.css";

export default function DashboardFooter() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.rodape_principal}>
      <p>&copy; {anoAtual} SAPAR - Sistema de Alertas e Prevenção de Acidentes Rodoviários.</p>
    </footer>
  );
}
