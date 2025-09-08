import { scrollLock } from "./logics/scrollLock";
import { scrollLockFix } from "./logics/scrollLockFix";
import { focusToButton, modalFocus } from "./logics/modalFocus";

const header = document.querySelector<HTMLDivElement>("#js-header")!;
const menu = document.querySelector<HTMLDivElement>("#js-menu")!;
const wrapper = document.querySelector<HTMLDivElement>("#js-wrapper")!;
const footer = document.querySelector<HTMLDivElement>("#js-footer")!;
const hiddenElements = [header, menu, wrapper, footer];

const modal = document.querySelector<HTMLDivElement>("#js-modal")!;
const modalOpenButton =
  document.querySelector<HTMLButtonElement>("#js-modal-button")!;
const modalCloseButton =
  document.querySelector<HTMLButtonElement>("#js-modal-close")!;
const modalOverlay =
  document.querySelector<HTMLDivElement>("#js-modal-overlay")!;

// モーダルを閉じる処理
const close = () => {
  modal.classList.remove("is-show");
  document.body.classList.remove("is-scrollLock");
  // ⭐WAI-ARIAの設定を戻す
  hiddenElements.forEach((element) => element.removeAttribute("aria-hidden"));
  // ⭐キーボードフォーカスの制御を破棄
  window.removeEventListener("keydown", focusHandle, { capture: true });
  // ⭐スクロール固定のイベントを破棄
  document.removeEventListener("touchmove", scrollLock);
  // ⭐フォーカス位置を戻す
  modalOpenButton.focus();
};

// ⭐キーボードフォーカスのイベントハンドラ
const focusHandle = (event: KeyboardEvent) => modalFocus(event, modal, close);

// 開くボタンがクリックされたらモーダルを開く
modalOpenButton.addEventListener("click", () => {
  console.log("モーダルを表示");
  modal.classList.add("is-show");
  document.body.classList.add("is-scrollLock");
  // ⭐WAI-ARIAの設定を追加
  hiddenElements.forEach((element) =>
    element.setAttribute("aria-hidden", "true"),
  );
  // ⭐キーボードフォーカスの制御イベントを登録
  window.addEventListener("keydown", focusHandle, { capture: true });
  // ⭐スクロール固定のイベントを登録
  scrollLockFix(modal);
  document.addEventListener("touchmove", scrollLock, { passive: false });
  // ⭐フォーカス可能な先頭の要素にフォーカス
  focusToButton(modal);
});

// 閉じるボタンまたはモーダルの背景がクリックされたらモーダルを閉じる
const closableElement = [modalCloseButton, modalOverlay];
closableElement.forEach((element) => {
  element.addEventListener("click", () => {
    console.log("モーダルを非表示");
    close();
  });
});
