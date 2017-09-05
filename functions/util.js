function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * (60 ** i)), 0);
}

exports.timestampToSeconds = timestampToSeconds;
