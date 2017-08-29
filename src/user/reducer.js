import update from 'immutability-helper';

import {
  USER_REQUEST_USER,
  USER_RECEIVE_USER,
  USER_REQUEST_STAR,
  USER_RECEIVE_STAR,
} from './actions';

import { AUTH_USER_LOGOUT } from '../auth/actions';

const defaultState = {
  data: {
    starredMoments: {},
    ownedMoments: {},
  },
  starringMoments: [],
  isFetching: false,
  error: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case USER_REQUEST_USER: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case USER_RECEIVE_USER: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }
      if (!action.payload.data) {
        return defaultState;
      }
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        error: null,
        isFetching: false,
      };
    }

    case USER_REQUEST_STAR: {
      return {
        ...state,
        starringMoments: state.starringMoments.concat(action.payload.moment),
        isFetching: true,
        error: null,
      };
    }

    case USER_RECEIVE_STAR: {
      if (action.error) {
        return {
          ...state,
          starringMoments: state.starringMoments.filter(m => m !== action.payload.moment),
          isFetching: false,
          error: action.error,
        };
      }

      if (action.payload.moment in state.data.starredMoments) {
        // Remove star
        return update(state, {
          data: { starredMoments: { $unset: [action.payload.moment] } },
          starringMoments: { $apply: a => a.filter(m => m !== action.payload.moment) },
          isFetching: { $set: false },
          error: { $set: null },
        });
      }

      // Add star
      return update(state, {
        data: { starredMoments: { [action.payload.moment]: { $set: true } } },
        starringMoments: { $apply: a => a.filter(m => m !== action.payload.moment) },
        isFetching: { $set: false },
        error: { $set: null },
      });
    }

    case AUTH_USER_LOGOUT:
      return defaultState;

    default:
      return state;
  }
}
