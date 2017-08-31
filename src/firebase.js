import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export function initFirebase() {
  return firebase.initializeApp({
    apiKey: 'AIzaSyCzGnlp7o5Ul1xUKCSZZ_OGYR6aC2ERFQo',
    authDomain: 'critrolemoments.firebaseapp.com',
    databaseURL: 'https://critrolemoments.firebaseio.com',
    projectId: 'critrolemoments',
    storageBucket: 'critrolemoments.appspot.com',
    messagingSenderId: '1038580015751',
  });
}

export function initFirebaseui(firebaseApp) {
  return new firebaseui.auth.AuthUI(firebaseApp.auth());
}

class FirebaseProvider extends React.Component {
  getChildContext() {
    return {
      firebaseApp: this.props.firebaseApp,
      firebaseuiApp: this.props.firebaseuiApp,
    };
  }

  render() {
    return this.props.children;
  }
}

export const firebaseAppType = PropTypes.shape({});
export const firebaseuiAppType = PropTypes.shape({});

FirebaseProvider.propTypes = {
  firebaseApp: firebaseAppType.isRequired,
  firebaseuiApp: firebaseuiAppType,
  children: PropTypes.node.isRequired,
};

FirebaseProvider.defaultProps = {
  firebaseuiApp: undefined,
};

FirebaseProvider.childContextTypes = {
  firebaseApp: firebaseAppType,
  firebaseuiApp: firebaseuiAppType,
};

export { FirebaseProvider };

const withFirebase = (Component) => {
  const FirebaseComponent = (props, context) => (
    <Component
      {...props}
      firebaseApp={context.firebaseApp}
      firebaseuiApp={context.firebaseuiApp}
    />
  );

  FirebaseComponent.contextTypes = {
    firebaseApp: firebaseAppType,
    firebaseuiApp: firebaseuiAppType,
  };

  FirebaseComponent.displayName =
    `withFirebase(${Component.displayName || Component.name || 'Component'})`;

  return FirebaseComponent;
};

export { withFirebase };
