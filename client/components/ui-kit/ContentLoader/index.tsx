import React from 'react';
import styles from './style.module.scss';

const ContentLoader = () => {
  return (
    <div className={styles.content_loader}>
      <div className={styles.content_loader__activity}/>
    </div>
  );
};

export default ContentLoader;