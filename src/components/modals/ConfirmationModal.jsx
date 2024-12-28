import { createSignal } from 'solid-js'
import styles from './ConfirmationModal.module.css'
import ErrorModal from './ErrorModal'
import { distributeUser } from '../../utils/user'
import { useUser } from '../../contexts/UserContext'
import MessageModal from './MessageModal'

const ConfirmationModal = props => {
	const { user, setUser } = useUser()
	const { isOpen, onClose, onConfirm, firstSpec, secondSpec } = props

	if (!isOpen) return null

	const [isLoading, setIsLoading] = createSignal(false) // Состояние загрузки

	const [activeMessage, setActiveMessage] = createSignal(null)
	const [message, setMessage] = createSignal(null)

	const handleDistributeUser = async () => {
		setIsLoading(true)
		setMessage('') // Сбрасываем ошибку перед новым запросом
		try {
			console.log('Начало handleDistributeUser') // Отладка
			let accessToken = localStorage.getItem('accessToken')
			let refreshToken = localStorage.getItem('refreshToken')
			let email = user().email

			const newuser = await distributeUser(
				accessToken,
				refreshToken,
				email,
				firstSpec,
				secondSpec
			)
			setUser(newuser)
			handleSuccess(
				'Вы были успешно распределены в группу по специальности ' +
					newuser.speciality_name
			)
			console.log('Пользователь обновлён:', newuser)
		} catch (error) {
			console.error('Ошибка при распределении пользователя:', error)
			const errorMsg = error.message
			handleError(errorMsg)
		} finally {
			setIsLoading(false)
		}
	}

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
	return (
		<>
			{/* Основное модальное окно */}
			<div class={styles.modalOverlay}>
				<div class={styles.modalContent}>
					<button class={styles.closeButton} onClick={onClose}>
						×
					</button>
					<h2>Подтверждение</h2>
					<p>Вы уверены, что хотите применить изменения?</p>
					<button onClick={handleDistributeUser} disabled={isLoading()}>
						{isLoading() ? (
							<div class='loader'></div> // Показать анимацию загрузки
						) : (
							<span>Да</span> // Показать текст или иконку кнопки
						)}
					</button>
					<button onClick={onClose}>Нет</button>
				</div>
			</div>

			{activeMessage() === 'error' && (
				<MessageModal
					isOpen={true}
					onClose={closeMessage}
					title={'Ошибка'}
					message={message}
					onConfirm={onConfirm}
				/>
			)}
			{activeMessage() === 'message' && (
				<MessageModal
					isOpen={true}
					onClose={closeMessage}
					title={'Успешно'}
					message={message}
					onConfirm={onConfirm}
				/>
			)}
		</>
	)
}

export default ConfirmationModal
