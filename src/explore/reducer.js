import {
  EXPLORE_REQUEST_MOMENTS,
  EXPLORE_RECEIVE_MOMENTS,
} from './actions';

const defaultState = {
  moments: [],
  isFetching: false,
  hasFetched: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case EXPLORE_REQUEST_MOMENTS: {
      console.log(action);
      return state;
    }
    case EXPLORE_RECEIVE_MOMENTS: {
      console.log(action);
      return state;
    }
    default:
      return state;
  }
}
