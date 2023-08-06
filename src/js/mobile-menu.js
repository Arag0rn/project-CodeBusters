import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const mobileMenu = document.querySelector('.js-mobile-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const mobMenuBox = document.querySelector('.js-mob-menu');
  const closeMenuBtn = document.querySelector('.js-menu-close');
  const header = document.querySelector('.header-container');

  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true';
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    mobMenuBox.classList.toggle('is-open');

    if (isMenuOpen) {
      enableBodyScroll(document.body);
      enableBodyScroll(header);
    } else {
      disableBodyScroll(document.body);
      disableBodyScroll(header);
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
})();
