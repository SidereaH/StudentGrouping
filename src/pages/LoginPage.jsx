import { createSignal } from "solid-js";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [credentials, setCredentials] = createSignal({
    email: "",
    password: "",
  });
  const [error, setError] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // Здесь будет логика авторизации
      console.log("Login attempt:", credentials());
      
      // Пример структуры запроса для будущего API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(credentials()),
      // });
      
      // if (response.ok) {
      //   const data = await response.json();
      //   localStorage.setItem('token', data.token);
      //   // Редирект на главную страницу
      //   window.location.href = '/';
      // } else {
      //   setError('Invalid credentials');
      // }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div class={styles.loginContainer}>
      <div class={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error() && <div class={styles.error}>{error()}</div>}
          <div class={styles.inputGroup}>
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              value={credentials().email}
              onInput={(e) =>
                setCredentials({ ...credentials(), email: e.target.value })
              }
              required
            />
          </div>
          <div class={styles.inputGroup}>
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={credentials().password}
              onInput={(e) =>
                setCredentials({ ...credentials(), password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 