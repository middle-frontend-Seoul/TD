import { DEFAULT_PAGE_SIZE } from 'constants/defaults';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import { getAllLeaderboards } from 'rdx/slices/leaderboard-slice';
import { getThemes, getSubThemes, getMessages } from 'rdx/slices/forum-slice';

export const URL: AppUrls = {
  HOME: {
    path: '/',
    exact: true,
    protected: true,
  },
  PLAY: {
    path: '/play',
    protected: true,
  },
  SIGNIN: {
    path: '/auth/signin',
  },
  SIGNUP: {
    path: '/auth/signup',
  },
  PROFILE: {
    path: '/profile',
    protected: true,
    fetchData: async ({ dispatch }) => getCurrentUser()(dispatch),
  },
  STATISTICS: {
    path: '/statistics',
    protected: true,
    fetchData: async ({ dispatch }) =>
      getAllLeaderboards({
        ratingFieldName: 'score',
        cursor: 0,
        limit: DEFAULT_PAGE_SIZE,
      })(dispatch),
  },
  FORUM_DETAILS: {
    path: '/forum/show/:id',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch, match }) =>
      getMessages(match.params.id)(dispatch),
  },
  FORUM_SECTION: {
    path: '/forum/:section',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch, searchParams }) =>
      getSubThemes(searchParams.get('page') || '1')(dispatch), // TODO - тоже нужен match
  },
  FORUM: {
    path: '/forum',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch, searchParams }) =>
      getThemes(searchParams.get('page') || '1')(dispatch),
  },
};
