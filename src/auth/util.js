import firebase from 'firebase/app';
import swal from 'sweetalert2';

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

export function signInSwal(push, location) {
  swal({
    title: 'Please sign in to do that',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sign in',
    preConfirm: () => new Promise((resolve) => {
      const next = encodeURIComponent(`${location.pathname}${location.search}`);
      resolve(push({
        pathname: '/auth/signin',
        search: `?next=${next}`,
        state: { next },
      }));
    }),
  }).catch(swal.noop);
}
