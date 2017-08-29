import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import loginRequired from '../auth/loginRequired';

class Settings extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div>
        <h1>{ this.props.user.displayName }</h1>
        <Link to="/auth/signout">Sign Out</Link>
      </div>
    );
  }
}

export default compose(
  connect(store => ({ user: store.auth.user })),
  loginRequired,
)(Settings);
