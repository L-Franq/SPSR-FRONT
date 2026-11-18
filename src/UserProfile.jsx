import styles from "./userprofile.module.css";
import ProfileHeader from "./components/Dashboards/user_perfil/ProfileHeader";
import ProfileFooter from "./components/Dashboards/user_perfil/ProfileFooter";
import ProfileMain from "./components/Dashboards/user_perfil/ProfileMain";

export default function UserProfile() {
  return (
    <div className={styles.pagina_perfil}>
      <ProfileHeader />
      <ProfileMain />
      <ProfileFooter />
    </div>
  );
}
