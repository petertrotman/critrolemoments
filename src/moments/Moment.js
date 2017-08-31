import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAction } from 'react-router-redux';
import { lighten } from 'polished';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';

import MomentMain from './MomentMain';

import { requestStar } from '../user/actions';
import { momentType } from './util';
import { signInSwal } from '../swal/swal';
import { desktopView } from '../layout/util';

/* eslint-disable indent */
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin: 0.5em 0;
  padding: 0.5em;
  box-shadow: 2px 2px 8px #AAA;
  border-radius: 5px;

  ${desktopView} {
    font-size: 1.2em;
  }

`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

// const heartFlash = props => // eslint-disable-line no-unused-vars
// keyframes`
//   from, 40% {
//     stroke: none;
//   }

//   to, 41% {
//     stroke: props.theme.accent;
//   }
// `;

const heartFlash = keyframes`
  from, to {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }
`;

const Heart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.1em;
  margin-right: 1em;

  span {
    font-size: 0.8em;
  }

  svg {
    height: 2em;
    width: 2em;
    min-width: 2em;

    cursor: pointer;
    fill: ${(props) => {
        if (props.starring) {
          return lighten(0.4, props.theme.primary);
          } else if (props.starred) {
          return lighten(0.2, props.theme.primary);
        }
        return 'none';
      }};

    stroke: ${props => (props.starred
      ? props.theme.accent
    : props.theme.color)};

    filter: ${props => (props.starred ? 'drop-shadow(0 0 10px #AAA)' : 'none')};

    animation: ${props => (props.starred && props.clicked && !props.starring
      ? `${heartFlash} 0.3s ease-in-out 1`
      : 'none')};
    transform-origin: 50% 50%;

    @media (hover) {
      :hover {
        fill: ${props => lighten(0.4, props.theme.primary)};
      }
    }
  }
`;

const Title = styled.div`
  width: 100%;
  cursor: pointer;
`;
/* eslint-enable indent */

class Moment extends React.Component {
  static propTypes = {
    moment: momentType.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      data: PropTypes.shape({
        starredMoments: PropTypes.shape({}),
        ownedMoments: PropTypes.shape({}),
      }),
      starringMoments: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    expanded: PropTypes.bool,
    requestStar: PropTypes.func.isRequired,
  }

  static defaultProps = {
    expanded: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      heartClicked: false,
    };
  }

  get starred() {
    return this.props.moment.key in this.props.user.data.starredMoments;
  }

  get owned() {
    return this.props.moment.key in this.props.user.data.ownedMoments;
  }

  get starring() {
    return this.props.user.starringMoments.includes(this.props.moment.key);
  }

  heartClickHandler(e) {
    e.preventDefault();

    if (!this.props.loggedIn) {
      signInSwal(this.props.push, this.props.location);
      return;
    }

    this.setState({ heartClicked: true });
    this.props.requestStar(this.props.moment.key);
  }

  titleClickHandler(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <Container>
        <Top>
          <Heart starred={this.starred} starring={this.starring} clicked={this.state.heartClicked}>
            <HeartSvg onClick={(e) => { this.heartClickHandler(e); }} role="button" />
            <span>{ this.props.moment.starCount }</span>
          </Heart>
          <Title
            onClick={(e) => { this.titleClickHandler(e); }}
            role="button"
            tabIndex={0}
          >
            <span>{ this.props.moment.title }</span>
          </Title>
        </Top>
        { this.state.expanded && <MomentMain moment={this.props.moment} /> }
      </Container>
    );
  }
}

export default compose(
  withRouter,
  connect(
    store => ({
      loggedIn: store.auth.user != null,
      user: store.user,
    }),
    dispatch => ({
      requestStar: key => dispatch(requestStar(key)),
      push: path => dispatch(pushAction(path)),
    }),
  ),
)(Moment);
