const dialogElement = document.querySelector<HTMLDialogElement>("#js-dialog")!;
const dialogOpenButton =
  document.querySelector<HTMLButtonElement>("#js-dialog-open")!;
const dialogCloseButton =
  document.querySelector<HTMLButtonElement>("#js-dialog-close")!;

dialogOpenButton.addEventListener("click", () => {
  dialogElement.showModal();
});

dialogCloseButton.addEventListener("click", () => {
  dialogElement.close();
});
