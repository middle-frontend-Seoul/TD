import React, { FC, useEffect, useState, useCallback } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Modal } from 'components-ui/modal';
import { Loading } from 'components-ui/loading';
import { Table, TableColumn } from 'components-ui/table';
import { ForumForm } from 'components/forum/forum-form';
import { URL } from 'core/url';

import { useUrlParams } from 'hooks/use-url-params';
import { useUrlNextPage } from 'hooks/use-url-next-page';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getForums, createForum } from 'rdx/slices/forum-slice';

import './style.scss';

const columns: TableColumn<ForumInfo>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '70%',
    title: 'Раздел',
    render: (val, row) => (
      <RouteLink
        className="forum-link"
        to={URL.FORUM_SECTION.path.replace(':forumId', String(row.id))}
      >
        {val}
      </RouteLink>
    ),
  },
  {
    key: 'themes',
    dataIndex: 'themes',
    width: '15%',
    title: 'Темы',
    render: (value) => (value ? value.length : 0),
  },
  {
    key: 'messages',
    dataIndex: 'messages',
    width: '15%',
    title: 'Сообщения',
    render: (value) => (value ? value.length : 0),
  },
];

const PageForum: FC = () => {
  const searchParams = useUrlParams();
  const nextPage = useUrlNextPage();

  const [isModalOpen, setModalOpen] = useState(false);

  const loadingStatus = useAppSelector((state) => state.forum.loadingStatus);
  const mutatingStatus = useAppSelector((state) => state.forum.mutatingStatus);

  const data = useAppSelector((state) => state.forum.forums?.data || []);
  const pages = useAppSelector(
    (state) => state.forum.forums?.meta.lastPage || 0
  );
  const page = Number(searchParams.get('page') || '1');

  const actionGetForums = useBoundAction(getForums);
  const actionForumCreate = useBoundAction(createForum);
  useEffect(() => {
    actionGetForums(page);
  }, [page, actionGetForums]);

  const handleNextPage = useCallback(() => {
    if (page < pages) {
      const newPage = page + 1;
      nextPage(newPage);
    }
  }, [nextPage, page, pages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      const newPage = page - 1;
      nextPage(newPage);
    }
  }, [nextPage, page]);

  const handleCreateForum = useCallback(
    async (values: ForumRequestInfo) => {
      try {
        await actionForumCreate(values);
        setModalOpen(false);
        actionGetForums(page);
      } catch (error) {
        console.error('could not create forum', error); // eslint-disable-line
      }
    },
    [actionForumCreate, actionGetForums, page]
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
        return (
          <Table
            className="forum-table"
            columns={columns}
            dataSource={data}
            pagination={{
              page,
              pages,
              handlePrev: handlePrevPage,
              handleNext: handleNextPage,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Space type="vertical">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ForumForm
          loading={mutatingStatus === 'pending'}
          onSubmit={handleCreateForum}
        />
      </Modal>
      <Block title="Форум" page="forum">
        <div className="forum">
          <div className="forum-body">{renderBody()}</div>
          <div className="forum-footer">
            <Button
              type="button"
              use="primary"
              size="xsmall"
              onClick={() => setModalOpen(true)}
            >
              Новая тема
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link to={URL.HOME.path} type="button">
          На главный экран
        </Link>
      </Space>
    </Space>
  );
};

export { PageForum };
export default PageForum;
