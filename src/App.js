import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './home/Home';
import Moments from './moments/Moments';
import Explore from './explore/Explore';
import Add from './add/Add';
import Settings from './settings/Settings';
import Auth from './auth/Auth';

const App = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/moments" component={Moments} />
    <Route path="/explore" component={Explore} />
    <Route path="/add" component={Add} />
    <Route path="/settings" component={Settings} />
    <Route path="/auth" component={Auth} />
  </Layout>
);

export default App;
