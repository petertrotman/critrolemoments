import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AppContainer from './AppContainer';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const MainGroup = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Layout = ({ children }) => (
  <AppContainer>
    <MainGroup>
      <Header />
      <Nav />
      { children }
    </MainGroup>
    <Footer />
  </AppContainer>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
