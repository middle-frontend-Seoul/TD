import { httpPost } from 'network/http';
import { Leaderboard } from './codecs';

export const leaderboardApi = {
  getAllLeaderboards: async (
    data: LeaderboardRequestInfo
  ): Promise<ApiResponse<LeaderboardInfo[], LeaderboardDto[]>> => {
    const { response, error } = await httpPost<LeaderboardDto[]>(
      '/leaderboard/all',
      Leaderboard.encodeLeaderboardRequest(data)
    );
    if (response) {
      return {
        data: (response.data || []).map(Leaderboard.decodeLeaderboard),
      };
    }
    return { error };
  },
};
