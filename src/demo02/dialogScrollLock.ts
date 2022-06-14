import { CSS_CAN_SCROLL } from "./consts";

const scrollLock = (event: Event) => {
  const element = (event.target as HTMLElement);
  if (element === null) {
    return;
  }
  console.log(element.scrollTop);
  // メニューを一番下までスクロールした状態で更にスクロールを行おうとすると、ページ全体がスクロールするので回避するため1pxだけ上にズラす
  if (element.scrollTop + element.clientHeight === element.scrollHeight) {
    element.scrollTop = element.scrollTop - 1;
  }
  // TODO: [確認]メニューを一番上までスクロールした状態で更にスクロールを行おうとすると、ページ全体がスクロールするので回避するため1pxだけ上にズラす
  if (element.scrollTop === 0) {
    element.scrollTop = 1;
  }
}

/**
 * スクロール固定のイベント
 */
export const dialogScrollLock = (element: HTMLElement) => {
  const canScrollElement = element.querySelector(`.${CSS_CAN_SCROLL}`);
  if (canScrollElement === null) {
    return;
  }
  if (canScrollElement) {
    canScrollElement.addEventListener('scroll', scrollLock);
  }
}
