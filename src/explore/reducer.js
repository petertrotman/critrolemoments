import update from 'immutability-helper';

import {
  EXPLORE_REQUEST_MOMENTS,
  EXPLORE_RECEIVE_MOMENTS,
  EXPLORE_UPDATE_OPTIONS,
} from './actions';
import { USER_RECEIVE_STAR } from '../user/actions';

const defaultState = {
  byId: {},
  order: [],
  options: {
    orderBy: 'timestamp',
    episodes: [],
    lastEpisode: null,
    limit: 20,
    force: false,
  },
  error: null,
  isFetching: false,
  hasFetched: false,
  fetchedWithOptions: {},
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
          ...state,
          byId: {},
          order: [],
          error: null,
          isFetching: false,
          hasFetched: true,
          fetchedWithOptions: { ...state.options },
        };
      }
      return {
        ...state,
        byId: action.payload.data.byId,
        order: action.payload.data.order,
        error: null,
        isFetching: false,
        hasFetched: true,
        fetchedWithOptions: { ...state.options },
      };
    }

    case USER_RECEIVE_STAR: {
      if (action.error) return state;
      const key = action.payload.moment;
      if (!state.byId[key]) return state;

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

    case EXPLORE_UPDATE_OPTIONS: {
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload.options,
        },
      };
    }

    default:
      return state;
  }
}
