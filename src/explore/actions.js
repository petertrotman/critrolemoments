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

export function requestMoments(opts) {
  const defaultOptions = {
    orderBy: 'timestamp',
    force: false,
  };
  const options = Object.assign(defaultOptions, opts);

  return (dispatch, getState) => {
    const explore = getState().explore;
    if (explore.isFetching) return;
    if (
      JSON.stringify(options) === JSON.stringify(explore.options)
      && !options.force
    ) {
      return;
    }

    dispatch({
      type: EXPLORE_REQUEST_MOMENTS,
      payload: { options },
    });

    firebase
      .app()
      .database()
      .ref('/moments')
      .orderByChild(options.orderBy)
      .limitToLast(10)
      .once('value')
      .then((snapshot) => {
        const data = parseMomentsSnapshot(snapshot);
        dispatch(receiveMoments(data));
      });
  };
}
