import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Moment from './Moment';
import { momentType } from '../utils/types';

const MomentListDiv = styled.div`
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const MomentList = ({ moments }) => (
  <MomentListDiv>
    <ul>
      { moments.map(moment =>
        <Moment key={moment.key} moment={moment} />) }
    </ul>
  </MomentListDiv>
);

MomentList.propTypes = {
  moments: PropTypes.arrayOf(momentType).isRequired,
};

export default MomentList;
