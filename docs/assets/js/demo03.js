import "./menu.js";
var dialog = "";
const dialogElement = document.querySelector("#js-dialog");
const dialogOpenButton = document.querySelector("#js-dialog-open");
const dialogCloseButton = document.querySelector("#js-dialog-close");
dialogOpenButton.addEventListener("click", () => {
  if (typeof dialogElement.showModal === "function") {
    dialogElement.showModal();
    document.body.classList.add("is-fixed-scroll");
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
});
dialogCloseButton.addEventListener("click", () => {
  dialogElement.close();
  document.body.classList.remove("is-fixed-scroll");
  alert("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u9589\u3058\u307E\u3057\u305F");
});
