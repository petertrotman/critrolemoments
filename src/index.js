import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { initFirebase, initFirebaseUi, FirebaseProvider } from './firebase';
import reducers from './reducers';
import theme from './theme';

const firebaseApp = initFirebase();
const firebaseuiApp = initFirebaseUi(firebaseApp);

const history = createHistory();
const middleware = applyMiddleware(
  routerMiddleware(history),
  logger,
);
const store = createStore(reducers, middleware);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <FirebaseProvider firebaseApp={firebaseApp} firebaseuiApp={firebaseuiApp}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
              <Component />
            </ThemeProvider>
          </ConnectedRouter>
        </Provider>
      </FirebaseProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => render(App));
  module.hot.accept('./reducers', () => store.replaceReducer(reducers));
}
