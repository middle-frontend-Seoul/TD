import React, { FC, useEffect, useState } from 'react';

import { LeaderboardInfo } from 'api/models/leaderboard';
import { leaderboardApi } from 'api/leaderboard-api';
import { authApi } from 'api/auth-api';

import './statistics.scss';

const PageStatistics: FC = () => {
  const [fetchedData, setFetchedData] = useState<LeaderboardInfo[]>([]);

  useEffect(() => {
    leaderboardApi
      .getAllLeaderboards({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 10,
      })
      .then(({ data }) => {
        if (data) {
          setFetchedData(data);
        }
      });
  }, []);

  function handleLogout() {
    authApi.logout().then(({ data }) => console.log(data));
  }

  return (
    <div>
      <h1>PageStatistics</h1>
      <table className="table">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Login</th>
          <th>Level</th>
          <th>Score</th>
        </tr>
        {fetchedData.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.login}</td>
            <td>{item.level}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </table>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export { PageStatistics };
export default PageStatistics;
