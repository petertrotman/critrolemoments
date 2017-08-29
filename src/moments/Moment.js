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

/* eslint-disable indent */
const svgSize = props => `${props.theme.momentSummaryHeight * 0.8}px`;
const StyledDiv = styled.div`
  width: 90%;
  max-width: ${props => props.theme.maxWidth * 0.9}px;
  font-size: 1.5em;
  height: ${props => props.theme.momentSummaryHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  > * {
    margin: 0 1em;
    padding: 0;
  }

  span {
    ${ellipsis()};
  }

  svg {
    height: ${svgSize};
    width: ${svgSize};
    min-width: ${svgSize};

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
      ? `drop-shadow(0 0 10px #AAA)`
      : 'none')};

    :hover {
      fill: ${props => lighten(0.4, props.theme.primary)};
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
        <HeartSvg onClick={(e) => { this.heartClickHandler(e); }} />
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
