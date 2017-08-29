import firebase from 'firebase/app';

export const EPISODES_REQUEST_EPISODES = 'EPISODES_REQUEST_EPISODES';
export const EPISODES_RECEIVE_EPISODES = 'EPISODES_RECEIVE_EPISODES';

export function receiveEpisodes(data, error) {
  return {
    type: EPISODES_RECEIVE_EPISODES,
    payload: { data },
    error,
  };
}

export function requestEpisodes() {
  return (dispatch, getState) => {
    if (getState().episodes.hasFetched) return;
    if (getState().episodes.isFetching) return;

    dispatch({
      type: EPISODES_REQUEST_EPISODES,
    });

    firebase
      .app()
      .database()
      .ref('/episodes')
      .once('value')
      .then((snapshot) => {
        dispatch(receiveEpisodes(snapshot.val()));
      });
  };
}
