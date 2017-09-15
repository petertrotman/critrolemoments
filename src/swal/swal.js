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

  // button.swal2-confirm {
  //   background-color: ${theme.secondary} !important;
  // }

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
  return swal({
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
  if (!user) return null;

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

  return swal.queue([
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
        if (!input) reject('You must select a reason.');
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
            timestamp: Date.now(),
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

export function editSwal(push, updateMoment, moment, user) {
  const claimSwal = () => swal({
    title: 'Claim this Moment',
    type: 'info',
    text: 'This moment doesn\'t have an owner! Would you like to claim it as your own?\n\nBy doing so, you are accepting responsibility for keeping the moment accurate and fully detailed. If you don\'t wish to do this, then you can just make your own copy of it on the next page.',
    showCancelButton: true,
    confirmButtonText: 'Claim Moment!',
    cancelButtonText: 'Copy Moment',
    preConfirm: () => updateMoment(moment.key, { user }),
  })
    .then(() => push(`/moments/${moment.key}/edit`));

  const copySwal = () => swal({
    title: 'Create a Copy',
    type: 'info',
    text: 'Because you are not the owner of this moment, you cannot directly edit it. However, you may make a copy of it and edit that as you see fit.',
    showCancelButton: true,
    confirmButtonText: 'Create a Copy',
  })
    .then(() => push({ pathname: '/create', search: `?from=${moment.key}` }));

  if (!moment.user) {
    return claimSwal()
      .catch((dismiss) => {
        if (dismiss === 'cancel') {
          copySwal();
        } else {
          swal.noop();
        }
      });
  }

  return copySwal().catch(swal.noop);
}

export function shareSwal(url) {
  return swal({
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

export function releaseSwal(releaseFn) {
  return swal({
    title: 'Are you sure?',
    type: 'warning',
    text: 'By releasing this moment, other people will be able to claim it and edit it as their own.\n\nAre you sure you want to do this?',
    showCancelButton: true,
    confirmButtonText: 'Release Moment',
    confirmButtonColor: 'red',
    preConfirm: releaseFn,
  })
    .then(() => swal(
      'Released!',
      'The moment has been released.',
      'success',
    ));
}

export function deleteSwal(deleteFn) {
  return swal({
    title: 'Are you sure?',
    type: 'warning',
    text: 'You cannot undo this!',
    showCancelButton: true,
    confirmButtonText: 'Delete Moment',
    confirmButtonColor: 'crimson',
    preConfirm: deleteFn,
  })
    .then(() => swal(
      'Deleted!',
      'The moment has been deleted.',
      'success',
    ));
}
