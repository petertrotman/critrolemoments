import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// import firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';

export function initFirebase() {
  return firebase.initializeApp({
    apiKey: 'AIzaSyD04KRJhHIgHDq_O66kORZriJ5ExOLRWbY',
    authDomain: 'critrolemoments.firebaseapp.com',
    databaseURL: 'https://critrolemoments.firebaseio.com',
    projectId: 'critrolemoments',
    storageBucket: 'critrolemoments.appspot.com',
    messagingSenderId: '1038580015751',
  });
}

// export function initFirebaseUi(firebaseApp) {
//   return new firebaseui.auth.AuthUI(firebaseApp.auth());
// }

class FirebaseProvider extends React.Component {
  getChildContext() {
    return {
      firebaseApp: this.props.firebaseApp,
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
  children: PropTypes.node.isRequired,
};

FirebaseProvider.childContextTypes = {
  firebaseApp: firebaseAppType,
};

export { FirebaseProvider };

const withFirebase = (Component) => {
  const FirebaseComponent = (props, context) => (
    <Component
      {...props}
      firebaseApp={context.firebaseApp}
    />
  );

  FirebaseComponent.contextTypes = {
    firebaseApp: firebaseAppType,
  };

  FirebaseComponent.displayName =
    `withFirebase(${Component.displayName || Component.name || 'Component'})`;

  return FirebaseComponent;
};

export { withFirebase };
