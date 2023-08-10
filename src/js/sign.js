import { onSubmitReg, onSignInClick } from './auth';

export const form = document.querySelector('.signIn-form');
export const logInBtn = document.querySelector('.signIn');
export const logUpBtn = document.querySelector('.signUp');
export const formBtn = document.querySelector('.SignUpBtn');

export function formSubmit(e) {
  e.preventDefault();
  switch (e.currentTarget.dataset.action) {
    case 'up':
      onSubmitReg();
      break;
    case 'in':
      onSignInClick();
      break;
  }
}

export function onSignSwitherClick(e) {
  changeBtn(e.currentTarget.dataset.action);

  switch (e.currentTarget.dataset.action) {
    case 'in':
      logUpBtn.classList.remove('active');
      logInBtn.classList.add('active');
      break;
    case 'up':
      logUpBtn.classList.add('active');
      logInBtn.classList.remove('active');
      break;
  }
}

function changeBtn(option) {
  formBtn.innerText = `sign ${option}`;
  form.dataset.action = option;
}
