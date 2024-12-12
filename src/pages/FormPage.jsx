import { createSignal } from "solid-js";
import { validateFullName, validateGroupNumber, capitalizeFullName, formatGroupNumber } from "../utils/validation";
import styles from "./FormPage.module.css";

const FormPage = () => {
  const [studentData, setStudentData] = createSignal({
    name: "",
    group: "",
    hasDebt: false,
  });

  const [errors, setErrors] = createSignal({
    name: null,
    group: null,
  });

  const [touched, setTouched] = createSignal({
    name: false,
    group: false,
  });

  const validateField = (field, value) => {
    let error = null;
    
    switch (field) {
      case 'name':
        error = validateFullName(value);
        break;
      case 'group':
        error = validateGroupNumber(value);
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const handleInput = (field, value) => {
    if (field === 'name') {
      // Проверяем, является ли последний введенный символ пробелом
      const isSpace = value.endsWith(' ') && value.length > studentData().name.length;
      
      // Если это пробел, оставляем его, иначе капитализируем
      const newValue = isSpace ? value : capitalizeFullName(value);
      
      setStudentData(prev => ({ ...prev, [field]: newValue }));
      if (touched()[field]) {
        validateField(field, newValue);
      }
    } else if (field === 'group') {
      // Форматируем номер группы
      const formattedValue = formatGroupNumber(value);
      
      setStudentData(prev => ({ ...prev, [field]: formattedValue }));
      if (touched()[field]) {
        validateField(field, formattedValue);
      }
    } else {
      setStudentData(prev => ({ ...prev, [field]: value }));
      if (touched()[field]) {
        validateField(field, value);
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, studentData()[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
 
    
    // Валидация всех полей перед отправкой
    const nameError = validateField('name', studentData().name);
    const groupError = validateField('group', studentData().group);

    // Если есть ошибки, прерываем отправку
    if (nameError || groupError) {
      return;
    }

    console.log(studentData());
    // Здесь будет логика отправки данных
  };

  return (
    <div style={{ "padding": "40px 20px" }}>
      <h1 style={{ 
        "color": "#2c1810",
        "font-size": "2.5rem",
        "margin-bottom": "2rem",
        "text-align": "center"
      }}>Добавить хабса</h1>
      <form onSubmit={handleSubmit}>
        <div class={styles.formGroup}>
          <label>Полное имя:</label>
          <input
            type="text"
            value={studentData().name}
            onInput={(e) => handleInput('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            classList={{
              [styles.inputError]: errors().name && touched().name
            }}
            placeholder="Фамилия Имя Отчество"
          />
          {errors().name && touched().name && (
            <div class={styles.errorMessage}>{errors().name}</div>
          )}
        </div>
        <div class={styles.formGroup}>
          <label>Группа:</label>
          <input
            type="text"
            value={studentData().group}
            onInput={(e) => handleInput('group', e.target.value)}
            onBlur={() => handleBlur('group')}
            classList={{
              [styles.inputError]: errors().group && touched().group
            }}
            placeholder="ИСП9-Kh23"
          />
          {errors().group && touched().group && (
            <div class={styles.errorMessage}>{errors().group}</div>
          )}
        </div>
        <div class={styles.formGroup}>
          <label style={{ "display": "flex", "align-items": "center" }}>
            <input
              type="checkbox"
              checked={studentData().hasDebt}
              onChange={(e) =>
                setStudentData({ ...studentData(), hasDebt: e.target.checked })
              }
            />
            Задолженность
          </label>
        </div>
        <button 
          type="submit"
          disabled={errors().name || errors().group}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
