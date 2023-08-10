import { signOut } from 'firebase/auth';
import { auth } from './auth';

const logoutBtn = document.querySelector('.user-bar-log-out-btn');
const logoutMobileBtn = document.querySelector('.log-out-mob-btn');

logoutBtn.addEventListener('click', onSignOutClick);
logoutMobileBtn.addEventListener('click', onSignOutClick);

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
