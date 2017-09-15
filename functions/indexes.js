/* eslint-disable comma-dangle */

const timestampToSeconds = require('./util').timestampToSeconds;

function orderEpisodes(episodesObject) {
  return Object.keys(episodesObject)
    .sort((a, b) =>
      episodesObject[a].snippet.position - episodesObject[b].snippet.position);
}

function indexMoments(db) {
  return db.ref('/indexes/episodes/byPosition').once('value')
    .then(snapshot => snapshot.val())
    .then(orderedEpisodes => db.ref('/moments').once('value')
      .then(snapshot => snapshot.val())
      .then((moments) => {
        const momentsEntries = Object.keys(moments).map(key => [key, moments[key]]);
        // Now need to use [].concat(momentsEntries) to create a new array each time.
        // Otherwise it will just sort each time in-place.

        const byEpisode = [].concat(momentsEntries)
          .reduce((acc, [key, moment]) => {
            // return Object.assign(
            //   {},
            //   acc,
            //   { [moment.episode]: Object.assign(
            //     {},
            //     acc[moment.episode],
            //     { [key]: true },
            //   ) },
            // );
            if (!acc[moment.episode]) acc[moment.episode] = {};
            acc[moment.episode][key] = true;
            return acc;
          }, orderedEpisodes.reduce((acc, key) => Object.assign(acc, { [key]: {} }), {}));

        const byTimestamp = [].concat(momentsEntries)
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .map(entry => entry[0]);

        const byStarCount = [].concat(momentsEntries)
          .sort((a, b) => a[1].starCount - b[1].starCount)
          .map(entry => entry[0]);

        const byStart = [].concat(momentsEntries)
          .sort((a, b) =>
            timestampToSeconds(a[1].start) - timestampToSeconds(b[1].start))
          .sort((a, b) =>
            orderedEpisodes.indexOf(a[1].episode) - orderedEpisodes.indexOf(b[1].episode))
          .map(entry => entry[0]);

        const byUser = [].concat(momentsEntries)
          .reduce((acc, [key, moment]) => {
            const user = moment.user || '__unknown__';
            if (!acc[user]) acc[user] = {};
            acc[user][key] = true;
            return acc;
          }, {});

        return db.ref('/indexes/moments')
          .set({ byEpisode, byUser, byTimestamp, byStarCount, byStart });
      })
    );
}

function indexEpisodes(db) {
  return db.ref('/episodes').once('value')
    .then(snapshot => snapshot.val())
    .then(episodesObject => orderEpisodes(episodesObject))
    .then(orderedEpisodes => db.ref('/indexes/episodes/byPosition').set(orderedEpisodes));
}

function removeMoment(db, key) {
  const ref = db.ref('/indexes/moments');
  const indexes = ['byEpisode', 'byStarCount', 'byStart', 'byTimestamp', 'byUser'];
  return Promise.all(indexes.map(ix => ref.child(ix).child(key).set(null)));
}

exports.indexMoments = indexMoments;
exports.indexEpisodes = indexEpisodes;
exports.removeMoment = removeMoment;
