import styles from './styles.css';
import { parseTimestamp } from './util';

export function ytElement(episode, moment, containerWidth) {
  const iframe = document.createElement('iframe');
  const ts = parseTimestamp(moment.timestamp);
  const src =
    `https://www.youtube.com/embed/${episode.videoId}` +
    `?start=${(ts.h * 3600) + (ts.m * 60) + ts.s}` +
    '&origin=http://critrolemoments.com&autoplay=1';

  const padding = 15;
  const width = containerWidth - (2 * padding);

  iframe.classList.add(styles.ytPlayer);
  iframe.setAttribute('type', 'text/html');
  iframe.setAttribute('src', src);
  iframe.setAttribute('width', `${width}px`);
  iframe.setAttribute('height', `${width * (9 / 16)}px`);
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('allowfullscreen', true);
  iframe.setAttribute('style', `padding: ${padding}px;`);

  return iframe;
}
