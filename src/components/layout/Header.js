import React from 'react';
import styles from './layout.css';

const Header = () => (
  <div>
    <div className={styles.title}>
      <h1>Critical Role Moments</h1>
    </div>
    <div className={styles.helpText}>
      <p>WARNING: Spoilers for all episodes</p>
      <p>A collection of the most memorable moments from Critical Role.</p>
      <p>
        <a href="#/submit">NEW: You can submit your own moments by clicking here!</a>
        <a
          href="https://www.reddit.com/r/criticalrole/comments/5vqgo6/spoilers_e86_i_made_a_website_to_easily_browse/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss this on Reddit.
        </a>
      </p>
    </div>
  </div>
);

export default Header;
