import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default function initFirebase() {
  return firebase.initializeApp({
    apiKey: 'AIzaSyD04KRJhHIgHDq_O66kORZriJ5ExOLRWbY',
    authDomain: 'critrolemoments.firebaseapp.com',
    databaseURL: 'https://critrolemoments.firebaseio.com',
    projectId: 'critrolemoments',
    storageBucket: 'critrolemoments.appspot.com',
    messagingSenderId: '1038580015751',
  });
}

