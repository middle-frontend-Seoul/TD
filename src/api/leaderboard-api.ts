import { http } from 'network/http';
import { Leaderboard } from './codecs';

export const leaderboardApi = {
  getAllLeaderboards: async (
    data: LeaderboardRequestInfo
  ): Promise<ApiResponse<LeaderboardInfo[]>> => {
    const { response, error } = await http.post<LeaderboardDto[]>(
      '/leaderboard/all',
      Leaderboard.toLeaderboardRequestDto(data)
    );
    return {
      data:
        response && (response.data || []).map(Leaderboard.fromLeaderboardDto),
      error,
    };
  },
};
