import React, { FC, useState, useEffect } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { Table, TableColumn } from 'components-ui/table';
import { HOME } from 'core/url';
import { leaderboardApi } from 'api/leaderboard-api';
import { DEFAULT_PAGE_SIZE } from 'constants/defaults';

import './statistics.scss';

const columns: TableColumn[] = [
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
  const [response, setResponse] = useState<ApiResponse<LeaderboardInfo[]>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // есть ли смысл выделять getAllLeaderboard вот так и потом вызывать его в useEffect-е?
  // const getAllLeaderboard = useCallback(() => {
  //   leaderboardApi
  //     .getAllLeaderboards({
  //       ratingFieldName: 'score',
  //       cursor: (currentPage - 1) * DEFAULT_PAGE_SIZE,
  //       limit: DEFAULT_PAGE_SIZE,
  //     })
  //     .then(setResponse);
  // }, [currentPage]);

  useEffect(() => {
    leaderboardApi
      .getAllLeaderboards({
        ratingFieldName: 'score',
        cursor: (currentPage - 1) * DEFAULT_PAGE_SIZE,
        limit: DEFAULT_PAGE_SIZE,
      })
      .then(setResponse);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (response.data && response.data.length === DEFAULT_PAGE_SIZE) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Space type="vertical">
      <Block page="statistics" type="flex" className="statistics-block">
        <Title>Таблица лидеров</Title>
        <Space type="vertical">
          <Table
            rowKey={generateRowKey}
            className="statistics-table"
            columns={columns}
            dataSource={response.data}
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
