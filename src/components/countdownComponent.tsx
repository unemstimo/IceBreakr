import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeLeft,
  decrementTimeLeft,
  toggleRunning,
} from "../redux/countdownSlice";
import { type RootState } from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";

interface CountdownComponentProps {
  playtime?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  playtime = 69,
}) => {
  const dispatch = useDispatch();
  const { timeLeft, isRunning } = useSelector(
    (state: RootState) => state.countdown,
  );
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    const storedRunState = localStorage.getItem("isRunning");
    console.log("Timeleft: " + storedTimeLeft);
    console.log("Run state: " + storedRunState);
    if (storedTimeLeft) {
      dispatch(setTimeLeft(Number(storedTimeLeft)));
    }
    if (storedRunState) {
      setIsPlaying(storedRunState === "true" ? true : false);
    }

    const interval = setInterval(() => {
      dispatch(decrementTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
    localStorage.setItem("isRunning", isRunning.toString());
  }, [timeLeft, isRunning]);

  const handleSetCountdown = (time: number) => {
    dispatch(setTimeLeft(time));
  };

  const handleToggleRunning = () => {
    dispatch(toggleRunning());
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-xl bg-background p-4 align-middle">
      <h1 suppressHydrationWarning={true}>Countdown: {timeLeft}</h1>
      <button
        className="rounded-lg bg-primary p-4 text-rg text-white"
        onClick={() => handleSetCountdown(60)}
      >
        DEV ONLY set timer to 60 Seconds
      </button>
      <span
        suppressHydrationWarning={true}
        className="flex w-full justify-center align-middle"
      >
        {isRunning ? (
          <h1 suppressHydrationWarning={true}>Running</h1>
        ) : (
          <h1 suppressHydrationWarning={true}>Paused</h1>
        )}
      </span>
      <span className="flex w-full justify-center align-middle">
        <button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </button>
        {isPlaying ? (
          <button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleToggleRunning}
          >
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </button>
        ) : (
          <button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleToggleRunning}
          >
            <PlayCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </button>
        )}
        <button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipNextRoundedIcon sx={{ fontSize: 40 }} />
        </button>
      </span>
    </div>
  );
};

export default CountdownComponent;
