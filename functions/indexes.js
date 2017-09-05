const timestampToSeconds = require('./util').timestampToSeconds;

function indexMoments(db) {
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
        }, {});

      const byTimestamp = momentsEntries
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .map(entry => entry[0]);

      const byStarCount = momentsEntries
        .sort((a, b) => a[1].starCount - b[1].starCount)
        .map(entry => entry[0]);

      const byStart = momentsEntries
        .sort((a, b) =>
          timestampToSeconds(a[1].start) - timestampToSeconds(b[1].start))
        .map(entry => entry[0]);

      db.ref('/index/moments')
        .set({ byEpisode, byTimestamp, byStarCount, byStart });
    });
}

exports.indexMoments = indexMoments;
