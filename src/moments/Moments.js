import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import ListView from './ListView';
import SingleView from './SingleView';
import Loading from '../loading/Loading';

import { requestMoments as requestMomentsAction } from './actions';

const Aux = ({ children }) => children;

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 40%;
  }
`;

class Moments extends React.Component {
  static propTypes = {
    moments: PropTypes.shape({
      byId: PropTypes.shape({}),
      isFetching: PropTypes.bool,
    }).isRequired,
    requestMoments: PropTypes.func.isRequired,
    starredMoments: PropTypes.shape({}).isRequired,
    ownedMoments: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({ path: PropTypes.string }).isRequired,
  }

  componentWillMount() {
    this.props.requestMoments();
  }

  render() {
    const StarredMoments = () => {
      if (this.props.moments.isFetching && !this.props.moments.byId) {
        return (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        );
      }

      const starredMoments = Object.keys(this.props.starredMoments)
        .map(key => this.props.moments.byId[key])
        .filter(m => m !== undefined);

      if (!starredMoments || starredMoments.length === 0) {
        return (
          <Aux>
            <p>This is where your saved moments will appear.</p>
            <p>Head over to the <Link to="/explore">Explore</Link> page to find some!</p>
          </Aux>
        );
      }

      return <ListView moments={starredMoments} />;
    };

    const OwnedMoments = () => {
      if (this.props.moments.isFetching && !this.props.moments.byId) {
        return (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        );
      }

      const ownedMoments = Object.keys(this.props.ownedMoments)
        .map(key => this.props.moments.byId[key])
        .filter(m => m !== undefined);

      if (!ownedMoments || ownedMoments.length === 0) {
        return (
          <Aux>
            <p>This is where the moments that you have submitted will appear.</p>
            <p>You can add your own moments for other people to enjoy <Link to="/create">here.</Link></p>
          </Aux>
        );
      }

      return <ListView moments={ownedMoments} />;
    };

    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/`}>
          <Container>
            <h1>My Moments</h1>
            <h2>Saved Moments</h2>
            <StarredMoments />
            <h2>Submitted Moments</h2>
            <OwnedMoments />
          </Container>
        </Route>
        <Route path={`${this.props.match.path}/:key`} component={SingleView} />
      </Switch>
    );
  }
}

export default connect(
  store => ({
    moments: store.moments,
    starredMoments: store.user.data.starredMoments,
    ownedMoments: store.user.data.ownedMoments,
  }),
  dispatch => ({
    requestMoments: () => dispatch(requestMomentsAction()),
  }),
)(Moments);
