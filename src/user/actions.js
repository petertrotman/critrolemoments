import firebase from 'firebase/app';
import { requestMoments } from '../moments/actions';

export const USER_REQUEST_USER = 'USER_REQUEST_USER';
export const USER_RECEIVE_USER = 'USER_RECEIVE_USER';
export const USER_REQUEST_STAR = 'MOMENTS_REQUEST_STAR';
export const USER_RECEIVE_STAR = 'MOMENTS_RECEIVE_STAR';

export function receiveUser(data, error) {
  return (dispatch) => {
    dispatch({
      type: USER_RECEIVE_USER,
      payload: { data },
      error,
    });
    dispatch(requestMoments());
  };
}

export function requestUser(optionalUser) {
  return (dispatch, getState) => {
    if (getState().user.isFetching) return;

    const user = optionalUser || getState().auth.user;
    if (!user) return;

    dispatch({
      type: USER_REQUEST_USER,
      payload: { user },
    });

    firebase
      .app()
      .database()
      .ref(`/users/${user.uid}`)
      .once('value')
      .then((snapshot) => { dispatch(receiveUser(snapshot.val())); });
  };
}

export function receiveStar(momentKey, error) {
  return {
    type: USER_RECEIVE_STAR,
    payload: { moment: momentKey },
    error,
  };
}

export function requestStar(momentKey) {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    if (!user) return;

    dispatch({
      type: USER_REQUEST_STAR,
      payload: { moment: momentKey },
    });

    const setValue = momentKey in getState().user.data.starredMoments
      ? null // Remove star
      : true; // Add star

    firebase
      .app()
      .database()
      .ref(`/users/${user.uid}/starredMoments/${momentKey}`)
      .set(setValue)
      .then(() => dispatch(receiveStar(momentKey)))
      .catch(err => dispatch(receiveStar(momentKey, err)));
  };
}
