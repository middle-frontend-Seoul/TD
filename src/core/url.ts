import { DEFAULT_PAGE_SIZE } from 'constants/defaults';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import { getAllLeaderboards } from 'rdx/slices/leaderboard-slice';
import {
  getAllForums,
  getAllThemes,
  getAllMessages,
} from 'rdx/slices/forum-slice';

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
    exact: true,
  },
  SIGNUP: {
    path: '/auth/signup',
    exact: true,
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
  SIGNIN_FORUM: {
    path: '/forum/auth/signin',
    exact: true,
  },
  SIGNUP_FORUM: {
    path: '/forum/auth/signup',
    exact: true,
  },
  FORUM_DETAILS: {
    path: '/forum/theme/:themeId',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch, match }) =>
      getAllMessages(Number(match.params.themeId))(dispatch),
  },
  FORUM_SECTION: {
    path: '/forum/:forumId',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch, match }) =>
      getAllThemes(Number(match.params.forumId))(dispatch), // TODO - тоже нужен match
  },
  FORUM: {
    path: '/forum',
    protected: true,
    exact: true,
    fetchData: async ({ dispatch }) => getAllForums()(dispatch),
  },
};
