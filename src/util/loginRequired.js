import React from 'react';
import firebase from 'firebase/app';

import Login from '../auth/Login';

const loginRequired = (Component) => {
  const user = firebase.auth().currentUser;
  if (user) {
    return props => <Component {...props} />;
  }
  return props => <Login {...props} />;
};

export default loginRequired;
