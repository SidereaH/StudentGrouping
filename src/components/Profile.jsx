import { createSignal } from 'solid-js'
import styles from './Profile.module.css'
import ConfirmationModal from './ConfirmationModal'
import ErrorModal from './ErrorModal'
import { useUser } from '../contexts/UserContext'

const PriorityModal = ({
	isOpen,
	onClose,
	tempFirstPriority,
	setTempFirstPriority,
	tempSecondPriority,
	setTempSecondPriority,
	specialties,
	onSave,
	onCancel,
}) => {
	if (!isOpen) return null

	return (
		<div class={styles.modalBackdrop}>
			<div class={styles.modalContent}>
				<h3>Выбор группы</h3>
				<div>
					<p>
						<strong>Приоритетная спициальность:</strong>
					</p>
					<select
						onChange={e => setTempFirstPriority(e.target.value)}
						value={tempFirstPriority()}
					>
						{specialties.map(specialty => (
							<option value={specialty} key={specialty}>
								{specialty}
							</option>
						))}
					</select>
				</div>

				<div>
					<p>
						<strong>Вторичная специальность:</strong>
					</p>
					<select
						onChange={e => setTempSecondPriority(e.target.value)}
						value={tempSecondPriority()}
					>
						{specialties.map(specialty => (
							<option value={specialty} key={specialty}>
								{specialty}
							</option>
						))}
					</select>
				</div>

				<div class={styles.modalActions}>
					<button onClick={onSave}>Сохранить</button>
					<button onClick={onCancel}>Отменить</button>
				</div>

				<button class={styles.closeButton} onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	)
}

const Profile = () => {
	const { user, setUser } = useUser()

	if (!user()) {
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

	// Функция для получения данных о пользователе с помощью accessToken
	const getUserInfo = async (accessToken, email) => {
		const response = await fetch('http://localhost:8081/api/secured/user', {
			method: 'POST',
			headers: {
				authorization: `${accessToken}`,
			},
			body: JSON.stringify({
				user_email: `${email}`,
			}),
		})
		if (response.status == 401) {
			try {
				refreshToken = localStorage.getItem('refreshToken')
				const res = await fetch(
					'http://localhost:8081/api/auth/token/refresh',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							refresh_token: `${refreshToken}`,
						}),
					}
				)

				if (!res.ok) {
					throw new Error(`Error: ${res.status}`)
				}
				const { newRefreshToken, newToken } = await res.json()
				localStorage.setItem('refreshToken', newRefreshToken)
				localStorage.setItem('accessToken', newToken)
				return getUserInfo(newToken, email)
			} catch (err) {
				setError(err.message)
			}
		}
		if (!response.ok) {
			throw new Error('Failed to fetch user info')
		}

		return response.json() // Возвращаем информацию о пользователе
	}
	const handleSavePriorities = () => {
		if (
			tempFirstPriority() === tempSecondPriority() ||
			tempFirstPriority() === secondPriority() ||
			tempSecondPriority() === firstPriority()
		) {
			handleError('Ошибка! Поля не могут повторяться')
		} else {
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
						<strong>Группа:</strong> {user().Group.group_name}
					</p>
					<p>
						<strong>Специальность:</strong> {user().Group.speciality_name}
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
				/>
			)}
		</div>
	)
}

export default Profile
