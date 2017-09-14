import {
  MOMENTS_REQUEST_MOMENTS,
  MOMENTS_RECEIVE_MOMENTS,
  MOMENTS_REQUEST_UPDATE,
  MOMENTS_RECEIVE_UPDATE,
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

    case MOMENTS_REQUEST_UPDATE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }

    case MOMENTS_RECEIVE_UPDATE: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.key]: {
            ...state.byId[action.payload.key],
            ...action.payload.vals,
          },
        },
        error: null,
        isFetching: false,
      };
    }

    default:
      return state;
  }
}
