import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  startTimer,
  stopTimer,
  updateTime,
  setGame,
  resetTimer,
  toggleShuffle,
} from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";

import { Line } from "rc-progress";
import { useTimerState } from "~/redux/hooks";
import { Button, Tooltip } from "@nextui-org/react";
import { api } from "~/utils/api";

import { useToast } from "./ui/use-toast";

interface CountdownComponentProps {
  gameID?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isPlaying, time, game, isShuffle } = useTimerState();
  const queueQuery = api.queue.getQueue.useQuery();
  const useDeQueueMutation = api.queue.dequeue.useMutation();

  // load game from local storage useEffect and set time
  useEffect(() => {
    const storedGameName = localStorage.getItem("gameName");
    const storedGameDuration = localStorage.getItem("gameDuration");
    console.log(storedGameName, storedGameDuration);
    if (storedGameName !== null && Number(storedGameDuration) !== null) {
      dispatch(
        setGame({
          name: storedGameName,
          duration: Number(storedGameDuration),
        }),
      );
    }
    const storedTimeLeft = localStorage.getItem("timeLeft");
    if (
      storedTimeLeft !== null &&
      storedGameName !== null &&
      Number(storedGameDuration) !== null
    ) {
      dispatch(updateTime(Number(storedTimeLeft)));
    }
  }, [dispatch]);

  // count down timer useEffect
  useEffect(() => {
    if (isPlaying && game) {
      const interval = setInterval(() => {
        dispatch(updateTime(time + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, time, dispatch, game]);

  const deQueue = async (id: number) => {
    try {
      await useDeQueueMutation.mutateAsync({ queuedId: id });
      await queueQuery.refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke fjerne spil fra køen",
      });
    }
  };

  const popQueue = async (popRandom = false) => {
    const index = popRandom
      ? Math.floor(Math.random() * (queueQuery.data?.length ?? 0))
      : 0;
    const hasNext = queueQuery.data?.[index];
    if (!hasNext) {
      return null;
    } else {
      const queuedId = hasNext.queuedId;
      await deQueue(queuedId);
      await queueQuery.refetch();
      return hasNext;
    }
  };

  const handleTogglePlaying = async () => {
    if (isPlaying) {
      dispatch(stopTimer());
    } else {
      if (!game) {
        const next = await popQueue(isShuffle);
        if (next) {
          dispatch(
            setGame({
              name: next.game.name,
              duration: Number(next.game.duration) * 60,
            }),
          );
        }
      }
      dispatch(startTimer());
    }
  };

  const durationMinutes = Math.floor((game?.duration ?? 0) / 60);
  const durationSeconds = (game?.duration ?? 0) % 60;
  return (
    <div className="flex flex-col justify-center gap-4 rounded-xl bg-background p-4 align-middle">
      {game ? <h1>{game.name}</h1> : <h1>Ingen lek i kø</h1>}
      <span className="flex w-full items-center justify-center gap-1 rounded-xl p-2 align-middle">
        <Tooltip
          className="rounded-full border border-neutral-700 bg-neutral-900 text-sm text-neutral-300"
          content="Shuffle"
        >
          <Button
            onClick={() => dispatch(toggleShuffle())}
            className="flex h-fit items-center justify-center rounded-full p-0 align-middle text-neutral-500 hover:text-white"
          >
            {isShuffle ? (
              <ShuffleRoundedIcon sx={{ fontSize: 25, color: "#a855f7" }} />
            ) : (
              <ShuffleRoundedIcon sx={{ fontSize: 25 }} />
            )}
            {/* <ShuffleRoundedIcon sx={{ fontSize: 25 }} /> */}
          </Button>
        </Tooltip>
        {/* <Button className="flex h-fit items-center justify-center rounded-full p-0 align-middle text-neutral-500 hover:text-white">
          <SkipPreviousRoundedIcon sx={{ fontSize: 40 }} />
        </Button> */}

        {isPlaying ? (
          <Button onClick={handleTogglePlaying} className="rounded-full p-0 ">
            <PauseCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </Button>
        ) : (
          <Button onClick={handleTogglePlaying} className="rounded-full p-0">
            <PlayCircleFilledRoundedIcon sx={{ fontSize: 50 }} />
          </Button>
        )}

        {/* <Button className="flex h-fit items-center justify-center rounded-full p-0 align-middle text-neutral-500 hover:text-white">
          <SkipNextRoundedIcon sx={{ fontSize: 40 }} />
        </Button> */}
        <Tooltip
          className="rounded-full border border-neutral-700 bg-neutral-900 text-sm text-neutral-300"
          content="Restart timer"
        >
          <Button
            className="flex h-fit items-center justify-center rounded-full p-0 align-middle text-neutral-500 hover:text-white active:text-primary"
            onClick={() => dispatch(resetTimer())}
          >
            <RestartAltRoundedIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
      </span>
      <span className="flex w-full flex-col justify-center">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex w-fit items-center justify-start gap-1">
            {isPlaying ? (
              <TimerRoundedIcon sx={{ fontSize: 25, color: "#a855f7" }} />
            ) : (
              <TimerRoundedIcon sx={{ fontSize: 25, opacity: 0.7 }} />
            )}
            <p className="text-rg font-normal">
              {Math.floor(time / 60)}m {time % 60}s
            </p>
          </div>
          <div>
            {/* how long is the game in min and sec */}
            <p className="text-rg font-normal text-neutral-500">
              {durationMinutes} m {durationSeconds} s
            </p>
          </div>
        </div>
        <Line
          percent={(time / (Number(game?.duration ?? 1) * 60)) * 100}
          strokeWidth={3}
          strokeColor="#D3D3D3"
          trailWidth={3}
          trailColor="#444"
        />
      </span>
    </div>
  );
};

export default CountdownComponent;
