import React from 'react';
import styled from 'styled-components';

import MomentsSvg from 'svg/home.svg';
import ExploreSvg from 'svg/camera-o.svg';
import AddSvg from 'svg/plus-circle-o.svg';
import AccountSvg from 'svg/user.svg';

import NavItem from './NavItem';

const StyledNav = styled.nav`
  background: ${props => props.theme.background};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 100%;
  height: ${props => props.theme.navHeight}px;

  > ul {
    padding: 0;
    margin: 1em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Nav = props => (
  <StyledNav {...props}>
    <ul>
      <NavItem name="Moments" svg={MomentsSvg} to="/moments" />
      <NavItem name="Explore" svg={ExploreSvg} to="/explore" />
      <NavItem name="Add" svg={AddSvg} to="/add" />
      <NavItem name="Account" svg={AccountSvg} to="/account" />
    </ul>
  </StyledNav>
);

export default Nav;
