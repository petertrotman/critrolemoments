import styles from './styles.css';
import { createElement, parseTimestamp } from './util';

export function ytElement(episode, moment, containerWidth) {
  const ts = parseTimestamp(moment.timestamp);
  const src =
    `https://www.youtube.com/embed/${episode.videoId}` +
    `?start=${(ts.h * 3600) + (ts.m * 60) + ts.s}` +
    '&origin=http://critrolemoments.com&autoplay=1';

  const padding = 15;
  const width = containerWidth - (2 * padding);
  const height = width * (9 / 16);

  return createElement('iframe', {
    classList: [styles.ytPlayer],
    type: 'text/html',
    src,
    width: `${width}px`,
    height: `${height}px`,
    frameborder: 0,
    allowfullscreen: true,
    style: `padding: ${padding}px;`,
  });
}
