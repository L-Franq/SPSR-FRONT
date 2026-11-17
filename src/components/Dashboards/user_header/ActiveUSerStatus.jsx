import styles from "../dashboard.module.css";

export default function ActiveUserStatus() {
  return (
    <>
      <span className={styles.user_status}>
        <span className={styles.ponto_status}></span> Ativo
      </span>
    </>
  );
}
