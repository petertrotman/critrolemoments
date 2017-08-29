import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import firebase from 'firebase/app';

const loginRequired = (Component) => {
  const LoginComponent = ({ location, ...props }) => {
    const user = firebase.app().auth().currentUser || (location.state && location.state.user);

    if (user) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/auth/signin',
          search: `?next=${location.pathname}`,
          state: { next: location.pathname },
        }}
      />
    );
  };

  LoginComponent.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  return withRouter(LoginComponent);
};

export default loginRequired;
