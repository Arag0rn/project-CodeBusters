// import axios from "axios";
// async function loadCategories() {
//   const response = await axios.get("https://books-backend.p.goit.global/books/category-list");
//   return response.data;
// }

// async function renderCategories() {
//   try{
//     const categories = await loadCategories();
//     const markup = categories.map(({list_name})=> {return ``})
//   }
// }
// renderCategories();

// async function fetchbooks() {
//   const response = await axios.get()
// }

import { modalInit } from './modal.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

Loading.init({
  backgroundColor: 'rgba(0,0,0,0.1)',
  svgColor: '#4f2ee8',
});

const mainContainerRef = document.querySelector('.js-books');

let markup = `<h1 class="books-category-title-active">Best Sellers <span class="category-title-accent">Books</span></h1><ul class="best-sellers-container">`;

loadCategoriesAndBooks();

export async function loadCategoriesAndBooks() {
  mainContainerRef.innerHTML = '';
  try {
    Loading.pulse();
    const categoriesResponse = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );

    const books = await fetchBooks(categoriesResponse.data);

    books.map(category => {
      markup += `<li class="home-books-container" data-aos="fade-up">
                   <h2 class="books-best">${category[0].list_name}</h2>
                   <ul class="book-by-category-list">`;

      if (category.length) {
        markup +=
          category
            .map(({ _id, author, book_image, title }) => {
              return `<li class="home-book-card js-book-card" data-book-id="${_id}">
                      <div class="img-container js-book-card" data-book-id="${_id}">
                        <img class="home-book-card-img js-book-card" src="${book_image}" alt="book cover" data-book-id="${_id}" loading="lazy"/>
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
          `<button class="best-sellers-btn" type="button" data-category="${category[0].list_name}">see more</button>`;
      } else {
        markup += `<li class="no-books-message-container">
                      <p class="no-books-message">Sorry, there are no books in this category.</p>
                    </li>`;
      }

      markup += `</ul></li>`;
    });

    markup += `</ul>`;

    mainContainerRef.innerHTML = markup;
    modalInit();
    AOS.init();
    Loading.remove();
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try to reload the page!');
  }
}

async function fetchBooks(categories) {
  const resps = categories.map(async category => {
    const booksResponse = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${category.list_name}`
    );

    return booksResponse.data;
  });

  const data = await Promise.allSettled(resps);
  const categoriesObj = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value.slice(0, 5));
  return categoriesObj;
}
