export function decodeLeaderboard(dto: LeaderboardDto): LeaderboardInfo {
  return {
    id: dto.data.id,
    login: dto.data.login,
    name: dto.data.name,
    level: dto.data.level,
    score: dto.data.score,
  };
}

export function encodeLeaderboardRequest(
  info: LeaderboardRequestInfo
): LeaderboardRequestDto {
  return {
    ratingFieldName: info.ratingFieldName,
    cursor: info.cursor,
    limit: info.limit,
  };
}