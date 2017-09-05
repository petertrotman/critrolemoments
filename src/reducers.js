import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth/reducer';
import episodesReducer from './episodes/reducer';
import exploreReducer from './explore/reducer';
import indexesReducer from './indexes/reducer';
import momentsReducer from './moments/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  auth: authReducer,
  episodes: episodesReducer,
  explore: exploreReducer,
  indexes: indexesReducer,
  moments: momentsReducer,
  router: routerReducer,
  user: userReducer,
});

export default reducers;

