import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const Container = styled.div`
  // From http://webdesignerwall.com/tutorials/css-elastic-videos

  > * {
    display: block;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  }

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;


const Player = props => (
  <Container>
    <YouTube {...props} />
  </Container>
);

export default Player;
