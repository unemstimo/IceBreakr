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

const QueueBar = () => {
  const queueQuery = api.queue.getQueue.useQuery();
  const firstInQueue = queueQuery.data?.[0];
  const { toast } = useToast();
  const { game, time, isPlaying } = useTimerState();
  const { setGame, reset } = useTimerActions();

  useEffect(() => {
    if (game?.duration === time) {
      void playNextInQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, time, isPlaying]);

  // exemple på hvordan oppdatere timeplayed i backend
  // const useUpdateTimePlayedMutation = api.queue.updateTimePlayed.useMutation();
  // const handleUpdateTimePlayed = async (
  //   queuedId: number,
  //   timePlayed: number,
  // ) => {
  //   try {
  //     await useUpdateTimePlayedMutation.mutateAsync({
  //       queuedId: queuedId,
  //       timePlayed: timePlayed,
  //     });
  //     await queueQuery.refetch();
  //   } catch (e) {
  //     toast({
  //       title: "Obs! Noget gik galt",
  //       description: "Kunne ikke oppdatere tidspunktet",
  //     });
  //   }
  // };

  const useDeQueueMutation = api.queue.dequeue.useMutation();

  const playNextInQueue = async () => {
    if (firstInQueue && (queueQuery?.data?.length ?? 0) > 1) {
      const queuedId = firstInQueue.queuedId;
      const nextQueuedGame = queueQuery.data?.[1];
      try {
        await useDeQueueMutation.mutateAsync({ queuedId: queuedId });
        if (nextQueuedGame) setGameAndPlay(nextQueuedGame);
        else reset();
        await queueQuery.refetch();
      } catch (e) {
        toast({
          title: "Obs! Noget gik galt",
          description: "Kunne ikke fjerne spil fra køen",
        });
      }
    }
  };

  const setGameAndPlay = (queue: QueueItem) => {
    if (!queue) return;
    // const duration = Number(queue.game.duration) * 60;
    const duration = 10;
    if (!duration) return;
    console.log("setting game and starting");
    reset();
    setGame({
      duration,
      name: queue.game.name,
    });
  };

  return (
    <Card className="min-w-72">
      <CardHeader>Min kø</CardHeader>
      <SignedOut>
        <CardContent className="flex flex-col gap-2">
          <Button>
            <SignInButton>Log ind for at se din kø</SignInButton>
          </Button>
        </CardContent>
      </SignedOut>
      <SignedIn>
        <CardContent className="flex flex-col gap-2">
          {queueQuery.data?.map((queue) => (
            <QueueGameCard
              firstInQueue={firstInQueue}
              key={queue.queuedId}
              queueItem={queue}
              refetch={() => queueQuery.refetch()}
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
  firstInQueue,
}: {
  queueItem: QueueItem;
  refetch: VoidFunction;
  firstInQueue?: QueueItem;
}) => {
  const useDeQueueMutation = api.queue.dequeue.useMutation();
  const useReQueueMutation = api.queue.reQueue.useMutation();

  const { setGame, start, reset } = useTimerActions();
  const { isPlaying } = useTimerState();

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

  const handlePlayQueue = async (queuedItem: QueueItem) => {
    const queuedId = queuedItem?.queuedId;
    if (!queuedId) return;
    try {
      const mutations = [
        useReQueueMutation.mutateAsync({ queuedId: queuedId }),
      ];

      // jeg tenker at hvis noe spiller i backgrunnen så skal det fjernes fra køen
      if (isPlaying && firstInQueue) {
        mutations.push(
          useDeQueueMutation.mutateAsync({ queuedId: firstInQueue.queuedId }),
        );
      }
      // run all mutations simultaneously and wait for all to finish
      const promises = await Promise.all(mutations);
      const game = promises[0];
      if (game) setGameAndPlay(queueItem);
      refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke tilføje spil i starten av køen",
      });
    }
  };

  const setGameAndPlay = (queue: QueueItem) => {
    if (!queue) return;
    // const duration = Number(queue.game.duration) * 60;
    const duration = 10;
    if (!duration) return;
    console.log("setting game and starting");
    reset();
    setGame({
      duration,
      name: queue.game.name,
    });
    start();
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
              onClick={() => handlePlayQueue(queueItem)}
              variant={"ghost"}
              size={"icon"}
            >
              <PlayCircleOutlineRoundedIcon />
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
