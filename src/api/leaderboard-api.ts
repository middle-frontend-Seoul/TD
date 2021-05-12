import { http } from 'network/http';
import { Leaderboard } from 'api/codecs';

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

  addLeaderboardItem: async (
    data: LeaderboardItemRequestInfo
  ): Promise<ApiResponse<string>> => {
    const { response, error } = await http.post<string>(
      '/leaderboard',
      Leaderboard.toLeaderboardItemRequestDto(data)
    );
    return {
      data: response && response.data,
      error,
    };
  },
};
