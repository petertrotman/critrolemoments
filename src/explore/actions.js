import firebase from 'firebase/app';

import { parseMomentsSnapshot } from '../moments/util';

export const EXPLORE_REQUEST_MOMENTS = 'EXPLORE_REQUEST_MOMENTS';
export const EXPLORE_RECEIVE_MOMENTS = 'EXPLORE_RECEIVE_MOMENTS';

export function receiveMoments(data, error) {
  return {
    type: EXPLORE_RECEIVE_MOMENTS,
    payload: { data },
    error,
  };
}

export function requestMoments(options) {
  const defaultOptions = {
    orderBy: 'timestamp',
  };
  const opts = Object.assign(defaultOptions, options);

  return (dispatch) => {
    dispatch({
      type: EXPLORE_REQUEST_MOMENTS,
      payload: { opts },
    });

    firebase
      .app()
      .database()
      .ref('/moments')
      .orderByChild(opts.orderBy)
      .limitToLast(10)
      .once('value')
      .then((snapshot) => {
        const data = parseMomentsSnapshot(snapshot);
        dispatch(receiveMoments(data));
      });
  };
}
