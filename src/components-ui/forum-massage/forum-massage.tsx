import React, { FC } from 'react';
import moment from 'moment';
import cn from 'classnames';

import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { toggleMessageLike } from 'rdx/slices/forum-slice';

import './forum-message.scss';

export interface IForumMassageProps {
  id: number;
  src?: string | null;
  date: Date;
  userName: string;
  message: string;
  likesCount: number;
}

export const ForumMassage: FC<IForumMassageProps> = ({
  id,
  src,
  date,
  userName,
  message,
  likesCount,
}) => {
  const actionMessageToggleLike = useBoundAction(toggleMessageLike);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const isLikeDisabled = currentUser?.login === userName;

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
      <div className="forum-message__likes">
        <span
          className={cn('forum-message__likes-thumb', {
            'forum-message__likes-thumb_disabled': isLikeDisabled,
          })}
          onKeyDown={
            isLikeDisabled ? undefined : () => actionMessageToggleLike(id)
          }
          role="button"
          tabIndex={0}
          onClick={
            isLikeDisabled ? undefined : () => actionMessageToggleLike(id)
          }
        >
          &#128077;
        </span>
        {likesCount}
      </div>
    </div>
  );
};
