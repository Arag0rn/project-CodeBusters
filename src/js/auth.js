"use strict";
import {onCloseClick, onSignOnclick} from './auth-modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getDatabase, onValue, get } from "firebase/database";
import { getDatabase, ref, set, post, child, push, update } from "firebase/database";


const form = document.querySelector("form")

const body = document.querySelector("body")
const userButtonCont = document.querySelector('.user-btn-container')
const userNameField = document.querySelector(".user-name")
const logInBtn = document.querySelector(".signIn")
const logoutBtn = document.querySelector(".user-bar-log-out-btn")
const addToShopBtn = document.querySelector(".addTo")



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
    const uid = user.uid;
    console.log(user);
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    readUserData(uid)
    readBookData(uid)
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
    console.log("Name added to the database successfully.");
  }).catch((error) => {
    console.error("Error adding name to the database:", error);
  });
}
const productCards = document.querySelectorAll(".book-by-category-list");

 //addToShopBtn.addEventListener('click', onClickToShopingListAdd);


 function onClickToShopingListAdd(bookId) {
  const userId = auth.currentUser.uid;

  try {
    const dbRef = ref(database, `users/${userId}/books`);
    console.log(dbRef);
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

productCards.forEach((card) => {
  card.addEventListener("click", function(event) {
    console.log(card);
    //const bookId = card.id
    onClickToShopingListAdd(bookId); 
    console.log("Clicked on card with ID:", bookId);
  });
});

function readUserData(userId){
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    const userData = (snapshot.val());
    console.log(userData.displayName);
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

console.log(user);

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

  function readBookData(userId) {
    const dbRef = ref(getDatabase(), `users/${userId}/books`);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();
       console.log((Object.values(booksData)));
      } else {
        console.log("No shopping list data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  