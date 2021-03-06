import firebase from 'firebase/app';
import swal from 'sweetalert2';

export function mountFirebaseUi(node, firebaseApp, firebaseuiApp, callbacks) {
  if (!node) return;

  firebaseuiApp.reset();
  firebaseuiApp.start(node, {
    // signInSuccessUrl: next,
    callbacks,
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/tos',
  });
}

