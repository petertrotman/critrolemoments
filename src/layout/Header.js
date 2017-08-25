import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-size: 2em;
  padding: 0;
  padding-top: 0.1em;
  padding-bottom: 0.2em;

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
    <Link to="/">
      <img src="images/critrolemoments.png" alt="" />
      Header
    </Link>
  </StyledHeader>
);

export default Header;
