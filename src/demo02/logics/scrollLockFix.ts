import { CSS_CAN_SCROLL } from "./consts";

const scrollLock = (event: Event) => {
  const element = (event.target as HTMLElement);
  if (element === null) {
    return;
  }
  // 以下の手順で発生するスクロールのバグ対策。回避するため1pxだけスクロール量を減らす
  // 1. メニューを上下どちらかに最大までスクロールする
  // 2. 更にスクロールを行うとページ全体がスクロールする
  if (element.scrollTop + element.clientHeight === element.scrollHeight) {
    element.scrollTop = element.scrollTop - 1;
  }
  if (element.scrollTop === 0) {
    element.scrollTop = 1;
  }
}

/**
 * スクロールのバグ対策を行うイベントを追加します。
 */
export const scrollLockFix = (element: HTMLElement) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (!canScrollElement) {
    return;
  }
  canScrollElement.addEventListener('scroll', scrollLock);
}
/**
 * スクロールのバグ対策を行うイベントを削除します。
 */
export const scrollLockFixRemove = (element: HTMLElement) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (!canScrollElement) {
    return;
  }
  canScrollElement.removeEventListener('scroll', scrollLock);
}
