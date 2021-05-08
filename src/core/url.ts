export const URL: AppUrls = {
  HOME: { path: '/', protected: true },
  PLAY: { path: '/play', protected: true },
  SIGNIN: { path: '/auth/signin' },
  SIGNUP: { path: '/auth/signup' },
  PROFILE: { path: '/profile', protected: true },
  STATISTICS: { path: '/statistics', protected: true },
  FORUM: { path: '/forum', protected: true },
  FORUM_SECTION: { path: '/forum/:section', protected: true },
  FORUM_DETAILS: { path: '/forum/show/:id', protected: true },
};
