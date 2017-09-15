import firebase from 'firebase/app';

import { paginate } from '../utils/data';

export const EXPLORE_REQUEST_MOMENTS = 'EXPLORE_REQUEST_MOMENTS';
export const EXPLORE_RECEIVE_MOMENTS = 'EXPLORE_RECEIVE_MOMENTS';
export const EXPLORE_UPDATE_OPTIONS = 'EXPLORE_UPDATE_OPTIONS';

export function receiveMoments(data, error) {
  return {
    type: EXPLORE_RECEIVE_MOMENTS,
    payload: { data },
    error,
  };
}

export function requestMoments(opts = {}) {
  return async (dispatch, getState) => {
    const explore = getState().explore;
    const options = {
      ...explore.options,
      ...opts,
    };

    if (false
      || explore.isFetching
      || (
        JSON.stringify(options) === JSON.stringify(explore.fetchedOptions)
        && options.hasFetched
        && !options.force
      )
    ) {
      return;
    }

    dispatch({
      type: EXPLORE_REQUEST_MOMENTS,
      payload: { options },
    });

    const db = firebase.app().database();

    // The full ordered list of moment keys that match the search criteria.
    const index = await (async () => {
      const { page, ...restOptions } = options;
      const { page: fetchedPage, ...restFetchedOptions } = explore.fetchedOptions;
      if (JSON.stringify(restOptions) === JSON.stringify(restFetchedOptions) && !options.force) {
        // If the only thing that has changed in the request is the page number,
        // we can re-use the old moments index.
        return explore.fetchedIndex;
      }
      // Otherwise we need to reset the page to 0
      options.page = 0;

      const indexRef = db.ref('/indexes');

      // If we need it, fetch the moments indexed by episode and the episodes list
      const momentsByEpisodePromise = (options.episodes.length > 0 || options.lastEpisode)
        && indexRef.child('moments/byEpisode').once('value').then(ss => ss.val());

      // If we need to know the order of the episodes, fetch it here
      const episodesByPositionPromise = (!options.episodes.length && options.lastEpisode)
        && indexRef.child('episodes/byPosition').once('value').then(ss => ss.val());

      // Fetch the full moments list ordered by our order by criteria
      const momentsByOrderPromise =
        indexRef.child('moments').child(options.order).once('value').then(ss => ss.val());

      // Await the promises (create all promises then await them so they execute concurrently)
      const episodesByPosition = await episodesByPositionPromise;
      const momentsByEpisode = await momentsByEpisodePromise;
      const momentsByOrder = await momentsByOrderPromise;

      // Reverse if we want highest first
      if (['byTimestamp', 'byStarCount'].includes(options.order)) momentsByOrder.reverse();

      // Now we can return the moments by order if we don't need to filter out episodes
      if (!options.episodes.length && !options.lastEpisode) return momentsByOrder;

      // The list of allowed episodes
      const allowedEpisodes = (options.episodes.length > 0 && options.episodes)
        || episodesByPosition.slice(0, episodesByPosition.indexOf(options.lastEpisode) + 1);

      const allowedMoments = allowedEpisodes.reduce((acc, key) =>
        acc.concat(Object.keys(momentsByEpisode[key] || {})), []);

      return momentsByOrder.filter(key => allowedMoments.includes(key));
    })();

    const order = paginate(index, options.page, options.limit);

    const momentsRef = db.ref('/moments');
    const moments = await Promise.all(order.map(key =>
      momentsRef.child(key).once('value')));

    const byId = moments.reduce((acc, moment) =>
      ({ ...acc, [moment.key]: { ...moment.val(), key: moment.key } }), {});

    dispatch(receiveMoments({ byId, order, index }));
  };
}

export function updateOptions(options) {
  return {
    type: EXPLORE_UPDATE_OPTIONS,
    payload: { options },
  };
}
