'use strict';
import { onCloseClick, onSignOnclick } from './auth-modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { onValue, get, update } from 'firebase/database';
import { getDatabase, ref, set, remove, child, push } from 'firebase/database';
import axios from 'axios';
import { createMarkup } from './markup-shopping-list';



const form = document.querySelector('.signIn-form');

const body = document.querySelectorAll('body');
const userButtonCont = document.querySelector('.user-btn-container');
const userNameField = document.querySelectorAll('.user-name');
const logInBtn = document.querySelector('.signIn');
const logUpBtn = document.querySelector('.signUp');
const logoutBtn = document.querySelector('.user-bar-log-out-btn');
const logoutMobileBtn = document.querySelector('.log-out-mob-btn');
const bookCont = document.querySelector(
  'body > div.container.home-container > main'
);
const formBtn = document.querySelector(".SignUpBtn");

logoutBtn.addEventListener('click', onSignOutClick);
logoutMobileBtn.addEventListener('click', onSignOutClick);
// logInBtn.addEventListener('click', onSignInClick);
logInBtn.addEventListener('click', onSignSwitherClick);
logUpBtn.addEventListener('click', onSignSwitherClick);
form.addEventListener('submit', formSubmit);

const firebaseConfig = {
  apiKey: 'AIzaSyAQxsm1fVLslhxTiwQ3FCGOtjW_RrvvnpE',
  authDomain: 'bookshelf-b7b0a.firebaseapp.com',
  projectId: 'bookshelf-b7b0a',
  storageBucket: 'bookshelf-b7b0a.appspot.com',
  messagingSenderId: '435762232768',
  appId: '1:435762232768:web:c27015f9ad01edd0675c25',
  databaseURL: 'https://bookshelf-b7b0a-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

function formSubmit(e) {
  e.preventDefault();
    switch (e.currentTarget.dataset.action) {
      case "up":
        onSubmitReg();
        break;
      case "in":
        onSignInClick();
        break;
    }
}

function onSignSwitherClick (e) {
   changeBtn(e.currentTarget.dataset.action);

   switch (e.currentTarget.dataset.action) {
    case "in":
      logUpBtn.classList.remove("active");
      logInBtn.classList.add("active");
      break;
    case "up":
      logUpBtn.classList.add("active");
      logInBtn.classList.remove("active");
      break;
   }
}

function changeBtn(option) {
formBtn.innerText = `sign ${option}`
form.dataset.action = option;
}

onAuthStateChanged(auth, user => {
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

    // ...
  } else {
    // User is signed out
    // ...
  }
});

function onSubmitReg(e) {
  const displayName = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const email = user.email;
      const imageUrl = user.photoURL;
      writeUserData(user.uid, displayName, email);
      e.target.reset();
      onCloseClick();
    })
    .catch(error => {
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
  })
    .then(() => {
      Notify.success('Name added to the database successfully.');
    })
    .catch(error => {
      console.error('Error adding name to the database:', error);
    });
}
const productCards = document.querySelectorAll('.book-by-category-list');

export function onClickToShopingListAdd(bookId) {
  const userId = auth.currentUser.uid;

  try {
    const dbRef = ref(database, `users/${userId}/books`);
    push(dbRef, {
      bookId: bookId,
    })
      .then(() => {
        Notify.success("Book added to user's shopping list successfully.");
      })
      .catch(error => {
        console.error("Error adding book to user's shopping list:", error);
      });
  } catch (error) {
    console.error("Error adding book to user's shopping list:", error);
  }
}

function readUserData(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        userButtonCont.style.display = 'block';
        for (const user of userNameField) {
          user.textContent = `${userData.displayName}`;
        }
        for (const item of body) {
          item.classList.add('sign-in');
        }
        //userNameField.textContent = userData.displayName
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
const user = auth.currentUser;

function onSignOutClick() {
  signOut(auth)
    .then(() => {
      Notify.success('Sign-out successful');
    })
    .catch(error => {
      Notify.failure('An error happened');
    })
    .finally(() => {
      location.reload();
    });
}

function onSignInClick() {
  const displayName = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        Notify.failure('Wrong password. Please try again.');
      } else if (errorCode === 'auth/user-not-found') {
        Notify.failure('User not found. Please check your email or sign up.');
      }
    })
    .finally(() => {
      Notify.success("Glad you're back again");
      onCloseClick();
    });
}

onValue(ref(database, 'users'), function (snapshot) {
  console.log(snapshot.val());
});

function readBookData(userId, bookId) {
  const dbRef = ref(getDatabase(), `users/${userId}/books`);
  return get(dbRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        const books = Object.values(booksData); // Отримуємо список книг за id
        books.forEach(({ bookId }) => {
          refs.defaultPage.innerHTML = ''
          Loading.pulse()
          serviceBooks(bookId);
          Loading.remove()
        });
      } else {
        console.log('No shopping list data available');
        return [];
      }
    })
    .catch(error => {
      console.log(error);
    });

  }


  const refs = {
    deleteBtn : document.querySelector(".btn-delete"),
    defaultPage : document.querySelector('.default-page'),
    showElement: document.querySelector('.js-container'),
    shopLink: document.querySelector('.shopping-link'),
    resetMargin: document.querySelector('h1')

}



Loading.init({
  backgroundColor: 'rgba(0,0,0,0.1)',
  svgColor: '#4f2ee8',
});



async function serviceBooks(bookId) {


  try {
      refs.defaultPage.innerHTML = '';
      Loading.pulse();
    
      const BASE_URL = 'https://books-backend.p.goit.global/books/'
      const books = [];

       const { data } = await axios.get(`${BASE_URL}${bookId}`)
    books.push(data)
    console.log(books);
    const isBookAlreadyAdded = books.every(book => book.id === data.id);

    //* піде в main
    if (!isBookAlreadyAdded) {
      books.push(data)
    }
      
    //* піде і main
    if (books.length !== 0) {
      console.log('Adding cards...');
      refs.defaultPage.classList.add('visually-hidden');

        const markup = createMarkup(books)
      refs.showElement.insertAdjacentHTML("beforeend", markup)
          Loading.remove();
    }
              if (books.length === 0) {
      refs.defaultPage.classList.remove('visually-hidden');
      Loading.remove()
    }
    const deleteButtons = document.querySelectorAll('.btn-delete');

  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteClick);
  });
    
  } catch (error) {
    console.log(error.message);
    throw new Error(error)
  } finally {
    Loading.remove()
  }      

}





function handleDeleteClick(event) {
  const listItem = event.currentTarget.closest('.list-cards');
  if (listItem) {
    const cardId = listItem.id;
    removeBookData(cardId);

    listItem.remove();
  }
}

function removeBookData(cardId) {
  const userId = auth.currentUser.uid;
  const db = getDatabase(app);
  const dbRef = ref(db, `users/${userId}/books/`);
  console.log(cardId);

  get(dbRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();
        console.log("booksData:", booksData)

        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            const book = booksData[key];
            console.log(cardId);
            if (book.bookId === cardId) {
              const bookToDeleteRef = child(dbRef, key);

              remove(bookToDeleteRef)
                .then(() => {
                  console.log('The book has been removed from the database');
                  Notify.success('Book deleted successfully.');
                })
                .catch(error => {
                  console.error('Ошибка удаления книги из базы данных:', error);
                  Notify.failure('Ошибка удаления книги.');
                });
            }
          }
        }
      } else {
        console.log('Данные о книгах не найдены');
      }
    })
    .catch(error => {
      console.error('Ошибка получения данных о книгах:', error);
      Notify.failure('Error getting data about books.');
    });
}