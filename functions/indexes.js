const timestampToSeconds = require('./util').timestampToSeconds;

function indexMoments(db) {
  db.ref('/episodes').once('value')
    .then(snapshot => snapshot.val())
    .then((episodes) => {
      const orderedEpisodes = Object
        .keys(episodes)
        .map(key => [key, episodes[key]])
        .sort((a, b) => a[1].snippet.position - b[1].snippet.position)
        .map(entry => entry[0]);

      db.ref('/moments').once('value')
        .then(snapshot => snapshot.val())
        .then((moments) => {
          const momentsEntries = Object.keys(moments).map(key => [key, moments[key]]);

          const byEpisode = momentsEntries
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

          const byTimestamp = momentsEntries
            .sort((a, b) => a[1].timestamp - b[1].timestamp)
            .map(entry => entry[0]);

          const byStarCount = momentsEntries
            .sort((a, b) => a[1].starCount - b[1].starCount)
            .map(entry => entry[0]);

          const byStart = momentsEntries
            .sort((a, b) =>
              timestampToSeconds(a[1].start) - timestampToSeconds(b[1].start))
            .sort((a, b) =>
              orderedEpisodes.indexOf(a[1].episode) - orderedEpisodes.indexOf(b[1].episode))
            .map(entry => entry[0]);

          db.ref('/indexes/moments')
            .set({ byEpisode, byTimestamp, byStarCount, byStart });
        });
    });
}

exports.indexMoments = indexMoments;
