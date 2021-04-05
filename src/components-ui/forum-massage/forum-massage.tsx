import React, { FC } from 'react';
import moment from 'moment';

import './forum-message.scss';

export interface IForumMassageProps {
  src?: string;
  date: Date;
  userName: string;
  message: string;
}

export const ForumMassage: FC<IForumMassageProps> = ({
  src,
  date,
  userName,
  message,
}) => {
  const strDate = moment(date).format('DD.MM.yyyy hh:mm');
  return (
    <div className="forum-message">
      <div className="forum-message__avatar">
        <div className="forum-message__image">
          {src && <img src={src} alt={userName} />}
        </div>
        <span className="forum-message__username">{userName}</span>
      </div>
      <div className="forum-message__content">
        <time>{strDate}</time>
        <div className="forum-message__message">{message}</div>
      </div>
    </div>
  );
};
