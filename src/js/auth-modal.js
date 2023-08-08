'use strict';

export const close = document.querySelector('.modal-close');
export const modal = document.querySelector('.modal__auth');

const links = document.querySelectorAll('.js-signup');

for (const link of links) {
  link.addEventListener('click', onSignOnclick);
}

close.addEventListener('click', onCloseClick);

export function onSignOnclick(e) {
  e.preventDefault();
  modal.style.opacity = 1;
  modal.style.visibility = 'visible';
}

export function onCloseClick() {
  modal.style.opacity = 0;
  modal.style.visibility = 'hidden';
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
