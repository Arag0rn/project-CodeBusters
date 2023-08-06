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




import axios from "axios";

async function loadCategoriesAndBooks() {
  try {
    const categoriesResponse = await axios.get("https://books-backend.p.goit.global/books/category-list");
    const categories = categoriesResponse.data;

    let markup = `<h1 class="books-category-title-active">Best Sellers<span class="category-title-accent">Books</span></h1><ul class="best-sellers-container">`;

    for (const category of categories) {
      const booksResponse = await axios.get(`https://books-backend.p.goit.global/books/category?category=${category.list_name}`);
      const books = booksResponse.data;

      markup += `<li class="home-books-container">
                   <h2 class="books-best">${category.list_name}</h2>
                   <ul class="book-by-category-list">`;

      if (books.length) {
        markup += books
          .slice(0, 5)
          .map(({ _id, author, book_image, title }) => {
            return `<li class="home-book-card js-book-card" data-book-id="${_id}">
                      <div class="img-container js-book-card" data-book-id="${_id}">
                        <img class="home-book-card-img js-book-card" src="${book_image}" alt="" data-book-id="${_id}" />
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
          .join('') + `<button class="best-sellers-btn" type="button">see more</button>`
      } else {
        markup += `<li class="no-books-message-container">
                      <p class="no-books-message">Sorry, there are no books in this category.</p>
                    </li>`;
      }

      markup += `</ul></li>`;
    }

    markup += `</ul>`;

    const mainContainerRef = document.querySelector('.js-books');
    console.log(mainContainerRef);
    mainContainerRef.innerHTML = markup;
  } catch (error) {
    console.log("Error while loading categories and books:", error);
  }
}

loadCategoriesAndBooks();




  