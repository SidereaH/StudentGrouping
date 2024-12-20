import { createSignal } from 'solid-js'
import styles from './ConfirmationModal.module.css'
import { distributeUser } from '../utils/user'

import { useUser } from '../contexts/UserContext'
const ConfirmationModal = props => {
	const { user, setUser } = useUser()
	const { isOpen, onClose, onConfirm, firstSpec, secondSpec } = props

	if (!isOpen) return null
	const [isLoading, setIsLoading] = createSignal(false) // Состояние загрузки

	// Функция, которая выполняет долгую задачу
	const handleClick = async () => {
		setIsLoading(true) // Устанавливаем состояние загрузки
		try {
			await new Promise(resolve => setTimeout(resolve, 2000)) // Пример задержки 2 секунды
			console.log('Функция завершена!')
		} catch (error) {
			console.error('Ошибка:', error)
		} finally {
			setIsLoading(false) // Сбрасываем состояние загрузки
		}
	}
	const handleDistributeUser = async () => {
		setIsLoading(true)
		try {
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
			console.log(newuser)
		} catch (error) {
			console.error('Ошибка API:', error)
		} finally {
			setIsLoading(false)
			onConfirm()
		}
	}

	return (
		<div class={styles.modalOverlay}>
			<div class={styles.modalContent}>
				<button class={styles.closeButton} onClick={onClose}>
					×
				</button>
				<h2>Подтверждение</h2>
				<p>Вы уверены, что хотите применить изменения?</p>
				<button onClick={handleDistributeUser}>
					{isLoading() ? (
						<div class='loader'></div> // Показать анимацию загрузки
					) : (
						<span>Да</span> // Показать текст или иконку кнопки
					)}
				</button>
				<button onClick={onClose}>Нет</button>
			</div>
		</div>
	)
}

export default ConfirmationModal
