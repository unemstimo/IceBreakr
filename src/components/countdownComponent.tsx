import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimeLeft,
  decrementTimeLeft,
  setLastGameTime,
  setRunState
} from "../redux/countdownSlice";
import { store, type RootState } from "../redux/store";
import {Button, Tooltip} from "@nextui-org/react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import ReplayCircleFilledRoundedIcon from '@mui/icons-material/ReplayCircleFilledRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import { Line } from 'rc-progress';
import { Input } from "./ui/input";


interface CountdownComponentProps {
  gametime?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  gametime = 69, // Default value - should be playtime of game
}) => {
  const dispatch = useDispatch();
  const { timeLeft, isRunning, lastGameTime} = useSelector(
    (state: RootState) => state.countdown,
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playtime, setPlaytime] = React.useState(lastGameTime?lastGameTime:gametime);
  const [newPlayTime, setNewPlayTime] = React.useState(playtime);
  const [shuffle, setShuffle] = React.useState(false);
  

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    const storedRunState = localStorage.getItem("isRunning");
    const storedLastGameTime = localStorage.getItem("lastPlayedGameTime");
    console.log("Timeleft: " + storedTimeLeft);
    console.log("Run state: " + storedRunState);
    console.log("Last game time: " + storedLastGameTime);

    if (storedTimeLeft) {
      dispatch(setTimeLeft(Number(storedTimeLeft)));
    }
    if (storedRunState) {
      dispatch(setRunState(Boolean(storedRunState)));
    }
    if (storedLastGameTime) {
      dispatch(setLastGameTime(Number(storedLastGameTime)));
    }
    
    const interval = setInterval(() => {
      dispatch(decrementTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
    localStorage.setItem("isRunning", isRunning.toString());
    localStorage.setItem("lastPlayedGameTime", lastGameTime.toString());
  }, [timeLeft, isRunning, lastGameTime, dispatch]);

  const handlePlay = () => {
    setIsPlaying(true);
    dispatch(setRunState(true));
  }

  const handlePause = () => {
    setIsPlaying(false);
    dispatch(setRunState(false));
  }

  const handleNewPlayTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayTime(Number(e.target.value));
  }

  const handleSetNewTime = (time: number) => {
    dispatch(setTimeLeft(time));
    setPlaytime(time);
    dispatch(setLastGameTime(time));
    handlePause();
  }

  const handleReplay = () => {
    dispatch(setTimeLeft(playtime));
    dispatch(setRunState(true));
    setIsPlaying(true);
  }

  const toggleShuffle = () => {
    setShuffle(!shuffle);
    console.log("Shuffle: " + shuffle);
  }


  return (
    <div className="flex flex-col justify-center gap-4 rounded-xl bg-background p-4 align-middle">
      <h1 className="text-rg font-normal text-neutral-500">New time input:</h1>
      <span className="w-full flex gap-2">
        <Input
                className="h-full w-full"
                placeholder={playtime.toString()}
                type="number"
                onChange={handleNewPlayTime}
              >
        </Input>       
        <Button
          className="rounded-lg font-bold bg-primary p-4 text-sm text-white w-1/2"
          onClick={() => handleSetNewTime(newPlayTime)}
        >
          SET TIME
        </Button>
      </span>
      
      <h1 className="text-rg font-normal text-neutral-500" suppressHydrationWarning={true}>
        Playtime: {playtime} sec <br/>
        Time left: {Math.floor(timeLeft/60)}m {timeLeft%60}s<br/>
        Framgang: {(100-(timeLeft/playtime*100)).toPrecision(3)}%</h1>
      
      <span
        suppressHydrationWarning={true}
        className="flex w-full justify-center align-middle text-rg"
      >
        <h3>Tittel på spill -</h3>
        {isRunning ? (
          <h1 suppressHydrationWarning={true}>- Running</h1>
        ) : (
          <h1 suppressHydrationWarning={true}>- Paused</h1>
        )}
      </span>
      <span className="flex w-full justify-center align-middle gap-1 rounded-xl p-2">
        <Tooltip className="bg-background rounded-full border-primary border text-neutral-300" content="Shuffle">
          {shuffle ? (
          <Button
            className="flex items-center justify-center text-violet-500 rounded-full align-middle hover:text-white"
            onClick={toggleShuffle}
            >
            <ShuffleRoundedIcon sx={{ fontSize: 25 }} />
          </Button>):(
          <Button
            className="flex items-center justify-centerrounded-full align-middle text-neutral-500 hover:text-white"
            onClick={toggleShuffle}
            >
            <ShuffleRoundedIcon sx={{ fontSize: 25 }} />
          </Button>)}
          
        </Tooltip>
        <Button className="flex items-center justify-center rounded-full align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </Button>
        {isPlaying && timeLeft>0 ? (
          <Button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handlePause}
          >
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </Button>
        ) : (( (timeLeft<=0) )? (<Button
          className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
          onClick={handleReplay}
        >
          <ReplayCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
        </Button>) : (
          <Button
            className="flex h-12 items-center justify-center rounded-full align-middle text-white active:scale-90"
            onClick={handlePlay}
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
            onClick={handleReplay}
          >
            <RestartAltRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
      </span>
      <span className="flex w-full flex-col justify-center">
        <div className="flex justify-start align-middle items-center gap-1 mb-2">
          {(timeLeft%2 < 1 )?
          <HourglassTopRoundedIcon sx={{ fontSize: 25}} /> : <HourglassBottomRoundedIcon sx={{ fontSize: 25}}
          />}
          <p suppressHydrationWarning className="text-rg font-normal">{Math.floor(timeLeft/60)}m {timeLeft%60}s</p>
        </div>
        {(timeLeft/playtime*100)>1/3*100 ?
          <Line percent={timeLeft/playtime*100} strokeWidth={3} strokeColor="#D3D3D3" trailWidth={3} trailColor="#444"  />:
          <Line percent={timeLeft/playtime*100} strokeWidth={3} strokeColor="#dc2626" trailWidth={3} trailColor="#444"  />
        }
      </span>
    </div>
  );
};

export default CountdownComponent;
