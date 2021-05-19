import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { formatError, formatHttpError } from 'utils/format';
import { forumApi } from 'api/forum-api';

export type ForumState = {
  createRequest: boolean;
  createSuccess: unknown;
  createFailure: unknown;

  isOpen: boolean;

  themesStatus: StateStatus;
  messagesStatus: StateStatus;
  subTheemsStatus: StateStatus;

  currentPage: number;
  title: string;
  pages: number;
  themes: ThemeInfo[];
  subThemes: SubThemeInfo[];
  messages: ThemeMessageInfo[];
  error?: SerializedError;
};

export const initialState: ForumState = {
  themesStatus: 'idle',
  messagesStatus: 'idle',
  subTheemsStatus: 'idle',
  createRequest: false,
  createSuccess: null,
  createFailure: null,
  isOpen: false,
  title: '',
  themes: [],
  messages: [],
  subThemes: [],
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

    create: (state) => {
      state.createRequest = true;
    },
    success: (state, { payload }: PayloadAction<unknown>) => {
      state.isOpen = false;
      state.createRequest = false;
      state.createFailure = null;
      state.createSuccess = payload;
    },
    failure: (state, { payload }: PayloadAction<unknown>) => {
      state.isOpen = false;
      state.createRequest = false;
      state.createSuccess = null;
      state.createFailure = payload;
    },

    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },

    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },

    getThemesPending: (state) => {
      state.themesStatus = 'pending';
    },
    getThemesSuccess: (state, { payload }: PayloadAction<ThemeInfo[]>) => {
      state.themesStatus = 'success';
      state.themes = payload;
    },
    getThemesFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.themesStatus = 'failure';
      state.error = payload;
    },

    getMessagesPending: (state) => {
      state.messagesStatus = 'pending';
    },
    getMessagesSuccess: (
      state,
      { payload }: PayloadAction<ThemeMessageInfo[]>
    ) => {
      state.messagesStatus = 'success';
      state.messages = payload;
    },
    getMessagesFailure: (
      state,
      { payload }: PayloadAction<SerializedError>
    ) => {
      state.messagesStatus = 'failure';
      state.error = payload;
    },

    getSubThemesPending: (state) => {
      state.subTheemsStatus = 'pending';
    },
    getSubThemesSuccess: (
      state,
      { payload }: PayloadAction<SubThemeInfo[]>
    ) => {
      state.subTheemsStatus = 'success';
      state.subThemes = payload;
    },
    getSubThemesFailure: (
      state,
      { payload }: PayloadAction<SerializedError>
    ) => {
      state.subTheemsStatus = 'failure';
      state.error = payload;
    },
  },
});

export function setOpen(visible: boolean) {
  return (dispatch: AppDispatch) =>
    dispatch(forumSlice.actions.setOpen(visible));
}

export function create(values: Record<string, string>) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.create());
    try {
      const { data, error } = await forumApi.createTheme(values);

      if (error) {
        dispatch(forumSlice.actions.failure(formatHttpError(error)));
      }

      if (data) {
        dispatch(forumSlice.actions.success(true));
      }
    } catch (error) {
      dispatch(forumSlice.actions.failure(formatError(error)));
    }
  };
}

export function getThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getThemesPending());
    try {
      const { data, error } = await forumApi.getThemes(page);

      if (error) {
        dispatch(forumSlice.actions.getThemesFailure(formatHttpError(error)));
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(forumSlice.actions.setPage({ currentPage, pages }));
        dispatch(forumSlice.actions.getThemesSuccess(data.data));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getThemesFailure(formatError(error)));
    }
  };
}

export function getMessages(id: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getMessagesPending());
    try {
      const { data, error } = await forumApi.getMessages(id);

      if (error) {
        dispatch(forumSlice.actions.getMessagesFailure(formatHttpError(error)));
      }

      if (data) {
        dispatch(forumSlice.actions.getMessagesSuccess(data.messages));
        dispatch(forumSlice.actions.setTitle(data.theme.name));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getMessagesFailure(formatError(error)));
    }
  };
}

// TODO - необходим параметр section (получаем из урл, это id subTheme)
export function getSubThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(forumSlice.actions.getSubThemesPending());
    try {
      const { data, error } = await forumApi.getSubThemes(page);

      if (error) {
        dispatch(
          forumSlice.actions.getSubThemesFailure(formatHttpError(error))
        );
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(forumSlice.actions.setPage({ currentPage, pages }));
        dispatch(forumSlice.actions.getSubThemesSuccess(data.data));
      }
    } catch (error) {
      dispatch(forumSlice.actions.getSubThemesFailure(formatError(error)));
    }
  };
}

export default forumSlice.reducer;
