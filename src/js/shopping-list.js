import { auth, removeBookData, database } from './auth';
import { get, ref, set, remove, child, push } from 'firebase/database';

export const shoppingList = [];

export async function getBooks() {
  const userId = auth.currentUser.uid;
  const dbRef = ref(database, `users/${userId}/books`);

  shoppingList.splice(0, shoppingList.length);

  return get(dbRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const booksData = snapshot.val();

        const books = Object.values(booksData);

        books.forEach(({ bookId }) => {
          shoppingList.push(bookId);
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}
