import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetTimer, startTimer, stopTimer, updateTime } from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';

import { Line } from "rc-progress";
import { useTimerState, useTimerActions } from "~/redux/hooks";
import { Button, Tooltip } from "@nextui-org/react";
import { api } from "~/utils/api";
import { toast } from "./ui/use-toast";

interface CountdownComponentProps {
  gameID?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { isPlaying, time, game } = useTimerState();
  const queueQuery = api.queue.getQueue.useQuery();
  const firstInQueue = queueQuery.data?.[0];

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    if (storedTimeLeft !== null) {
      dispatch(updateTime(Number(storedTimeLeft)));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(firstInQueue?.game.name)
    console.log(time + " " + Number(firstInQueue?.game.duration)*60)
    console.log("Percentage: " + ( time / (Number(firstInQueue?.game.duration)*60))*100)
    if (firstInQueue == undefined) {
      dispatch(resetTimer());
    }
    if (isPlaying && game) {
      const interval = setInterval(() => {
        dispatch(updateTime(time + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
    
  }, [isPlaying, time, dispatch, game, firstInQueue]);

  const handleTogglePlaying = () => {
    if (isPlaying) {
      dispatch(stopTimer());
    } else if (firstInQueue == undefined) {
      toast({
        title: "Ingen leker i køen 🧐",
        description: "Legg til lek i køen for å starte en timer.",
      });
    }
    else {
      dispatch(startTimer());
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 rounded-xl bg-background p-4 align-middle">
      <h1>
        {!firstInQueue?.game.name ? ("Ingen lek i kø"):(
          firstInQueue?.game.name +": " + (Number(firstInQueue?.game.duration)) % 60 + " min"
        )}
      </h1>

      <span
        // suppressHydrationWarning={true}
        className="flex w-full justify-center align-middle"
      >
        {isPlaying ? <h1>Running</h1> : <h1>Paused</h1>}
      </span>
      <span className="flex w-full justify-center items-center align-middle gap-1 rounded-xl p-2">
        <Tooltip className="bg-neutral-900 text-sm rounded-full border-neutral-700 border text-neutral-300" content="Shuffle">
          <Button
            className="flex items-center justify-center rounded-full align-middle p-0 h-fit text-neutral-500 hover:text-white" 
            >
            <ShuffleRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
        <Button className="flex items-center justify-center rounded-full p-0 h-fit align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </Button>

        {isPlaying ? (
          <Button onClick={handleTogglePlaying} className="rounded-full p-0 ">
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }}/>
          </Button>
          ):(
          <Button onClick={handleTogglePlaying} className="rounded-full p-0">
            <PlayCircleFilledRoundedIcon sx={{ fontSize: 50 }}/>
          </Button>
          )}

        <Button className="flex items-center justify-center rounded-full p-0 h-fit align-middle text-neutral-500 hover:text-white">
          <SkipNextRoundedIcon sx={{ fontSize: 40 }} />
        </Button>
        <Tooltip className="bg-neutral-900 text-sm rounded-full border-neutral-700 border text-neutral-300" content="Restart timer">
          <Button
            className="flex items-center justify-center rounded-full p-0 h-fit active:text-primary align-middle text-neutral-500 hover:text-white"
            onClick={() => dispatch(resetTimer())}
          >
            <RestartAltRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
      </span>
      <span className="flex w-full flex-col justify-center">
        <div className="flex justify-start align-middle items-center gap-1 mb-2">
          {(isPlaying)?
          <TimerRoundedIcon sx={{ fontSize: 25, color: "#a855f7"}} /> : <TimerRoundedIcon sx={{ fontSize: 25, opacity: 0.7}}
          />}
          <p suppressHydrationWarning className="text-rg font-normal">{Math.floor(time/60)}m {time%60}s</p>
        </div>
          <Line percent={( time / (Number(firstInQueue?.game.duration)*60))*100} strokeWidth={3} strokeColor="#D3D3D3" trailWidth={3} trailColor="#444"  />
      </span>
    </div>
  );
};

export default CountdownComponent;
