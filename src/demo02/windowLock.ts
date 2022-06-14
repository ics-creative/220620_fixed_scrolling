import { CSS_CAN_SCROLL } from "./consts";

const isScrollable = (element: Element) => element.clientHeight < element.scrollHeight;
export const windowLock = (event: TouchEvent) => {
  const canScrollElement = (event.target as HTMLElement)?.closest(
    `.${CSS_CAN_SCROLL}`
  );
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
