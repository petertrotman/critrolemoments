import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAction } from 'react-router-redux';
import { ellipsis } from 'polished';
import swal from 'sweetalert2';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';

import { momentType } from './util';

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
    height: ${props => props.theme.momentSummaryHeight * 0.8}px;
    width: ${props => props.theme.momentSummaryHeight * 0.8}px;
    min-width: ${props => props.theme.momentSummaryHeight * 0.8}px;

    cursor: pointer;

    :hover {
      fill: ${props => props.theme.primary};
    }
  }
`;

class Moment extends React.Component {
  static propTypes = {
    moment: momentType.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({}),
    expanded: PropTypes.bool,
  }

  static defaultProps = {
    user: null,
    expanded: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
  }

  heartClickHandler(e) {
    e.preventDefault();
    const { push, location } = this.props;

    if (!this.props.user) {
      swal({
        title: 'Please sign in to do that',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sign in',
        preConfirm: () => new Promise((resolve) => {
          const next = encodeURIComponent(`${location.pathname}${location.search}`);
          resolve(push({
            pathname: '/auth/signin',
            search: `?next=${next}`,
            state: { next },
          }));
        }),
      }).catch(swal.noop);
      return;
    }
    console.log('click');
  }

  render() {
    return (
      <StyledDiv>
        <HeartSvg onClick={(e) => { this.heartClickHandler(e); }} />
        <span>{ this.props.moment.title }</span>
      </StyledDiv>
    );
  }
}

export default compose(
  withRouter,
  connect(
    store => ({ user: store.auth.user }),
    dispatch => ({ push: path => dispatch(pushAction(path)) }),
  ),
)(Moment);
