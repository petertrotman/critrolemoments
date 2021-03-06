import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import Moment from './Moment';
import EditView from './EditView';
import Loading from '../loading/Loading';
import { requestSingle as requestSingleAction } from './actions';

const StyledLoading = styled(Loading)`
  margin: auto;
  max-width: 50%;
`;

class SingleView extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string,
      params: PropTypes.shape({ key: PropTypes.string }),
    }).isRequired,
    data: PropTypes.shape({
      key: PropTypes.string,
      moment: PropTypes.shape({}),
      isFetching: PropTypes.bool,
    }).isRequired,
    requestSingle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.requestSingle(this.props.match.params.key);
  }

  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`}>
          { this.props.data.isFetching || !this.props.data.moment
            ? <StyledLoading />
            : <Moment moment={this.props.data.moment} expanded />
          }
        </Route>
        <Route path={`${this.props.match.path}/edit`}>
          { this.props.data.isFetching || !this.props.data.moment
            ? <StyledLoading />
            : <EditView moment={this.props.data.moment} />
          }
        </Route>
      </Switch>
    );
  }
}

export default connect(
  store => ({ data: store.moments.single }),
  dispatch => ({ requestSingle: key => dispatch(requestSingleAction(key)) }),
)(SingleView);
