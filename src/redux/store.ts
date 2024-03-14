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
  isShuffle: boolean;
}

export interface GameSate {
  name: string;
  duration: number;
}

// Initial state
const initialState: TimerState = {
  time: 0,
  isPlaying: false,
  isShuffle: false,
};

// Create the timer slice
const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer(state) {
      if (state.game) {
        state.isPlaying = true;
      }
    },
    stopTimer(state) {
      state.isPlaying = false;
    },
    resetTimer(state) {
      localStorage.setItem("timeLeft", "0");
      state.time = 0;
    },
    updateTime(state, action: PayloadAction<number>) {
      if (state.game) {
        localStorage.setItem("timeLeft", action.payload.toString());
        state.time = action.payload;
      }
    },
    setGame(state, action: PayloadAction<GameSate | null>) {
      state.time = 0;
      if (!action.payload) {
        state.game = undefined;
        state.isPlaying = false;
        localStorage.removeItem("gameName");
        localStorage.removeItem("gameDuration");
        localStorage.removeItem("timeLeft");
        console.log("set no game");
        return;
      }
      localStorage.setItem("gameName", action.payload.name.toString());
      localStorage.setItem("gameDuration", action.payload.duration.toString());
      state.game = action.payload;
      state.game.duration = 5; // TODO: remove this line
    },

    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle;
    },
  },
});

// Export actions
export const {
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
  setGame,
  toggleShuffle,
} = timerSlice.actions;

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
