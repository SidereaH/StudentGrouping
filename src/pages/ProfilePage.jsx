import Profile from "../components/Profile";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div class={styles.profilePageContainer}>
      <Profile />
    </div>
  );
};

export default ProfilePage; 