import { onSubmitReg, onSignInClick } from './auth';

export const form = document.querySelector('.signIn-form');
export const logInBtn = document.querySelector('.signIn');
export const logUpBtn = document.querySelector('.signUp');
export const formBtn = document.querySelector('.SignUpBtn');
const inputNameRef = document.querySelector('.input-name');

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
  console.dir(inputNameRef);
  switch (e.currentTarget.dataset.action) {
    case 'in':
      inputNameRef.required = false;
      inputNameRef.classList.add('visually-hidden');
      logUpBtn.classList.remove('active');
      logInBtn.classList.add('active');
      break;
    case 'up':
      inputNameRef.required = true;
      inputNameRef.classList.remove('visually-hidden');
      logUpBtn.classList.add('active');
      logInBtn.classList.remove('active');
      break;
  }
}

function changeBtn(option) {
  formBtn.innerText = `sign ${option}`;
  form.dataset.action = option;
}
