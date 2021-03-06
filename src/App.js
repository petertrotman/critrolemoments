import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import firebase from 'firebase/app';

import Layout from './layout/Layout';
import Home from './home/Home';
import Moments from './moments/Moments';
import Explore from './explore/Explore';
import Create from './create/Create';
import Settings from './settings/Settings';
import Auth from './auth/Auth';

import { requestEpisodes } from './episodes/actions';
import { requestIndexes } from './indexes/actions';
import { userLogin } from './auth/actions';

function initData(store, dispatch) {
  if (!store.episodes.hasFetched) dispatch(requestEpisodes());
  if (!store.indexes.hasFetched) dispatch(requestIndexes());
  const user = firebase.app().auth().currentUser;
  if (user) dispatch(userLogin(user));
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
        <Route path="/create" component={Create} />
        <Route path="/settings" component={Settings} />
        <Route path="/auth" component={Auth} />
      </Layout>
    );
  }
}

export default compose(
  withRouter,
  connect(
    store => ({ store }),
    dispatch => ({ dispatch }),
  ),
)(App);
