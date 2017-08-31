import firebase from 'firebase/app';

import { parseMomentsSnapshot } from '../moments/util';

export const EXPLORE_REQUEST_MOMENTS = 'EXPLORE_REQUEST_MOMENTS';
export const EXPLORE_RECEIVE_MOMENTS = 'EXPLORE_RECEIVE_MOMENTS';
export const EXPLORE_UPDATE_OPTIONS = 'EXPLORE_UPDATE_OPTIONS';

const MAX_FETCH_LIMIT = 50;

export function receiveMoments(data, error) {
  return {
    type: EXPLORE_RECEIVE_MOMENTS,
    payload: { data },
    error,
  };
}

export function requestMoments() {
  return (dispatch, getState) => {
    const explore = getState().explore;
    const options = explore.options;

    if (false
      || explore.isFetching
      || (
        JSON.stringify(options) === JSON.stringify(explore.fetchedOptions)
        && !options.force
      )
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
      .limitToLast(Math.min(options.limit, MAX_FETCH_LIMIT))
      .once('value')
      .then((snapshot) => {
        const data = parseMomentsSnapshot(snapshot);
        dispatch(receiveMoments(data));
      });
  };
}

export function updateOptions(options) {
  return {
    type: EXPLORE_UPDATE_OPTIONS,
    payload: { options },
  };
}
