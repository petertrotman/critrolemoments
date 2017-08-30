import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import Nav from './Nav';
import { mobileView, desktopView } from './util';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  width: 100vw;
  min-height: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background: ${props => props.theme.background};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => `${props.theme.fontSize}px`};
  line-height: ${props => props.theme.lineHeight};
  color: ${props => props.theme.color};
`;

const FixedTop = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth}px;
  position: fixed;
  z-index: 999;
  top: 0;
`;

const DesktopNav = styled(Nav)`
  ${mobileView} {
    display: none;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 0 1em;
  margin: 0;
  width: 100%;
  max-width: ${props => props.theme.maxWidth}px;

  ${desktopView} {
    margin-top: ${props => props.theme.headerHeight + props.theme.navHeight}px;
  }

  ${mobileView} {
    margin-top: ${props => props.theme.headerHeight}px;
    margin-bottom: ${props => props.theme.navHeight}px;
  }
`;

const MobileNav = styled(Nav)`
  width: 100%;
  max-width: ${props => props.theme.maxWidth}px;
  position: fixed;
  z-index: 999;
  bottom: 0;

  ${desktopView} {
    display: none;
  }
`;

const Layout = ({ children }) => (
  <Container>
    <FixedTop>
      <Header />
      <DesktopNav />
    </FixedTop>
    <Content>
      { children }
    </Content>
    <MobileNav />
  </Container>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
