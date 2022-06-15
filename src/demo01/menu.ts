import {dialog} from "./dialog";

const header = document.querySelector<HTMLDivElement>('#js-menu-header')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!
const menu = dialog(header);

menuButton.addEventListener('click', () => {
  const isShow = header.classList.contains('is-show-dialog');

  if (!isShow) {
    menu.show(() => {
      menuButton.classList.add("is-active");
    })
  } else {
    menu.close(() => {
      menuButton.classList.remove("is-active");
    })
  }
})
