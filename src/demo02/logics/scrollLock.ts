import { CSS_CAN_SCROLL } from "./consts";

// スクロール可能な要素か？
const isScrollable = (element: Element) =>
  element.clientHeight < element.scrollHeight;

/**
 * 指定した要素以外のスクロールを抑止します。
 */
export const scrollLock = (event: TouchEvent) => {
  const canScrollElement = (event.target as HTMLElement)?.closest(
    `.${CSS_CAN_SCROLL}`,
  );
  if (canScrollElement === null) {
    console.log("対象の要素でなければスクロール禁止");
    event.preventDefault();
    return;
  }

  if (canScrollElement && isScrollable(canScrollElement)) {
    console.log(
      "対象の要素があり、その要素がスクロール可能であればスクロールを許可する",
    );
    event.stopPropagation();
  } else {
    console.log("対象の要素はスクロール禁止");
    event.preventDefault();
  }
};
