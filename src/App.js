import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './home/Home';
import Moments from './moments/Moments';
import Explore from './explore/Explore';
import Add from './add/Add';
import Settings from './settings/Settings';
import Auth from './auth/Auth';

import { requestEpisodes } from './episodes/actions';
import { requestMoments } from './moments/actions';

function initData(store, dispatch) {
  if (!store.episodes.hasFetched) dispatch(requestEpisodes());
  if (!store.moments.hasFetched) dispatch(requestMoments());
}

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    store: PropTypes.shape({
      episodes: PropTypes.shape({ hasFetched: PropTypes.bool.isRequired }).isRequired,
      moments: PropTypes.shape({ hasFetched: PropTypes.bool.isRequired }).isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { store, dispatch } = this.props;
    initData(store, dispatch);
  }

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/moments" component={Moments} />
        <Route path="/explore" component={Explore} />
        <Route path="/add" component={Add} />
        <Route path="/settings" component={Settings} />
        <Route path="/auth" component={Auth} />
      </Layout>
    );
  }
}

export default connect(
  store => ({ store }),
  dispatch => ({ dispatch }),
)(App);
