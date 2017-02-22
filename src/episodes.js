import episodes from '../data/episodes.json';
import styles from './styles.css';

import { momentsElement } from './moments';

function episodeSortFn(a, b) {
  if (a.episode === b.episode) return 0;
  const af = parseFloat(a.episode);
  const bf = parseFloat(b.episode);
  if (!isNaN(af) && isNaN(bf)) return 1;
  if (isNaN(af) && !isNaN(bf)) return -1;
  if (!isNaN(af) && !isNaN(bf)) return af > bf ? 1 : -1;
  return a.episode > b.episode ? 1 : -1;
}

export function episodeElement(episode) {
  const div = document.createElement('div');
  div.classList.add(styles.episode);

  const title = document.createElement('h3');
  title.innerHTML = `${episode.episode}: ${episode.title}`;
  div.appendChild(title);

  const moments = momentsElement(episode);
  div.appendChild(moments);

  return div;
}

export function episodesElement() {
  const div = document.createElement('div');
  div.classList.add(styles.episodes);

  Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort(episodeSortFn)
    .forEach(e => div.appendChild(episodeElement(e)));

  return div;
}

