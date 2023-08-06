import axios from "axios";
async function loadCategories() {
  const response = await axios.get("https://books-backend.p.goit.global/books/category-list");
  return response.data;
}





async function renderCategories() {
  try{
    const categories = await loadCategories();
    const markup = categories.map(({list_name})=> {return ``})
  }
}
renderCategories();


// async function fetchbooks() {
//   const response = await axios.get()
// }


  