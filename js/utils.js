const formValues = {}; // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {};
const signInFormValues = {};
const signInFormValidation = {}; // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
  const regExp = /^[a-zA-Z0-9]{6,}$/;

  return String(password).toLowerCase().match(regExp)
};

export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return String(email).toLowerCase().match(regExp);
};

// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every(
    (validationStatus) => !!validationStatus
  );
};

// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue;
  if(typeof validator == "boolean") {
    formValidation[valueKey] = validator
  }
  else if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue);
  }
};
export const setSignInFormValue = (valueKey, newValue, validator) => {
  signInFormValues[valueKey] = newValue;
  if(typeof validator == "boolean") {
    signInFormValidation[valueKey] = validator
  }
  else if (validator !== undefined) {
    signInFormValidation[valueKey] = validator(newValue);
  }
};

// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = (req_list) => {
  if (!getValidationStatus() || !getRequiredStatus(req_list)) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
};

export const getRequiredStatus = (list) => {
  for(let value of list){
    if(!formValues[value]){
      return false
    }
  }
  return true
}

export const getSignInValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(signInFormValidation).every(
    (validationStatus) => !!validationStatus
  );
};

export const getSignInRequiredStatus = (list) => {
  for(let value of list){
    if(!signInFormValues[value]){
      return false
    }
  }
  return true
}

export const submitSignInForm = (req_list) => {
  if (!getSignInValidationStatus() || !getSignInRequiredStatus(req_list)) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(signInFormValues);
  return true;
};