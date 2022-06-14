/**
 * スクロール固定のイベント
 */
export const dialogScrollLock = (event: Event) => {
  const element = event.target as HTMLElement;
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
