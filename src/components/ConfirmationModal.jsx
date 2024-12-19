import { createSignal } from 'solid-js'
import styles from './ConfirmationModal.module.css'

const ConfirmationModal = props => {
	const { isOpen, onClose, onConfirm } = props

	if (!isOpen) return null

	return (
		<div class={styles.modalOverlay}>
			<div class={styles.modalContent}>
				<button class={styles.closeButton} onClick={onClose}>
					×
				</button>
				<h2>Подтверждение</h2>
				<p>Вы уверены, что хотите применить изменения?</p>
				<button onClick={onConfirm}>Да</button>
				<button onClick={onClose}>Нет</button>
			</div>
		</div>
	)
}

export default ConfirmationModal
