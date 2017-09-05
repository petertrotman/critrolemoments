import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    all: unset;
    font-size: 2em;
    background-color: ${props => props.theme.primary};
    color: #fff;
    cursor: pointer;
    padding: 0.5em;
  }
`;

function handleBackClick(e, data, requestMoments) {
  e.preventDefault();
  requestMoments({ page: Math.max(data.options.page - 1, 0) });
}

function handleForwardClick(e, data, requestMoments) {
  e.preventDefault();
  requestMoments({ page: data.options.page + 1 });
}


const Pager = ({ data, requestMoments }) => (
  <Container>
    <div>
      <button>{ '<<' }</button>
      <button onClick={e => handleBackClick(e, data, requestMoments)}>{ '<' }</button>
    </div>
    Pager
    <div>
      <button onClick={e => handleForwardClick(e, data, requestMoments)}>{ '>' }</button>
      <button>{ '>>' }</button>
    </div>
  </Container>
);

Pager.propTypes = {
  data: PropTypes.shape({
    options: PropTypes.shape({
      page: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  requestMoments: PropTypes.func.isRequired,
};

export default Pager;
