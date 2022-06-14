// @ts-ignore
const dialogElement = document.querySelector<HTMLDialogElement>('#js-dialog')!
const dialogOpenButton = document.querySelector<HTMLButtonElement>('#js-dialog-open')!
const dialogCloseButton = document.querySelector<HTMLButtonElement>('#js-dialog-close')!

dialogOpenButton.addEventListener('click', () => {
  if (typeof dialogElement.showModal === "function") {
    dialogElement.showModal();
    document.body.classList.add('is-fixed-scroll');
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
});

dialogCloseButton.addEventListener('click', () => {
  dialogElement.close();
  document.body.classList.remove('is-fixed-scroll');
  alert('ダイアログを閉じました')
});
