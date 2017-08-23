import React from 'react';
import { Route, Link } from 'react-router-dom';

const Aux = ({ children }) => children;

const Page1 = () => <Link to="/page2"><h1>Hello 1</h1></Link>;
const Page2 = () => <Link to="/"><h1>Hello 2</h1></Link>;

const App = () => (
  <Aux>
    <Route exact path="/" component={Page1} />
    <Route path="/page2" component={Page2} />
  </Aux>
);

export default App;
