import { createSignal } from "solid-js";
import styles from "./Profile.module.css";
import ConfirmationModal from "./ConfirmationModal";

const Profile = () => {
  const [user, setUser] = createSignal({
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    group: "ИСП9-Kh23",
    firstPriority: "Frontend",
    secondPriority: "Backend",
  });
  

  const specialties = ["Frontend", "Backend", "Java", ".NET", "Data Engineer"];
  const [firstPriority, setFirstPriority] = createSignal(user().firstPriority);
  const [secondPriority, setSecondPriority] = createSignal(user().secondPriority);
  const [tempFirstPriority, setTempFirstPriority] = createSignal(user().firstPriority);
  const [tempSecondPriority, setTempSecondPriority] = createSignal(user().secondPriority);
  const [isChanged, setIsChanged] = createSignal(false);
  const [activeModal, setActiveModal] = createSignal(null);


  const handleFirstPriorityChange = (e) => {
    setTempFirstPriority(e.target.value);
    setIsChanged(true);
  };

  const handleSecondPriorityChange = (e) => {
    setTempSecondPriority(e.target.value);
    setIsChanged(true);
  };

  const handleSave = () => {
    setActiveModal("confirmation");
  };

  const handleConfirm = () => {
    setFirstPriority(tempFirstPriority());
    setSecondPriority(tempSecondPriority());
    setIsChanged(false);
    setActiveModal(null);
  };

  const handleCancel = () => {
    setTempFirstPriority(firstPriority());
    setTempSecondPriority(secondPriority());
    setIsChanged(false);
    setActiveModal(null);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div class={styles.profileContainer}>
      <h2>Профиль пользователя</h2>
      <p><strong>Имя:</strong> {user().name}</p>
      <p><strong>Email:</strong> {user().email}</p>
      <p><strong>Группа:</strong> {user().group}</p>
      
      <div>
        <p><strong>Первый приоритет:</strong> {firstPriority()}</p>
        <select onChange={handleFirstPriorityChange} value={tempFirstPriority()}>
          {specialties.map((specialty) => (
            <option value={specialty} key={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      <div>
        <p><strong>Второй приоритет:</strong> {secondPriority()}</p>
        <select onChange={handleSecondPriorityChange} value={tempSecondPriority()}>
          {specialties.map((specialty) => (
            <option value={specialty} key={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      {isChanged() && (
        <div>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={handleCancel}>Отменить</button>
        </div>
      )}

      {activeModal() === "confirmation" && (
        <ConfirmationModal
          isOpen={true}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Profile; 