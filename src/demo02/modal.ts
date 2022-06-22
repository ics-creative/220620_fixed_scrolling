import { scrollLock } from "./logics/scrollLock";
import {scrollLockFix} from "./logics/scrollLockFix";
import {modalFocus} from "./logics/modalFocus";

const modalOpenButton = document.querySelector<HTMLButtonElement>('#js-modal-button')!
const modalCloseButton = document.querySelector<HTMLButtonElement>('#js-modal-close')!
const modalOverlay = document.querySelector<HTMLDivElement>('#js-modal-overlay')!
const modalContent = document.querySelector<HTMLDivElement>('#js-modal')!

// モーダルを閉じる処理
const close = () => {
  modalContent.classList.remove('is-show');
  document.body.classList.remove('is-scrollLock');
  // ⭐キーボードフォーカスの制御を破棄
  window.removeEventListener('keydown', focusHandle, {capture: true});
  // ⭐スクロール固定のイベントを破棄
  document.removeEventListener('touchmove', scrollLock);
}

// ⭐キーボードフォーカスのイベントハンドラ
const focusHandle = (event: KeyboardEvent) => modalFocus(event, modalContent, close);

// 開くボタンがクリックされたらモーダルを開く
modalOpenButton.addEventListener('click', () => {
  console.log('モーダルを表示');
  modalContent.classList.add('is-show');
  document.body.classList.add('is-scrollLock');
  // ⭐キーボードフォーカスの制御イベントを登録
  window.addEventListener('keydown', focusHandle, {capture: true});
  // ⭐スクロール固定のイベントを登録
  scrollLockFix(modalContent);
  document.addEventListener('touchmove', scrollLock, {passive: false});
})

// 閉じるボタンまたはモーダルの背景がクリックされたらモーダルを閉じる
const closableElement = [modalCloseButton, modalOverlay];
closableElement.forEach((element) => {
  element.addEventListener('click', () => {
    console.log('モーダルを非表示');
    close();
  })
})
