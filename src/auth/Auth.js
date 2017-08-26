import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router';

import Signin from './Signin';
import Signout from './Signout';

const Auth = ({ match }) => (
  <div>
    <Route path={`${match.path}/signin`} component={Signin} />
    <Route path={`${match.path}/signout`} component={Signout} />
  </div>
);

Auth.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Auth);
