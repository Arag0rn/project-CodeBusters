"use strict";
import { onCloseClick, onSignOnclick } from './auth-modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onValue, get, update } from "firebase/database";
import { getDatabase, ref, set, remove, child, push } from "firebase/database";
import axios from 'axios';


Loading.init({
  backgroundColor: 'rgba(0,0,0,0.1)',
  svgColor: '#4f2ee8',
});

const form = document.querySelector("form")

const body = document.querySelector("body")
const userButtonCont = document.querySelector('.user-btn-container')
const userNameField = document.querySelector(".user-name")
const logInBtn = document.querySelector(".signIn")
const logoutBtn = document.querySelector(".user-bar-log-out-btn")
const bookCont = document.querySelector("body > div.container.home-container > main")


logoutBtn.addEventListener('click', onSignOutClick)
logInBtn.addEventListener('click', onSignInClick)
form.addEventListener("submit", onSubmitReg)





const firebaseConfig = {
  apiKey: "AIzaSyAQxsm1fVLslhxTiwQ3FCGOtjW_RrvvnpE",
  authDomain: "bookshelf-b7b0a.firebaseapp.com",
  projectId: "bookshelf-b7b0a",
  storageBucket: "bookshelf-b7b0a.appspot.com",
  messagingSenderId: "435762232768",
  appId: "1:435762232768:web:c27015f9ad01edd0675c25",
  databaseURL: "https://bookshelf-b7b0a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);




 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const userUid = user.uid;
    console.log(userUid);
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    readUserData(userUid);
    readBookData(userUid);
    removeBookData(userUid);

    // ...
  } else {
    // User is signed out
    // ...
  }
});


 function onSubmitReg(e){
  e.preventDefault()
  const displayName = form.name.value;
  const email = form.email.value
  const password = form.password.value
createUserWithEmailAndPassword(auth, email, password, )
  .then((userCredential) => {
    const user = userCredential.user;
      const email = user.email;
      const imageUrl = user.photoURL;
      writeUserData(user.uid, displayName, email);
      e.target.reset()
      onCloseClick();

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

function writeUserData(userId, name, email, bookId) {
  const dbRef = ref(database, 'users/' + userId);
  set(dbRef, {
    displayName: name,
    email: email,
  }).then(() => {
    Notify.success("Name added to the database successfully.");
  }).catch((error) => {
    console.error("Error adding name to the database:", error);
  });
}
const productCards = document.querySelectorAll(".book-by-category-list");



 export function onClickToShopingListAdd(bookId) {
  const userId = auth.currentUser.uid;

  try {
    const dbRef = ref(database, `users/${userId}/books`);
    push(dbRef, {
      bookId: bookId
    }
    ).then(() => {
      Notify.success("Book added to user's shopping list successfully.");
    }).catch((error) => {
      console.error("Error adding book to user's shopping list:", error);
    });
  } catch (error) {
    console.error("Error adding book to user's shopping list:", error);
  }
}


function readUserData(userId){
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    const userData = (snapshot.val());
    userButtonCont.style.display = "block"
    userNameField.textContent = `${userData.displayName}`
    //userNameField.textContent = userData.displayName
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}
const user = auth.currentUser;


function onSignOutClick() {
  signOut(auth)
    .then(() => {
      Notify.success('Sign-out successful');
    })
    .catch((error) => {
      Notify.failure("An error happened")
    })
    .finally(() => {
      location.reload();
    });
}

function onSignInClick(){
  const displayName = form.name.value;
  const email = form.email.value
  const password = form.password.value
 signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    const user = userCredential.user;
   })
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
      Notify.failure('Wrong password. Please try again.');
    } else if (errorCode === 'auth/user-not-found') {
      Notify.failure('User not found. Please check your email or sign up.');
    } 
  })
  .finally(()=>{
    Notify.success ("Glad you're back again") 
    onCloseClick()
  })
  }

  onValue(ref(database, "users"), function(snapshot){
    console.log(snapshot.val());
  })

 

  
  function readBookData(userId,bookId) {
    const dbRef = ref(getDatabase(), `users/${userId}/books`);
  return  get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        const books = (Object.values(booksData)) // Отримуємо список книг за id
         books.forEach(({bookId}) => {
          serviceBooks(bookId)
        })
      } else {
        console.log("No shopping list data available");
        return [];
      } 
    }).catch((error) => {
      console.log(error);
    });
  }


  const refs = {
    deleteBtn : document.querySelector(".btn-delete"),
    defaultPage : document.querySelector('.default-message'),
    showElement: document.querySelector('.list-cards'),
    shopLink: document.querySelector('.shopping-link')
}


async function serviceBooks(bookId) {
  try {
    refs.defaultPage.classList.add('visually-hidden')
    
      Loading.pulse();
      
        const BASE_URL = 'https://books-backend.p.goit.global/books/'
  
    const books = [];

       const { data } = await axios.get(`${BASE_URL}${bookId}`)
        books.push(data)



    
      refs.showElement.insertAdjacentHTML("beforeend", markup)
       Loading.remove();

       refs.defaultPage.classList.add('hidden')
       const markup = createMarkup(books)
         refs.showElement.insertAdjacentHTML("beforeend",markup)
         const deleteButtons = document.querySelectorAll('.btn-delete');
         deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteClick);
});

    }
    catch (error) {
        console.log(error.message)
        throw new Error(error.message, 'Something went wrong')
  } finally {
     Loading.remove();
   }

}


function createMarkup(arr) {

    return arr.map(({book_image,title,description,author,buy_links}) => {

      return `
      
     
      <div class="list-cards">
                <div class="js-item list-item">
                    <div class="image-container">
                        <img class="card-image" src="${book_image}" width="116" height="165" alt="${title}" >
                    </div>
                    <div class="content-container ">
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
         
            `
    }).join('')
}


   

let cardId;

function handleDeleteClick(event) {
    const listItem = event.currentTarget.closest('.list-item');
    if (listItem) {
       cardId = listItem.id;
        removeBookData(cardId);
      
        listItem.remove();
    }
}


function removeBookData(userUid, cardId) {
  const db = getDatabase(app);
  const dbRef = ref(db, `users/${userUid}/books/`);
  console.log(cardId);

  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            const book = booksData[key];
            
            if (book.bookId === cardId) {
              const bookToDeleteRef = child(dbRef, key);
              
              remove(bookToDeleteRef)
                .then(() => {
                  console.log("Книга удалена из базы данных");
                  Notify.success("Книга успешно удалена.");
                })
                .catch((error) => {
                  console.error("Ошибка удаления книги из базы данных:", error);
                  Notify.failure("Ошибка удаления книги.");
                });
            }
          }
        }
      } else {
        console.log("Данные о книгах не найдены");
      }
    })
    .catch((error) => {
      console.error("Ошибка получения данных о книгах:", error);
      Notify.failure("Ошибка получения данных о книгах.");
    });
}







  

