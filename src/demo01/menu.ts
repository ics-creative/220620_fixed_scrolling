const menuElement = document.querySelector<HTMLDivElement>('#js-menu')!
const menuButton = document.querySelector<HTMLButtonElement>('#js-menu-button')!

menuButton.addEventListener('click', () => {
  const isShow = menuElement.classList.contains('is-show');
  // モーダルが表示されていないか？
  if (!isShow) {
    console.log('モーダルを表示')
    menuButton.classList.add("is-active");
    menuElement.classList.add('is-show');
    document.body.classList.add('is-scrollLock');
  } else {
    console.log('モーダルを非表示')
    menuButton.classList.remove("is-active");
    menuElement.classList.remove('is-show');
    document.body.classList.remove('is-scrollLock');
  }
})
