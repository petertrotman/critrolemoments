import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LogoPartsSvg from '../../static/images/critrolemoments-parts.svg';

import { flashAll, wiggleHeart } from './animations';

const Container = styled.div`
  width: ${props => props.width};

  svg {
    padding: 10%;
    box-sizing: border-box;
    width: ${props => props.width};
    height: ${props => props.height};
  }

  ${flashAll}
  ${wiggleHeart}
`;

const Loading = props => (
  <Container {...props}>
    <LogoPartsSvg />
  </Container>
);

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Loading.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Loading;
