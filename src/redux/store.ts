import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (cdm) => cdm({ serializableCheck: false }), // иначе ругается на AxiosError, которая под капотом class
});
