import React from 'react';
import { Route, Link } from 'react-router-dom';

import AppContainer from './layout/AppContainer';
import Header from './layout/Header';
import DesktopNav from './layout/DesktopNav';

// const Aux = ({ children }) => children;

const Page1 = () => <Link to="/page2"><h1>Hello 1</h1></Link>;
const Page2 = () => <Link to="/"><h1>Hello 2</h1></Link>;

const App = () => (
  <AppContainer>
    <Header />
    <DesktopNav />
    <Route exact path="/" component={Page1} />
    <Route path="/page2" component={Page2} />
  </AppContainer>
);

export default App;
