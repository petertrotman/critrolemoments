import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import YTPlayer from 'yt-player';

const StyledDiv = styled.div`
`;

class MomentMain extends React.Component {
  mountYTPlayer(el) {
    if (!el) return;
    this.player = new YTPlayer(el);
    this.player.load('dQw4w9WgXcQ');
  }

  componentWillUmount() {
    if (this.player) this.player.destroy();
  }

  render() {
    return (
      <StyledDiv>
        <div ref={(el) => { this.mountYTPlayer(el); }} />
      </StyledDiv>
    );
  }
}

export default MomentMain;
