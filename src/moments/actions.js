import firebase from 'firebase/app';

import { requestStar } from '../user/actions';

export const MOMENTS_REQUEST_MOMENTS = 'MOMENTS_REQUEST_MOMENTS';
export const MOMENTS_RECEIVE_MOMENTS = 'MOMENTS_RECEIVE_MOMENTS';
export const MOMENTS_REQUEST_UPDATE = 'MOMENTS_REQUEST_UPDATE';
export const MOMENTS_RECEIVE_UPDATE = 'MOMENTS_RECEIVE_UPDATE';
export const MOMENTS_REQUEST_SINGLE = 'MOMENTS_REQUEST_SINGLE';
export const MOMENTS_RECEIVE_SINGLE = 'MOMENTS_RECEIVE_SINGLE';
export const MOMENTS_REQUEST_CREATE = 'MOMENTS_REQUEST_CREATE';
export const MOMENTS_RECEIVE_CREATE = 'MOMENTS_RECEIVE_CREATE';
export const MOMENTS_REQUEST_DELETE = 'MOMENTS_REQUEST_DELETE';
export const MOMENTS_RECEIVE_DELETE = 'MOMENTS_RECEIVE_DELETE';

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
    const promises = momentKeys.map(key => ref.child(key).once('value'));

    Promise.all(promises)
      .then(snapshots => snapshots.filter(s => s.exists()))
      .then(snapshots => snapshots.reduce((acc, snapshot) => ({
        ...acc,
        [snapshot.key]: { ...snapshot.val(), key: snapshot.key },
      }), {}))
      .then(byId => ({
        byId,
        order: Object.entries(byId)
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .map(entry => entry[0]) // eslint-disable-line comma-dangle
      }))
      .then(({ byId, order }) => dispatch(receiveMoments({ byId, order })))
      .catch(err => dispatch(receiveMoments(null, err)));
  };
}

export function updateMoment(key, vals) {
  return (dispatch) => {
    const { key: discard, ...moment } = vals;

    dispatch({
      type: MOMENTS_REQUEST_UPDATE,
      payload: { key, moment },
    });

    return firebase
      .app()
      .database()
      .ref(`/moments/${key}`)
      .update(moment)
      .then(() => dispatch({
        type: MOMENTS_RECEIVE_UPDATE,
        payload: { key, moment },
      }))
      .catch(error => dispatch({
        type: MOMENTS_RECEIVE_UPDATE,
        payload: { key, moment },
        error,
      }));
  };
}

export function createMoment(_moment) {
  return (dispatch) => {
    const user = firebase.app().auth().currentUser;
    if (!user) return null;

    const moment = {
      ..._moment,
      starCount: 0,
      user: user.uid,
      timestamp: Date.now(),
    };

    dispatch({
      type: MOMENTS_REQUEST_CREATE,
      payload: { moment },
    });

    return firebase
      .app()
      .database()
      .ref('/moments')
      .push(moment)
      .then((ref) => {
        const key = ref.key;

        dispatch({
          type: MOMENTS_RECEIVE_CREATE,
          payload: { moment, key },
        });

        dispatch(requestStar(key));

        return key;
      })
      .catch(error => dispatch({
        type: MOMENTS_RECEIVE_CREATE,
        payload: { moment },
        error,
      }));
  };
}

export function deleteMoment(key) {
  return (dispatch) => {
    const user = firebase.app().auth().currentUser;
    if (!user) return null;

    dispatch({
      type: MOMENTS_REQUEST_DELETE,
      payload: { key },
    });

    const db = firebase.app().database();
    return db
      .ref(`/moments/${key}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((moment) => {
        if (moment.user !== user.uid) {
          return dispatch({
            type: MOMENTS_RECEIVE_DELETE,
            payload: { key },
            error: new Error('Unauthorized'),
          });
        }
        return db
          .ref(`/deleted/${key}`)
          .set(moment)
          .then(() => db
            .ref(`/moments/${key}`)
            .set(null))
          .then(() => dispatch({
            type: MOMENTS_RECEIVE_DELETE,
            payload: { key },
          }));
      });
  };
}

export function receiveSingle(key, moment, error) {
  return {
    type: MOMENTS_RECEIVE_SINGLE,
    payload: { key, moment },
    error,
  };
}

export function requestSingle(key) {
  return (dispatch, getState) => {
    dispatch({
      type: MOMENTS_REQUEST_SINGLE,
      payload: { key },
    });

    const savedMoment = getState().moments.byId[key] || getState().explore.byId[key];
    if (savedMoment) return dispatch(receiveSingle(key, savedMoment));

    return firebase
      .app()
      .database()
      .ref(`/moments/${key}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(moment => ({ ...moment, key }))
      .then(moment => dispatch(receiveSingle(key, moment)))
      .catch(error => dispatch(receiveSingle(key, null, error)));
  };
}
