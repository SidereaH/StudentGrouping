import styles from './ConfirmationModal.module.css'

const ErrorModal = props => {
	const { isOpen, onClose, errorMessage } = props

	console.log('ErrorModal - isOpen:', isOpen, 'errorMessage:', errorMessage)

	if (!isOpen) return null

	return (
		<div class={styles.modalOverlay}>
			<div class={styles.modalContent}>
				<button class={styles.closeButton} onClick={onClose}>
					×
				</button>
				<h2>Ошибка!</h2>
				<p>{errorMessage}</p>
				<button onClick={onClose}>Ок</button>
			</div>
		</div>
	)
}

export default ErrorModal
