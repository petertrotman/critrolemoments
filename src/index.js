import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Layout from './components/layout/Layout';
import AllMoments from './components/moments/AllMoments';
import MyMoments from './components/moments/MyMoments';
import Submit from './components/submit/Submit';

ReactDOM.render(
  <Layout>
    <Router>
      <div>
        <Route exact path="/" component={AllMoments} />
        <Route path="/my-moments" component={MyMoments} />
        <Route path="/submit" component={Submit} />
      </div>
    </Router>
  </Layout>,
  document.getElementById('root'),
);

firebase.initializeApp({
  apiKey: 'AIzaSyD04KRJhHIgHDq_O66kORZriJ5ExOLRWbY',
  authDomain: 'critrolemoments.firebaseapp.com',
  databaseURL: 'https://critrolemoments.firebaseio.com',
  projectId: 'critrolemoments',
  storageBucket: 'critrolemoments.appspot.com',
  messagingSenderId: '1038580015751',
});
