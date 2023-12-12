import { navigate } from '../../utils/navigate.js';
import { PAGES } from '../../data/index.js';

export class RegisterPage {
  registerButton;
  toLoginButton;

  onInit() {
    console.log('%cINIT REGISTER PAGE', 'color: white');

    this.registerButton = document.getElementById('register');
    this.toLoginButton = document.getElementById('login');

    this.registerButton.addEventListener('click', this.registerButtonHandler);
    this.toLoginButton.addEventListener('click', this.toLoginButtonHandler);
  }
  onDestroy() {
    console.log('%cDESTROY REGISTER PAGE', 'color: white');

    this.registerButton.removeEventListener('click', this.registerButtonHandler);
    this.toLoginButton.removeEventListener('click', this.toLoginButtonHandler);
  }

  registerButtonHandler(event) {
    navigate(PAGES.login.page);
  }

  toLoginButtonHandler(event) {
    navigate(PAGES.login.page);
  }
}
