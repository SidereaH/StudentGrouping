import Profile from '../components/profile/Profile'
import styles from './ProfilePage.module.css'
import ProfileName from '../components/profile/CurrentProfileInfo'
import ProfileButtons from '../components/profile/ProfileButtons'
const ProfilePage = () => {
	return (
		<div class={styles.profilePageContainer}>
			<ProfileName />
			<div class={styles.mainInfo}>
				<ProfileButtons />
			</div>
		</div>
	)
}

export default ProfilePage
