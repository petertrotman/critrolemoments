import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/reducer';

const reducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
});

export default reducers;

