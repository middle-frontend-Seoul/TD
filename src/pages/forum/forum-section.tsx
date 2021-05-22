import React, { FC, useEffect, useState, useCallback } from 'react';
import { Link as RouteLink, useParams } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Modal } from 'components-ui/modal';
import { Loading } from 'components-ui/loading';
import { ThemeForm } from 'components/forum/theme-form';
import { Table, TableColumn } from 'components-ui/table';
import { URL } from 'core/url';

import { useUrlParams } from 'hooks/use-url-params';
import { useUrlNextPage } from 'hooks/use-url-next-page';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getThemes, createTheme } from 'rdx/slices/forum-slice';

import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<ThemeInfo>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '65%',
    title: 'Раздел: Правила игры в Кинг',
    render: (val, row) => (
      <RouteLink
        className="forum-link"
        to={URL.FORUM_DETAILS.path.replace(':themeId', String(row.id))}
      >
        {val}
      </RouteLink>
    ),
  },
  {
    key: 'messages',
    dataIndex: 'messages',
    width: '15%',
    title: '',
    render: (value) => `Сообщений: ${value ? value.length : 0}`,
  },
  {
    key: 'viewCount',
    dataIndex: 'viewCount',
    width: '20%',
    title: '',
    render: (value) => `Просмотров: ${value}`,
  },
];

const PageForumSection: FC = () => {
  const { forumId } = useParams<{ forumId: string }>();
  const searchParams = useUrlParams();
  const nextPage = useUrlNextPage();

  const [isModalOpen, setModalOpen] = useState(false);

  const loadingStatus = useAppSelector((state) => state.forum.loadingStatus);
  const mutatingStatus = useAppSelector((state) => state.forum.mutatingStatus);

  const data = useAppSelector((state) => state.forum.themes?.data || []);
  const pages = useAppSelector(
    (state) => state.forum.themes?.meta.lastPage || 0
  );
  const page = Number(searchParams.get('page') || '1');

  const actionGetThemes = useBoundAction(getThemes);
  const actionThemeCreate = useBoundAction(createTheme);

  useEffect(() => {
    actionGetThemes(Number(forumId), page);
  }, [page, actionGetThemes, forumId]);

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

  const handleCreateTheme = useCallback(
    async (values: Omit<ThemeRequestInfo, 'forumId'>) => {
      try {
        await actionThemeCreate({
          ...values,
          forumId: Number(forumId),
        });
        setModalOpen(false);
        actionGetThemes(Number(forumId), page);
      } catch (error) {
        console.error('could not create theme', error); // eslint-disable-line
      }
    },
    [actionThemeCreate, actionGetThemes, forumId, page]
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
        <ThemeForm
          loading={mutatingStatus === 'pending'}
          onSubmit={handleCreateTheme}
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
        <Link to={URL.FORUM.path} type="button">
          Назад
        </Link>
      </Space>
    </Space>
  );
};

export { PageForumSection };
export default PageForumSection;
