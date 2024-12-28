import styles from './CurrentProfileInfo.module.css'
import { useUser } from '../../contexts/UserContext'

const CurrentProfileInfo = () => {
	const { user } = useUser()

	return (
		<div class={styles.profileName}>
			<a href='/profile'>
				<p>
					{user().second_name} {user().first_name} {user().middle_name}
				</p>
			</a>
		</div>
	)
}
export default CurrentProfileInfo
