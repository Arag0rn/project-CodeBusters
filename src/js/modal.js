import axios from 'axios';
import { onClickToShopingListAdd } from './auth'; 
let bookData = {};

const modal = document.querySelector('div#modal');

const modalCloseBtn = modal.querySelector('.modal-close-btn');
const modalCloseBtnSVG = modal.querySelector('.modal-close-btn svg');
const modalCloseBtnPath = modal.querySelector('.modal-close-btn svg path');
const modalOrderBtn = modal.querySelector('button.modal-order-btn');
const modalImageContainer = modal.querySelector('.modal-image-container');
const modalTitle = modal.querySelector('.modal-title');
const modalSubTitle = modal.querySelector('.modal-sub-title');
const modalDescription = modal.querySelector('.modal-description');
const modallinks = modal.querySelector('.modal-links');
const modalSuccessMesage = modal.querySelector('.modal-success-mesage');


const modalData = async id => {
  await axios
    .request({
      timeout: 5000,
      method: 'GET',
      url: 'https://books-backend.p.goit.global/books/' + id,
    })
    .then(response => {
      bookData = response.data;
    })
};

const getLocalList = () => {
  let localList = localStorage.getItem('list');
  if (localList === null) {
    localList = {};
  } else {
    localList = JSON.parse(localList);
  }
  return localList;
};

const localStorageAppend = () => {
  const localList = getLocalList();

  console.log(bookData._id, typeof localList[bookData._id]);
  if (typeof localList[bookData._id] !== "undefined"){
    delete localList[bookData._id];
    modalOrderBtn.innerText="Add to shopping list";
    modalSuccessMesage.classList.add('is-hidden');
  }
  else {
    localList[bookData._id] = bookData;
    modalOrderBtn.innerText="Remove from the shopping list";
    modalSuccessMesage.classList.remove('is-hidden');
  }

  localStorage.setItem('list', JSON.stringify(localList));
};

const openModal = async function (e) {
  e.preventDefault();
  
  modal.classList.remove('is-hidden');
  modalSuccessMesage.classList.add('is-hidden');
  console.log(document.body.classList.contains("sign-in"));
  modalOrderBtn.disabled = !document.body.classList.contains("sign-in");

  document.body.classList.add('no-scroll');

  const bookId = this.getAttribute('data-book-id');

  const localList = getLocalList();
  
  if (typeof localList[bookId] !== "undefined"){
    modalOrderBtn.innerText="Remove from the shopping list";
  }

  await modalData(bookId);
  const addToListBtn = modal.querySelector('.modal-order-btn');
addToListBtn.addEventListener('click', async () => {
  await onClickToShopingListAdd(bookId);
}, { once: true });

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
  modalOrderBtn.addEventListener('click', localStorageAppend);
};
const closeModal = function (e) {
  
    if (
        (typeof e.target !== 'undefined' &&
        (
            e.target === modal || 
            e.target === modalCloseBtn || e.target === modalCloseBtnSVG || e.target === modalCloseBtnPath)) ||
        (typeof e.key !== 'undefined' && e.key === 'Escape')
    ) {
    e.preventDefault();
    modal.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');

    // TODO: clear data elements
    // TODO: clear listener on Checkout button
    document.removeEventListener('keydown', closeModal);
    modalOrderBtn.removeEventListener('click', localStorageAppend);
    modalOrderBtn.innerText="Add to shopping list";
    modalImageContainer.innerHTML="";
    modalDescription.innerText="";
    modalTitle.innerText="";
    modalSubTitle.innerText="";
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

