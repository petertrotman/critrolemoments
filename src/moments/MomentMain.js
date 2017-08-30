import React from 'react';
import styled from 'styled-components';

import Share2Svg from 'feather-icons/dist/icons/share-2.svg';
import CopySvg from 'feather-icons/dist/icons/copy.svg';

import Player from '../player/Player';

import { momentType, timestampToSeconds } from './util';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 0.4em 0;

  > span {
    padding: 0 0.2em;
    margin: 0 0.2em;
    display: flex;
    flex-direction: row;
    align-items: center;

    > * {
      margin: 0 0.2em;
    }
  }
`;

class MomentMain extends React.Component {
  static propTypes = {
    moment: momentType.isRequired,
  }

  render() {
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        start: timestampToSeconds(this.props.moment.start),
        end: timestampToSeconds(this.props.moment.end),
        autoplay: 1,
        modestbranding: true,
        showinfo: 0,
      },
    };

    return (
      <Container>
        <Player
          videoId={this.props.moment.episode}
          opts={opts}
        />
        <Buttons>
          <span>
            <CopySvg /><span>Create a copy</span>
          </span>
          <span>
            <Share2Svg /><span>Share</span>
          </span>
        </Buttons>
      </Container>
    );
  }
}

export default MomentMain;
