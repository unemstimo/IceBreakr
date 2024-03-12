import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer, updateTime } from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ReplayCircleFilledRoundedIcon from "@mui/icons-material/ReplayCircleFilledRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";

import { Line } from "rc-progress";
import { useTimerState, useTimerActions } from "~/redux/hooks";
import { Button, Tooltip } from "@nextui-org/react";

interface CountdownComponentProps {
  gameID?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { isPlaying, time, game } = useTimerState();

  const playtime = game?.duration ?? 0;

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    if (storedTimeLeft !== null) {
      dispatch(updateTime(Number(storedTimeLeft)));
    }
  }, [dispatch]);

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
      <span className="flex w-full justify-center align-middle gap-1 rounded-xl p-2">
        <Tooltip className="bg-background rounded-full border-primary border text-neutral-300" content="Shuffle">
          <Button
            className="flex items-center justify-centerrounded-full align-middle text-neutral-500 hover:text-white" 
            >
            <ShuffleRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
        <Button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </Button>
        {isPlaying && time>0 ? (
          <Button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleTogglePlaying}
          >
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </Button>
        ) : (( (time<=0) )? (<Button
          className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
        >
          <ReplayCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
        </Button>) : (
          <Button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handleTogglePlaying}
          >
            <PlayCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </Button>
        ))}
        <Button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipNextRoundedIcon sx={{ fontSize: 40 }} />
        </Button>
        <Tooltip className="bg-background rounded-full border-primary border text-neutral-300" content="Reset timer">
          <Button
            className="flex items-center justify-center rounded-full active:text-primary align-middle h-auto text-neutral-500 hover:text-white"
          >
            <RestartAltRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
      </span>
      <span className="flex w-full flex-col justify-center">
        <div className="flex justify-start align-middle items-center gap-1 mb-2">
          {(time%2 < 1 )?
          <HourglassTopRoundedIcon sx={{ fontSize: 25}} /> : <HourglassBottomRoundedIcon sx={{ fontSize: 25}}
          />}
          <p suppressHydrationWarning className="text-rg font-normal">{Math.floor(time/60)}m {time%60}s</p>
        </div>
        {(time/playtime*100)>1/3*100 ?
          <Line percent={time/playtime*100} strokeWidth={3} strokeColor="#D3D3D3" trailWidth={3} trailColor="#444"  />:
          <Line percent={time/playtime*100} strokeWidth={3} strokeColor="#D3D3D3" trailWidth={3} trailColor="#444"  />
        }
      </span>
    </div>
  );
};

export default CountdownComponent;
