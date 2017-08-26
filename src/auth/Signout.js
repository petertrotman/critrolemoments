import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { userLogout as userLogoutAction } from './actions';

import { withFirebase, firebaseAppType } from '../firebase';

const Signout = ({ firebaseApp, push, userLogout }) => {
  firebaseApp.auth().signOut()
    .then(() => {
      userLogout(null);
      push('/');
    })
    .catch(error => userLogout(error));
  return <h1>Sign out</h1>;
};

Signout.propTypes = {
  firebaseApp: firebaseAppType.isRequired,
  push: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default compose(
  connect(
    null,
    dispatch => ({
      push: path => dispatch(pushAction(path)),
      userLogout: error => dispatch(userLogoutAction(error)),
    }),
  ),
  withFirebase,
)(Signout);
