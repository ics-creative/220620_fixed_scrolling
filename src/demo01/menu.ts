import {dialog} from "./dialog";

const menuElement = document.querySelector<HTMLDivElement>('#js-menu')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!
const menu = dialog(menuElement);

menuButton.addEventListener('click', () => {
  const isShow = menuElement.classList.contains('is-show-dialog');

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
