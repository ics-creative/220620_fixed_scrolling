import {dialog} from "./dialog";

const header = document.querySelector<HTMLDivElement>('#js-menu-header')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!
const menu = dialog(header);

menuButton.addEventListener('click', () => {
  const isShow = header.classList.contains('is-show-dialog');
  if (!isShow) {
    menu.show(() => {
      header.setAttribute('role', 'dialog');
      header.setAttribute('aria-modal', 'true');
      menuButton.textContent = "メニューを閉じる";
    });
  } else {
    menu.close(() => {
      header.removeAttribute('role');
      header.removeAttribute('aria-modal');
      menuButton.textContent = "メニューを開く";
    });
  }
})
