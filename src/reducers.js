import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/reducer';
import exploreReducer from './explore/reducer';
import episodesReducer from './episodes/reducer';
import momentsReducer from './moments/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  episodes: episodesReducer,
  explore: exploreReducer,
  moments: momentsReducer,
  user: userReducer,
  router: routerReducer,
});

export default reducers;

