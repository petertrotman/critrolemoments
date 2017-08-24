import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import HomeSvg from 'svg/home.svg';
import ExploreSvg from 'svg/camera-o.svg';
import AddSvg from 'svg/plus-circle-o.svg';
import AccountSvg from 'svg/user.svg';

import Icon from '../util/Icon';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  > ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const StyledLi = withRouter(styled.li`
  color: ${props => (
    props.location && props.location.pathname && props.location.pathname.startsWith(props.to)
      ? props.theme.primary
      : props.theme.color
  )};
  list-style-type: none;

  &:hover {
    color: ${props => props.theme.primary};
  }

  > a {
    color: inherit;
    text-decoration: none;
  }

  > i {
    color: inherit;
  }
`);

const DesktopNavItem = ({ name, to, svg }) => (
  <StyledLi>
    <Link to={to}>
      <Icon svg={svg} style={{ fill: 'red' }} />
      { name }
    </Link>
  </StyledLi>
);

DesktopNavItem.propTypes = {
  svg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const DesktopNav = () => (
  <StyledNav>
    <ul>
      <DesktopNavItem name="Home" svg={HomeSvg} to="/home" />
      <DesktopNavItem name="Explore" svg={ExploreSvg} to="/explore" />
      <DesktopNavItem name="Add" svg={AddSvg} to="/new" />
      <DesktopNavItem name="Account" svg={AccountSvg} to="/account" />
    </ul>
  </StyledNav>
);

export default DesktopNav;
