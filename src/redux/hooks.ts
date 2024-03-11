import { useDispatch, useSelector } from "react-redux";
import {
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
  setGame,
  type GameSate,
  type RootState,
} from "~/redux/store";

export const useTimerActions = () => {
  const dispatch = useDispatch();

  return {
    start: () => dispatch(startTimer()),
    stop: () => dispatch(stopTimer()),
    reset: () => dispatch(resetTimer()),
    update: (time: number) => dispatch(updateTime(time)),
    setGame: (gameState: GameSate) => dispatch(setGame(gameState)),
  };
};

export const useTimerState = () => {
  const isPlaying = useSelector((state: RootState) => state.timer.isPlaying);
  const time = useSelector((state: RootState) => state.timer.time);
  const game = useSelector((state: RootState) => state.timer.game);

  return { isPlaying, time, game };
};
