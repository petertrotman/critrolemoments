import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import MomentList from '../moments/MomentList';

import { requestMoments } from './actions';

const StyledDiv = styled.div`
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
      return <p>Loading...</p>;
    }
    const moments = this.props.explore.order
      .map(key => this.props.explore.byId[key]);

    return (
      <StyledDiv>
        <h1>Explore</h1>
        <MomentList moments={moments} />
      </StyledDiv>
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

