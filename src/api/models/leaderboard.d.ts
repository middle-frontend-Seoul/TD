type RatingFieldName = 'id' | 'login' | 'score' | 'level' | 'name';

type LeaderboardDto = {
  data: {
    id?: number;
    login?: string;
    name?: string;
    level?: number;
    score: number;
  };
}
type LeaderboardInfo = {
  id?: number;
  login?: string;
  name?: string;
  level?: number;
  score: number;
};

type LeaderboardRequestDto = {
  ratingFieldName: RatingFieldName;
  cursor: number;
  limit: number;
}
type LeaderboardRequestInfo = {
  ratingFieldName: RatingFieldName;
  cursor: number;
  limit: number;
}
