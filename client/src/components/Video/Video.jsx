import React from 'react';
import styles from './video.module.css';

export default function Video() {
  return (
    <div className={styles.body_video}>
      <div className={styles.full_screen__body}>
        {/* <div className={styles.full_screen__text}>text</div> */}
        <div className={styles.full_screen__title}>Travel Master</div>
      </div>
      <video poster="video/preVideo.png" autoPlay muted loop preload="auto" className={styles.full_screen__video}>
        <source type="video/mp4" src="/video/intro.webm" />
      </video>
    </div>

  );
}
