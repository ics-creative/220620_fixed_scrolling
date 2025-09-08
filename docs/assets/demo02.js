import "./base.js";
/* empty css      */
const CSS_CAN_SCROLL = "is-can-scroll";
const scrollLock$1 = (event) => {
  const element = event.target;
  if (element === null) {
    return;
  }
  if (element.scrollTop + element.clientHeight === element.scrollHeight) {
    element.scrollTop = element.scrollTop - 1;
  }
  if (element.scrollTop === 0) {
    element.scrollTop = 1;
  }
};
const scrollLockFix = (element) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (!canScrollElement) {
    return;
  }
  canScrollElement.addEventListener("scroll", scrollLock$1);
};
const scrollLockFixRemove = (element) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (!canScrollElement) {
    return;
  }
  canScrollElement.removeEventListener("scroll", scrollLock$1);
};
const isScrollable = (element) => element.clientHeight < element.scrollHeight;
const scrollLock = (event) => {
  const canScrollElement = event.target?.closest(
    `.${CSS_CAN_SCROLL}`
  );
  if (canScrollElement === null) {
    console.log("対象の要素でなければスクロール禁止");
    event.preventDefault();
    return;
  }
  if (canScrollElement && isScrollable(canScrollElement)) {
    console.log(
      "対象の要素があり、その要素がスクロール可能であればスクロールを許可する"
    );
    event.stopPropagation();
  } else {
    console.log("対象の要素はスクロール禁止");
    event.preventDefault();
  }
};
const INTERACTIVE_SELECTOR = "button, a";
const createInteractiveElArray = (element) => {
  const elements = element.querySelectorAll(INTERACTIVE_SELECTOR);
  const interactiveElArray = Array.from(elements);
  return interactiveElArray;
};
const focusToButton = (parentElement, isFirstFocus = true) => {
  if (!parentElement) {
    throw new Error("要素が見つかりませんでした");
  }
  const focusableArray = createInteractiveElArray(parentElement);
  if (focusableArray.length > 0) {
    focusableArray[isFirstFocus ? 0 : focusableArray.length - 1].focus();
  }
  focusableArray[0].focus();
};
const modalFocus = (event, parentElement, onClose) => {
  if (!parentElement) {
    return;
  }
  switch (event.code) {
    case "Enter":
    case "Space":
      break;
    case "Escape":
      onClose();
      break;
    case "Tab": {
      const interactiveElArray = createInteractiveElArray(parentElement);
      const focusIndex = interactiveElArray.findIndex(
        (el) => el === document.activeElement
      );
      if (interactiveElArray.length === 1) {
        console.log(
          "フォーカス可能な要素が1つしかない場合、その要素のみフォーカス"
        );
        event.preventDefault();
        event.stopImmediatePropagation();
        focusToButton(parentElement, true);
        break;
      }
      if (focusIndex === 0) {
        if (event.shiftKey) {
          console.log(
            "モーダル画面以外にフォーカスが当たっていたらイベントを無効化"
          );
          event.preventDefault();
          event.stopImmediatePropagation();
          focusToButton(parentElement, false);
        }
      } else if (focusIndex >= interactiveElArray.length - 1) {
        if (!event.shiftKey) {
          console.log(
            "最後の要素にふれていたら1番目の要素にフォーカスをあてる"
          );
          event.preventDefault();
          event.stopImmediatePropagation();
          focusToButton(parentElement, true);
        }
      } else if (focusIndex === -1) {
        console.log(
          "画面外の要素にフォーカスがあたっていたら1番目の要素にフォーカスをあてる"
        );
        focusToButton(parentElement, true);
      }
      break;
    }
  }
};
const header$1 = document.querySelector("#js-header");
const wrapper$1 = document.querySelector("#js-wrapper");
const footer$1 = document.querySelector("#js-footer");
const hiddenElements$1 = [header$1, wrapper$1, footer$1];
const menuElement = document.querySelector("#js-menu");
const menuButton = document.querySelector("#js-menu-button");
const close$1 = () => {
  menuButton.classList.remove("is-active");
  menuElement.classList.remove("is-show");
  menuButton.classList.remove("is-active");
  document.body.classList.remove("is-scrollLock");
  hiddenElements$1.forEach((element) => element.removeAttribute("aria-hidden"));
  menuButton.setAttribute("aria-label", "メニューを開く");
  menuButton.setAttribute("aria-expanded", "false");
  window.removeEventListener("keydown", focusHandle$1, { capture: true });
  document.removeEventListener("touchmove", scrollLock);
  scrollLockFixRemove(menuElement);
  menuButton.focus();
};
const focusHandle$1 = (event) => modalFocus(event, menuElement, close$1);
menuButton.addEventListener("click", () => {
  const isShow = menuElement.classList.contains("is-show");
  if (!isShow) {
    console.log("モーダルを表示");
    menuButton.classList.add("is-active");
    menuElement.classList.add("is-show");
    menuButton.classList.add("is-active");
    document.body.classList.add("is-scrollLock");
    hiddenElements$1.forEach(
      (element) => element.setAttribute("aria-hidden", "true")
    );
    menuButton.setAttribute("aria-label", "メニューを閉じる");
    menuButton.setAttribute("aria-expanded", "true");
    window.addEventListener("keydown", focusHandle$1, { capture: true });
    document.addEventListener("touchmove", scrollLock, { passive: false });
    scrollLockFix(menuElement);
  } else {
    console.log("モーダルを非表示");
    close$1();
  }
});
const header = document.querySelector("#js-header");
const menu = document.querySelector("#js-menu");
const wrapper = document.querySelector("#js-wrapper");
const footer = document.querySelector("#js-footer");
const hiddenElements = [header, menu, wrapper, footer];
const modal = document.querySelector("#js-modal");
const modalOpenButton = document.querySelector("#js-modal-button");
const modalCloseButton = document.querySelector("#js-modal-close");
const modalOverlay = document.querySelector("#js-modal-overlay");
const close = () => {
  modal.classList.remove("is-show");
  document.body.classList.remove("is-scrollLock");
  hiddenElements.forEach((element) => element.removeAttribute("aria-hidden"));
  window.removeEventListener("keydown", focusHandle, { capture: true });
  document.removeEventListener("touchmove", scrollLock);
  modalOpenButton.focus();
};
const focusHandle = (event) => modalFocus(event, modal, close);
modalOpenButton.addEventListener("click", () => {
  console.log("モーダルを表示");
  modal.classList.add("is-show");
  document.body.classList.add("is-scrollLock");
  hiddenElements.forEach(
    (element) => element.setAttribute("aria-hidden", "true")
  );
  window.addEventListener("keydown", focusHandle, { capture: true });
  scrollLockFix(modal);
  document.addEventListener("touchmove", scrollLock, { passive: false });
  focusToButton(modal);
});
const closableElement = [modalCloseButton, modalOverlay];
closableElement.forEach((element) => {
  element.addEventListener("click", () => {
    console.log("モーダルを非表示");
    close();
  });
});
