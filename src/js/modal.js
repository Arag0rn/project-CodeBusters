import axios from "axios";

let bookData = {};

const modal = document.querySelector("div#modal");

const modalCloseBtn = modal.querySelector(".modal-close-btn");
const modalOrderBtn = modal.querySelector("button.modal-order-btn");
const modalImageContainer = modal.querySelector(".modal-image-container");
const modalTitle = modal.querySelector(".modal-title");
const modalSubTitle = modal.querySelector(".modal-sub-title");
const modalDescription = modal.querySelector(".modal-description");
const modallinks = modal.querySelector(".modal-links");

const modalData = async (id) => {
    await axios
        .request({
            timeout: 5000,
            method: "GET",
            url: "https://books-backend.p.goit.global/books/" + id
        })
        .then((response) => {
            bookData = response.data;
        })
        .catch((error) => {
            // console.log(error);

            bookData = {
                "_id": "642fd89ac8cf5ee957f12361",
                "list_name": "Middle Grade Paperback Monthly",
                "author": "Barbara O'Connor",
                "book_image": "https://storage.googleapis.com/du-prd/books/images/9781250144058.jpg",
                "book_image_width": 330,
                "book_image_height": 485,
                "book_uri": "nyt://book/46604242-8624-57d1-bdd4-424c21cde273",
                "title": "WISH",
                "description": "Lorem ipsum dolor sit amet est laborum practic",
                "buy_links": [
                  {
                    "name": "Amazon",
                    "url": "https://www.amazon.com/Wish-Barbara-OConnor/dp/1250144051?tag=NYTBSREV-20"
                  },
                  {
                    "name": "Apple Books",
                    "url": "https://goto.applebooks.apple/9781250144058?at=10lIEQ"
                  },
                  {
                    "name": "Bookshop",
                    "url": "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781250144058&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Faffiliate%3D3546%26keywords%3DWISH"
                  }
                ]
              };
        });
};
const localStorageAppend = () => {
    let localList = localStorage.getItem('list');
    if (localList === null) {
        localList = {};
    }
    else {
        localList = JSON.parse(localList);
    }

    localList[bookData._id] = bookData;

    localStorage.setItem('list', JSON.stringify(localList));
};
const openModal = async function(e) {
    e.preventDefault();

    modal.classList.remove('is-hidden');

    document.body.classList.add('no-scroll');

    const bookId = this.getAttribute("data-book-id");

    await modalData(bookId);

    modalDescription.innerHTML = '';
    modallinks.innerHTML = '';

    if (typeof bookData.book_image !== 'undefined') {
        modalImageContainer.innerHTML = '<img src="'+bookData.book_image+'">';
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

    if (typeof bookData.buy_links !== 'undefined' && bookData.buy_links.length > 0) {
        bookData.buy_links.forEach((buy_link) => {
            if (['Amazon','Apple Books','Bookshop'].includes(buy_link.name)) {
                buy_link.name = buy_link.name.trim().toLowerCase().replace(' ', '-');
                modallinks.insertAdjacentHTML("beforeend", 
                '<a href="'+buy_link.url+'" class="modal-link-'+buy_link.name+'" target="_blank"></a>');
            }
        });
    }

    document.addEventListener("keydown", closeModal);
    modalOrderBtn.addEventListener("click", localStorageAppend);

    // TODO: fill data elements
    // TODO: add listener on Checkout button
};
const closeModal = function(e) {
    if ((typeof e.target !== 'undefined' && (e.target === modal || e.target === modalCloseBtn)) ||
        (typeof e.key !== 'undefined' && e.key === "Escape")) {

        e.preventDefault();
        modal.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

        // TODO: clear data elements
        // TODO: clear listener on Checkout button
        document.removeEventListener("keydown", closeModal);
        modalOrderBtn.removeEventListener("click", localStorageAppend);
    }
};
const modalInit = () => {
    const booksItems = document.querySelectorAll("li.js-book-card[data-book-id]");
    booksItems.forEach((item) => {
        item.addEventListener("click", openModal);
    });
    modal.addEventListener("click", closeModal);
    modalCloseBtn.addEventListener("click", closeModal);
};

modalInit();

