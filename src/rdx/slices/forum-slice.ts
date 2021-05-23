import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { formatError, formatHttpError } from 'utils/format';
import { forumApi } from 'api/forum-api';
import { DEFAULT_PAGE_SIZE } from 'constants/defaults';

export type ForumState = {
  forums?: PaginatedData<ForumInfo>;
  themes?: PaginatedData<ThemeInfo>;
  allForums?: ForumInfo[];
  allThemes?: ThemeInfo[];
  forum?: ForumInfo;
  theme?: ThemeInfo;
  allMessages?: MessageInfo[];
  loadingStatus: StateStatus;
  mutatingStatus: StateStatus;

  error?: SerializedError;
};

export const initialState: ForumState = {
  loadingStatus: 'idle',
  mutatingStatus: 'idle',
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getForumsPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getForumsSuccess: (
      state,
      { payload }: PayloadAction<PaginatedData<ForumInfo> | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.forums = payload;
    },
    getForumsFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error = payload;
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

    getForumPending: (state) => {
      state.loadingStatus = 'pending';
      state.error = undefined;
    },
    getForumSuccess: (state, action: PayloadAction<ForumInfo | undefined>) => {
      state.loadingStatus = 'success';
      state.forum = action.payload;
    },
    getForumFailure: (state, action: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error = action.payload;
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

    getThemesPending: (state) => {
      state.loadingStatus = 'pending';
    },
    getThemesSuccess: (
      state,
      { payload }: PayloadAction<PaginatedData<ThemeInfo> | undefined>
    ) => {
      state.loadingStatus = 'success';
      state.themes = payload;
    },
    getThemesFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.loadingStatus = 'failure';
      state.error = payload;
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

export function getForums(page: number, pageSize = DEFAULT_PAGE_SIZE) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getForumsPending());
    try {
      const { data, error } = await forumApi.getForums(page, pageSize);
      if (!error) {
        dispatch(forumSlice.actions.getForumsSuccess(data));
      } else {
        dispatch(forumSlice.actions.getForumsFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getForumsFailure(formatError(error)));
    }
  };
}

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

export function getForum(forumId: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getForumPending());
    try {
      const { data, error } = await forumApi.getForum(forumId);
      if (!error) {
        dispatch(forumSlice.actions.getForumSuccess(data));
      } else {
        dispatch(forumSlice.actions.getForumFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getForumFailure(formatError(error)));
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

export function getThemes(
  forumId: number,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getThemesPending());
    try {
      const { data, error } = await forumApi.getThemes(forumId, page, pageSize);
      if (!error) {
        dispatch(forumSlice.actions.getThemesSuccess(data));
      } else {
        dispatch(forumSlice.actions.getThemesFailure(formatHttpError(error)));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getThemesFailure(formatError(error)));
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
