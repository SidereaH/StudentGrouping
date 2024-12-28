import { useUser } from '../../contexts/UserContext'
import { GetAvaliableSpecialities } from '../../utils/groups'
import ConfirmationModal from '../modals/ConfirmationModal'
import MessageModal from '../modals/MessageModal'
import styles from './Profile.module.css'
import { createSignal, onMount } from 'solid-js'

const PriorityChange = () => {
	const { user, setUser } = useUser()
	if (!user()) {
		console.log('User not loaded yet')
		return <p>Loading user information...</p>
	}
	const [specialities, setSpecialities] = createSignal([])

	// Initialize other state
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
	const [isConfirmationModalOpen, setConfirmationModalOpen] =
		createSignal(false)

	const [activeMessage, setActiveMessage] = createSignal(null)
	const [message, setMessage] = createSignal(null)
	// Fetch specialities on mount
	onMount(async () => {
		try {
			const data = await GetAvaliableSpecialities()
			if (Array.isArray(data.specialities)) {
				setSpecialities(data.specialities)
			} else {
				handleMessage('Invalid data format received for specialities')
			}
		} catch (err) {
			handleError('Failed to load specialities: ' + err.message)
		}
	})
	const closeMessage = () => {
		setActiveMessage(null)
		setMessage(null)
	}

	const handleError = message => {
		setActiveMessage('error')
		setMessage(message)
	}
	const handleSuccess = message => {
		setActiveMessage('message')
		setMessage(message)
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
		}
	}
	const handleConfirmSave = () => {
		setConfirmationModalOpen(false)
	}
	setTempFirstPriority(user.speciality_name)
	return (
		<div class={styles.profileContainer}>
			<div>
				<h3>Выбор группы</h3>
				<div>
					<p>
						Текущая группа - {user().group_name} {user().speciality_name}
					</p>
					<p>
						<strong>Приоритетная спициальность:</strong>
					</p>
					<select
						onChange={e => setTempFirstPriority(e.target.value)}
						value={tempFirstPriority()}
					>
						{specialities().map(specialty => (
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
						{specialities().map(specialty => (
							<option value={specialty} key={specialty}>
								{specialty}
							</option>
						))}
					</select>
				</div>

				<div>
					<button onClick={handleSavePriorities}>Сохранить</button>
					{/* <button>Отменить</button> */}
				</div>
			</div>

			{activeMessage() === 'error' && (
				<MessageModal
					isOpen={true}
					onClose={closeMessage}
					title={'Ошибка'}
					message={message}
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
export default PriorityChange
