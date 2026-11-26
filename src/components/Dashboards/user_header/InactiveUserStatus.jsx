import styles from "../../../dashboard.module.css";

export default function InactiveUserStatus() {
  return (
    <>
      <span className={styles.user_status_n}>
              <span className={styles.ponto_status_n}></span> Inativo
            </span>
    </>
  );
}
