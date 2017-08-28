import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import loginRequired from '../auth/loginRequired';

const Settings = ({ user }) => (
  <div>
    <h1>{ user.displayName }</h1>
    <Link to="/auth/signout">Sign Out</Link>
  </div>
);

Settings.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  loginRequired,
  connect(
    state => ({ user: state.auth.user }),
  ),
)(Settings);
