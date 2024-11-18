import {
  getValidationStatus,
  setFormValue,
  submitSignUpForm,
  validateEmail,
  validatePassword,
  getRequiredStatus,
  setSignInFormValue,
  getSignInValidationStatus,
  getSignInRequiredStatus,
  submitSignInForm
} from "./utils.js";

////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
// const password = document.getElementById('password');
// password.classList.add("valid")
// password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
//const first_name = document.getElementById('first_name_invalid');
//first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "green"
// }

/////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = "first_name";
const last_name_id = "last_name";
const password_id = "password";
const password_repeat_id = "password-repeat";
const email_id = "email";

const password_sign_in_id = "password_sign_in";
const email_sign_in_id = "email_sign_in"

const sign_in_link_id = "sign_in_link";
const sign_in_form_id = "sign_in_form";
const sign_in_btn_id = "sign_in_btn";

const sign_up_link_id = "sign_up_link";
const sign_up_form_id = "sign_up_form";
const sign_up_btn_id = "sign_up_btn";

const sign_up_required_list = [
  first_name_id,
  last_name_id,
  password_id,
  email_id,
  password_repeat_id,
];
const sign_in_required_list = [
  password_sign_in_id,
  email_sign_in_id,
];
// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value); // Установить значение без валидации

const last_name = document.getElementById(last_name_id);
last_name.oninput = (e) => setFormValue(last_name_id, e.target.value); // Установить значение без валидации

const email = document.getElementById(email_id);
email.onchange = (e) => setFormValue(email_id, e.target.value, validateEmail); // Установить значение с валидацией

const password = document.getElementById(password_id);
password.onchange = (e) => {
  if (validatePassword(e.target.value)) {
    password.classList.add("valid");
    password.classList.remove("invalid");
    setFormValue(password_id, e.target.value, true);
  } else {
    password.classList.add("invalid");
    password.classList.remove("valid");
    setFormValue(password_id, e.target.value, false);
  }
}; // Установить значение с валидацией

const password_repeat = document.getElementById(password_repeat_id);
password_repeat.onchange = (e) => {
  if (validatePassword(password.value) && password.value == e.target.value) {
    password_repeat.classList.add("valid");
    password_repeat.classList.remove("invalid");
    setFormValue(password_id, password.value, true);
    setFormValue(password_repeat_id, password.value, true);

  } else {
    password_repeat.classList.add("invalid");
    password_repeat.classList.remove("valid");
    setFormValue(password_id, password.value, false);
    setFormValue(password_repeat_id, password.value, false);

  }
}; // Установить значение с валидацией

// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none";
  document.getElementById(sign_in_form_id).style.display = "";
};

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "";
  document.getElementById(sign_in_form_id).style.display = "none";
};

const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault();

  submitSignUpForm(sign_up_required_list);
};

document.onchange = (e) => {
  if (!getValidationStatus() || !getRequiredStatus(sign_up_required_list)) {
    sign_up_btn.disabled = true;
  } else {
    sign_up_btn.disabled = false;
  }
};

const email_sign_in = document.getElementById(email_sign_in_id);
email_sign_in.onchange = (e) => setSignInFormValue(email_sign_in_id, e.target.value, validateEmail);

const password_sign_in = document.getElementById(password_sign_in_id);
password_sign_in.onchange = (e) => setSignInFormValue(password_sign_in_id, e.target.value);

password_sign_in.onchange = (e) => {
  if (validatePassword(e.target.value)) {
    password_sign_in.classList.add("valid");
    password_sign_in.classList.remove("invalid");
    setSignInFormValue(password_sign_in_id, e.target.value, true);
  } else {
    password_sign_in.classList.add("invalid");
    password_sign_in.classList.remove("valid");
    setSignInFormValue(password_sign_in_id, e.target.value, false);
  }
}; 


const sign_in_btn = document.getElementById(sign_in_btn_id)
document.onchange = (e) => {
  if (!getSignInValidationStatus() || !getSignInRequiredStatus(sign_in_required_list)) {
    sign_in_btn.disabled = true;
  } else {
    sign_in_btn.disabled = false;
  }
};
sign_in_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault();

  submitSignInForm(sign_in_required_list);
};
