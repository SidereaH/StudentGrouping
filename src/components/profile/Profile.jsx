import styles from './Profile.module.css'
import { useUser } from '../../contexts/UserContext'
const Profile = () => {
	const { user, setUser } = useUser()
	if (!user()) {
		console.log('User not loaded yet')
		return <p>Loading user information...</p>
	}

	return (
		<div class={styles.profileContainer}>
			<h2>Профиль пользователя</h2>
			{user() ? (
				<>
					<p>
						<strong>Имя:</strong> {user().second_name} {user().first_name}{' '}
						{user().middle_name}
					</p>
					<p>
						<strong>Email:</strong> {user().email}
					</p>
					<p>
						<strong>Группа:</strong> {user().group_name}
					</p>
					<p>
						<strong>Специальность:</strong> {user().speciality_name}
					</p>
				</>
			) : (
				<p>Пользователь не авторизован</p>
			)}
		</div>
	)
}

export default Profile
