import React from 'react';
import styles from './MoveBalls.css';

const MoveBalls = ({ positionY, positionX }) => {
  return (
    <div className={styles.BackScreen}>
      <div
        className={styles.Ball}
        style={{ top: `${positionY}%`, left: `${positionX}%` }}
      ></div>
    </div>
  );
};

export default MoveBalls;
