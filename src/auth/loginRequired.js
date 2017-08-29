import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import firebase from 'firebase/app';

const loginRequired = (Component) => {
  const LoginComponent = ({ location, ...props }) => {
    const user = firebase.app().auth().currentUser;

    if (user) {
      return <Component {...props} />;
    }

    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return (
      <Redirect
        to={{
          pathname: '/auth/signin',
          search: `?next=${next}`,
          state: { next },
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
