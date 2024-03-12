import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer, updateTime } from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import { useTimerActions, useTimerState } from "~/redux/hooks";

interface CountdownComponentProps {
  playtime?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { isPlaying, time, game } = useTimerState();

  const { setGame } = useTimerActions();

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    if (storedTimeLeft !== null) {
      dispatch(updateTime(Number(storedTimeLeft)));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedGameName = localStorage.getItem("gameName");
    const storedGameDuration = localStorage.getItem("gameDuration");
    if (storedGameName !== null && storedGameDuration !== null) {
      setGame({ name: storedGameName, duration: Number(storedGameDuration) });
    }
  }, [setGame]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        dispatch(updateTime(time + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, time, dispatch]);

  const handleTogglePlaying = () => {
    if (isPlaying) {
      dispatch(stopTimer());
    } else {
      dispatch(startTimer());
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-xl bg-background p-4 align-middle">
      <h1>
        {game?.name} {Math.floor((game?.duration ?? 0) / 60)}m
        {(game?.duration ?? 0) % 60}s
      </h1>
      <h1 suppressHydrationWarning={true}>
        Tid spilt: {""}
        {time > 60 ? (
          <>
            {Math.floor(time / 60)}m {time % 60}s
          </>
        ) : (
          <>{time}s</>
        )}
      </h1>

      <span
        // suppressHydrationWarning={true}
        className="flex w-full justify-center align-middle"
      >
        {isPlaying ? <h1>Running</h1> : <h1>Paused</h1>}
      </span>
      <span className="flex w-full justify-center align-middle">
        <button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </button>
        {isPlaying ? (
          <button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleTogglePlaying}
          >
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </button>
        ) : (
          <button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleTogglePlaying}
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
