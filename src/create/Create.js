import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import EditView from '../moments/EditView';
import Loading from '../loading/Loading';

import { requestSingle as requestSingleAction } from '../moments/actions';

const StyledLoading = styled(Loading)`
  margin: auto;
  max-width: 50%;
`;

class Create extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    requestSingle: PropTypes.func.isRequired,
    data: PropTypes.shape({
      key: PropTypes.string,
      moment: PropTypes.shape({}),
      isFetching: PropTypes.bool,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { moment: null, error: null };
  }

  componentDidMount() {
    if (this.from) {
      this.props.requestSingle(this.from);
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.data.isFetching && !nextProps.data.isFetching) {
    if (!nextProps.data.isFetching && nextProps.data.moment) {
      const momentCopy = JSON.parse(JSON.stringify(nextProps.data.moment)); // Deep copy
      // Cannot have undefined in moment
      const moment = {
        title: momentCopy.title || '',
        episode: momentCopy.episode || '',
        description: momentCopy.description || '',
        start: momentCopy.start || '00:00:00',
        end: momentCopy.end || null,
        tags: momentCopy.tags || {},
      };
      this.setState({ moment });
    }
  }

  get from() {
    const parsed = queryString.parse(this.props.location.search);
    return parsed.from;
  }

  render() {
    if (this.state.error) {
      return <p>An error occurred.</p>;
    }

    if (!this.from) {
      return <EditView />;
    }

    if (this.props.data.isFetching || !this.state.moment) {
      return <StyledLoading />;
    }

    return <EditView moment={this.state.moment} />;
  }
}

export default compose(
  withRouter,
  connect(
    store => ({ data: store.moments.single }),
    dispatch => ({ requestSingle: key => dispatch(requestSingleAction(key)) }),
  ),
)(Create);
