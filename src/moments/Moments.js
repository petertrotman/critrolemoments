import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MomentList from './MomentList';

import { requestMoments as requestMomentsAction } from './actions';

const Aux = ({ children }) => children;

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
`;

class Moments extends React.Component {
  static propTypes = {
    moments: PropTypes.shape({
      byId: PropTypes.shape({}),
    }).isRequired,
    requestMoments: PropTypes.func.isRequired,
    starredMoments: PropTypes.shape({}).isRequired,
    ownedMoments: PropTypes.shape({}).isRequired,
  }

  componentWillMount() {
    this.props.requestMoments();
  }

  render() {
    const starredMoments = Object.keys(this.props.starredMoments)
      .map(key => this.props.moments.byId[key])
      .filter(m => m !== undefined);
    const ownedMoments = Object.keys(this.props.ownedMoments)
      .map(key => this.props.moments.byId[key])
      .filter(m => m !== undefined);

    return (
      <StyledDiv>
        <h1>My Moments</h1>
        <h2>Saved Moments</h2>
        { starredMoments.length > 0
          ? <MomentList moments={starredMoments} />
          : (
            <Aux>
              <p>This is where your saved moments will appear.</p>
              <p>Head over to the <Link to="/explore">Explore</Link> page to find some!</p>
            </Aux>
          ) }
        <h2>Submitted Moments</h2>
        { ownedMoments.length > 0
          ? <MomentList moments={ownedMoments} />
          : (
            <Aux>
              <p>This is where the moments that you have submitted will appear.</p>
              <p>You can add your own moments for people to enjoy by clicking <Link to="/add">here.</Link></p>
            </Aux>
          ) }
      </StyledDiv>
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
