export function ellipsis(text, maxLength) {
  if (!text) return text;
  return (text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text);
}

export function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * (60 ** i)), 0);
}
