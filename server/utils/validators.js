const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRegistration = (data) => {
  const errors = [];

  if (!data.full_name || data.full_name.length < 2) {
    errors.push("имя должно содержать минимум 2 символа");
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.push("некорректный email");
  }
  if (!data.password || data.password.length < 6) {
    errors.push("пароль должен содержать минимум 6 символов");
  }
  if (data.password.length > 128) {
    errors.push("пароль не должен содержать более 128 символов");
  }
  return errors;
};

const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("некорректный email");
  }
  if (!data.password || data.password.length < 1) {
    errors.push("пароль обязателен");
  }
  if (data.password.length > 128) {
    errors.push("пароль не должен содержать более 128 символов");
  }
  return errors;
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateEmail,
};
