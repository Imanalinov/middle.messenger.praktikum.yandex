import * as Pages from '../pages';

export const PAGES = {
  login: {
    source: Pages.LoginPage,
    context: {},
    component: () => import('../pages/login/login.js').then((m) => m.LoginPage),
    page: 'login',
  },
  register: {
    source: Pages.RegisterPage,
    context: {},
    component: () => import('../pages/register/register.js').then((m) => m.RegisterPage),
    page: 'register',
  },
  profile: {
    source: Pages.ProfilePage,
    context: {},
    component: () => import('../pages/profile/profile.js').then((m) => m.ProfilePage),
    page: 'profile',
  },
};
