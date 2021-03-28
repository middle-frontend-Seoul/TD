import React, { FC, useState } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Title } from 'components-ui/title';
import { Space } from 'components-ui/space';
import { HOME } from 'core/url';
import { leaderboardApi } from 'api/leaderboard-api';
import { useMountEffect } from 'utils/hooks';

import './statistics.scss';

const PageStatistics: FC = () => {
  const [response, setResponse] = useState<ApiResponse<LeaderboardInfo[]>>({});

  useMountEffect(() => {
    leaderboardApi
      .getAllLeaderboards({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 10,
      })
      .then(setResponse);
  });

  return (
    <Space type="vertical">
      <Block page="statistics" type="flex" className="statistics-block">
        <Title>Таблица лидеров</Title>
        <Space type="vertical">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Login</th>
                <th>Level</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {response.data &&
                response.data.map((item) => (
                  <tr key={`${item.id}-${item.login}-${item.score}`}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.login}</td>
                    <td>{item.level}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
