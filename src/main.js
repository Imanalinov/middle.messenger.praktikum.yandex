import Handlebars from 'handlebars';
import * as Components from './components';
import { PAGES } from './data';

// указатель на предыдущую страницу
let prevPage = {
  page: null,
  object: null,
};

let currectUser;

// регистрируем компоненты
Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

// функция роутинга
function navigate(page) {
  if (page === prevPage.page) {
    return;
  }
  // Уничтожаем предыдущий компонент
  if (prevPage.object) {
    prevPage.object.onDestroy();
  }

  const { source, component } = PAGES[page];

  component().then((module) => {
    const container = document.getElementById('app');
    container.innerHTML = Handlebars.compile(source)();

    prevPage.object = new module();
    prevPage.page = page;

    prevPage.object.onInit();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('currentUser')) {
    navigate(PAGES.profile.page);
  } else {
    navigate(PAGES.login.page);
  }
})


const links = document.getElementById('linkList');

links.addEventListener('click', (event) => {
  const link = event.target.getAttribute('data-link');
  if (link) {
    navigate(link)
  }
})

document.addEventListener('navigate', (event) => {
  navigate(event.detail);
})
