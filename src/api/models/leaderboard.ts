export type RatingFieldName = 'id' | 'login' | 'score' | 'level' | 'name';

export interface LeaderboardDto {
  data: {
    id?: number;
    login?: string;
    name?: string;
    level?: number;
    score: number;
  };
}

export class LeaderboardInfo {
  id?: number;
  login?: string;
  name?: string;
  level?: number;
  score: number;

  constructor(dto: LeaderboardDto) {
    this.id = dto.data.id;
    this.login = dto.data.login;
    this.name = dto.data.name;
    this.level = dto.data.level;
    this.score = dto.data.score;
  }
}

export interface LeaderboardRequestInfo {
  ratingFieldName: RatingFieldName;
  cursor: number;
  limit: number;
}

export class LeaderboardRequestDto {
  ratingFieldName: RatingFieldName;
  cursor: number;
  limit: number;

  constructor(info: LeaderboardRequestInfo) {
    this.ratingFieldName = info.ratingFieldName;
    this.cursor = info.cursor;
    this.limit = info.limit;
  }
}
