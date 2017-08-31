import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mobileView } from './util';

const StyledHeader = styled.header`
  background: ${props => props.theme.background};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${props => props.theme.headerHeight}px;

  font-size: 1.5em;
  padding: 0;

  ${mobileView} {
    box-shadow: 0px 1px 10px ${props => props.theme.primary};
  }
`;

const StyledTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  max-width: 80%;
  font-family: 'Cinzel Decorative';
  font-weight: 600;

  > a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > a > * {
    margin: 0 0.4em;
  }

  > a > img {
    height: 1.5em;
  }
`;

const Header = () => (
  <StyledHeader>
    <StyledTitle>
      <Link to="/">
        <img src="/images/critrolemoments.svg" alt="" />
        Critical Role Moments
      </Link>
    </StyledTitle>
  </StyledHeader>
);

export default Header;
