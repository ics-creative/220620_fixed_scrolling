import {dialogFocusHandler} from "./dialogFocusHandler";
import {dialogScrollLock} from "./dialogScrollLock";

const CSS_SHOW_DIALOG = 'is-show-dialog';
const CSS_SCROLL_LOCK = 'is-fixed-scroll';

const CSS_CAN_SCROLL = 'is-can-scroll';
const isScrollable = (element: Element) => element.clientHeight < element.scrollHeight;
const scrollHandler = (event: TouchEvent) => {
  const canScrollElement = (event.target as HTMLElement)?.closest(
    `.${CSS_CAN_SCROLL}`
  );
  console.log(event, canScrollElement);
  if (canScrollElement === null) {
    event.preventDefault();
    return;
  }
  console.log(canScrollElement.clientHeight, canScrollElement.scrollHeight);

  if (canScrollElement && isScrollable(canScrollElement)) {
    // 対象の要素があり、その要素がスクロール可能であれば、スクロールを許可する
    console.log('対象の要素があり、その要素がスクロール可能であれば、スクロールを許可する');
    event.stopPropagation();
  } else {
    console.log('対象の要素はスクロール禁止');
    event.preventDefault();
  }
}

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
    element.removeEventListener('scroll', dialogScrollLock);
    document.removeEventListener('touchmove', scrollHandler)
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
    element.addEventListener('scroll', dialogScrollLock);
    document.addEventListener('touchmove', scrollHandler, {passive: false})
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
