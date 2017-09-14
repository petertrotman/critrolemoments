import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Moment from './Moment';
import { momentType } from '../utils/types';

const ListViewDiv = styled.div`
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

const ListView = ({ moments }) => (
  <ListViewDiv>
    <ul>
      { moments.map(moment =>
        <Moment key={moment.key} moment={moment} />) }
    </ul>
  </ListViewDiv>
);

ListView.propTypes = {
  moments: PropTypes.arrayOf(momentType).isRequired,
};

export default ListView;
