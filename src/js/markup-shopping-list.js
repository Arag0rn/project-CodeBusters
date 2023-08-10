
function createMarkup(arr) {
  return arr
    .map(({ book_image, title, description, author, buy_links, _id }) => {
      return `
      <div class="list-cards" id="${_id}">
                <div class="js-item list-item "  id="${_id}" >
                    <div class="image-container">
                        <img class="card-image" src="${book_image}" width="116" height="165" alt="${title}" >
                    </div>
                    <div class="content-container">
                        <h2 class="card-title">${title}</h2>
                        <p class="card-text">Description</p>
                        <p class="main-card-text">${description}
                        </p>
                        <p class="text-author">${author}</p>
                        <button type="button" class="btn-delete">
                            <svg class="icon-trash" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </button>
                    </div>
                    <ul class="main-list-icon">
                    <li class="item-images">
                        <a href="${buy_links[0].url}" class="item-link amazon">
                            <span class="underline"></span>
                        </a>
                    </li>
                    <li class="item-images">
                        <a href="${buy_links[1].url}" class="item-link apple-books">
                    <span class="underline"></span>
                        </a>
                    </li>
                    <li class="item-images">
                        <a href="${buy_links[2].url}" class="item-link bookshop">
                        <span class="underline"></span>
                        </a>
                    </li>
                    </ul>

                </div>
                               
            `;
    })
    .join('');
}

export { createMarkup };