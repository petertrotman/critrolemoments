import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAction } from 'react-router-redux';
import { ellipsis, lighten } from 'polished';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';

import { requestStar } from '../user/actions';
import { momentType } from './util';
import { signInSwal } from '../auth/util';
import { mobileView, desktopView } from '../layout/util';

/* eslint-disable indent */
const StyledDiv = styled.div`
  width: 95%;
  // max-width: ${props => props.theme.maxWidth * 0.9}px;
  // height: ${props => props.theme.momentSummaryHeight}px;
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin: 0.5em 0;
  box-shadow: 0px 0px 10px #AAA;

  ${desktopView} {
    font-size: 1.6em;
  }

  > * {
    margin: 0 0.2em;
    padding: 0;
  }

  span {
    ${ellipsis()};
  }

  div.heart {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 0.5em;
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
        : props.color)};

      filter: ${props => (props.starred
        ? 'drop-shadow(0 0 10px #AAA)'
        : 'none')};

      @media (hover) {
        :hover {
          fill: ${props => lighten(0.4, props.theme.primary)};
        }
      }
    }
  }

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

    this.props.requestStar(this.props.moment.key);
  }

  render() {
    return (
      <StyledDiv
        expanded={this.state.expanded}
        owned={this.owned}
        starred={this.starred}
        starring={this.starring}
      >
        <div className="heart">
          <HeartSvg onClick={(e) => { this.heartClickHandler(e); }} />
          <span>{ this.props.moment.starCount }</span>
        </div>
        <span>{ this.props.moment.title }</span>
      </StyledDiv>
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
