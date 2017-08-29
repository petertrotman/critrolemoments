import {
  EPISODES_REQUEST_EPISODES,
  EPISODES_RECEIVE_EPISODES,
} from './actions';

const defaultState = {
  byId: {},
  order: [],
  error: null,
  isFetching: false,
  hasFetched: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case EPISODES_REQUEST_EPISODES: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case EPISODES_RECEIVE_EPISODES: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }

      const byId = action.payload.data;
      const order = Object.entries(byId)
        .sort((a, b) => a[1].snippet.position - b[1].snippet.position)
        .map(entry => entry[0]);

      return {
        ...state,
        byId,
        order,
        isFetching: false,
        hasFetched: true,
      };
    }
    default:
      return state;
  }
}
