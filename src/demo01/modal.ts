import {dialog} from "./dialog";

const modalOpenButton = document.querySelector<HTMLDivElement>('#js-modal-button')!
const modalCloseButton = document.querySelector<HTMLDivElement>('#js-modal-close')!
const modalOverlay = document.querySelector<HTMLDivElement>('#js-modal-overlay')!
const modalContent = document.querySelector<HTMLDivElement>('#js-modal')!
const modal = dialog(modalContent);

modalOpenButton.addEventListener('click', () => modal.show())
modalCloseButton.addEventListener('click', () => modal.close())
modalOverlay.addEventListener('click', () => modal.close())
