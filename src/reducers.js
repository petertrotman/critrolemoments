import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/reducer';
import exploreReducer from './explore/reducer';

const reducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
  explore: exploreReducer,
});

export default reducers;

