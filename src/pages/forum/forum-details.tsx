import React, { FC } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { ForumMassage } from 'components-ui/forum-massage';
import { FORUM_SECTION } from 'core/url';

import './forum-details.scss';

// временный массив
const message = {
  date: new Date(),
  userName: 'Игрок 1',
  message:
    'Текст сообщения на форуме Можно переносить строку. Писать длинные сообщения. вставлять смайлики :)',
};
const messages = Array(5).fill(message);
const PageForumDetails: FC = () => {
  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        <div className="forum-detail">
          <div className="forum-detail__title">Тема: Основные правила</div>
          <div className="forum-detail__message">
            {messages.map((msg) => (
              <ForumMassage
                date={msg.date}
                userName={msg.userName}
                message={msg.message}
              />
            ))}
          </div>
          <div className="forum-detail__button">
            <Button use="primary" size="small">
              Добавить сообщение
            </Button>
          </div>
        </div>
      </Block>
      <Link to={FORUM_SECTION} type="button">
        Назад
      </Link>
    </Space>
  );
};

export { PageForumDetails };
export default PageForumDetails;
