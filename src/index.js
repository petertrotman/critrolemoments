import episodes from '../data/episodes.json';
import styles from './index.css';

function episodeSortFn(a, b) {
  if (a.episode === b.episode) return 0;
  const af = parseFloat(a.episode);
  const bf = parseFloat(b.episode);
  if (!isNaN(af) && isNaN(bf)) return 1;
  if (isNaN(af) && !isNaN(bf)) return -1;
  if (!isNaN(af) && !isNaN(bf)) return af > bf ? 1 : -1;
  return a.episode > b.episode ? 1 : -1;
}

function addEpisode(el, episode) {
  const div = document.createElement('div');
  div.id = `episode-${episode.videoId}`;
  div.classList.add(styles.episode);
  div.innerHTML = `<h3>${episode.episode}: ${episode.title}</h3>`;
  el.appendChild(div);
}

function main() {
  const root = document.getElementById('root');
  const episodesDiv = document.createElement('div');
  episodesDiv.id = 'episodes';
  root.appendChild(episodesDiv);

  Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort(episodeSortFn)
    .forEach(e => addEpisode(episodesDiv, e));
}

document.addEventListener('DOMContentLoaded', main);
