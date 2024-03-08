import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Card, CardContent, CardHeader } from "./ui/card";
import { api } from "~/utils/api";
import { type QueueItem } from "~/server/api/routers/queue";
import { useToast } from "./ui/use-toast";

const QueueBar = () => {
  const queueQuery = api.queue.getQueue.useQuery();
  return (
    <Card>
      <CardHeader>Min kø</CardHeader>
      <CardContent className="flex flex-col gap-2">
        {queueQuery.data?.map((game) => (
          <QueueGameCard
            key={game.gameId}
            queueItem={game}
            refetch={() => queueQuery.refetch()}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default QueueBar;

const QueueGameCard = ({
  queueItem,
  refetch,
}: {
  queueItem: QueueItem;
  refetch: VoidFunction;
}) => {
  const useQueueMutation = api.queue.dequeue.useMutation();
  const { toast } = useToast();

  const handleDequeue = async (id: number) => {
    try {
      await useQueueMutation.mutateAsync({ queuedId: id });
      refetch();
    } catch (e) {
      toast({
        title: "Obs! Noget gik galt",
        description: "Kunne ikke fjerne spil fra køen",
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
            <PlayCircleOutlineRoundedIcon />
            {/* <MoreHorizRoundedIcon /> */}
            <CloseRoundedIcon
              onClick={() => handleDequeue(queueItem.queuedId)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
