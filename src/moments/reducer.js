import update from 'immutability-helper';

import {
  MOMENTS_REQUEST_MOMENTS,
  MOMENTS_RECEIVE_MOMENTS,
  MOMENTS_REQUEST_UPDATE,
  MOMENTS_RECEIVE_UPDATE,
  MOMENTS_REQUEST_SINGLE,
  MOMENTS_RECEIVE_SINGLE,
  MOMENTS_REQUEST_CREATE,
  MOMENTS_RECEIVE_CREATE,
  MOMENTS_REQUEST_DELETE,
  MOMENTS_RECEIVE_DELETE,
} from './actions';

const defaultState = {
  byId: {},
  order: [],
  single: {
    key: null,
    moment: null,
    isFetching: false,
    error: null,
  },
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
      if (action.error || !state.byId[action.payload.key]) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }

      return {
        ...state,
        byId: !state.byId[action.payload.key]
          ? state.byId
          : {
            ...state.byId,
            [action.payload.key]: {
              ...state.byId[action.payload.key],
              ...action.payload.moment,
            },
          },
        single: state.single.key !== action.payload.key
          ? state.single
          : {
            ...state.single,
            moment: {
              ...state.single.moment,
              ...action.payload.moment,
            },
          },
        error: null,
        isFetching: false,
      };
    }

    case MOMENTS_REQUEST_CREATE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }

    case MOMENTS_RECEIVE_CREATE: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }

    case MOMENTS_REQUEST_DELETE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }

    case MOMENTS_RECEIVE_DELETE: {
      if (action.error) {
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      }

      return update(state, {
        byId: { $unset: [action.payload.key] },
        order: { $set: state.order.filter(k => k !== action.payload.key) },
        isFetching: { $set: false },
      });
    }

    case MOMENTS_REQUEST_SINGLE: {
      return {
        ...state,
        single: {
          moment: null,
          key: action.payload.key,
          isFetching: true,
          error: null,
        },
      };
    }

    case MOMENTS_RECEIVE_SINGLE: {
      if (action.error) {
        return {
          ...state,
          single: {
            ...state.single,
            isFetching: false,
            error: action.error,
          },
        };
      }

      return {
        ...state,
        single: {
          ...state.single,
          key: action.payload.key,
          moment: action.payload.moment,
          isFetching: false,
          error: null,
        },
      };
    }

    default:
      return state;
  }
}
