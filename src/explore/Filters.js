import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { adjustHue, desaturate } from 'polished';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Select from 'react-select';

import { updateOptions as updateOptionsAction, requestMoments as requestMomentsAction } from './actions';
import { mobileView } from '../layout/util';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .Select-control {
    table-layout: fixed;
  }

  .Select-multi-value-wrapper {
    display: block !important;
  }

  .Select--multi .Select-value {
    white-space: nowrap;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 20px);
    }
    display: block;
    box-sizing: border-box;
    max-width: calc(100% - 10px);
  }

  .Select-placeholder, .Select--single > .Select-control .Select-value {
    padding-right: 40px;
  }
`;
/* eslint-enable no-unused-expressions */

const FiltersContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;

  > div {
    text-align: left;
    display: inline-block;
    margin: 0.5em 0;
    box-sizing: border-box;
    width: 100%;
    // width: 48%;
    // ${mobileView} {
    //   width: 95%;
    // }
    max-width: 100%;
  }

  > button {
    all: unset;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Cinzel Decorative', sans-serif;
    font-weight: bold;
    font-size: 1.4em;
    letter-spacing: 2px;
    border-radius: 5px;
    padding: 0.5em;
    margin: 0.5em 0;
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

  }
`;

class Filters extends React.Component {
  static propTypes = {
    episodes: PropTypes.shape({
      byId: PropTypes.shape({}),
      order: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    options: PropTypes.shape({
      order: PropTypes.oneOf(['byTimestamp', 'byStarCount', 'byStart']).isRequired,
      episodes: PropTypes.arrayOf(PropTypes.string).isRequired,
      lastEpisode: PropTypes.string,
    }).isRequired,
    updateOptions: PropTypes.func.isRequired,
    requestMoments: PropTypes.func.isRequired,
  }

  handleOrderBySelect(newOption) {
    this.props.updateOptions({
      order: newOption && newOption.value,
    });
  }

  handleLastEpisodeSelect(newOption) {
    const lastEpisode = newOption && newOption.value;
    this.props.updateOptions({
      lastEpisode,
      episodes: this.props.options.episodes
        .filter(key => this.episodeNotAfterLast(key, { lastEpisode })),
    });
  }

  handleEpisodeSelect(newOptions) {
    this.props.updateOptions({
      episodes: newOptions.map(o => o.value),
    });
  }

  handleButtonClick(e) {
    e.preventDefault();
    this.props.requestMoments({ page: 0 });
  }

  episodeNotAfterLast(episodeKey, options = {}) {
    // So we can use >= check which returns true if the indexOf(lastEpisode) === -1
    const reversedEpisodes =
      options.reversedEpisodes || [].concat(this.props.episodes.order).reverse();
    const lastEpisode = options.lastEpisode || this.props.options.lastEpisode;
    return reversedEpisodes.indexOf(episodeKey) >= reversedEpisodes.indexOf(lastEpisode);
  }

  episodesToOptions(episodes, options = {}) {
    const reversedEpisodes = [].concat(this.props.episodes.order).reverse();

    return episodes
      .filter(key => (
        Boolean(options.disableFilter) ||
        this.episodeNotAfterLast(key, { reversedEpisodes })
      ))
      .map(key => ({
        value: key,
        label: this.props.episodes.byId[key].snippet.title,
      }));
  }

  render() {
    return (
      <FiltersContainer>
        <div>
          <label htmlFor="order-by">Sort by:</label>
          <Select
            name="order-by"
            searchable={false}
            clearable={false}
            value={this.props.options.order}
            options={[
              { value: 'byTimestamp', label: 'Newest' },
              { value: 'byStarCount', label: 'Most Loved' },
              { value: 'byStart', label: 'Chronological' },
            ]}
            onChange={newOption => this.handleOrderBySelect(newOption)}
          />
        </div>
        <div>
          <label htmlFor="last-episode">No moments after episode (to avoid spoilers):</label>
          <Select
            name="last-episode"
            placeholder="Select... (showing all episodes)"
            searchable={false}
            value={this.props.options.lastEpisode && {
              key: this.props.options.lastEpisode,
              label: this.props.episodes.byId[this.props.options.lastEpisode].snippet.title,
            }}
            options={this.episodesToOptions(this.props.episodes.order, { disableFilter: true })}
            onChange={newOption => this.handleLastEpisodeSelect(newOption)}
          />
        </div>
        <div>
          <label htmlFor="episodes-filter">Filter by episode:</label>
          <Select
            multi
            name="episodes-filter"
            placeholder="Select... (showing all episodes)"
            searchable={false}
            value={this.episodesToOptions(this.props.options.episodes)}
            options={this.episodesToOptions(this.props.episodes.order)}
            onChange={newOptions => this.handleEpisodeSelect(newOptions)}
          />
        </div>
        <button onClick={e => this.handleButtonClick(e)}>Find Moments</button>
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
      requestMoments: options => dispatch(requestMomentsAction(options)),
    }),
  ),
)(Filters);
