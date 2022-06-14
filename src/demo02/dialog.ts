import {dialogFocusHandler} from "./dialogFocusHandler";
import {dialogScrollLock} from "./dialogScrollLock";
import {windowLock} from "./windowLock";

const CSS_SHOW_DIALOG = 'is-show-dialog';
const CSS_SCROLL_LOCK = 'is-fixed-scroll';

/**
 * ダイアログを制御する関数です。
 */
export const dialog = (element: HTMLElement) => {
  const closeHandler = (element: HTMLElement) => {
    element.classList.remove(CSS_SHOW_DIALOG);
    document.body.classList.remove(CSS_SCROLL_LOCK)
    // キーボードフォーカスの制御を破棄
    window.removeEventListener('keydown', focusHandler, {capture: true});
    // スクロール固定のイベントを破棄
    // element.removeEventListener('scroll', dialogScrollLock);
    document.removeEventListener('touchmove', windowLock)
  }

  const focusHandler = (event: KeyboardEvent) => dialogFocusHandler(event, element, () => closeHandler(element));

  const show = (onShow?: () => void) => {
    console.log("ダイアログを表示")
    // CSSクラスの制御
    element.classList.add(CSS_SHOW_DIALOG);
    document.body.classList.add(CSS_SCROLL_LOCK);
    // キーボードフォーカスの制御イベントを登録
    window.addEventListener('keydown', focusHandler, {capture: true});
    // スクロール固定のイベントを登録
    dialogScrollLock(element);
    // element.addEventListener('touchmove', dialogScrollLock);
    document.addEventListener('touchmove', windowLock, {passive: false})
    // 追加のイベント
    if (onShow) {
      onShow();
    }
  }

  const close = (onClose?: () => void) => {
    console.log('ダイアログを非表示')
    // CSSクラスの制御
    closeHandler(element);
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
