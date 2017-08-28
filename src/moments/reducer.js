import {
  MOMENTS_REQUEST_MOMENTS,
  MOMENTS_RECEIVE_MOMENTS,
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
    case MOMENTS_REQUEST_MOMENTS: {
      return state;
    }
    case MOMENTS_RECEIVE_MOMENTS: {
      return state;
    }
    default:
      return state;
  }
}
