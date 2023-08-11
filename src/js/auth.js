import { shopingList } from './modal';
import { onCloseClick, onSignOnclick } from './auth-modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, get, update } from 'firebase/database';
import { getDatabase, ref, set, remove, child, push } from 'firebase/database';
import axios from 'axios';
import { createMarkup } from './markup-shopping-list';

const form = document.querySelector('.signIn-form');

const body = document.querySelectorAll('body');
const userButtonCont = document.querySelector('.user-btn-container');
const userNameField = document.querySelectorAll('.user-name');

const bookCont = document.querySelector(
  'body > div.container.home-container > main'
);

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
export const auth = getAuth();
export const database = getDatabase(app);

onAuthStateChanged(auth, user => {
  if (user) {
    Loading.pulse();
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const userUid = user.uid;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    readUserData(userUid);
    readBookData(userUid);
    Loading.remove();
    // ...
  } else {
    // User is signed out
    // ...
  }
});

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

onValue(ref(database, 'users'), function (snapshot) {});

function readBookData(userId, bookId) {
  const dbRef = ref(getDatabase(), `users/${userId}/books`);
  return get(dbRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        const books = Object.values(booksData);
        if (books) {
          books.forEach(({ bookId }) => {
            shopingList.push(bookId);

            serviceBooks(bookId);
          });
        }
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
  deleteBtn: document.querySelector('.btn-delete'),
  defaultPage: document.querySelector('.default-page'),
  showElement: document.querySelector('.js-container'),
  shopLink: document.querySelector('.shopping-link'),
};

Loading.init({
  backgroundColor: 'rgba(0,0,0,0.1)',
  svgColor: '#4f2ee8',
});

async function serviceBooks(bookId) {
  try {
    const BASE_URL = 'https://books-backend.p.goit.global/books/';
    const books = [];

    const { data } = await axios.get(`${BASE_URL}${bookId}`);
    books.push(data);
    const isBookAlreadyAdded = books.every(book => book.id === data.id);

    if (!isBookAlreadyAdded) {
      books.push(data);
    }

    if (books.length !== 0) {
      refs.defaultPage.classList.add('visually-hidden');

      const markup = createMarkup(books);
      refs.showElement.insertAdjacentHTML('beforeend', markup);


      Loading.remove();

    }
    if (books.length === 0) {
      refs.defaultPage.classList.remove('visually-hidden');
    }
    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(button => {
      button.addEventListener('click', handleDeleteClick);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function handleDeleteClick(event) {
  const listItem = event.currentTarget.closest('.list-cards');

  const cardId = listItem.id;
  removeBookData(cardId);
  listItem.remove();

  if (refs.showElement.children.length === 0) {
    refs.defaultPage.classList.remove('visually-hidden');
  }
}

export function removeBookData(cardId) {
  const userId = auth.currentUser.uid;
  const db = getDatabase(app);
  const dbRef = ref(db, `users/${userId}/books/`);

  get(dbRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            const book = booksData[key];
            if (book.bookId === cardId) {
              const bookToDeleteRef = child(dbRef, key);

              remove(bookToDeleteRef)
                .then(() => {
                  Notify.success('Book deleted successfully.');
                })
                .catch(error => {
                  Notify.failure('Error.');
                });
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Ошибка получения данных о книгах:', error);
      Notify.failure('Error getting data about books.');
    });
}

export function onSubmitReg(e) {
  const displayName = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const email = user.email;
      const imageUrl = user.photoURL;
      writeUserData(user.uid, displayName, email);
      onCloseClick();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function onSignInClick() {
  const displayName = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      onCloseClick();
      Notify.success("Glad you're back again");
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        Notify.failure('Wrong password. Please try again.');
      } else if (errorCode === 'auth/user-not-found') {
        Notify.failure('User not found. Please check your email or sign up.');
      }
    });
}
