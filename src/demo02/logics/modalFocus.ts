const INTERACTIVE_SELECTOR = 'button, a';

// 要素内にあるフォーカス可能な要素を取得します。
const createInteractiveElArray = (element: HTMLElement) => {
  const elements = element.querySelectorAll<
    HTMLButtonElement | HTMLAnchorElement
    >(INTERACTIVE_SELECTOR);
  const interactiveElArray = Array.from(elements);
  return interactiveElArray;
}

/**
 * 要素の先頭と末尾どちらかにフォーカスを与えます。
 * @param parentElement 対象の親要素
 * @param isFirstFocus 先頭と末尾のどちらにフォーカスを与えるか指定します。
 */
const focusToButton = (parentElement: HTMLElement, isFirstFocus = true) => {
  if (!parentElement) {
    throw new Error('要素が見つかりませんでした');
  }

  const focusableArray = createInteractiveElArray(parentElement);

  if (focusableArray.length > 0) {
    focusableArray[isFirstFocus ? 0 : focusableArray.length - 1].focus();
  }
  focusableArray[0].focus();
};

/**
 * モーダルのキーボードフォーカスを制御するイベントです。
 * @param event
 * @param parentElement 対象の親要素
 * @param onClose モーダルを閉じる処理
 */
export const modalFocus = (event: KeyboardEvent, parentElement: HTMLElement, onClose: (() => void)) => {
  if (!parentElement) {
    return;
  }
  switch (event.code) {
    case 'Enter':
    case 'Space':
      break;
    case 'Escape':
      onClose();
      break;
    case 'Tab': {
      // モーダル画面内にフォーカスが当たっているか検証
      const interactiveElArray = createInteractiveElArray(parentElement);
      const focusIndex = interactiveElArray.findIndex(
        el => el === document.activeElement
      );

      if (interactiveElArray.length === 1) {
        console.log("フォーカス可能な要素が1つしかない場合、その要素のみフォーカス");
        event.preventDefault();
        event.stopImmediatePropagation();
        focusToButton(parentElement, true);
        break;
      }

      if (focusIndex === 0) {
        if (event.shiftKey) {
          console.log("モーダル画面以外にフォーカスが当たっていたらイベントを無効化");
          event.preventDefault();
          event.stopImmediatePropagation();

          focusToButton(parentElement, false);
        }
      } else if (focusIndex >= interactiveElArray.length - 1) {
        // 最後の要素にふれていたら1番目の要素にフォーカスをあてる
        if (!event.shiftKey) {
          console.log("最後の要素にふれていたら1番目の要素にフォーカスをあてる");
          event.preventDefault();
          event.stopImmediatePropagation();

          focusToButton(parentElement, true);
        }
      } else if (focusIndex === -1) {
        console.log("画面外の要素にフォーカスがあたっていたら1番目の要素にフォーカスをあてる");
        focusToButton(parentElement, true);
      }
      break;
    }
  }
};
