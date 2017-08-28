import {
  EXPLORE_REQUEST_MOMENTS,
  EXPLORE_RECEIVE_MOMENTS,
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
    case EXPLORE_REQUEST_MOMENTS: {
      return state;
    }
    case EXPLORE_RECEIVE_MOMENTS: {
      return state;
    }
    default:
      return state;
  }
}
