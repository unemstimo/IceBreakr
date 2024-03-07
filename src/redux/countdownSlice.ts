// src/redux/countdownSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountdownState {
  timeLeft: number;
  isRunning: boolean;
}

// Attempt to get the initial timeLeft value from localStorage, defaulting to 0 if not found
const getInitialTimeLeft = () => {
    try {
        const storedTimeLeft = localStorage.getItem('timeLeft');
        console.log("Timeleft: " + storedTimeLeft);
        return storedTimeLeft ? Number(storedTimeLeft) : 0;
    }
    catch {
        return 0;
    }
};

const getRunState = () => {
    try {
        const storedRunState = localStorage.getItem('isRunning');
        return storedRunState ? storedRunState === "true" : false;
    }
    catch {
        return false;
    }
}

const initialState: CountdownState = {
  timeLeft: getInitialTimeLeft(), // Initialize countdown time from localStorage if available
  isRunning: getRunState(), // Initialize running state from localStorage if available
};

export const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    decrementTimeLeft: (state) => {
      if (state.timeLeft > 0 && state.isRunning) {
        state.timeLeft -= 1;
      }
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    resetTimer: (state) => {
      state.timeLeft = 0;
      state.isRunning = false;
    },
  },
});

export const { setTimeLeft, decrementTimeLeft, toggleRunning, resetTimer } = countdownSlice.actions;

export default countdownSlice.reducer;
