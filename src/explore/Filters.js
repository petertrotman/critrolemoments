import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Select from 'react-select';

import { mobileView } from '../layout/util';

const FiltersContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;

  > div {
    text-align: left;
    display: inline-block;
    margin: 0.5em;
    box-sizing: border-box;
    width: 48%;
    ${mobileView} {
      width: 95%;
    }
    max-width: 100%;
    // max-width: ${props => props.theme.maxWidth / 2.2}px;
  }
`;

class Filters extends React.Component {
  static propTypes = {
    episodes: PropTypes.shape({
      byId: PropTypes.shape({}),
      order: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }

  handleOrderBySelect(val) {
    console.log(val);
  }

  handleEpisodeSelect(val) {
    console.log(val);
  }

  render() {
    return (
      <FiltersContainer>
        <div>
          <span>Sort by:</span>
          <Select
            value="new"
            options={[
              { value: 'new', label: 'Newest' },
              { value: 'stars', label: 'Most Loved' },
            ]}
            onChange={val => this.handleOrderBySelect(val)}
          />
        </div>
        <div>
          <span>Filter by episode:</span>
          <Select
            value={null}
            options={this.props.episodes.order.map(key =>
              ({ value: key, label: this.props.episodes.byId[key].title }))}
          />
        </div>
      </FiltersContainer>
    );
  }
}

export default compose(
  connect(
    store => ({
      episodes: store.episodes,
    }),
  ),
)(Filters);
