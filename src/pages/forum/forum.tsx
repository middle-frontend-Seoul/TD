import React, { FC, useEffect, useCallback } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { Link } from 'components-ui/link';
import { Button } from 'components-ui/button';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Loading } from 'components-ui/loading';
import { Table, TableColumn } from 'components-ui/table';
import { HOME, FORUM_SECTION } from 'core/url';

import { useUrlParams } from 'hooks/use-url-params';
import { useUrlNextPage } from 'hooks/use-url-next-page';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { getThemes } from 'redux/slices/forum-slice';

import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: TableColumn<any>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: '70%',
    title: 'Раздел',
    render: (val, row) => (
      <RouteLink
        className="forum-link"
        to={FORUM_SECTION.replace(':section', row.id)}
      >
        {val}
      </RouteLink>
    ),
  },
  {
    key: 'themeCount',
    dataIndex: 'themeCount',
    width: '15%',
    title: 'Темы',
  },
  {
    key: 'messageCount',
    dataIndex: 'messageCount',
    width: '15%',
    title: 'Сообщения',
  },
];

const PageForum: FC = () => {
  const params = useUrlParams();
  const nextPage = useUrlNextPage();

  const isLoading = useAppSelector((state) => state.forum.isLoadingThemes);
  const data = useAppSelector((state) => state.forum.themes);
  const page = params.get('page') || '1';
  const pages = useAppSelector((state) => state.forum.pages);
  const currentPage = useAppSelector((state) => state.forum.currentPage);

  const actionGetThemes = useBoundAction(getThemes);

  const handleNextPage = useCallback(() => {
    const newPage = currentPage + 1;
    nextPage(newPage);
  }, [nextPage, currentPage]);

  const handlePrevPage = useCallback(() => {
    const newPage = currentPage - 1;
    nextPage(newPage);
  }, [nextPage, currentPage]);

  useEffect(() => {
    actionGetThemes(page);
  }, [page, actionGetThemes]);

  return (
    <Space type="vertical">
      <Block title="Форум" page="forum">
        <div className="forum">
          <div className="forum-body">
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
            <Button type="button" use="primary" size="xsmall">
              Новая тема
            </Button>
          </div>
        </div>
      </Block>
      <Space type="horizontal" position="center">
        <Link to={HOME} type="button">
          На главный экран
        </Link>
      </Space>
    </Space>
  );
};

export { PageForum };
export default PageForum;
