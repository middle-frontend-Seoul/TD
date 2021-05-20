import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Modal } from 'components-ui/modal';
import { Loading } from 'components-ui/loading';
import { MessageForm } from 'components/forum/message-form';
import { ForumMassage } from 'components-ui/forum-massage';
import { URL } from 'core/url';

import { useAppSelector, useBoundAction } from 'rdx/hooks';
import {
  getTheme,
  createMessage,
  getAllMessages,
} from 'rdx/slices/forum-slice';

import './forum-details.scss';

const PageForumDetails: FC = () => {
  const { themeId } = useParams<{ themeId: string }>();

  const [isModalOpen, setModalOpen] = useState(false);

  const loadingStatus = useAppSelector((state) => state.forum.loadingStatus);
  const mutatingStatus = useAppSelector((state) => state.forum.mutatingStatus);

  const theme = useAppSelector((state) => state.forum.theme);
  const messages = useAppSelector((state) => state.forum.allMessages);

  const actionGetTheme = useBoundAction(getTheme);
  const actionGetAllMessages = useBoundAction(getAllMessages);
  const actionMessageCreate = useBoundAction(createMessage);

  useEffect(() => {
    if (themeId) {
      actionGetTheme(Number(themeId));
      actionGetAllMessages(Number(themeId));
    }
  }, [themeId, actionGetTheme, actionGetAllMessages]);

  const handleCreateMessage = useCallback(
    async (values: Omit<MessageRequestInfo, 'forumId' | 'themeId'>) => {
      if (!theme) {
        return;
      }
      try {
        await actionMessageCreate({
          ...values,
          forumId: theme.forumId,
          themeId: theme.id,
        });
        setModalOpen(false);
        actionGetAllMessages(theme.id);
      } catch (error) {
        console.error('could not create message', error); // eslint-disable-line
      }
    },
    [actionMessageCreate, actionGetAllMessages, theme]
  );

  // Render
  // ---------------

  const renderBody = () => {
    switch (loadingStatus) {
      case 'pending':
        return <Loading className="forum-loading" />;
      case 'failure':
        return 'Возникла ошибка';
      case 'success':
        return (messages || []).map((msg: MessageInfo) => (
          <ForumMassage
            key={msg.id}
            date={msg.createdAt}
            userName={msg.user.username}
            message={msg.content}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <Space type="vertical">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <MessageForm
          loading={mutatingStatus === 'pending'}
          onSubmit={handleCreateMessage}
        />
      </Modal>
      <Block title="Форум" page="forum">
        <div className="forum-detail">
          <div className="forum-detail__title">Тема: {theme?.name || '-'}</div>
          <div className="forum-detail__message">{renderBody()}</div>
          <div className="forum-detail__button">
            <Button
              use="primary"
              size="small"
              onClick={() => setModalOpen(true)}
            >
              Добавить сообщение
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link
          to={
            theme
              ? URL.FORUM_SECTION.path.replace(
                  ':forumId',
                  String(theme.forumId)
                )
              : URL.FORUM.path
          }
          type="button"
        >
          Назад
        </Link>
      </Space>
    </Space>
  );
};

export { PageForumDetails };
export default PageForumDetails;
