'use strict';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { auth, removeBookData, database } from './auth';
import { ref, push } from 'firebase/database';
import { getBooks, shoppingList } from './shopping-list';

let bookData = {};
export let shopingList = [];
const modal = document.querySelector('div#modal');

const modalCloseBtn = modal.querySelector('.modal-close-btn');
const modalCloseBtnSVG = modal.querySelector('.modal-close-btn-svg');
const modalCloseBtnUse = modal.querySelector('.modal-close-btn-svg use');
const modalOrderBtn = modal.querySelector('button.modal-order-btn');
const modalImageContainer = modal.querySelector('.modal-image-container');
const modalTitle = modal.querySelector('.modal-title');
const modalSubTitle = modal.querySelector('.modal-sub-title');
const modalDescription = modal.querySelector('.modal-description');
const modallinks = modal.querySelector('.modal-links');
const modalSuccessMesage = modal.querySelector('.modal-success-mesage');

const addToListBtn = modal.querySelector('.modal-order-btn');
let bookId = '';

const modalData = async id => {
  await axios
    .request({
      timeout: 5000,
      method: 'GET',
      url: 'https://books-backend.p.goit.global/books/' + id,
    })
    .then(response => {
      bookData = response.data;
    });
};

const openModal = async function (e) {
  e.preventDefault();

  bookId = this.getAttribute('data-book-id');

  if (auth.currentUser) {
    await getBooks();
    updateBtn(bookId);
  }

  modal.classList.remove('is-hidden');
  modalSuccessMesage.classList.add('is-hidden');

  modalOrderBtn.disabled = !document.body.classList.contains('sign-in');
  if (!document.body.classList.contains('sign-in')) {
    modalOrderBtn.innerHTML = 'Add to shopping list(requires sign-in)';
  }
  document.body.classList.add('no-scroll');

  addToListBtn.addEventListener('click', onButtonToShopingClick);

  await modalData(bookId);

  modalDescription.innerHTML = '';
  modallinks.innerHTML = '';

  if (typeof bookData.book_image !== 'undefined') {
    modalImageContainer.innerHTML = '<img src="' + bookData.book_image + '">';
  }
  if (typeof bookData.title !== 'undefined') {
    modalTitle.innerText = bookData.title;
  }
  if (typeof bookData.author !== 'undefined') {
    modalSubTitle.innerText = bookData.author;
  }
  if (typeof bookData.description !== 'undefined') {
    modalDescription.innerText = bookData.description;
  }

  if (
    typeof bookData.buy_links !== 'undefined' &&
    bookData.buy_links.length > 0
  ) {
    bookData.buy_links.forEach(buy_link => {
      if (['Amazon', 'Apple Books', 'Bookshop'].includes(buy_link.name)) {
        buy_link.name = buy_link.name.trim().toLowerCase().replace(' ', '-');
        modallinks.insertAdjacentHTML(
          'beforeend',
          '<a href="' +
            buy_link.url +
            '" class="modal-link-' +
            buy_link.name +
            '" target="_blank"></a>'
        );
      }
    });
  }

  document.addEventListener('keydown', closeModal);
};

async function onButtonToShopingClick() {
  const action = addToListBtn.dataset.action;

  if (action === 'add') {
    addToListBtn.dataset.action = 'remove';
    addToListBtn.innerHTML = 'Remove from the shopping list';
    modalSuccessMesage.classList.remove('is-hidden');
    await onClickToShopingListAdd(bookId);
  } else if (action === 'remove') {
    addToListBtn.dataset.action = 'add';
    addToListBtn.innerHTML = 'Add to shopping list';
    modalSuccessMesage.classList.add('is-hidden');
    await removeBookData(bookId);
  }

  addToListBtn.blur();
}

const closeModal = function (e) {
  if (
    (typeof e.target !== 'undefined' &&
      (e.target === modal ||
        e.target === modalCloseBtn ||
        e.target === modalCloseBtnSVG ||
        e.target === modalCloseBtnUse)) ||
    (typeof e.key !== 'undefined' && e.key === 'Escape')
  ) {
    e.preventDefault();

    modal.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');

    document.removeEventListener('keydown', closeModal);
    addToListBtn.removeEventListener('click', onClickToShopingListAdd);

    modalImageContainer.innerHTML = '';
    modalDescription.innerText = '';
    modalTitle.innerText = '';
    modalSubTitle.innerText = '';
  }
};
export const modalInit = () => {
  const booksItems = document.querySelectorAll('li.js-book-card[data-book-id]');
  booksItems.forEach(item => {
    item.addEventListener('click', openModal);
  });
  modal.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);
};

modalInit();

function onClickToShopingListAdd(bookId) {
  const userId = auth.currentUser.uid;

  try {
    const dbRef = ref(database, `users/${userId}/books`);
    push(dbRef, {
      bookId: bookId,
    })
      .then(() => {
        Notify.success("Book added to user's shopping list successfully.");
      })
      .catch(error => {
        console.error("Error adding book to user's shopping list:", error);
      });
  } catch (error) {
    console.error("Error adding book to user's shopping list:", error);
  }
}

async function updateBtn(bookId) {
  if ([...shoppingList].includes(bookId)) {
    addToListBtn.dataset.action = 'remove';
    addToListBtn.innerHTML = 'Remove from the shopping list';
  } else {
    addToListBtn.dataset.action = 'add';
    addToListBtn.innerHTML = 'Add to shopping list';
  }
}
