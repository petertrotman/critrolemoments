import firebase from 'firebase/app';

export function mountFirebaseUi(node, firebaseApp, firebaseuiApp, signInSuccess) {
  if (!node) return;

  firebaseuiApp.reset();
  firebaseuiApp.start(node, {
    // signInSuccessUrl: next,
    callbacks: {
      signInSuccess,
    },
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
