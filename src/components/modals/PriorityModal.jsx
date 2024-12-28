import styles from '../profile/Profile.module.css'

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

export default PriorityModal
