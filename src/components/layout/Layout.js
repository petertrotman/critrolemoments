import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './layout.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <Header />
      { children }
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Layout;
