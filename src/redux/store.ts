import { configureStore } from '@reduxjs/toolkit';
import countdownReducer from './countdownSlice';

export const store = configureStore({
  reducer: {
    countdown: countdownReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
