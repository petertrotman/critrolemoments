import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Index from './index/Index';
import Home from './home/Home';
import Explore from './explore/Explore';
import Add from './add/Add';
import Account from './account/Account';

import loginRequired from './util/loginRequired';

const App = () => (
  <Layout>
    <Route exact path="/" component={Index} />
    <Route path="/home" component={Home} />
    <Route path="/explore" component={Explore} />
    <Route path="/new" component={Add} />
    <Route path="/account" component={loginRequired(Account)} />
  </Layout>
);

export default App;
