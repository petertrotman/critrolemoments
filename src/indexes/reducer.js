import {
  INDEXES_REQUEST_INDEXES,
  INDEXES_RECEIVE_INDEXES,
} from './actions';

const defaultState = {
  error: null,
  isFetching: false,
  hasFetched: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INDEXES_REQUEST_INDEXES: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case INDEXES_RECEIVE_INDEXES: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }

      return {
        ...state,
        ...action.payload.data,
        isFetching: false,
        hasFetched: true,
      };
    }
    default:
      return state;
  }
}
