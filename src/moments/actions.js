import firebase from 'firebase/app';

import { parseMomentsSnapshot } from './util';

export const MOMENTS_REQUEST_MOMENTS = 'MOMENTS_REQUEST_MOMENTS';
export const MOMENTS_RECEIVE_MOMENTS = 'MOMENTS_RECEIVE_MOMENTS';

export function receiveMoments(data, error) {
  return {
    type: MOMENTS_RECEIVE_MOMENTS,
    payload: { data },
    error,
  };
}

export function requestMoments() {
  const user = firebase.app().auth().currentUser;
  if (!user) return () => {};

  return (dispatch, getState) => {
    if (getState().moments.isFetching) return;

    dispatch({
      type: MOMENTS_REQUEST_MOMENTS,
    });

    firebase
      .app()
      .database()
      .ref('/moments')
      .orderByChild(`starredBy/${user.uid}`)
      .equalTo(true)
      .once('value', (snapshot) => {
        const data = parseMomentsSnapshot(snapshot);
        dispatch(receiveMoments(data));
      });
  };
}
