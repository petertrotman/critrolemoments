function indexMoments(db) {
  db.ref('/moments').once('value')
    .then(snapshot => snapshot.val())
    .then((moments) => {
      const byEpisode =
        Object.entries(moments)
          .reduce((acc, [key, moment]) => ({
            ...acc,
            [moment.episode]: {
              ...acc[moment.episode],
              [key]: true,
            },
          }), {});

      const byTimestamp =
        Object.entries(moments)
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .map(entry => entry[0]);

      const byStarCount =
        Object.entries(moments)
          .sort((a, b) => a[1].starCount - b[1].starCount)
          .map(entry => entry[0]);

      const byStart =
        Object.entries(moments)
          .sort((a, b) => a[1].start - b[1].start)
          .map(entry => entry[0]);

      db.ref('/index/moments')
        .set({ byEpisode, byTimestamp, byStarCount, byStart });
    });
}

exports.indexMoments = indexMoments;
