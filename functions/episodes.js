/* eslint no-console: ["error", { allow: ["error"] }] */
const fetch = require('node-fetch');

function fetchEpisodes(youtubeApiKey) {
  function episodesUrl(pageToken) {
    return [
      'https://www.googleapis.com/youtube/v3/playlistItems?',
      `key=${youtubeApiKey}&`,
      'playlistId=PL7atuZxmT954bCkC062rKwXTvJtcqFB8i&',
      'part=snippet&',
      'maxResults=50&',
      `pageToken=${pageToken || ''}`,
    ].join('');
  }

  function fetchRecursively(acc, pageToken, hasFetched) {
    if (hasFetched && !pageToken) {
      // Reached last page
      return acc;
    }
    return fetch(episodesUrl(pageToken))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`response returned ${res.status}`);
        }
        return res.json();
      })
      .then(({ items, nextPageToken }) =>
        fetchRecursively(acc.concat(items), nextPageToken, true))
      .catch(console.error); // eslint-disable-line no-console
  }

  return fetchRecursively([], null, false);
}

function updateEpisodes(db, youtubeApiKey) {
  const MIN_TIME_BETWEEN_UPDATES = 1000 * 60 * 60 * 0.5; // 1/2 hour
  return db.ref('/cron/episodes/last').once('value')
    .then((snapshot) => {
      const prev = snapshot.val() || 0;
      const time = Date.now() - prev;
      if (time < MIN_TIME_BETWEEN_UPDATES) {
        console.error(`called too frequently, min time: ${MIN_TIME_BETWEEN_UPDATES}; actual time: ${time}`);
        return null;
      }
      return fetchEpisodes(youtubeApiKey)
        .then(episodes => episodes.reduce((acc, episode) =>
          Object.assign(acc, { [episode.snippet.resourceId.videoId]: episode }), {}))
        .then(newEpisodes => Promise.all([
          db.ref('/episodes').set(newEpisodes),
          db.ref('/cron/episodes/last').set(Date.now()),
        ]))
        .catch(console.error);
    });
}

exports.fetch = fetchEpisodes;
exports.update = updateEpisodes;
