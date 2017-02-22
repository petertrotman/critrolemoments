import { episodesElement } from './episodes';
// import styles from './index.css';

function main() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(episodesElement());
}

document.addEventListener('DOMContentLoaded', main);
