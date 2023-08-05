import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const categoriesContainerRef = document.querySelector('.category_list');
const allCategoriesRef = document.querySelectorAll('.category_text');
const booksContainerRef = document.querySelector('.js-books');

categoriesContainerRef.addEventListener('click', onCategoryClick);

function onCategoryClick(e) {
  if (e.target.nodeName === 'P') {
    removeStylesForCurrentCategory();

    e.target.classList.add('current');

    if (e.target.innerHTML !== 'All categories') {
      loadBooksByCurrentCategory(e.target.innerHTML);
    }
  }
}

function removeStylesForCurrentCategory() {
  for (const category of allCategoriesRef) {
    category.classList.remove('current');
  }
}

async function loadBooksByCurrentCategory(currentCategory) {
  try {
    const books = await fetchBooks(currentCategory);
    renderBooks(books, currentCategory);
  } catch {
    Notify.failure('Oops! Something went wrong! Try to reload the page!');
  }
}

async function fetchBooks(currentCategory) {
  const responce = await axios.get(
    `https://books-backend.p.goit.global/books/category?category=${currentCategory}`
  );

  return responce.data;
}

function renderBooks(array, currentCategory) {
  const indexOfFirstSpace = currentCategory.indexOf(' ');
  const firstPartOfTitle = currentCategory.slice(0, indexOfFirstSpace);
  const secondPartOfTitle = currentCategory.slice(
    indexOfFirstSpace,
    currentCategory.length
  );

  let markup = '';

  if (!array.length) {
    markup = `<h1 class="books-category-title-active">${firstPartOfTitle}<span class="category-title-accent">${secondPartOfTitle}</span></h1><ul class="book-by-category-list js-books-container">
    <div class="no-books-message-container">
    <p class="no-books-message">
      Sorry, there are no books matching your search query.
    </p>
  </div>`;
  } else {
    markup =
      `<h1 class="books-category-title-active">${firstPartOfTitle}<span class="category-title-accent">${secondPartOfTitle}</span></h1><ul class="book-by-category-list js-books-container">` +
      array
        .map(({ _id, author, book_image, title }) => {
          return `<li class="home-book-card js-book-card" data-book-id="${_id}">
    <div class="img-container js-book-card" data-book-id="${_id}">
      <img
        class="home-book-card-img js-book-card"
        src="${book_image}"
        alt=""
        data-book-id="${_id}"
      />
      <div class="overlay-book-card" data-book-id="${_id}">
        <p class="overlay-book-card-text" data-book-id="${_id}">quick view</p>
      </div>
    </div>
    <h3 class="home-book-card-book-title js-book-card" data-book-id="${_id}">
      ${title}
    </h3>
    <p class="home-book-card-author js-book-card" data-book-id="${_id}">
      ${author}
    </p>
  </li>`;
        })
        .join('') +
      `</ul>`;
  }

  booksContainerRef.innerHTML = markup;
}
