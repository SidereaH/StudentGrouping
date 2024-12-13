import { A } from "@solidjs/router";
import styles from './App.module.css';
import { createSignal } from "solid-js";
import Profile from "./components/Profile";
import UserModal from "./components/UserModal";

const App = () => {
  // Условное состояние авторизации
  const [isAuthenticated, setIsAuthenticated] = createSignal(true);
  const [isModalOpen, setIsModalOpen] = createSignal(false);

  // Пример данных пользователя
  const user = {
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    group: "ИСП9-Kh23",
  };

  return (
    <div class={styles.App}>
      <h1>Welcome to the Student Grouping App</h1>

      <p>
        <A href="/login">Login</A> or navigate to <A href="/form">Form Page</A> to enter student data.
        {isAuthenticated() && <A href="/profile">Profile</A>}
      </p>
    </div>
  );
};

export default App;

