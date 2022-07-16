import {scrollLockFix, scrollLockFixRemove} from "./logics/scrollLockFix";
import {scrollLock} from "./logics/scrollLock";
import {modalFocus} from "./logics/modalFocus";

const header = document.querySelector<HTMLDivElement>('#js-header')!
const wrapper = document.querySelector<HTMLDivElement>('#js-wrapper')!
const footer = document.querySelector<HTMLDivElement>('#js-footer')!
const hiddenElements = [header, wrapper, footer];

const menuElement = document.querySelector<HTMLDivElement>('#js-menu')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!

// モーダルを閉じる処理
const close = () => {
  // ハンバーガーメニューの非アクティブ状態に変更
  menuButton.classList.remove("is-active");
  // モーダル用のクラスを削除
  menuElement.classList.remove('is-show');
  menuButton.classList.remove("is-active");
  document.body.classList.remove('is-scrollLock');
  // ⭐WAI-ARIAの設定を戻す
  hiddenElements.forEach((element) => element.removeAttribute('aria-hidden'));
  menuButton.setAttribute('aria-label', 'メニューを開く');
  menuButton.setAttribute('aria-expanded', 'false');
  // ⭐キーボードフォーカスの制御を破棄
  window.removeEventListener('keydown', focusHandle, {capture: true});
  // ⭐スクロール固定のイベントを破棄
  document.removeEventListener('touchmove', scrollLock);
  scrollLockFixRemove(menuElement);
  // ⭐フォーカス位置を戻す
  menuButton.focus();
}

// ⭐キーボードフォーカスのイベントハンドラ
const focusHandle = (event: KeyboardEvent) => modalFocus(event, menuElement, close);

menuButton.addEventListener('click', () => {
  const isShow = menuElement.classList.contains('is-show');
  // モーダルが表示されていないか？
  if (!isShow) {
    console.log('モーダルを表示');
    // ハンバーガーメニューのアクティブ状態に
    menuButton.classList.add("is-active");
    // モーダル用のクラスを追加
    menuElement.classList.add('is-show');
    menuButton.classList.add("is-active");
    document.body.classList.add('is-scrollLock');
    // ⭐WAI-ARIAの設定を追加
    hiddenElements.forEach((element) => element.setAttribute('aria-hidden', 'true'));
    menuButton.setAttribute('aria-label', 'メニューを閉じる');
    menuButton.setAttribute('aria-expanded', 'true');
    // ⭐キーボードフォーカスの制御イベントを登録
    window.addEventListener('keydown', focusHandle, {capture: true});
    // ⭐スクロール固定のイベントを登録
    document.addEventListener('touchmove', scrollLock, {passive: false});
    scrollLockFix(menuElement);
  } else {
    console.log('モーダルを非表示');
    close();
  }
})
