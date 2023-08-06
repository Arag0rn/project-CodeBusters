const userBtnRef = document.querySelector('.user-bar-btn');
const userLogOutBtnRef = document.querySelector('.user-bar-log-out-btn');

userBtnRef.addEventListener('click', onUserBtnClick);

function onUserBtnClick() {
  userLogOutBtnRef.classList.toggle('is-open');
}
