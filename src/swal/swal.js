import copy from 'copy-to-clipboard';
import firebase from 'firebase/app';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { injectGlobal } from 'styled-components';
import theme from '../theme';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .swal2-modal, .swal2-modal button {
    font-family: inherit;
    font-size: inherit;
  }

  button.swal2-confirm {
    background-color: ${theme.secondary} !important;
  }

  .swal2-radio {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;

    > label {
      margin-left: 20% !important;
    }
  }
`;
/* eslint-enable no-unused-expressions */


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
  })
    .catch(swal.noop);
}

export function reportSwal(moment) {
  const user = firebase.app().auth().currentUser;
  if (!user) return;

  swal.setDefaults({
    type: 'question',
    title: 'Report Moment',
    showCancelButton: true,
    confirmButtonText: 'Next &rarr;',
    animation: false,
    reverseButtons: true,
    // progressSteps: ['Reason', 'Details', 'Submit'],
    progressSteps: ['1', '2', '3'],
  });

  swal.queue([
    {
      text: 'Please select a reason:',
      input: 'radio',
      animation: true,
      inputOptions: {
        'Inappropriate Language': 'Inappropriate Language',
        'Abusive Language': 'Abusive Language',
        'Incorrect Details': 'Incorrect Details',
        Spoilers: 'Spoilers',
        Other: 'Other',
      },
      inputValidator: input => new Promise((resolve, reject) => {
        if (!input) reject('You must select a reson');
        resolve();
      }),
    },
    {
      text: 'Please provide any additional details:',
      input: 'textarea',
    },
  ])
    .catch(() => swal.resetDefaults())
    .then(result => swal({
      text: 'Confirm details and submit',
      html: `<h3>Reason</h3><p>${result[0]}</p><h3>Details</h3><p>${result[1]}</p>`,
      confirmButtonText: 'Submit',
      preConfirm: () => new Promise((resolve, reject) => {
        firebase
          .app()
          .database()
          .ref('/reports')
          .push({
            user: user.uid,
            moment: moment.key,
            reason: result[0],
            details: result[1],
          })
          .then(() => resolve())
          .catch(err => reject(err));
      }),
    }))
    .then(() => {
      swal.resetDefaults();
      return swal({
        type: 'success',
        title: 'Report Submitted!',
        text: 'Thank you for helping to improve CritRoleMoments.',
      });
    })
    .catch(() => swal.resetDefaults());
}

export function shareSwal(url) {
  swal({
    title: 'Share Moment',
    type: 'info',
    text: `Send this url to your friends (click below to copy):\n\n${url}`,
    showCancelButton: true,
    confirmButtonText: 'Copy Link',
    preConfirm: () => new Promise(resolve =>
      resolve(copy(url, { debug: true, message: 'Press #{key} to copy' }))),
  })
    .then(() => swal({
      title: 'Copied to Clipboard',
      type: 'success',
    }))
    .catch(swal.noop);
}
