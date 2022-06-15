import "./base.js";
var demo03 = "";
const dialogElement = document.querySelector("#js-dialog");
const dialogOpenButton = document.querySelector("#js-dialog-open");
const dialogCloseButton = document.querySelector("#js-dialog-close");
dialogOpenButton.addEventListener("click", () => {
  if (typeof dialogElement.showModal === "function") {
    dialogElement.showModal();
  } else {
    alert("dialog\u8981\u7D20\u3092\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u306A\u3044\u30D6\u30E9\u30A6\u30B6\u3067\u3059");
  }
});
dialogCloseButton.addEventListener("click", () => {
  dialogElement.close();
});
