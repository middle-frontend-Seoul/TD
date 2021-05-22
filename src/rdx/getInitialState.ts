import { RouterState } from 'connected-react-router';
import { initialState as auth } from 'rdx/slices/auth-slice';
import { initialState as authForum } from 'rdx/slices/auth-forum-slice';
import { initialState as leaderboard } from 'rdx/slices/leaderboard-slice';
import { initialState as user } from 'rdx/slices/user-slice';
import { initialState as forum } from 'rdx/slices/forum-slice';

export const getInitialState = (pathname = '/'): RootState => {
  return {
    auth,
    authForum,
    leaderboard,
    user,
    forum,
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP',
    } as RouterState,
  };
};
