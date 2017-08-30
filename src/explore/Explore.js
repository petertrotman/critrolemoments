import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Filters from './Filters';
import MomentList from '../moments/MomentList';
import Loading from '../loading/Loading';

import { requestMoments } from './actions';

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
    dispatch: PropTypes.func.isRequired,
    explore: PropTypes.shape({
      byId: PropTypes.object,
      order: PropTypes.arrayOf(PropTypes.string),
      isFetching: PropTypes.bool,
    }).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(requestMoments());
  }

  render() {
    if (this.props.explore.isFetching) {
      return (
        <Container>
          <h2>Explore</h2>
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
        <h2>Explore</h2>
        <Filters />
        <MomentList moments={moments} />
      </Container>
    );
  }
}

// Explore.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect(
  store => ({ explore: store.explore }),
  dispatch => ({ dispatch }),
)(Explore);

