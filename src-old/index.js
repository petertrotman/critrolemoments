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

function currentElement() {
  switch (window.location.hash) {
    case '':
      return episodesElement();
    case '#/submit':
      return submitElement();
    default:
      return episodesElement();
  }
}

function main() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const navigate = () => {
    root.childNodes.forEach(c => c.remove());
    root.appendChild(currentElement());
  };

  navigate();
  window.onpopstate = () => navigate();

  // const navElement = document.getElementById('submit-moment');
  // navElement.onclick = () => {
  //   window.history.pushState({}, '', '/#/submit');
  //   navigate();
  // };

  initFirebase();
}

document.addEventListener('DOMContentLoaded', main);
