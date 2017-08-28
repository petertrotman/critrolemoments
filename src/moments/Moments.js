import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requestMoments } from './actions';

class Moments extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(requestMoments());
  }

  render() { return <h1>My Moments</h1>; }
}

export default connect(
  null,
  dispatch => ({ dispatch }),
)(Moments);
