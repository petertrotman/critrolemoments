import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Filters from './Filters';
import Pager from './Pager';
import MomentList from '../moments/MomentList';
import Loading from '../loading/Loading';

import { requestMoments as requestMomentsAction } from './actions';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 50%;
  }
`;

class Explore extends React.Component {
  static propTypes = {
    requestMoments: PropTypes.func.isRequired,
    explore: PropTypes.shape({
      byId: PropTypes.object,
      order: PropTypes.arrayOf(PropTypes.string),
      isFetching: PropTypes.bool,
      hasFetched: PropTypes.bool,
    }).isRequired,
  }

  componentWillMount() {
    if (!this.props.explore.hasFetched) this.props.requestMoments();
  }

  render() {
    if (this.props.explore.isFetching) {
      return (
        <Container>
          <Filters />
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        </Container>
      );
    }

    const moments = this.props.explore.order
      .map(key => this.props.explore.byId[key]);

    return (
      <Container>
        <Filters />
        <MomentList moments={moments} />
        <Pager data={this.props.explore} requestMoments={this.props.requestMoments} />
      </Container>
    );
  }
}

export default connect(
  store => ({ explore: store.explore }),
  dispatch => ({ requestMoments: opts => dispatch(requestMomentsAction(opts)) }),
)(Explore);

