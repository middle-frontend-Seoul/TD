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

type LeaderboardItemRequestDto = {
  data: Partial<{ [key in RatingFieldName]: number | string }>;
  ratingFieldName: RatingFieldName;
}
type LeaderboardItemRequestInfo = {
  data: Partial<{ [key in RatingFieldName]: number | string }>;
  ratingFieldName: RatingFieldName;
}
