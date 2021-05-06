import React, { FC } from 'react';

import './stats.scss';

export interface IStatsProps {
  fps: number;
  score: number;
  wave: number;
  lives: number;
}

export const Stats: FC<IStatsProps> = ({ fps, score, wave, lives }) => {
  return (
    <ul className="stats">
      <li className="stats-item">
        <span>FPS:</span>
        {fps}
      </li>
      <li className="stats-item">
        <span>Волна:</span>
        {wave}
      </li>
      <li className="stats-item">
        <span>Жизни:</span>
        {lives}
      </li>
      <li className="stats-item">
        <span>Ресурсы:</span>
        {score}
      </li>
    </ul>
  );
};
