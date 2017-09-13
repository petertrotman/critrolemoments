import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { adjustHue, desaturate } from 'polished';

const Container = styled.div`
  width: 100%;
  margin: 0.5em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    all: unset;
    padding: 0.5em;
    margin: 0 0.1em;
    width: 3em;
    text-align: center;
    box-sizing: border-box;
    font-family: 'Cinzel Decorative', sans-serif;
    font-weight: bold;
    font-size: 1.4em;
    letter-spacing: 2px;
    border-radius: 5px;
    background: linear-gradient(0deg,
      ${props => desaturate(0.15, adjustHue(6, props.theme.primary))},
      ${props => desaturate(0.15, adjustHue(-6, props.theme.primary))});
    cursor: pointer;
    color: #fff;

    box-shadow: 0px 4px 8px #AAA;
    transform: translateY(-2px);
    @media (hover) {
      box-shadow: none;
      transform: none;
    }

    :hover {
      box-shadow: 0px 4px 8px #AAA;
      transform: translateY(-2px);
    }

    :active {
      box-shadow: none;
      transform: translateY(0);
    }
  }

  select {
    margin: 0 0.4em;
    font-size: 1.2em;
  }
`;

const Pager = ({ data, requestMoments }) => {
  if (!data || !data.order || !data.hasFetched) return null;

  const numPages = Math.ceil(data.fetchedIndex.length / data.options.limit);

  function handleClick(e, increment) {
    e.preventDefault();
    const newPage = data.options.page + increment;
    if (newPage < 0 || newPage >= numPages) return;
    requestMoments({ page: newPage });
  }

  function handleSelect(e) {
    e.preventDefault();
    requestMoments({ page: parseInt(e.target.value, 10) });
  }

  /* eslint-disable react/no-array-index-key */
  return (
    <Container>
      <div>
        <button onClick={e => handleClick(e, -1)}>{ '<' }</button>
      </div>
      <span>
        Page
        <select value={data.options.page} onChange={e => handleSelect(e)}>
          { [...Array(numPages)].map((x, i) => <option value={i} key={i}>{i + 1}</option>) }
        </select>
        of { numPages }
      </span>
      <div>
        <button onClick={e => handleClick(e, 1)}>{ '>' }</button>
      </div>
    </Container>
  );
  /* eslint-enable react/no-array-index-key */
};

Pager.propTypes = {
  data: PropTypes.shape({
    options: PropTypes.shape({
      page: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  requestMoments: PropTypes.func.isRequired,
};

export default Pager;
