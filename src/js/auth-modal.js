export const close = document.querySelector('.modal-close');
export const modal = document.querySelector('.modal__auth');
import {
  formSubmit,
  onSignSwitherClick,
  logInBtn,
  logUpBtn,
  form,
  formBtn,
} from './sign';

const links = document.querySelectorAll('.js-signup');

for (const link of links) {
  link.addEventListener('click', onSignOnclick);
}

export function onSignOnclick(e) {
  e.preventDefault();

  logInBtn.addEventListener('click', onSignSwitherClick);
  logUpBtn.addEventListener('click', onSignSwitherClick);
  form.addEventListener('submit', formSubmit);

  modal.style.opacity = 1;
  modal.style.visibility = 'visible';
  close.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onCloseClick);
}

export function onCloseClick(e) {
  if (e && e.type === 'keydown' && e.code !== 'Escape') {
    return;
  }

  logInBtn.removeEventListener('click', onSignSwitherClick);
  logUpBtn.removeEventListener('click', onSignSwitherClick);
  form.removeEventListener('submit', formSubmit);

  modal.style.opacity = 0;
  modal.style.visibility = 'hidden';
  close.removeEventListener('click', onCloseClick);
  window.removeEventListener('keydown', onCloseClick);
}

const password = document.querySelector('#password');

const checkbox = document.querySelector('.password-checkbox');
checkbox.addEventListener('change', () => {
  if (password.getAttribute('type') === 'password') {
    password.setAttribute('type', 'text');
  } else {
    password.setAttribute('type', 'password');
  }
});
