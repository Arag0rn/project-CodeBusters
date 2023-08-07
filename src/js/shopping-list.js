import axios from "axios";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, get, post, child, push, update, forceLongPolling } from "firebase/database";
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     const email = user.email;
//     const photoURL = user.photoURL;
//     const emailVerified = user.emailVerified;
//       readBookData(uid)
//       serviceBooks(uid);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// function readBookData(userId) {
//   const dbRef = ref(getDatabase(), `users/${userId}/books`);
//   get(dbRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       const booksData = snapshot.val();
//         console.log((Object.values(booksData)));
//         return booksData
//     } else {
//         console.log("No shopping list data available");
//         return null
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// }


// const refs = {
//     defaultPage : document.querySelector('.default-message'),
//     showElement: document.querySelector('.js-container'),
//     shopLink: document.querySelector('.shopping-link')
// }


// async function serviceBooks(userId) {
//     try {

//         const BASE_URL = 'https://books-backend.p.goit.global/books/'
//          const { data: bookIds } = await readBookData(userId);

//           if (!bookIds || bookIds.length === 0) {
//       refs.defaultPage.classList.remove('.hidden');
//       return; 
//     }

        
//             const books = []
//      for (const bookId of bookId) {

//         const { data } = await axios.get(`${BASE_URL}${id}`)
//         books.push(bookData)

//          refs.defaultPage.classList.add('.hidden')
//          refs.showElement.insertAdjacentElement("beforeend",createMarkup(books))

//    }       
        
//     }
//     catch (error) {
//         console.log(error.message)
//         throw new Error(error.message, 'Something went wrong')
        
//    }

// }
       

 
 


// // console.log(serviceBooks());


// function createMarkup(arr) {
//     return arr.map(({book_image,title,description,author,buy_links: { name, url},_id}) => {
        

//         return `               
//         <div class="main">

//         <ul class="list-cards">
     
         
//             <li class="js-item list-item">
           
//                 <div class="image-container">

//                     <img src="${book_image}" alt="${title}" id="${_id}">
                    
//                 <div class="quick-view">
//                      Quick View
//             </div>
//                 </div>  

//                 <div class="content-container">
//                     <h2 class="card-title">${title}</h2>
//                     <p class="card-text">${description}</p>   //тут має бути категорія
                    
//                     <p class="main-card-text">${description}</p>
                    
//                     <p class="text-author">${author}</p>
 
//                      <button type="button" class="btn-delete">
//                         <svg class="icon-trash">
//                             <use href="./images/icons.svg#icon-trash"></use>
//                           </svg>
//                         </button>  
//                      </div>
           
//             </li>
//         </ul>
       
//                 <ul class="list-icons">
//                 <li class="item-images">
//                     <a href="${url}" class="item-link">
//                         <img src="./images/png_amazon.png" alt="${name}">
//                         <span class="underline"></span>
//                     </a>
//                 </li>
//                 <li class="item-images">
//                     <a href="${url}" class="item-link">
//                         <img src="./images/pngyellow.png" alt="${name}">
//                         <span class="underline"></span>
//                     </a>
//                 </li>
//                 <li class="item-images">
//                     <a href="${url}" class="item-link">
//                         <img src="./images/pngbook.png" alt="${name}">
//                         <span class="underline"></span>
//                     </a>
//                 </li>
            
//             </ul>
       
//         </div> `
//     }).join('')
// }


// fetch('https://books-backend.p.goit.global/books/643282b1e85766588626a0ae').then(resp => resp.json()).
// then( data => {
//     console.log(data)
//     createMarkup(data)
// }).
// catch(err => console.log(err))

//* При переході на сторінку Shopping list у блоці з переліком книг відмальовуються книги,
//* що були додані до нього користувачем і зберігалися
//* у localStorage.Якщо таких книг не знайдено, необхідно показати відповідне повідомлення користувачу



