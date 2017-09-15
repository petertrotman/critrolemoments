import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { adjustHue } from 'polished';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import loginRequired from '../auth/loginRequired';
import { feedbackSwal } from '../swal/swal';

const linkColor = props => adjustHue(12, props.theme.secondary);
const linkHoverColor = props => props.theme.secondary;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 2em;

  > img {
    border-radius: 50%;
    width: 10em;
  }

  > ul {
    all: unset;
    list-style: none;
    margin-top: 1em;
    margin-bottom: 3em;
    width: 100%;
    text-align: center;

    font-size: 1.5em;
    font-family: 'Cinzel Decorative', sans-serif;
    font-weight: 600;
    color: ${linkColor};
  }

  > ul > li > a {
    all: unset;
    display: inline-block;
    padding: 0.4em 0;
    width: 20em;
    max-width: 90%;
    margin: 0.5em 0;

    border-style: none;
    border-width: 2px;
    border-color: ${linkColor};
    border-top-style: solid;
    border-bottom-style: solid;

    :hover {
      color: ${props => props.theme.secondary};
      border-color: ${linkHoverColor};
    }
  }
`;

const Settings = ({ user }) => (
  <Container>
    { user.photoURL && (
      <img src={user.photoURL} alt="" />
    ) }
    <h3>{ user.displayName }</h3>
    <ul>
      <li>
        <Link to="/auth/signout">
          <span>Sign Out</span>
        </Link>
      </li>
      <li>
        <a href="/feedback" onClick={(e) => { e.preventDefault(); feedbackSwal(); }}>
          <span>Send Feedback</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/petertrotman/critrolemoments">
          <span>View Source</span>
        </a>
      </li>
    </ul>
    <p>Donations to (BTC): 1Hz1DwK1TQe8KmpPkCGetpKRy3wNz4TqKc</p>
  </Container>
);

Settings.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};


export default compose(
  loginRequired,
  connect(store => ({ user: store.auth.user })),
)(Settings);
