import firebase from 'firebase/app';
import 'firebase/database';

import { episodesElement } from './episodes';
import { submitElement } from './submit';
// import styles from './index.css';

function initFirebase() {
  const config = {
    apiKey: 'AIzaSyD04KRJhHIgHDq_O66kORZriJ5ExOLRWbY',
    authDomain: 'critrolemoments.firebaseapp.com',
    databaseURL: 'https://critrolemoments.firebaseio.com',
    storageBucket: 'critrolemoments.appspot.com',
    messagingSenderId: '1038580015751',
  };
  firebase.initializeApp(config);
}

function main() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const episodes = episodesElement();
  root.appendChild(episodes);

  const navElement = document.getElementById('submit-moment');
  navElement.onclick = () => {
    navElement.onclick = null;
    const submit = submitElement();
    episodes.remove();
    root.appendChild(submit);
  };

  initFirebase();
}

document.addEventListener('DOMContentLoaded', main);
