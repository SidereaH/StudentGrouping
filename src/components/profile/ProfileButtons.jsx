import { useUser } from '../../contexts/UserContext'
import styles from './ProfileButtons.module.css'
import { createSignal } from 'solid-js'
import Profile from '../profile/Profile'
import PriorityChange from './PriorityChange'

const ProfileButtons = () => {
	const { user } = useUser()
	const [showProfile, setShowProfile] = createSignal(false)
	const [showPriorityModal, setShowPriorityModal] = createSignal(false)
	setShowProfile(true)
	const handleOpenPriorityModal = () => {
		setShowPriorityModal(true)
		setShowProfile(false)
	}

	const handleShowProfile = () => {
		setShowProfile(true)
		setShowPriorityModal(false)
	}

	if (user().role === 'ROLE_ADMIN') {
		return (
			<div class={styles.profileButtons}>
				<button onClick={handleShowProfile}>Обо мне</button>
				<button>Добавить студента</button>
				<button>Просмотр групп</button>
			</div>
		)
	} else {
		return (
			<div class={styles.profile}>
				<div class={styles.profileButtons}>
					<button onClick={handleShowProfile}>Обо мне</button>
					<button onClick={handleOpenPriorityModal}>Изменить группу</button>
				</div>

				{showProfile() && <Profile />}
				{showPriorityModal() && <PriorityChange />}
			</div>
		)
	}
}

export default ProfileButtons
