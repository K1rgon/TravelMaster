import React from 'react';
import Video from '../Video/Video';
import style from './Main.module.css';

export default function MainLog() {
  return (
    <div>
      <Video />
      <div className={style.body}> 12345 </div>
    </div>
  );
}
