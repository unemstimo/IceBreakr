import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

// Define the state interface
interface TimerState {
  time: number;
  isPlaying: boolean;
  game?: GameSate;
}

export interface GameSate {
  name: string;
  duration: number;
}

// Initial state
const initialState: TimerState = {
  time: 0,
  isPlaying: false,
};

// Create the timer slice
const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer(state) {
      state.isPlaying = true;
    },
    stopTimer(state) {
      state.isPlaying = false;
    },
    resetTimer(state) {
      state.time = 0;
      state.isPlaying = false;
    },
    updateTime(state, action: PayloadAction<number>) {
      localStorage.setItem("timeLeft", action.payload.toString());
      state.time = action.payload;
    },
    setGame(state, action: PayloadAction<GameSate>) {
      localStorage.setItem("gameName", action.payload.name.toString());
      localStorage.setItem("gameDuration", action.payload.duration.toString());
      state.game = action.payload;
    },
  },
});

// Export actions
export const { startTimer, stopTimer, resetTimer, updateTime, setGame } =
  timerSlice.actions;

// Export the reducer
const timerReducer = timerSlice.reducer;
export default timerReducer;

// Configure and export the store
export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});
// export root state
export type RootState = ReturnType<typeof store.getState>;
