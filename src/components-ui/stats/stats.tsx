import React, { FC } from 'react';

import './stats.scss';

export interface IStatsProps {
  score: number;
  wave: number;
  lives: number;
}

export const Stats: FC<IStatsProps> = ({ score, wave, lives }) => {
  return (
    <ul className="stats">
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
