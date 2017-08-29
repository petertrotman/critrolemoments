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
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case MOMENTS_RECEIVE_MOMENTS: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
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
    default:
      return state;
  }
}
