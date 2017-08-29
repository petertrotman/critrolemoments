import React from 'react';
import styled from 'styled-components';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';
import ApertureSvg from 'feather-icons/dist/icons/aperture.svg';
import PlusCircleSvg from 'feather-icons/dist/icons/plus-circle.svg';
import SettingsSvg from 'feather-icons/dist/icons/settings.svg';

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
    margin: 0;
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
      <NavItem name="Moments" Icon={HeartSvg} to="/moments" />
      <NavItem name="Explore" Icon={ApertureSvg} to="/explore" />
      <NavItem name="Add" Icon={PlusCircleSvg} to="/add" />
      <NavItem name="Settings" Icon={SettingsSvg} to="/settings" />
    </ul>
  </StyledNav>
);

export default Nav;
