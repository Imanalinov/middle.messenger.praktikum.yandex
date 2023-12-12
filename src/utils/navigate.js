/**
 * Меняем страницу
 * @param page - страница на которую хотим переключиться
 */
export function navigate(page) {
  const navigateEvent = new CustomEvent('navigate', { detail: page });
  document.dispatchEvent(navigateEvent);
}
