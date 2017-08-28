import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { lighten } from 'polished';

import { mobileView, desktopView } from './util';

const StyledLi = styled.li`
  color: ${props => (props.active ? props.theme.primary : props.theme.color)};
  list-style-type: none;
  font-size: 1.2em;
  margin: 0;
  padding: 0;
  flex-grow: 1;

  ${mobileView} {
    border-style: solid none none none;
  }
  ${desktopView} {
    border-style: none none solid none;
  }
  border-width: 2px;
  border-color: ${props => (props.active
    ? lighten(0.35, props.theme.primary)
    : lighten(0.35, props.theme.color))};

  :hover {
    color: ${props => lighten(0.2, props.theme.primary)};
    svg {
      stroke: ${props => lighten(0.3, props.theme.primary)};
    }
  }

  svg {
    width: 1.4em;
    height: 1.4em;
    stroke-width: 1.5px;
    stroke: ${props => lighten(0.2, (props.active ? props.theme.primary : props.theme.color))};
    fill: none;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  padding: 0.5em 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > * {
    margin: 0 0.5em;
  }

  // ${mobileView} {
  //   padding-top: 0.5em;
  // }

  // ${desktopView} {
  //   padding-bottom: 0.5em;
  // }
`;

const StyledText = styled.span`
  ${mobileView} {
    display: none;
  }
`;

const NavItem = ({ name, to, Icon, location }) => (
  <StyledLi active={location.pathname.startsWith(to)}>
    <StyledLink to={to}>
      <Icon />
      <StyledText>{ name }</StyledText>
    </StyledLink>
  </StyledLi>
);

NavItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(NavItem);

