import axios from 'axios';
async function fethCategoryList() {
  const responce = await axios.get(
    `https://books-backend.p.goit.global/books/category-list`
  );
  return responce.data;
}
const categoryList = document.querySelector('.category_list');

fethCategoryList()
  .then(data => {
    categoryList.insertAdjacentHTML('beforeend', createMarkup(data));
  })
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(
      ({ list_name }) => `<li class='category-item'>
    <p class='category_text'>${list_name}</p>
    </li>`
    )
    .join('');
}
