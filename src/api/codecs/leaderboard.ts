export function fromLeaderboardDto(dto: LeaderboardDto): LeaderboardInfo {
  return {
    id: dto.data.id,
    login: dto.data.login,
    name: dto.data.name,
    level: dto.data.level,
    score: dto.data.score,
  };
}

export function toLeaderboardRequestDto(
  info: LeaderboardRequestInfo
): LeaderboardRequestDto {
  return {
    ratingFieldName: info.ratingFieldName,
    cursor: info.cursor,
    limit: info.limit,
  };
}

export function toLeaderboardItemRequestDto(
  info: LeaderboardItemRequestInfo
): LeaderboardItemRequestDto {
  return {
    data: info.data,
    ratingFieldName: info.ratingFieldName,
  };
}
