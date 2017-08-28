import firebase from 'firebase';

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
  return (dispatch) => {
    dispatch({
      type: EXPLORE_REQUEST_MOMENTS,
      payload: { options },
    });
    firebase
      .app()
      .database()
      .ref('/moments')
      .once('value', snapshot => dispatch(receiveMoments(snapshot.val())));
  };
}
