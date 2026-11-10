import styles from "../../cadastro.module.css";
import { FaShieldHalved } from "react-icons/fa6";

export default function PrivacyFooter() {
  return (
    <div className={styles.privacy_footer}>
      <i>
        <FaShieldHalved />
      </i>

      <p>Os seus dados são tratados com segurança e responsabilidade.</p>
    </div>
  );
}
