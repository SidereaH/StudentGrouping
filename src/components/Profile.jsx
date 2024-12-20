import { createSignal } from 'solid-js'
import styles from './Profile.module.css'
import ConfirmationModal from './ConfirmationModal'
import ErrorModal from './ErrorModal'
import { useUser } from '../contexts/UserContext'
import { getUserInfo } from '../utils/user'
import { PriorityModal } from './PriorityModal'

const Profile = () => {
	const { user, setUser } = useUser()
	if (!user()) {
		console.log('User not loaded yet')
		return <p>Loading user information...</p>
	}

	const specialties = ['Frontend', 'Backend', 'Java', '.NET', 'Data Engineer']
	const [firstPriority, setFirstPriority] = createSignal(user().firstPriority)
	const [secondPriority, setSecondPriority] = createSignal(
		user().secondPriority
	)
	const [tempFirstPriority, setTempFirstPriority] = createSignal(
		user().firstPriority
	)
	const [tempSecondPriority, setTempSecondPriority] = createSignal(
		user().secondPriority
	)
	const [activeModal, setActiveModal] = createSignal(null)
	const [activeError, setActiveError] = createSignal(null)
	const [errorMessage, setErrorMessage] = createSignal(null)

	const [isConfirmationModalOpen, setConfirmationModalOpen] =
		createSignal(false)
	const [isChangesPending, setChangesPending] = createSignal(false)

	const handleOpenPriorityModal = () => {
		setTempFirstPriority(firstPriority())
		setTempSecondPriority(secondPriority())
		setActiveModal('priority')
	}
	const updateUser = async e => {
		// Получаем информацию о пользователе
		accessToken = localStorage.getItem('accessToken')
		email = localStorage.getItem('email')
		try {
			const userInfo = await getUserInfo(accessToken, email)
		} catch (err) {
			setErrors(prev => ({ ...prev, submit: err.message }))
		}

		console.log('User info:', userInfo.user)

		// Устанавливаем информацию о пользователе в контексте
		setUser(userInfo.user)
	}

	const handleSavePriorities = () => {
		if (
			tempFirstPriority() === tempSecondPriority() ||
			tempFirstPriority() === secondPriority() ||
			tempSecondPriority() === firstPriority()
		) {
			handleError('Ошибка! Поля не могут повторяться')
		} else {
			setTempFirstPriority(tempFirstPriority())
			setTempSecondPriority(tempSecondPriority())
			console.log(tempFirstPriority(), tempSecondPriority())
			setConfirmationModalOpen(true)
			// setFirstPriority(tempFirstPriority())
			// setSecondPriority(tempSecondPriority())
			// setUser(prevUser => ({
			// 	...prevUser,
			// 	firstPriority: tempFirstPriority(),
			// 	secondPriority: tempSecondPriority(),
			// }))
			// setActiveModal(null)
		}
	}
	const handleConfirmSave = () => {
		// Apply changes if confirmed
		setFirstPriority(tempFirstPriority())
		setSecondPriority(tempSecondPriority())
		setUser(prevUser => ({
			...prevUser,
			firstPriority: tempFirstPriority(),
			secondPriority: tempSecondPriority(),
		}))
		setActiveModal(null)
		setConfirmationModalOpen(false)
	}

	const handleCancelPriorities = () => {
		setActiveModal(null)
	}

	const closeError = () => {
		setActiveError(null)
		setErrorMessage(null)
	}

	const handleError = message => {
		setActiveError('error')
		setErrorMessage(message)
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

			<div>
				<button onClick={handleOpenPriorityModal}>Изменить группу</button>
			</div>

			{activeModal() === 'priority' && (
				<PriorityModal
					isOpen={true}
					onClose={() => setActiveModal(null)}
					tempFirstPriority={tempFirstPriority}
					setTempFirstPriority={setTempFirstPriority}
					tempSecondPriority={tempSecondPriority}
					setTempSecondPriority={setTempSecondPriority}
					specialties={specialties}
					onSave={handleSavePriorities}
					onCancel={handleCancelPriorities}
				/>
			)}

			{activeError() === 'error' && (
				<ErrorModal
					isOpen={true}
					onClose={closeError}
					errorMessage={errorMessage}
				/>
			)}
			{isConfirmationModalOpen() && (
				<ConfirmationModal
					isOpen={true}
					onClose={() => setConfirmationModalOpen(false)}
					onConfirm={handleConfirmSave}
					firstSpec={tempFirstPriority()}
					secondSpec={tempSecondPriority()}
				/>
			)}
		</div>
	)
}

export default Profile
