import firebase from 'firebase/app';
import { requestMoments } from '../moments/actions';

export const USER_REQUEST_USER = 'USER_REQUEST_USER';
export const USER_RECEIVE_USER = 'USER_RECEIVE_USER';

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

