import {
  USER_REQUEST_USER,
  USER_RECEIVE_USER,
} from './actions';

const defaultState = {
  data: {},
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
      return {
        ...state,
        data: action.data,
        error: null,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
