import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import queryString from 'query-string';

import { withFirebase, firebaseuiAppType } from '../firebase';
import { userLogin as userLoginAction } from './actions';
import { mountFirebaseUi } from './util';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Signin extends React.Component {
  static propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    firebaseuiApp: firebaseuiAppType.isRequired,
    push: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    user: null,
  };

  componentWillMount() {
    const user = firebase.app().auth().currentUser || this.props.loggedIn;
    if (user) this.props.push(this.getNext());
  }

  componentWillUnmount() {
    this.props.firebaseuiApp.reset();
  }

  getNext() {
    const location = this.props.location;
    const encodedNext = (null
      || queryString.parse(location.search).next
      || (location.state && location.state.next)
      || '/'
    );
    return decodeURIComponent(encodedNext);
  }

  render() {
    const { push, userLogin, firebaseuiApp } = this.props;
    const next = this.getNext();

    const signInSuccess = (currentUser, credential, redirectUrl) => {
      userLogin(currentUser);
      push(next || redirectUrl);
    };

    const mount = (el) => {
      mountFirebaseUi(el, firebase.app(), firebaseuiApp, signInSuccess);
    };

    return (
      <StyledDiv>
        <p>Please sign in to continue.</p>
        <div ref={mount} />
      </StyledDiv>
    );
  }
}

export default compose(
  connect(
    store => ({ loggedIn: store.auth.user != null }),
    dispatch => ({
      push: path => dispatch(pushAction(path)),
      userLogin: (user, error) => dispatch(userLoginAction(user, error)),
    }),
  ),
  withFirebase,
  withRouter,
)(Signin);
