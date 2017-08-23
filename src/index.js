import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import App from './App';

import reducers from './reducers';

const history = createHistory();
const middleware = applyMiddleware(
  routerMiddleware(history),
  logger,
);
const store = createStore(reducers, middleware);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => render(App));
  module.hot.accept('./reducers', () => store.replaceReducer(reducers));
}
