import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import queryString from 'query-string';

import { userLogin as userLoginAction } from './actions';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Signin extends React.Component {
  static propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    push: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const auth = firebase.app().auth();
    const ui = firebaseui.auth.AuthUI.getInstance(auth);
    this.ui = ui || new firebaseui.auth.AuthUI(auth);
  }

  componentWillUnmount() {
    if (this.ui) { this.ui.delete(); }
  }

  render() {
    const { location, push, userLogin } = this.props;
    const signInSuccess = (currentUser, credential, redirectUrl) => {
      const next = (null
        || queryString.parse(location.search).next
        || (location.state && location.state.next)
        || '/'
        || redirectUrl
      );
      userLogin(currentUser);
      firebase.app().auth().onAuthStateChanged(() => {
        this.ui.reset();
        this.ui.delete();
        push(next);
      });
    };

    const mountFirebaseUi = (el) => {
      if (!el) return;
      this.ui.reset();
      this.ui.start(el, {
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
  }
}

export default compose(
  connect(
    null,
    dispatch => ({
      push: path => dispatch(pushAction(path)),
      userLogin: (user, error) => dispatch(userLoginAction(user, error)),
    }),
  ),
  withRouter,
)(Signin);
