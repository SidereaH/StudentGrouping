export const capitalizeFullName = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const validateFullName = (name) => {
  // Если поле пустое, не показываем ошибку
  if (!name.trim()) {
    return "Недопустимо пустое поле!";
  }

  // Проверка на наличие цифр
  if (/\d/.test(name)) {
    return "ФИО не должно содержать цифры";
  }

  const words = name.trim().split(/\s+/);
  if (words.length !== 3) {
    return "ФИО должно содержать три слова (Фамилия Имя Отчество)";
  }
  return null;
};

export const validateGroupNumber = (group) => {
  // Если поле пустое, не показываем ошибку
  if (!group.trim()) {
    return "Недопустимо пустое поле!";
  }

  const groupRegex = /^ИСП(9|11)-Kh([1-2][1-5])$/;
  
  if (!groupRegex.test(group)) {
    return "Неверный формат группы. Примеры: ИСП9-Kh21, ИСП11-Kh11";
  }
  
  // Дополнительная проверка числа после Kh (должно быть от 11 до 25)
  const number = parseInt(group.split('Kh')[1]);
  if (number < 11 || number > 25) {
    return "Не существует такой группы";
  }
  
  return null;
};

export const formatGroupNumber = (group) => {
  return group
    .replace(/исп/i, 'ИСП')
    .replace(/kh/i, 'Kh');
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return null;
  }

  // Базовая проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Неверный формат email";
  }

  // Проверка на допустимые домены (например, только .ru или .com)
  const allowedDomains = ['.ru', '.com'];
  if (!allowedDomains.some(domain => email.toLowerCase().endsWith(domain))) {
    return "Допустимы только домены .ru и .com";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return null;
  }

  if (password.length < 8) {
    return "Пароль должен содержать минимум 8 символов";
  }

  if (!/[A-Z]/.test(password)) {
    return "Пароль должен содержать хотя бы одну заглавную букву";
  }

  if (!/[a-z]/.test(password)) {
    return "Пароль должен содержать хотя бы одну строчную букву";
  }

  if (!/\d/.test(password)) {
    return "Пароль должен содержать хотя бы одну цифру";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)";
  }

  return null;
}; 