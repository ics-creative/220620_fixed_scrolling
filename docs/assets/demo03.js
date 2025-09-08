import "./base.js";
const dialogElement = document.querySelector("#js-dialog");
const dialogOpenButton = document.querySelector("#js-dialog-open");
const dialogCloseButton = document.querySelector("#js-dialog-close");
dialogOpenButton.addEventListener("click", () => {
  dialogElement.showModal();
});
dialogCloseButton.addEventListener("click", () => {
  dialogElement.close();
});
