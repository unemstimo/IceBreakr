import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Card, CardContent, CardHeader } from "./ui/card";
import { api } from "~/utils/api";
import { type QueueItem } from "~/server/api/routers/queue";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const QueueBar = () => {
  const queueQuery = api.queue.getQueue.useQuery();
  const firstInQueue = queueQuery.data?.[0];
  const { toast } = useToast();

  // exemple på hvordan oppdatere timeplayed i backend
  const useUpdateTimePlayedMutation = api.queue.updateTimePlayed.useMutation();
  const handleUpdateTimePlayed = async (
    queuedId: number,
    timePlayed: number,
  ) => {
    try {
      await useUpdateTimePlayedMutation.mutateAsync({
        queuedId: queuedId,
        timePlayed: timePlayed,
      });
      await queueQuery.refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke oppdatere tidspunktet",
      });
    }
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
          {queueQuery.data?.map((game) => (
            <QueueGameCard
              firstInQueue={firstInQueue}
              key={game.gameId}
              queueItem={game}
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

  const handleReQueue = async (queuedId: number) => {
    try {
      const mutations = [
        useReQueueMutation.mutateAsync({ queuedId: queuedId }),
      ];

      // jeg tenker at hvis noe spiller i backgrunnen så skal det fjernes fra køen
      if (firstInQueue?.timePlayed && firstInQueue.timePlayed > 0) {
        mutations.push(
          useDeQueueMutation.mutateAsync({ queuedId: firstInQueue.queuedId }),
        );
      }
      // run all mutations simultaneously and wait for all to finish
      await Promise.all(mutations);
      refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke tilføje spil i starten av køen",
      });
    }
  };
  if (!queueItem) return null;
  return (
    <Card className="!border-neutral-800 !pt-6">
      <CardContent>
        <div className="flex flex-row items-center  justify-between align-middle">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {queueItem.game.name}
          </h3>
          <div className="flex flex-row items-center justify-between gap-2 align-middle">
            <Button
              onClick={() => handleReQueue(queueItem.queuedId)}
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
