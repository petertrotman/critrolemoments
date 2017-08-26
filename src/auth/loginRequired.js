import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

const loginRequired = (Component) => {
  const LoginComponent = ({ user, location, ...props }) => {
    if (user) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/auth/signin',
          state: { next: location.pathname },
        }}
      />
    );
  };

  LoginComponent.propTypes = {
    user: PropTypes.shape({}),
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  LoginComponent.defaultProps = {
    user: null,
  };

  return compose(
    connect(state => ({ user: state.auth.user })),
    withRouter,
  )(LoginComponent);
};

export default loginRequired;
