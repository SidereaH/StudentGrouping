import styles from './ConfirmationModal.module.css'

const MessageModal = props => {
	const { isOpen, onClose, title, message, onConfirm } = props

	if (!isOpen) return null
	console.log('open message')
	if (!onConfirm) {
		return (
			<div class={styles.modalOverlay}>
				<div class={styles.modalContent}>
					<button class={styles.closeButton} onClick={onClose}>
						×
					</button>
					<h2>{title}</h2>
					<p>{message}</p>
					<button onClick={onClose}>Ок</button>
				</div>
			</div>
		)
	}

	return (
		<div class={styles.modalOverlay}>
			<div class={styles.modalContent}>
				<button class={styles.closeButton} onClick={onClose}>
					×
				</button>
				<h2>{title}</h2>
				<p>{message}</p>
				<button onClick={onConfirm}>Ок</button>
			</div>
		</div>
	)
}

export default MessageModal
