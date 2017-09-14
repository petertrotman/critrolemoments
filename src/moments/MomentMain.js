import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAction } from 'react-router-redux';

import Share2Svg from 'feather-icons/dist/icons/share-2.svg';
import EditSvg from 'feather-icons/dist/icons/edit-3.svg';
import AlertCircleSvg from 'feather-icons/dist/icons/alert-circle.svg';

import Player from '../player/Player';

import { updateMoment as updateMomentAction } from './actions';
import { signInSwal, reportSwal, editSwal, shareSwal } from '../swal/swal';
import { momentType } from '../utils/types';
import { timestampToSeconds } from '../utils/text';

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
  margin: 0.8em 0 0.4em 0;
  font-size: 0.8em;
`;

const Button = styled.button`
  all: unset;
  padding: 0.4em;
  margin: 0 0.2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 2px 2px 5px #AAA;
  border-radius: 2px;
  cursor: pointer;

  > * {
    margin: 0 0.2em;
  }
`;

class MomentMain extends React.Component {
  static propTypes = {
    moment: momentType.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    updateMoment: PropTypes.func.isRequired,
    location: PropTypes.shape({}).isRequired,
    user: PropTypes.string,
  }

  static defaultProps = {
    user: null,
  }

  get opts() {
    return {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        start: timestampToSeconds(this.props.moment.start),
        end: timestampToSeconds(this.props.moment.end),
        autoplay: 1,
        modestbranding: true,
        showinfo: 0,
      },
    };
  }

  reportClickHandler(e) {
    e.preventDefault();
    if (!this.props.loggedIn) {
      signInSwal(this.props.push, this.props.location);
    } else {
      reportSwal(this.props.moment);
    }
  }

  editClickHandler(e) {
    e.preventDefault();
    if (!this.props.loggedIn) {
      signInSwal(this.props.push, this.props.location);
    } else if (this.props.moment.user !== this.props.user) {
      editSwal(this.props.push, this.props.updateMoment, this.props.moment, this.props.user);
    } else {
      this.props.push(`/moments/${this.props.moment.key}/edit`);
    }
  }

  shareClickHandler(e) {
    e.preventDefault();
    const url = `${window.location.origin}/moments/${this.props.moment.key}`;
    shareSwal(url);
  }

  render() {
    return (
      <Container>
        <Player
          videoId={this.props.moment.episode}
          opts={this.opts}
        />
        <Buttons>
          <Button onClick={e => this.reportClickHandler(e)}>
            <AlertCircleSvg /><span>Report</span>
          </Button>
          <Button onClick={e => this.editClickHandler(e)}>
            <EditSvg /><span>Edit</span>
          </Button>
          <Button onClick={e => this.shareClickHandler(e)}>
            <Share2Svg /><span>Share</span>
          </Button>
        </Buttons>
      </Container>
    );
  }
}

export default compose(
  connect(
    store => ({
      loggedIn: store.auth.user != null,
      user: store.auth.user && store.auth.user.uid,
    }),
    dispatch => ({
      push: path => dispatch(pushAction(path)),
      updateMoment: (key, vals) => dispatch(updateMomentAction(key, vals)),
    }),
  ),
  withRouter,
)(MomentMain);
