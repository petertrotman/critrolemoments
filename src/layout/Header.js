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
  padding-bottom: 0.2em;

  > a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = () => (
  <StyledHeader>
    <Link to="/">
      Header
    </Link>
  </StyledHeader>
);

export default Header;
