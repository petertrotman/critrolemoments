/* eslint-disable no-restricted-properties */
function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * Math.pow(60, i)), 0);
}

exports.timestampToSeconds = timestampToSeconds;
