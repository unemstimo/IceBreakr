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
import { startTimer, stopTimer } from "~/redux/store";

const QueueBar = () => {
  const queueQuery = api.queue.getQueue.useQuery();
  const { toast } = useToast();
  const { game, time, isPlaying } = useTimerState();
  const { setGame, reset } = useTimerActions();

  useEffect(() => {
    if (game && game?.duration <= time) {
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

  const playNextInQueue = async () => {
    reset();
    stopTimer();

    const nextInQueue = await popQueue();
    if (nextInQueue) {
      void setGameAndPlay(nextInQueue);
    } else {
      setGame(null);
    }
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
    startTimer();
  };

  return (
    <Card className="min-w-72">
      <CardHeader>Min kø</CardHeader>
      <SignedOut>
        <CardContent className="flex flex-col gap-2">
          <Button>
            <SignInButton>Log inn for å se din kø</SignInButton>
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
    <Card className="!border-neutral-800 !pt-6">
      <CardContent>
        <div className="flex flex-row items-center  justify-between align-middle">
          <Link href={`/gamePage?gameId=${queueItem.game.gameId}`} passHref>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
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
                onClick={() => handleDequeue(queueItem.queuedId)}
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
