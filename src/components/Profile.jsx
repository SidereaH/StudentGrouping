import { createSignal } from "solid-js";
import styles from "./Profile.module.css";
import ConfirmationModal from "./ConfirmationModal";
import ErrorModal from "./ErrorModal";
import { useUser } from "../contexts/UserContext"; // Import user context

const Profile = () => {
  const { user, setUser } = useUser(); // Access user information and setUser

  if (!user()) {
    return <p>Loading user information...</p>;
  }

  const specialties = ["Frontend", "Backend", "Java", ".NET", "Data Engineer"];
  const [firstPriority, setFirstPriority] = createSignal(user().firstPriority);
  const [secondPriority, setSecondPriority] = createSignal(user().secondPriority);
  const [tempFirstPriority, setTempFirstPriority] = createSignal(user().firstPriority);
  const [tempSecondPriority, setTempSecondPriority] = createSignal(user().secondPriority);
  const [isChanged, setIsChanged] = createSignal(false);
  const [activeModal, setActiveModal] = createSignal(null);
  const [activeError, setActiveError] = createSignal(null);
  const [errorMessage, setErrorMessage] = createSignal(null);

  const handleFirstPriorityChange = (e) => {
    setTempFirstPriority(e.target.value);
    setIsChanged(true);
  };

  const handleSecondPriorityChange = (e) => {
    setTempSecondPriority(e.target.value);
    setIsChanged(true);
  };

  const handleSave = () => {
    if (
      tempFirstPriority() === tempSecondPriority() || 
      tempFirstPriority() === secondPriority() ||
      tempSecondPriority() === firstPriority() ||
      tempFirstPriority() === tempSecondPriority()
    ) {
      handleError("Ошибка! Поля не могут повторяться");
    } else {
      setActiveModal("confirmation");
    }
  };

  const handleConfirm = () => {
    // Сохраняем обновленные значения в контекст пользователя
    setUser((prevUser) => ({
      ...prevUser,
      firstPriority: tempFirstPriority(),
      secondPriority: tempSecondPriority()
    }));

    // Обновляем локальные сигналы для отображения новых значений
    setFirstPriority(tempFirstPriority());
    setSecondPriority(tempSecondPriority());

    setIsChanged(false);
    setActiveModal(null);
    logUserFields();
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

  const closeError = () => {
    setActiveError(null);
  };

  const handleError = (message) => {
    setActiveError("error");
    setErrorMessage(message);
  };

  const logUserFields = () => {
    const userData = user(); // Получаем текущее значение объекта user
  
    if (!userData) {
      console.log("Пользователь не авторизован");
      return;
    }
  
    // Перебор всех полей объекта
    Object.entries(userData).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  };

  return (
    <div class={styles.profileContainer}>
      <h2>Профиль пользователя</h2>
      {user() ? (
        <>
          <p><strong>Имя:</strong> {user().name}</p>
          <p><strong>Email:</strong> {user().email}</p>
          <p><strong>Группа:</strong> {user().group}</p>
        </>
      ) : (
        <p>Пользователь не авторизован</p>
      )}
      
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
      {activeError() === "error" && (
        <ErrorModal
          isOpen={true}
          onClose={closeError}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default Profile;
