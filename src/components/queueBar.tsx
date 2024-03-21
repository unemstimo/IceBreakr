import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Card, CardContent, CardHeader } from "./ui/card";
import { api } from "~/utils/api";
import { type QueueItem } from "~/server/api/routers/queue";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useTimerActions, useTimerState } from "~/redux/hooks";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";
import { startTimer } from "~/redux/store";

const QueueBar = () => {
  const queueQuery = api.queue.getQueue.useQuery();
  const { toast } = useToast();
  const { game, time, isPlaying, isShuffle } = useTimerState();
  const { setGame, reset } = useTimerActions();
  const { stop: stopTimer } = useTimerActions();

  const queueLength = queueQuery.data?.length ?? 0;

  useEffect(() => {
    if (game?.duration && game?.duration <= time) {
      void playNextInQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, time, isPlaying]);

  const useDeQueueMutation = api.queue.dequeue.useMutation();

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
  console.log("isplaying", isPlaying);
  const playNextInQueue = async () => {
    console.log("playing next in queue");
    stopTimer();
    reset();
    const nextInQueue = await popQueue(isShuffle);

    if (nextInQueue) {
      console.log("set gaem abd play");
      void setGameAndPlay(nextInQueue);
    }
    // else { //TODO: skal vi ha denne eller skal det være mulig å starte å leke igjen.
    //   setGame(null);
    // }
  };

  const setGameAndPlay = async (queue: QueueItem) => {
    if (!queue) return;
    const duration = Number(queue.game.duration) * 60;
    if (!duration) return;
    console.log("setting game and starting");
    setGame({
      duration,
      name: queue.game.name,
    });
    console.log("starting timer");
    startTimer();
  };

  return (
    <Card className="min-w-72">
      <CardHeader>
        <span className="flex w-full justify-between">
          <div>
            <h2>Min kø</h2>
            <p className="text-rg font-normal text-neutral-500">
              {queueLength > 1 || queueLength < 1
                ? queueLength + " leker i køen"
                : queueLength + " lek i køen"}{" "}
            </p>
          </div>
        </span>
      </CardHeader>
      <SignedOut>
        <CardContent className="flex flex-col gap-2">
          <Button>
            <SignInButton>Logg inn for å se din kø</SignInButton>
          </Button>
        </CardContent>
      </SignedOut>
      <SignedIn>
        <CardContent className="flex flex-col gap-2">
          {queueQuery.data?.map((queue) => (
            <QueueGameCard
              key={queue.queuedId}
              queueItem={queue}
              refetch={queueQuery.refetch}
              setGameAndPlay={setGameAndPlay}
            />
          ))}
        </CardContent>
      </SignedIn>
    </Card>
  );
};

export default QueueBar;

const QueueGameCard = ({
  queueItem,
  refetch,
  setGameAndPlay,
}: {
  queueItem: QueueItem;
  refetch: VoidFunction;
  setGameAndPlay: (queue: QueueItem) => void;
}) => {
  const useDeQueueMutation = api.queue.dequeue.useMutation();
  const useReQueueMutation = api.queue.reQueue.useMutation();

  const { toast } = useToast();

  const handleDequeue = async (id: number) => {
    try {
      await useDeQueueMutation.mutateAsync({ queuedId: id });
      refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke fjerne spil fra køen",
      });
    }
  };

  const moveToTopOfQueue = async (queuedItem: QueueItem) => {
    const queuedId = queuedItem?.queuedId;
    if (!queuedId) return;
    try {
      const mutations = [
        useReQueueMutation.mutateAsync({ queuedId: queuedId }),
      ];
      await Promise.all(mutations);
      refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke tilføje spil i starten av køen",
      });
    }
  };

  const deQueueAndPlay = async (queue: QueueItem) => {
    if (!queue) return;
    const duration = Number(queue.game.duration) * 60;
    if (!duration) return;
    setGameAndPlay(queue);
    await handleDequeue(queue.queuedId);
  };

  if (!queueItem) return null;

  return (
    <Card className="!border-neutral-800">
      <CardContent>
        <div className="flex flex-row items-center  justify-between align-middle">
          <Link href={`/gamePage?gameId=${queueItem.game.gameId}`} passHref>
            <h3 className="text-rg font-semibold leading-none tracking-tight">
              {queueItem.game.name}
            </h3>
          </Link>
          <div className="flex flex-row items-center justify-between gap-2 align-middle">
            <Button
              onClick={() => deQueueAndPlay(queueItem)}
              variant={"ghost"}
              size={"icon"}
            >
              <PlayCircleOutlineRoundedIcon />
            </Button>

            <Button
              onClick={() => moveToTopOfQueue(queueItem)}
              variant={"ghost"}
              size={"icon"}
            >
              <ArrowUpIcon />
            </Button>

            <Button variant={"ghost"} size={"icon"}>
              <CloseRoundedIcon
                sx={{ color: "#888", fontSize: "1.25rem" }}
                onClick={() => handleDequeue(queueItem.queuedId)}
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
