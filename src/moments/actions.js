import firebase from 'firebase/app';

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
  return (dispatch, getState) => {
    if (getState().moments.isFetching) return;

    const user = getState().user;
    const momentKeys = []
      .concat(Object.keys(user.data.starredMoments))
      .concat(Object.keys(user.data.ownedMoments));

    dispatch({
      type: MOMENTS_REQUEST_MOMENTS,
      payload: { user, momentKeys },
    });

    const ref = firebase.app().database().ref('/moments');
    const promises = momentKeys
      .map(key => ref
        .child(key)
        .once('value')
        .then(snapshot => snapshot.val()));
    Promise.all(promises)
      .then(data => dispatch(receiveMoments(data)))
      .catch(err => dispatch(receiveMoments(null, err)));
  };

  // firebase
  //   .app()
  //   .database()
  //   .ref('/moments')
  //   .orderByChild(`starredBy/${user.uid}`)
  //   .equalTo(true)
  //   .once('value')
  //   .then((snapshot) => {
  //     const data = parseMomentsSnapshot(snapshot);
  //     dispatch(receiveMoments(data));
  //   });
}
