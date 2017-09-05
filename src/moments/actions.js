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
        .then(snapshot => snapshot));
    Promise.all(promises)
      .then((snapshots) => {
        const byId = snapshots.reduce((acc, snapshot) => ({
          ...acc,
          [snapshot.key]: { ...snapshot.val(), key: snapshot.key },
        }), {});
        const order = Object.entries(byId)
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .map(entry => entry[0]);
        dispatch(receiveMoments({ byId, order }));
      })
      .catch(err => dispatch(receiveMoments(null, err)));
  };
}
