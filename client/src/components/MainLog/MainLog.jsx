import React from 'react';
import Navigation from '../navigation/Navigation';
import style from './Main.module.css';

export default function MainLog() {
  return (
    <div>
      <Navigation />
      <div className={style.body}> 12345 </div>
    </div>
  );
}
