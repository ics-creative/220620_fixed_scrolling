const CSS_SHOW_DIALOG = 'is-show-dialog';
const CSS_SCROLL_LOCK = 'is-fixed-scroll';

/**
 * ダイアログを制御する関数です。
 */
export const dialog = (element: HTMLElement) => {
  const show = (onShow?: () => void) => {
    console.log("ダイアログを表示")
    // CSSクラスの制御
    element.classList.add(CSS_SHOW_DIALOG);
    document.body.classList.add(CSS_SCROLL_LOCK);
    // 追加のイベント
    if (onShow) {
      onShow();
    }
  }

  const close = (onClose?: () => void) => {
    console.log('ダイアログを非表示')
    // CSSクラスの制御
    element.classList.remove(CSS_SHOW_DIALOG);
    document.body.classList.remove(CSS_SCROLL_LOCK)
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
