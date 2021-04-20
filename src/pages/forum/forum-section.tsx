import React, { FC, useEffect, useCallback } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Modal } from 'components-ui/modal';
import { Loading } from 'components-ui/loading';
import { ThemeForm } from 'components/forum/theme-form';
import { Table, TableColumn } from 'components-ui/table';
import { FORUM, FORUM_DETAILS } from 'core/url';

import { useUrlParams } from 'hooks/use-url-params';
import { useUrlNextPage } from 'hooks/use-url-next-page';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { getSubThemes, create, setOpen } from 'redux/slices/forum-slice';

import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '65%',
    title: 'Раздел: Правила игры в Кинг',
    render: (val, row) => (
      <RouteLink
        className="forum-link"
        to={FORUM_DETAILS.replace(':id', row.id)}
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
  },
  {
    key: 'view',
    dataIndex: 'view',
    width: '20%',
    title: '',
  },
];

const PageForumSection: FC = () => {
  const params = useUrlParams();
  const nextPage = useUrlNextPage();

  const isOpenModal = useAppSelector((state) => state.forum.isOpen);
  const isLoading = useAppSelector((state) => state.forum.isLoadingSubThemes);
  const isLoadingCreate = useAppSelector((state) => state.forum.createRequest);

  const data = useAppSelector((state) => state.forum.subThemes);
  const page = params.get('page') || '1';
  const pages = useAppSelector((state) => state.forum.pages);
  const currentPage = useAppSelector((state) => state.forum.currentPage);

  const actionGetThemes = useBoundAction(getSubThemes);
  const actionThemeCreate = useBoundAction(create);
  const actionSetOpen = useBoundAction(setOpen);

  const handleNextPage = useCallback(() => {
    const newPage = currentPage + 1;
    nextPage(newPage);
  }, [nextPage, currentPage]);

  const handlePrevPage = useCallback(() => {
    const newPage = currentPage - 1;
    nextPage(newPage);
  }, [nextPage, currentPage]);

  const handleOnOpen = useCallback(() => {
    actionSetOpen(true);
  }, [actionSetOpen]);

  const handleOnClose = useCallback(() => {
    actionSetOpen(false);
  }, [actionSetOpen]);

  useEffect(() => {
    actionGetThemes(page);
  }, [page, actionGetThemes]);

  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        <div className="forum">
          <div className="forum-body">
            <Modal isOpen={isOpenModal} onClose={handleOnClose}>
              <ThemeForm
                loading={isLoadingCreate}
                onSubmit={actionThemeCreate}
              />
            </Modal>
            {isLoading ? (
              <Loading className="forum-loading" />
            ) : (
              <Table
                className="forum-table"
                columns={columns}
                dataSource={data}
                pagination={{
                  page: currentPage,
                  pages,
                  handlePrev: handlePrevPage,
                  handleNext: handleNextPage,
                }}
              />
            )}
          </div>
          <div className="forum-footer">
            <Button
              type="button"
              use="primary"
              size="xsmall"
              onClick={handleOnOpen}
            >
              Новая тема
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link to={FORUM} type="button">
          Назад
        </Link>
      </Space>
    </Space>
  );
};

export { PageForumSection };
export default PageForumSection;
