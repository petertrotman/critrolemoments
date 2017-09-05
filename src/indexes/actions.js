import firebase from 'firebase/app';

export const INDEXES_REQUEST_INDEXES = 'INDEXES_REQUEST_INDEXES';
export const INDEXES_RECEIVE_INDEXES = 'INDEXES_RECEIVE_INDEXES';

export function receiveIndexes(data, error) {
  return {
    type: INDEXES_RECEIVE_INDEXES,
    payload: { data },
    error,
  };
}

export function requestIndexes() {
  return (dispatch, getState) => {
    if (getState().indexes.isFetching) return;

    dispatch({
      type: INDEXES_REQUEST_INDEXES,
    });

    firebase
      .app()
      .database()
      .ref('/indexes')
      .once('value')
      .then((snapshot) => {
        dispatch(receiveIndexes(snapshot.val()));
      });
  };
}
