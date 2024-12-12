import { createSignal } from "solid-js";
// createSignal - это хук SolidJS для создания реактивного состояния
// он возвращает массив [getter, setter], похоже на useState в React

import { validateEmail, validatePassword } from "../utils/validation";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
      // Создаем реактивное состояние для данных формы
  // credentials() - для получения значения
  // setCredentials - для обновления значения
  const [credentials, setCredentials] = createSignal({
    email: "",
    password: "",
  });
    // Состояние для хранения ошибок валидации

  const [errors, setErrors] = createSignal({
    email: null,
    password: null,
  });
 // Состояние для отслеживания "тронутых" полей
  // Нужно, чтобы показывать ошибки только после взаимодействия с полем
  const [touched, setTouched] = createSignal({
    email: false,
    password: false,
  });
// Функция валидации отдельного поля
  const validateField = (field, value) => {
    let error = null;
     // Используем разные валидаторы в зависимости от поля

    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
    }

    // Обновляем состояние ошибок
    // В SolidJS для обновления объекта нужно создать новый объект

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const handleInput = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (touched()[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, credentials()[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: null,
      password: null,
    });
    
    const emailError = validateField('email', credentials().email);
    const passwordError = validateField('password', credentials().password);

    if (emailError || passwordError) {
      return;
    }

    try {
      console.log("Login attempt:", credentials());
    } catch (err) {
      setErrors(prev => ({ ...prev, submit: "An error occurred during login" }));
    }
  };

  return (
    <div class={styles.loginContainer}>
      <div class={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {errors().submit && (
            <div class={styles.error}>{errors().submit}</div>
          )}
          <div class={styles.inputGroup}>
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              value={credentials().email}
              onInput={(e) => handleInput('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              classList={{
                [styles.inputError]: errors().email && touched().email
              }}
              placeholder="example@domain.com"
            />
            {errors().email && touched().email && (
              <div class={styles.errorMessage}>{errors().email}</div>
            )}
          </div>
          <div class={styles.inputGroup}>
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              value={credentials().password}
              onInput={(e) => handleInput('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              classList={{
                [styles.inputError]: errors().password && touched().password
              }}
              placeholder="Enter your password"
            />
            {errors().password && touched().password && (
              <div class={styles.errorMessage}>{errors().password}</div>
            )}
          </div>
          <button 
            type="submit"
            disabled={errors().email || errors().password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 