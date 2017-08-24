import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0;
  margin: 0;
  background: ${props => props.theme.background};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.color};
`;

const WidthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;

const AppContainer = ({ children }) => (
  <FullContainer>
    <WidthContainer>
      { children }
    </WidthContainer>
  </FullContainer>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

AppContainer.defaultProps = {
  children: null,
};

export default AppContainer;
