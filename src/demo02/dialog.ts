import {dialogFocusHandler} from "./dialogFocusHandler";
import {dialogScrollLock} from "./dialogScrollLock";

const CSS_SHOW_DIALOG = 'is-show-dialog';
const CSS_SCROLL_LOCK = 'is-fixed-scroll';

// const CSS_CAN_SCROLL = 'is-can-scroll';
// const isScrollable = (element: Element) => element.clientHeight < element.scrollHeight;
// const scrollHandler = (event: TouchEvent) => {
//   const element = event.target as HTMLElement;
//   const canScrollElement = element.closest(`.${CSS_CAN_SCROLL}`);
//   if (canScrollElement && isScrollable(canScrollElement)) {
//     // 対象の要素があり、その要素がスクロール可能であれば、スクロールを許可する
//     event.stopPropagation();
//   } else {
//     event.preventDefault();
//   }
// }

/**
 * ダイアログを制御する関数です。
 */
export const dialog = (element: HTMLElement) => {
  const closeHandler = (element: HTMLElement) => {
    element.classList.remove(CSS_SHOW_DIALOG);
    document.body.classList.remove(CSS_SCROLL_LOCK)
    // document.removeEventListener('touchmove', scrollHandler)
  }

  const focusHandler = (event: KeyboardEvent) => dialogFocusHandler(event, element, () => closeHandler(element));

  const show = (onShow?: () => void) => {
    console.log("ダイアログを表示")
    // CSSクラスの制御
    element.classList.add(CSS_SHOW_DIALOG);
    document.body.classList.add(CSS_SCROLL_LOCK);
    // document.addEventListener('touchmove', scrollHandler, {passive: false})
    // キーボードフォーカスの制御イベントを登録
    window.addEventListener('keydown', focusHandler, {capture: true});
    // スクロール固定のイベントを登録
    element.addEventListener('scroll', dialogScrollLock);
    // 追加のイベント
    if (onShow) {
      onShow();
    }
  }

  const close = (onClose?: () => void) => {
    console.log('ダイアログを非表示')
    // CSSクラスの制御
    closeHandler(element);
    // キーボードフォーカスの制御を破棄
    window.removeEventListener('keydown', focusHandler, {capture: true});
    // スクロール固定のイベントを破棄
    element.removeEventListener('scroll', dialogScrollLock);
    // 追加のイベント
    if (onClose) {
      onClose();
    }
  }

  return {
    show,
    close,
  }
}
