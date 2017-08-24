import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  width: 100%;
`;

const Header = () => (
  <StyledHeader>
    Critical Role Moments
  </StyledHeader>
);

export default Header;
