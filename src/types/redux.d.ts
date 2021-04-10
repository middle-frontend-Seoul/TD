import rootReducer from 'redux/rootReducer';
import { store } from 'redux/store';

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppDispatch = typeof store.dispatch;

  type GenericState<T> = {
    data?: T;
    isLoading: boolean;
    isMutating: boolean;
    error?: any;
  }
}
