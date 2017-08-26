import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../util/Aux';

const Account = () => (
  <Aux>
    <h1>Account</h1>
    <Link to="/auth/signout">Sign Out</Link>
  </Aux>
);

export default Account;
