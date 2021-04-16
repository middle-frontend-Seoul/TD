import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forumApi } from 'api/forum-api';

export type Theme = {
  id: number | string;
  name: string;
  code: string;
  themeCount: number;
  messageCount: number;
};

export type SubTheme = {
  id: number | string;
  name: string;
  code: string;
  viewCount: number;
  messageCount: number;
};

export type ThemeMessage = {
  id: number | string;
  userName: string;
  message: string;
  date: Date;
};

export type ForumState = {
  isLoading: boolean;
  isLoadingThemes: boolean;
  isLoadingSubThemes: boolean;
  currentPage: number;
  pages: number;
  themes: Theme[];
  subThemes: SubTheme[];
  messages: ThemeMessage[];
  error: unknown;
};

export const initialState: ForumState = {
  isLoading: false,
  isLoadingThemes: false,
  isLoadingSubThemes: false,
  themes: [],
  messages: [],
  subThemes: [],
  currentPage: 1,
  pages: 1,
  error: null,
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

    themesRequest: (state) => {
      state.isLoadingThemes = true;
    },
    themesSuccess: (state, { payload }: PayloadAction<Theme[]>) => {
      state.isLoadingThemes = false;
      state.themes = payload;
    },
    themesFailure: (state, { payload }: PayloadAction<unknown>) => {
      state.isLoadingThemes = false;
      state.error = payload;
    },

    messagesRequest: (state) => {
      state.isLoading = true;
    },
    messagesFailure: (state, { payload }: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = payload;
    },

    subThemesRequest: (state) => {
      state.isLoadingSubThemes = true;
    },
    subThemesSuccess: (state, { payload }: PayloadAction<SubTheme[]>) => {
      state.isLoadingSubThemes = false;
      state.subThemes = payload;
    },
    subThemesFailure: (state, { payload }: PayloadAction<unknown>) => {
      state.isLoadingSubThemes = false;
      state.error = payload;
    },
  },
});

export function getThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.themesRequest());
    try {
      const { data, error } = await forumApi.getThemes(page);

      if (error) {
        dispatch(slice.actions.themesFailure(error));
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(slice.actions.setPage({ currentPage, pages }));
        dispatch(slice.actions.themesSuccess(data.data));
      }
    } catch (error) {
      dispatch(slice.actions.themesFailure(error));
    }
  };
}

export function getMessages() {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.messagesRequest());
  };
}

export function getSubThemes(page: string | number) {
  return async (dispatch: AppDispatch) => {
    dispatch(slice.actions.subThemesRequest());
    try {
      const { data, error } = await forumApi.getSubThemes(page);

      if (error) {
        dispatch(slice.actions.subThemesFailure(error));
      }

      if (data) {
        const { currentPage = 1, pages = 1 } = data;
        dispatch(slice.actions.setPage({ currentPage, pages }));
        dispatch(slice.actions.subThemesSuccess(data.data));
      }
    } catch (error) {
      dispatch(slice.actions.subThemesFailure(error));
    }
  };
}

export default slice.reducer;
