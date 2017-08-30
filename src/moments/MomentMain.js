import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import YouTube from 'react-youtube';

const StyledDiv = styled.div`
`;

class MomentMain extends React.Component {
  registerPlayer(e) {
    this.player = e.target;
    console.log(this.player);
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <StyledDiv>
        <YouTube
          videoId="dQw4w9WgXcQ"
          opts={opts}
          onReady={(e) => { this.registerPlayer(e); }}
          onError={console.error}
        />
      </StyledDiv>
    );
  }
}

export default MomentMain;
