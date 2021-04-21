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

export const slice = createSlice({
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

    themesRequest: (state) => {
      state.themesStatus = 'pending';
    },
    themesSuccess: (state, { payload }: PayloadAction<ThemeInfo[]>) => {
      state.themesStatus = 'success';
      state.themes = payload;
    },
    themesFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.themesStatus = 'failure';
      state.error = payload;
    },

    messagesRequest: (state) => {
      state.messagesStatus = 'pending';
    },
    messagesSuccess: (
      state,
      { payload }: PayloadAction<ThemeMessageInfo[]>
    ) => {
      state.messagesStatus = 'success';
      state.messages = payload;
    },
    messagesFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.messagesStatus = 'failure';
      state.error = payload;
    },

    subThemesRequest: (state) => {
      state.subTheemsStatus = 'pending';
    },
    subThemesSuccess: (state, { payload }: PayloadAction<SubThemeInfo[]>) => {
      state.subTheemsStatus = 'success';
      state.subThemes = payload;
    },
    subThemesFailure: (state, { payload }: PayloadAction<SerializedError>) => {
      state.subTheemsStatus = 'failure';
      state.error = payload;
    },
  },
});

export function setOpen(visible: boolean) {
  return (dispatch: AppDispatch) => dispatch(slice.actions.setOpen(visible));
}

export function create(values: Record<string, string>) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.create());
    try {
      const { data, error } = await forumApi.createTheme(values);

      if (error) {
        dispatch(slice.actions.failure(formatHttpError(error)));
      }

      if (data) {
        dispatch(slice.actions.success(true));
      }
    } catch (error) {
      dispatch(slice.actions.failure(formatError(error)));
    }
  };
}

export function getThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.themesRequest());
    try {
      const { data, error } = await forumApi.getThemes(page);

      if (error) {
        dispatch(slice.actions.themesFailure(formatHttpError(error)));
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(slice.actions.setPage({ currentPage, pages }));
        dispatch(slice.actions.themesSuccess(data.data));
      }
    } catch (error) {
      dispatch(slice.actions.themesFailure(formatError(error)));
    }
  };
}

export function getMessages(id: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.messagesRequest());
    try {
      const { data, error } = await forumApi.getMessages(id);

      if (error) {
        dispatch(slice.actions.messagesFailure(formatHttpError(error)));
      }

      if (data) {
        dispatch(slice.actions.messagesSuccess(data.messages));
        dispatch(slice.actions.setTitle(data.theme.name));
      }
    } catch (error) {
      dispatch(slice.actions.messagesFailure(formatError(error)));
    }
  };
}

export function getSubThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.subThemesRequest());
    try {
      const { data, error } = await forumApi.getSubThemes(page);

      if (error) {
        dispatch(slice.actions.subThemesFailure(formatHttpError(error)));
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(slice.actions.setPage({ currentPage, pages }));
        dispatch(slice.actions.subThemesSuccess(data.data));
      }
    } catch (error) {
      dispatch(slice.actions.subThemesFailure(formatError(error)));
    }
  };
}

export default slice.reducer;
