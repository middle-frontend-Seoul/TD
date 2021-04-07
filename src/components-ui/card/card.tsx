import React, { FC } from 'react';

import './card.scss';

export interface ICardProps {
  src: string;
  price?: number;
  text?: string;
  onClick?: (data?: unknown) => void;
  onKeyDown?: (data?: unknown) => void;
}

export const Card: FC<ICardProps> = ({
  src,
  text,
  price,
  onClick,
  onKeyDown,
}) => {
  return (
    <div className="card" role="none" onClick={onClick} onKeyDown={onKeyDown}>
      <div className="card__image">
        <img src={src} alt={text} />
      </div>
      <div className="card__text">{text}</div>
      {price && <div className="card__text">{price} B</div>}
    </div>
  );
};
