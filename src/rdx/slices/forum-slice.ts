import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { formatError, formatHttpError } from 'utils/format';
import { forumApi } from 'api/forum-api';

export type ForumState = {
  currentPage: number;
  title: string;
  pages: number;

  allForums?: ForumInfo[];
  allThemes?: ThemeInfo[];
  theme?: ThemeInfo;
  allMessages?: MessageInfo[];
  loadingStatus: StateStatus;
  mutatingStatus: StateStatus;

  error?: SerializedError;
};

export const initialState: ForumState = {
  loadingStatus: 'idle',
  mutatingStatus: 'idle',
  title: '',
  currentPage: 1,
  pages: 1,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setPage: (
      state,
      { payload }: PayloadAction<Pick<ForumState, 'currentPage' | 'pages'>>
    ) => {
      state.currentPage = payload.currentPage || 1;
      state.pages = payload.pages || 1;
    },

    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },

    getAllForumsPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getAllForumsSuccess: (
      state,
      { payload }: PayloadAction<ForumInfo[] | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.allForums = payload;
    },
    getAllForumsFailure: (
      state,
      { payload }: PayloadAction<SerializedError>
    ) => {
      state.loadingStatus = 'failure';
      state.error = payload;
    },

    createForumPending: (state) => {
      state.mutatingStatus = 'pending';
    },
    createForumSuccess: (state) => {
      state.mutatingStatus = 'success';
    },
    createForumFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingStatus = 'failure';
      state.error = action.payload;
    },

    getAllThemesPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getAllThemesSuccess: (
      state,
      { payload }: PayloadAction<ThemeInfo[] | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.allThemes = payload;
    },
    getAllThemesFailure: (
      state,
      { payload }: PayloadAction<SerializedError>
    ) => {
      state.loadingStatus = 'failure';
      state.error = payload;
    },

    createThemePending: (state) => {
      state.mutatingStatus = 'pending';
    },
    createThemeSuccess: (state) => {
      state.mutatingStatus = 'success';
    },
    createThemeFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingStatus = 'failure';
      state.error = action.payload;
    },

    updateThemeViewCountPending: (state) => {
      state.mutatingStatus = 'pending';
    },
    updateThemeViewCountSuccess: (state) => {
      state.mutatingStatus = 'success';
    },
    updateThemeViewCountFailure: (
      state,
      action: PayloadAction<SerializedError>
    ) => {
      state.mutatingStatus = 'failure';
      state.error = action.payload;
    },

    getThemePending: (state) => {
      state.loadingStatus = 'pending';
      state.error = undefined;
    },
    getThemeSuccess: (state, action: PayloadAction<ThemeInfo | undefined>) => {
      state.loadingStatus = 'success';
      state.theme = action.payload;
    },
    getThemeFailure: (state, action: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error = action.payload;
    },

    getAllMessagesPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getAllMessagesSuccess: (
      state,
      { payload }: PayloadAction<MessageInfo[] | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.allMessages = payload;
    },
    getAllMessagesFailure: (
      state,
      { payload }: PayloadAction<SerializedError>
    ) => {
      state.loadingStatus = 'failure';
      state.error = payload;
    },

    createMessagePending: (state) => {
      state.mutatingStatus = 'pending';
    },
    createMessageSuccess: (state) => {
      state.mutatingStatus = 'success';
    },
    createMessageFailure: (state, action: PayloadAction<SerializedError>) => {
      state.mutatingStatus = 'failure';
      state.error = action.payload;
    },
  },
});

export function getAllForums() {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getAllForumsPending());
    try {
      const { data, error } = await forumApi.getAllForums();
      if (!error) {
        dispatch(forumSlice.actions.getAllForumsSuccess(data));
      } else {
        dispatch(
          forumSlice.actions.getAllForumsFailure(formatHttpError(error))
        );
      }
    } catch (error) {
      dispatch(forumSlice.actions.getAllForumsFailure(formatError(error)));
    }
  };
}

export function createForum(arg: ForumRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.createForumPending());
    try {
      const { error } = await forumApi.createForum(arg);
      if (!error) {
        dispatch(forumSlice.actions.createForumSuccess());
      } else {
        dispatch(forumSlice.actions.createForumFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.createForumFailure(formatError(error)));
    }
  };
}

export function getAllThemes(forumId?: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getAllThemesPending());
    try {
      const { data, error } = await forumApi.getAllThemes(forumId);
      if (!error) {
        dispatch(forumSlice.actions.getAllThemesSuccess(data));
      } else {
        dispatch(
          forumSlice.actions.getAllThemesFailure(formatHttpError(error))
        );
      }
    } catch (error) {
      dispatch(forumSlice.actions.getAllThemesFailure(formatError(error)));
    }
  };
}

export function createTheme(arg: ThemeRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.createThemePending());
    try {
      const { error } = await forumApi.createTheme(arg);
      if (!error) {
        dispatch(forumSlice.actions.createThemeSuccess());
      } else {
        dispatch(forumSlice.actions.createThemeFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.createThemeFailure(formatError(error)));
    }
  };
}

export function updateThemeViewCount(
  id: number,
  arg: ThemeUpdateViewCountInfo
) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.updateThemeViewCountPending());
    try {
      const { error } = await forumApi.updateThemeViewCount(id, arg);
      if (!error) {
        dispatch(forumSlice.actions.updateThemeViewCountSuccess());
      } else {
        dispatch(
          forumSlice.actions.updateThemeViewCountFailure(formatHttpError(error))
        );
      }
    } catch (error) {
      dispatch(
        forumSlice.actions.updateThemeViewCountFailure(formatError(error))
      );
    }
  };
}

export function getTheme(themeId: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getThemePending());
    try {
      const { data, error } = await forumApi.getTheme(themeId);
      if (!error) {
        dispatch(forumSlice.actions.getThemeSuccess(data));
        if (data) {
          await forumApi.updateThemeViewCount(themeId, {
            viewCount: data?.viewCount + 1,
          });
        }
      } else {
        dispatch(forumSlice.actions.getThemeFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getThemeFailure(formatError(error)));
    }
  };
}

export function getAllMessages(themeId?: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getAllMessagesPending());
    try {
      const { data, error } = await forumApi.getAllMessages(themeId);
      if (!error) {
        dispatch(forumSlice.actions.getAllMessagesSuccess(data));
      } else {
        dispatch(
          forumSlice.actions.getAllMessagesFailure(formatHttpError(error))
        );
      }
    } catch (error) {
      dispatch(forumSlice.actions.getAllMessagesFailure(formatError(error)));
    }
  };
}

export function createMessage(arg: MessageRequestInfo) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.createMessagePending());
    try {
      const { error } = await forumApi.createMessage(arg);
      if (!error) {
        dispatch(forumSlice.actions.createMessageSuccess());
      } else {
        dispatch(
          forumSlice.actions.createMessageFailure(formatHttpError(error))
        );
      }
    } catch (error) {
      dispatch(forumSlice.actions.createMessageFailure(formatError(error)));
    }
  };
}

export default forumSlice.reducer;
