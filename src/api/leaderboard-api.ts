import { httpPost } from 'network/http';
import { Leaderboard } from './models';

export const leaderboardApi = {
  getAllLeaderboards: async (
    data: Leaderboard.LeaderboardRequestInfo
  ): Promise<ApiResponse<Leaderboard.LeaderboardInfo[], Leaderboard.LeaderboardDto[]>> => { // eslint-disable-line prettier/prettier
    const { response, error } = await httpPost<Leaderboard.LeaderboardDto[]>(
      '/leaderboard/all',
      new Leaderboard.LeaderboardRequestDto(data)
    );
    if (response) {
      return {
        data: (response.data || []).map(
          (dto) => new Leaderboard.LeaderboardInfo(dto)
        ),
      };
    }
    return { error };
  },
};
