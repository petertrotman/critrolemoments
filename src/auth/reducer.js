import {
  AUTH_USER_LOGIN,
  AUTH_USER_LOGOUT,
} from './actions';

const defaultState = {
  user: null,
  error: null,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_USER_LOGIN: {
      return {
        user: action.payload.user,
        error: action.error,
      };
    }
    case AUTH_USER_LOGOUT: {
      return {
        user: null,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
