import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Select from 'react-select';

import { updateOptions as updateOptionsAction } from './actions';
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
    options: PropTypes.shape({
      orderBy: PropTypes.oneOf(['timestamp', 'starCount']).isRequired,
      episodes: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    updateOptions: PropTypes.func.isRequired,
  }

  handleOrderBySelect(newOption) {
    this.props.updateOptions({
      orderBy: newOption.value,
    });
  }

  handleEpisodeSelect(newOptions) {
    this.props.updateOptions({
      // episodes: this.props.options.episodes.concat(newOptions.map(o => o.value)),
      episodes: newOptions.map(o => o.value),
    });
  }

  render() {
    return (
      <FiltersContainer>
        <div>
          <span>Sort by:</span>
          <Select
            name="order-by"
            searchable={false}
            value={this.props.options.orderBy}
            options={[
              { value: 'timestamp', label: 'Newest' },
              { value: 'starCount', label: 'Most Loved' },
            ]}
            onChange={newOption => this.handleOrderBySelect(newOption)}
          />
        </div>
        <div>
          <span>Filter by episode:</span>
          <Select
            multi
            name="episodes-filter"
            searchable={false}
            value={this.props.options.episodes.map(key =>
              ({ value: key, label: this.props.episodes.byId[key].snippet.title }))}
            options={this.props.episodes.order.map(key =>
              ({ value: key, label: this.props.episodes.byId[key].snippet.title }))}
            onChange={newOptions => this.handleEpisodeSelect(newOptions)}
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
      options: store.explore.options,
    }),
    dispatch => ({
      updateOptions: options => dispatch(updateOptionsAction(options)),
    }),
  ),
)(Filters);
