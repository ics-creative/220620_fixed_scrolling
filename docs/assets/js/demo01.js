import "./base.js";
/* empty css       */const CSS_SHOW_DIALOG = "is-show-dialog";
const CSS_SCROLL_LOCK = "is-fixed-scroll";
const dialog = (element) => {
  const show = (onShow) => {
    console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u8868\u793A");
    element.classList.add(CSS_SHOW_DIALOG);
    document.body.classList.add(CSS_SCROLL_LOCK);
    if (onShow) {
      onShow();
    }
  };
  const close = (onClose) => {
    console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u975E\u8868\u793A");
    element.classList.remove(CSS_SHOW_DIALOG);
    document.body.classList.remove(CSS_SCROLL_LOCK);
    if (onClose) {
      onClose();
    }
  };
  return {
    show,
    close
  };
};
const menuElement = document.querySelector("#js-menu");
const menuButton = document.querySelector("#js-menu-button");
const menu = dialog(menuElement);
menuButton.addEventListener("click", () => {
  const isShow = menuElement.classList.contains("is-show-dialog");
  if (!isShow) {
    menu.show(() => {
      menuButton.classList.add("is-active");
    });
  } else {
    menu.close(() => {
      menuButton.classList.remove("is-active");
    });
  }
});
const modalOpenButton = document.querySelector("#js-modal-button");
const modalCloseButton = document.querySelector("#js-modal-close");
const modalOverlay = document.querySelector("#js-modal-overlay");
const modalContent = document.querySelector("#js-modal");
const modal = dialog(modalContent);
modalOpenButton.addEventListener("click", () => modal.show());
modalCloseButton.addEventListener("click", () => modal.close());
modalOverlay.addEventListener("click", () => modal.close());
