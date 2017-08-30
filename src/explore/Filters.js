import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Filters extends React.Component {
  render() {
    return (
      <FiltersContainer>
        Filters
      </FiltersContainer>
    );
  }
}

export default Filters;
