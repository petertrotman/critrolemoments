function indexMoments(db) {
  db.ref('/moments').once('value')
    .then(snapshot => snapshot.val())
    .then((moments) => {
      const byEpisode =
        Object.keys(moments)
          .map(key => [key, moments[key]])
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

      const byTimestamp =
        Object.keys(moments)
          .map(key => [key, moments[key]])
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .map(entry => entry[0]);

      const byStarCount =
        Object.keys(moments)
          .map(key => [key, moments[key]])
          .sort((a, b) => a[1].starCount - b[1].starCount)
          .map(entry => entry[0]);

      const byStart =
        Object.keys(moments)
          .map(key => [key, moments[key]])
          .sort((a, b) => a[1].start - b[1].start)
          .map(entry => entry[0]);

      db.ref('/index/moments')
        .set({ byEpisode, byTimestamp, byStarCount, byStart });
    });
}

exports.indexMoments = indexMoments;
