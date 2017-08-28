import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import loginRequired from '../auth/loginRequired';
import Aux from '../util/Aux';

const Account = ({ user }) => (
  <Aux>
    <h1>{ user.displayName }</h1>
    <Link to="/auth/signout">Sign Out</Link>
  </Aux>
);

Account.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  loginRequired,
  connect(
    state => ({ user: state.auth.user }),
  ),
)(Account);
