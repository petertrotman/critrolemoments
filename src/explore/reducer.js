import update from 'immutability-helper';

import {
  EXPLORE_REQUEST_MOMENTS,
  EXPLORE_RECEIVE_MOMENTS,
} from './actions';
import { USER_RECEIVE_STAR } from '../user/actions';

const defaultState = {
  byId: {},
  order: [],
  options: {},
  error: null,
  isFetching: false,
  hasFetched: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case EXPLORE_REQUEST_MOMENTS: {
      return {
        ...state,
        error: null,
        isFetching: true,
        options: action.payload.options,
      };
    }

    case EXPLORE_RECEIVE_MOMENTS: {
      if (action.error) {
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };
      }
      if (!action.payload.data) {
        return {
          ...defaultState,
          hasFetched: true,
        };
      }
      return {
        ...state,
        byId: action.payload.data.byId,
        order: action.payload.data.order,
        error: null,
        isFetching: false,
        hasFetched: true,
      };
    }

    case USER_RECEIVE_STAR: {
      if (action.error) return state;
      const key = action.payload.moment;
      return update(state, {
        byId: {
          [key]: {
            starCount: {
              $set: (state.byId[key].starCount || 0) + (action.payload.added ? 1 : -1),
            },
          },
        },
      });
    }

    default:
      return state;
  }
}
