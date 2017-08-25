import React from 'react';
import styled from 'styled-components';

import HomeSvg from 'svg/home.svg';
import ExploreSvg from 'svg/camera-o.svg';
import AddSvg from 'svg/plus-circle-o.svg';
import AccountSvg from 'svg/user.svg';

import NavItem from './NavItem';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  > ul {
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const Nav = () => (
  <StyledNav>
    <ul>
      <NavItem name="Home" svg={HomeSvg} to="/home" />
      <NavItem name="Explore" svg={ExploreSvg} to="/explore" />
      <NavItem name="Add" svg={AddSvg} to="/new" />
      <NavItem name="Account" svg={AccountSvg} to="/account" />
    </ul>
  </StyledNav>
);

export default Nav;
