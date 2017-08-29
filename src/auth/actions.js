import { requestUser } from '../user/actions';

export const AUTH_USER_LOGIN = 'AUTH_USER_LOGIN';
export const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT';

export function userLogin(user, error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_USER_LOGIN,
      payload: { user },
      error,
    });
    dispatch(requestUser(user));
  };
}

export function userLogout(error) {
  return {
    type: AUTH_USER_LOGOUT,
    error,
  };
}
