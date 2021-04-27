import React, { FC, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Modal } from 'components-ui/modal';
import { Loading } from 'components-ui/loading';
import { MessageForm } from 'components/forum/message-form';
import { ForumMassage } from 'components-ui/forum-massage';
import { FORUM_SECTION } from 'core/url';

import { useAppSelector, useBoundAction } from 'redux/hooks';
import { getMessages, create, setOpen } from 'redux/slices/forum-slice';

import './forum-details.scss';

const PageForumDetails: FC = () => {
  const params = useParams<{ id: string }>();

  const isOpenModal = useAppSelector((state) => state.forum.isOpen);
  const status = useAppSelector((state) => state.forum.messagesStatus);
  const isLoadingCreate = useAppSelector((state) => state.forum.createRequest);

  const messages = useAppSelector((state) => state.forum.messages);
  const title = useAppSelector((state) => state.forum.title);
  const actionGetMessages = useBoundAction(getMessages);
  const actionMessageCreate = useBoundAction(create);
  const actionSetOpen = useBoundAction(setOpen);

  const handleOnOpen = useCallback(() => {
    actionSetOpen(true);
  }, [actionSetOpen]);

  const handleOnClose = useCallback(() => {
    actionSetOpen(false);
  }, [actionSetOpen]);

  useEffect(() => {
    if (params.id) {
      actionGetMessages(params.id);
    }
  }, [params.id, actionGetMessages]);

  // Render
  // ---------------

  const renderBody = () => {
    switch (status) {
      case 'pending':
        return <Loading className="forum-loading" />;
      case 'failure':
        return 'Возникла ошибка';
      case 'success':
        return messages.map((msg) => (
          <ForumMassage
            date={msg.date}
            userName={msg.userName}
            message={msg.message}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <Space type="vertical">
      <Modal isOpen={isOpenModal} onClose={handleOnClose} node={document.body}>
        <MessageForm loading={isLoadingCreate} onSubmit={actionMessageCreate} />
      </Modal>
      <Block title="Форум" page="forum">
        <div className="forum-detail">
          <div className="forum-detail__title">Тема: {title}</div>
          <div className="forum-detail__message">{renderBody()}</div>
          <div className="forum-detail__button">
            <Button use="primary" size="small" onClick={handleOnOpen}>
              Добавить сообщение
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link to={FORUM_SECTION} type="button">
          Назад
        </Link>
      </Space>
    </Space>
  );
};

export { PageForumDetails };
export default PageForumDetails;
