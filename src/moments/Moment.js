import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAction } from 'react-router-redux';
import { lighten } from 'polished';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';

import { requestStar } from '../user/actions';
import { momentType } from './util';
import { signInSwal } from '../auth/util';
import { mobileView, desktopView } from '../layout/util';

/* eslint-disable indent */
const StyledDiv = styled.div`
  width: calc(100% - 2em);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin: 0.5em 0;
  padding: 0.5em;
  box-shadow: 2px 2px 8px #AAA;
  border-radius: 5px;

  // ${desktopView} {
  //   font-size: 1.6em;
  // }

  div.top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  div.heart {
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

      // filter: ${props => (props.starred ? 'drop-shadow(0 0 10px #AAA)' : 'none')};

      @media (hover) {
        :hover {
          fill: ${props => lighten(0.4, props.theme.primary)};
        }
      }
    }
  }

  div.title {
    // width: 100%;
    cursor: pointer;
  }


  div.controls {
    display: ${props => (props.expanded ? 'inline' : 'none')};
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

  titleClickHandler(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <StyledDiv
        expanded={this.state.expanded}
        owned={this.owned}
        starred={this.starred}
        starring={this.starring}
      >
        <div className="top">
          <div className="heart">
            <HeartSvg onClick={(e) => { this.heartClickHandler(e); }} role="button" />
            <span>{ this.props.moment.starCount }</span>
          </div>
          <div
            className="title"
            onClick={(e) => { this.titleClickHandler(e); }}
            role="button"
            tabIndex={0}
          >
            <span>{ this.props.moment.title }</span>
          </div>
        </div>
        <div className="controls">
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
          .<br />
        </div>
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
