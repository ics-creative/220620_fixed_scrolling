const dialogElement = document.querySelector<HTMLDialogElement>('#js-dialog')!
const dialogOpenButton = document.querySelector<HTMLButtonElement>('#js-dialog-open')!
const dialogCloseButton = document.querySelector<HTMLButtonElement>('#js-dialog-close')!

dialogOpenButton.addEventListener('click', () => {
  if (typeof dialogElement.showModal === "function") {
    dialogElement.showModal();
  } else {
    alert("dialog要素をサポートしていないブラウザです");
  }
});

dialogCloseButton.addEventListener('click', () => {
  dialogElement.close();
  alert('dialog要素を閉じました')
});
