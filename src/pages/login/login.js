import { users } from '../../data/users.js';
import Handlebars from 'handlebars';
import { navigate } from '../../utils/navigate.js';
import { PAGES } from '../../data/index.js';

export class LoginPage {

  form;

  loginButton;

  registerButton;

  constructor() {
  }

  onInit() {
    console.log('%cON INIT', 'color: red');
    // Получаем
    this.form = document.querySelector('form');
    this.loginButton = document.querySelector('#login');
    this.registerButton = document.querySelector('#register');

    // регистрируем слушателей
    this.form.addEventListener('change', this.onFormChange.bind(this));
    this.loginButton.addEventListener('click', this.loginButtonHandler);
    this.registerButton.addEventListener('click', this.registerButtonHandler);
  }

  onDestroy() {
    console.log('%cON DESTROY', 'color: red');
    // отписываемся от слушателей
    document.removeEventListener('login', this.onInit);
    document.removeEventListener('destroy_login', this.onDestroy);
    document.removeEventListener('click', this.loginButtonHandler);
    document.removeEventListener('click', this.registerButtonHandler);

    this.form.removeEventListener('onchange', this.onFormChange);
  }

  onFormChange(event) {
  }

  loginButtonHandler(event) {
    event.preventDefault();

    const container = document.querySelector('.login__errors-container');
    container.innerHTML = '';

    const formData = new FormData(this.form);
    const loginData = {};
    for (let [key, value] of formData.entries()) {
      loginData[key] = value;
    }

    const user = users.find((userDto) => userDto.login === loginData.login && loginData.password);

    if (!user) {
      const template = Handlebars.compile(`<div>Неверный логин или пароль</div>`);
      container.innerHTML = template(null);
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate(PAGES.profile.page);
    }
  }

  registerButtonHandler(event) {
    navigate(PAGES.register.page);
  }
}
