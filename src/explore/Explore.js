import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestMoments } from './actions';

class Explore extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(requestMoments());
  }

  render() {
    return <h1>Explore</h1>;
  }
}

// Explore.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect(dispatch => dispatch)(Explore);

