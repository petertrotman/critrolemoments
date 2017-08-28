import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import loginRequired from '../auth/loginRequired';

class Settings extends React.Component {
  componentWillMount() {
    this.setState({ user: firebase.app().auth().currentUser });
  }

  render() {
    return (
      <div>
        <h1>{ this.state.user.displayName }</h1>
        <Link to="/auth/signout">Sign Out</Link>
      </div>
    );
  }
}

export default loginRequired(Settings);
