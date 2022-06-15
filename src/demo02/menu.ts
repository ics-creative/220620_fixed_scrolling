import {dialog} from "./dialog";

const menuElement = document.querySelector<HTMLDivElement>('#js-menu')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!
const menu = dialog(menuElement);

menuButton.addEventListener('click', () => {
  const isShow = menuElement.classList.contains('is-show-dialog');
  if (!isShow) {
    menu.show(() => {
      menuElement.setAttribute('role', 'dialog');
      menuElement.setAttribute('aria-modal', 'true');
      menuButton.classList.add("is-active");
      menuButton.setAttribute('aria-label', 'メニューを閉じる');
    });
  } else {
    menu.close(() => {
      menuElement.removeAttribute('role');
      menuElement.removeAttribute('aria-modal');
      menuButton.classList.remove("is-active");
      menuButton.setAttribute('aria-label', 'メニューを開く');
    });
  }
})
