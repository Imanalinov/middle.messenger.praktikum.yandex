import Handlebars from 'handlebars';
import { PROFILE_PAGES } from './utils/profile-pages.js';
import { navigate } from '../../utils/navigate.js';
import { PAGES } from '../../data/index.js';


export class ProfilePage {
  currentUser;
  dynamicWrapper;
  destroy;

  onInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!this.currentUser) {
      navigate(PAGES.login.page);
    }

    this.dynamicWrapper = document.querySelector('.profile__dynamic-wrapper');

    this.setPage(PROFILE_PAGES.main);
    this.mainOnInit();
    this.destroy = this.mainOnDestroy;
  }

  onDestroy() {

  }



  setPage({ source }) {
    if (this.destroy) {
      this.destroy();
    }
    this.dynamicWrapper.innerHTML = Handlebars.compile(source)(this.currentUser);
  }

  //#region MAIN
  changeUserDataButton;
  changePasswordButton;
  exitButton;

  mainOnInit() {
    this.changeUserDataButton = document.getElementById('changeData');
    this.changePasswordButton = document.getElementById('changePassword');
    this.exitButton = document.getElementById('exit');

    this.changeUserDataButton.addEventListener('click', this.changeUserDataButtonHandler.bind(this));
    this.changePasswordButton.addEventListener('click', this.changePasswordButtonHandler.bind(this));
    this.exitButton.addEventListener('click', this.exitButtonHandler.bind(this));
  }

  mainOnDestroy() {
    this.changeUserDataButton.removeEventListener('click', this.changeUserDataButtonHandler);
    this.changePasswordButton.removeEventListener('click', this.changePasswordButtonHandler);
    this.exitButton.removeEventListener('click', this.exitButtonHandler);
  }

  changeUserDataButtonHandler(event) {
    this.setPage(PROFILE_PAGES.userEdit);
    this.userEditOnInit();
    this.destroy = this.userEditOnDestroy;
  }

  changePasswordButtonHandler(_) {
    this.setPage(PROFILE_PAGES.changePassword);
    this.changePasswordOnInit();
    this.destroy = this.changePasswordOnDestroy;
  }

  exitButtonHandler(event) {
    navigate(PAGES.login.page)
    this.destroy();
  }
  //#endregion
  //#region USER EDIT
  userEditForm;
  userEditSaveButton;
  userEditCancelButton;

  userEditOnInit() {
    this.userEditSaveButton = document.getElementById('userEditSave');
    this.userEditCancelButton = document.getElementById('userEditCancel');
    this.userEditForm = document.getElementById('userEditForm');

    this.userEditSaveButton.addEventListener('click', this.userEditSaveButtonHandler.bind(this));
    this.userEditCancelButton.addEventListener('click', this.userEditCancelButtonHandler.bind(this));
  }

  userEditOnDestroy() {
    this.userEditSaveButton.removeEventListener('click', this.userEditSaveButtonHandler);
    this.userEditCancelButton.removeEventListener('click', this.userEditCancelButtonHandler);
  }

  userEditSaveButtonHandler(_) {
    const formData = new FormData(this.userEditForm);
    for (let [key, value] of formData.entries()) {
      this.currentUser[key] = value;
    }

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    this.setPage(PROFILE_PAGES.main);
    this.mainOnInit();
    this.destroy = this.mainOnDestroy;
  }

  userEditCancelButtonHandler(_) {
    this.setPage(PROFILE_PAGES.main);
    this.mainOnInit();
    this.destroy = this.mainOnDestroy;
  }
  //#endregion

  //#region ChangePassword
  changePasswordForm;
  changePasswordSaveButton;
  changePasswordCancelButton;

  changePasswordOnInit() {
    this.changePasswordSaveButton = document.getElementById('changePasswordSave');
    this.changePasswordCancelButton = document.getElementById('changePasswordCancel');
    this.changePasswordForm = document.getElementById('changePasswordForm');

    this.changePasswordSaveButton.addEventListener('click', this.changePasswordSaveButtonHandler.bind(this));
    this.changePasswordCancelButton.addEventListener('click', this.changePasswordCancelButtonHandler.bind(this));
  }

  changePasswordOnDestroy() {
    this.changePasswordSaveButton.removeEventListener('click', this.changePasswordSaveButtonHandler);
    this.changePasswordCancelButton.removeEventListener('click', this.changePasswordCancelButtonHandler);
  }

  changePasswordSaveButtonHandler(event) {
    const formData = new FormData(this.changePasswordForm);
    const passwordData = {};
    for (let [key, value] of formData.entries()) {
      passwordData[key] = value;
    }

    const oldPasswordIsEqual = passwordData.oldPassword === this.currentUser.password;
    const newPasswordsIsEqual = passwordData.newPassword === passwordData.newPasswordRepeat;

    if (oldPasswordIsEqual && newPasswordsIsEqual && passwordData.newPassword.length) {
      this.currentUser.password = passwordData.newPassword;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    this.setPage(PROFILE_PAGES.main);
    this.mainOnInit();
    this.destroy = this.mainOnDestroy;
  }

  changePasswordCancelButtonHandler(event) {
    this.setPage(PROFILE_PAGES.main);
    this.mainOnInit();
    this.destroy = this.mainOnDestroy;
  }
  //#endregion
}
