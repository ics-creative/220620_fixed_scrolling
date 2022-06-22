import {scrollLockFix, scrollLockFixRemove} from "./logics/scrollLockFix";
import {scrollLock} from "./logics/scrollLock";
import {modalFocus} from "./logics/modalFocus";

const menuElement = document.querySelector<HTMLDivElement>('#js-menu')!
const menuButton = document.querySelector<HTMLDivElement>('#js-menu-button')!

// モーダルを閉じる処理
const close = () => {
  // ハンバーガーメニューの非アクティブ状態に変更
  menuButton.classList.remove("is-active");
  // モーダル用のクラスを削除
  menuElement.classList.remove('is-show');
  document.body.classList.remove('is-scrollLock');
  // ⭐WAI-ARIAの設定を削除
  menuElement.removeAttribute('role');
  menuElement.removeAttribute('aria-modal');
  menuButton.classList.remove("is-active");
  menuButton.setAttribute('aria-label', 'メニューを開く');
  // ⭐キーボードフォーカスの制御を破棄
  window.removeEventListener('keydown', focusHandle, {capture: true});
  // ⭐スクロール固定のイベントを破棄
  document.removeEventListener('touchmove', scrollLock);
  scrollLockFixRemove(menuElement);
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
    document.body.classList.add('is-scrollLock');
    // ⭐WAI-ARIAの設定を追加
    menuElement.setAttribute('role', 'dialog');
    menuElement.setAttribute('aria-modal', 'true');
    menuButton.classList.add("is-active");
    menuButton.setAttribute('aria-label', 'メニューを閉じる');
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
