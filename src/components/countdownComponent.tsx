import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startTimer, stopTimer, updateTime, setGame } from "../redux/store";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import { useTimerState } from "~/redux/hooks";
import { api } from "~/utils/api";
import { useToast } from "./ui/use-toast";

interface CountdownComponentProps {
  playtime?: number;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isPlaying, time, game } = useTimerState();
  const queueQuery = api.queue.getQueue.useQuery();
  const useDeQueueMutation = api.queue.dequeue.useMutation();

  useEffect(() => {
    const storedGameName = localStorage.getItem("gameName");
    const storedGameDuration = localStorage.getItem("gameDuration");
    console.log(storedGameName, storedGameDuration);
    if (storedGameName !== null && Number(storedGameDuration) !== null) {
      console.log("is here");
      console.log("innsiden ", storedGameName, storedGameDuration);
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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        dispatch(updateTime(time + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, time, dispatch]);

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

  const popQueue = async () => {
    const hasNext = queueQuery.data?.[0];
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
        const next = await popQueue();
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
