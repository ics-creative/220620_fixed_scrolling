import "./base.js";
/* empty css       */const INTERACTIVE_SELECTOR = "button, a";
const createInteractiveElArray = (element) => {
  const elements = element.querySelectorAll(INTERACTIVE_SELECTOR);
  const interactiveElArray = Array.from(elements);
  return interactiveElArray;
};
const focusToButton = (parentElement, isFirstFocus) => {
  if (!parentElement) {
    throw new Error("\u8981\u7D20\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F");
  }
  const focusableArray = createInteractiveElArray(parentElement);
  if (focusableArray.length > 0) {
    console.log(focusableArray[isFirstFocus ? 0 : focusableArray.length - 1]);
    focusableArray[isFirstFocus ? 0 : focusableArray.length - 1].focus();
  }
  focusableArray[0].focus();
};
const dialogFocusHandler = (event, parentElement, onEscape) => {
  if (!parentElement) {
    return;
  }
  switch (event.code) {
    case "Enter":
    case "Space":
      break;
    case "Escape":
      if (onEscape) {
        onEscape();
      }
      break;
    case "Tab": {
      const interactiveElArray = createInteractiveElArray(parentElement);
      const focusIndex = interactiveElArray.findIndex((el) => el === document.activeElement);
      if (interactiveElArray.length === 1) {
        console.log("\u30D5\u30A9\u30FC\u30AB\u30B9\u53EF\u80FD\u306A\u8981\u7D20\u304C1\u3064\u3057\u304B\u306A\u3044\u5834\u5408\u3001\u305D\u306E\u8981\u7D20\u306E\u307F\u30D5\u30A9\u30FC\u30AB\u30B9");
        event.preventDefault();
        event.stopImmediatePropagation();
        focusToButton(parentElement, true);
        break;
      }
      if (focusIndex === 0) {
        if (event.shiftKey) {
          console.log("\u30E2\u30FC\u30C0\u30EB\u753B\u9762\u4EE5\u5916\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u5F53\u305F\u3063\u3066\u3044\u305F\u3089\u30A4\u30D9\u30F3\u30C8\u3092\u7121\u52B9\u5316");
          event.preventDefault();
          event.stopImmediatePropagation();
          focusToButton(parentElement, false);
        }
      } else if (focusIndex >= interactiveElArray.length - 1) {
        if (!event.shiftKey) {
          console.log("\u6700\u5F8C\u306E\u8981\u7D20\u306B\u3075\u308C\u3066\u3044\u305F\u30891\u756A\u76EE\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u3042\u3066\u308B");
          event.preventDefault();
          event.stopImmediatePropagation();
          focusToButton(parentElement, true);
        }
      } else if (focusIndex === -1) {
        console.log("\u753B\u9762\u5916\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u304C\u3042\u305F\u3063\u3066\u3044\u305F\u30891\u756A\u76EE\u306E\u8981\u7D20\u306B\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u3042\u3066\u308B");
        focusToButton(parentElement, true);
      }
      break;
    }
  }
};
const CSS_CAN_SCROLL = "is-can-scroll";
const scrollLock = (event) => {
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
const windowScrollLockFix = (element) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (canScrollElement === null) {
    return;
  }
  if (canScrollElement) {
    canScrollElement.addEventListener("scroll", scrollLock);
  }
};
const isScrollable = (element) => element.clientHeight < element.scrollHeight;
const windowScrollLock = (event) => {
  var _a;
  const canScrollElement = (_a = event.target) == null ? void 0 : _a.closest(`.${CSS_CAN_SCROLL}`);
  if (canScrollElement === null) {
    console.log("\u5BFE\u8C61\u306E\u8981\u7D20\u304C\u3042\u308A\u3001\u305D\u306E\u8981\u7D20\u304C\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u3067\u3042\u308C\u3070\u3001\u30B9\u30AF\u30ED\u30FC\u30EB\u3092\u8A31\u53EF\u3059\u308B");
    event.preventDefault();
    return;
  }
  if (canScrollElement && isScrollable(canScrollElement)) {
    console.log("\u5BFE\u8C61\u306E\u8981\u7D20\u304C\u3042\u308A\u3001\u305D\u306E\u8981\u7D20\u304C\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u3067\u3042\u308C\u3070\u3001\u30B9\u30AF\u30ED\u30FC\u30EB\u3092\u8A31\u53EF\u3059\u308B");
    event.stopPropagation();
  } else {
    console.log("\u5BFE\u8C61\u306E\u8981\u7D20\u306F\u30B9\u30AF\u30ED\u30FC\u30EB\u7981\u6B62");
    event.preventDefault();
  }
};
const CSS_SHOW_DIALOG = "is-show-dialog";
const CSS_SCROLL_LOCK = "is-fixed-scroll";
const dialog = (element) => {
  const closeHandler = (element2) => {
    element2.classList.remove(CSS_SHOW_DIALOG);
    document.body.classList.remove(CSS_SCROLL_LOCK);
    window.removeEventListener("keydown", focusHandler, { capture: true });
    document.removeEventListener("touchmove", windowScrollLock);
  };
  const focusHandler = (event) => dialogFocusHandler(event, element, () => closeHandler(element));
  const show = (onShow) => {
    console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u8868\u793A");
    element.classList.add(CSS_SHOW_DIALOG);
    document.body.classList.add(CSS_SCROLL_LOCK);
    window.addEventListener("keydown", focusHandler, { capture: true });
    windowScrollLockFix(element);
    document.addEventListener("touchmove", windowScrollLock, { passive: false });
    if (onShow) {
      onShow();
    }
  };
  const close = (onClose) => {
    console.log("\u30C0\u30A4\u30A2\u30ED\u30B0\u3092\u975E\u8868\u793A");
    closeHandler(element);
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
      menuElement.setAttribute("role", "dialog");
      menuElement.setAttribute("aria-modal", "true");
      menuButton.classList.add("is-active");
      menuButton.setAttribute("aria-label", "\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B");
    });
  } else {
    menu.close(() => {
      menuElement.removeAttribute("role");
      menuElement.removeAttribute("aria-modal");
      menuButton.classList.remove("is-active");
      menuButton.setAttribute("aria-label", "\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F");
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
