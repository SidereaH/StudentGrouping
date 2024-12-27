import { createSignal } from 'solid-js'
import styles from './ConfirmationModal.module.css'
import ErrorModal from './ErrorModal'
import { distributeUser } from '../utils/user'
import { useUser } from '../contexts/UserContext'

const ConfirmationModal = props => {
	const { user, setUser } = useUser()
	const { isOpen, onClose, onConfirm, firstSpec, secondSpec } = props

	if (!isOpen) return null

	const [isLoading, setIsLoading] = createSignal(false) // Состояние загрузки

	const [activeError, setActiveError] = createSignal(null)
	const [errorMessage, setErrorMessage] = createSignal(null)

	const handleDistributeUser = async () => {
		setIsLoading(true)
		setErrorMessage('') // Сбрасываем ошибку перед новым запросом
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
			console.log('Пользователь обновлён:', newuser)
		} catch (error) {
			console.error('Ошибка при распределении пользователя:', error)
			const errorMsg = error.message
			handleError(errorMsg)
		} finally {
			setIsLoading(false)
		}
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

			{activeError() === 'error' && (
				<ErrorModal
					isOpen={true}
					onClose={closeError}
					errorMessage={errorMessage}
					onConfirm={onConfirm}
				/>
			)}
		</>
	)
}

export default ConfirmationModal
