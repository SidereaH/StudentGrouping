import { createSignal } from "solid-js";
import styles from "./UserModal.module.css";

const UserModal = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div class={styles.modalOverlay}>
      <div class={styles.modalContent}>
        <button class={styles.closeButton} onClick={onClose}>×</button>
        <h2>Информация о пользователе</h2>
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Группа:</strong> {user.group}</p>
      </div>
    </div>
  );
};

export default UserModal; 