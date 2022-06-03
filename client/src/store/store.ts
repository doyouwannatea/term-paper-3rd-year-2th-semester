import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import specialtyReducer, {
  specialtySlice,
} from './features/specialtySlice';
import { specialtyApi } from './services/specialtyApi';

export const store = configureStore({
  reducer: {
    [specialtySlice.name]: specialtyReducer,
    [specialtyApi.reducerPath]: specialtyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(specialtyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
