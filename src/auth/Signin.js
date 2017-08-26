import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

import { userLogin as userLoginAction } from './actions';
import { withFirebase, firebaseuiAppType } from '../firebase';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Signin = ({ location, firebaseuiApp, push, userLogin }) => {
  const signInSuccess = (currentUser, credential, redirectUrl) => {
    const next = redirectUrl || (location.state && location.state.next) || '/';
    userLogin(currentUser, null);
    push(next);
  };

  const mountFirebaseUi = (el) => {
    if (!el) return;
    firebaseuiApp.reset();
    firebaseuiApp.start(el, {
      // signInSuccessUrl: next,
      callbacks: {
        signInSuccess,
      },
      signInFlow: 'popup',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '/tos',
    });
  };

  return (
    <StyledDiv>
      <p>Please sign in to continue.</p>
      <div ref={mountFirebaseUi} />
    </StyledDiv>
  );
};

Signin.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  firebaseuiApp: firebaseuiAppType.isRequired,
  push: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default compose(
  connect(
    null,
    dispatch => ({
      push: path => dispatch(pushAction(path)),
      userLogin: (user, error) => dispatch(userLoginAction(user, error)),
    }),
  ),
  withFirebase,
  withRouter,
)(Signin);
