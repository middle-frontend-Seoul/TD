import React, { FC, useState } from 'react';

import { leaderboardApi } from 'api/leaderboard-api';
import { authApi } from 'api/auth-api';
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

  function handleLogout() {
    authApi.logout().then(({ data, error }) => console.log(data, error));
  }

  return (
    <div>
      <h1>PageStatistics</h1>
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
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export { PageStatistics };
export default PageStatistics;
