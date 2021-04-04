import React, { FC } from 'react';

import './stats.scss';

export interface IStatsProps {
  names: string[];
  values: (string | number)[];
}

export const Stats: FC<IStatsProps> = ({ names, values }) => {
  return (
    <ul className="stats">
      {names.map((name, i) => (
        <li key={name} className="stats-item">
          <span>{name}:</span>
          {values[i] || ''}
        </li>
      ))}
    </ul>
  );
};
