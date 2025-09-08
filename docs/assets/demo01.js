import "./base.js";
/* empty css      */
const menuElement = document.querySelector("#js-menu");
const menuButton = document.querySelector("#js-menu-button");
menuButton.addEventListener("click", () => {
  const isShow = menuElement.classList.contains("is-show");
  if (!isShow) {
    menuButton.classList.add("is-active");
    menuElement.classList.add("is-show");
    document.body.classList.add("is-scrollLock");
  } else {
    menuButton.classList.remove("is-active");
    menuElement.classList.remove("is-show");
    document.body.classList.remove("is-scrollLock");
  }
});
const modalOpenButton = document.querySelector("#js-modal-button");
const modalCloseButton = document.querySelector("#js-modal-close");
const modalOverlay = document.querySelector("#js-modal-overlay");
const modalContent = document.querySelector("#js-modal");
modalOpenButton.addEventListener("click", () => {
  modalContent.classList.add("is-show");
  document.body.classList.add("is-scrollLock");
});
const closableElement = [modalCloseButton, modalOverlay];
closableElement.forEach((element) => {
  element.addEventListener("click", () => {
    modalContent.classList.remove("is-show");
    document.body.classList.remove("is-scrollLock");
  });
});
