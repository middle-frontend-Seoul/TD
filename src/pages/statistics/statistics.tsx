import React, { FC, useState, useEffect } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Table, TableColumn } from 'components-ui/table';
import { HOME } from 'core/url';
import { DEFAULT_PAGE_SIZE } from 'constants/defaults';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getAllLeaderboards } from 'rdx/slices/leaderboard-slice';

import './statistics.scss';

const columns: TableColumn<LeaderboardInfo>[] = [
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login',
    width: '70%',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    align: 'right',
    width: '15%',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    align: 'right',
    width: '15%',
  },
];

const generateRowKey = (rowData: LeaderboardInfo) =>
  `${rowData.id}-${rowData.login}-${rowData.score}`;

const PageStatistics: FC = () => {
  const actionGetAllLeaderboards = useBoundAction(getAllLeaderboards);
  const allLeaderboards = useAppSelector((state) => state.leaderboard.data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    actionGetAllLeaderboards({
      ratingFieldName: 'score',
      cursor: (currentPage - 1) * DEFAULT_PAGE_SIZE,
      limit: DEFAULT_PAGE_SIZE,
    });
  }, [actionGetAllLeaderboards, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (allLeaderboards && allLeaderboards.length === DEFAULT_PAGE_SIZE) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Space type="vertical">
      <Block
        page="statistics"
        title="Таблица лидеров"
        type="flex"
        className="statistics-block"
      >
        <Space type="vertical">
          <Table<LeaderboardInfo>
            rowKey={generateRowKey}
            className="statistics-table"
            columns={columns}
            dataSource={allLeaderboards}
            pagination={{
              page: currentPage,
              handlePrev: handlePrevPage,
              handleNext: handleNextPage,
            }}
          />
        </Space>
      </Block>
      <Space type="horizontal" position="center">
        <Link type="button" to={HOME}>
          На главный экран
        </Link>
      </Space>
    </Space>
  );
};

export { PageStatistics };
export default PageStatistics;
