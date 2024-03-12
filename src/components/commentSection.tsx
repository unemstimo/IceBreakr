import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Button } from "~/components/ui/button";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { api } from "~/utils/api";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import StarIcon from "@mui/icons-material/Star";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { EditIcon, TrashIcon } from "lucide-react";
import classNames from "classnames";
import { useUser } from "@clerk/nextjs";

type CommentSectionProps = {
  gameId: number;
};

const CommentSection = ({ gameId }: CommentSectionProps) => {
  const user = useUser();
  const ratingQuery = api.rating.getRatingsByGameId.useQuery({
    gameId,
  });
  const useDeleteRating = api.rating.delete.useMutation();

  const [editCommentId, setEditCommentId] = useState<number | null>(null);

  const handleDeleteComment = async (ratingId: number) => {
    try {
      await useDeleteRating.mutateAsync({ ratingId });
      await ratingQuery.refetch();
    } catch (e) {
      console.error("Error deleting rating: ", e);
    }
  };

  return (
    <ul className="flex w-full flex-col items-center justify-start gap-4 overflow-scroll align-middle text-rg">
      {ratingQuery.data?.map((comment) => (
        // eslint-disable-next-line react/jsx-key
        <li
          key={
            String(comment.ratingId) +
            String(comment.description) +
            String(comment.starRating)
          }
          className="relative flex h-full w-full items-center justify-between gap-4 rounded-lg bg-neutral-800 p-4 align-middle"
        >
          {editCommentId !== comment.ratingId ? (
            <>
              <div className="flex h-full items-center gap-4">
                {/* TODO: get user profile photo */}
                <div className="flex items-center justify-center rounded-full bg-violet-500 px-3 py-0">
                  <StarRoundedIcon />
                  {comment.starRating}
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h2 className="-mb-1">{comment.user.username}</h2>
                  <p className="-mt-1 font-normal text-neutral-400">
                    {comment.description}
                  </p>
                </div>
              </div>
              {comment.userId === user.user?.id && (
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizRoundedIcon />
                  </PopoverTrigger>
                  <PopoverContent className="!w-fit !p-2">
                    <div className="flex flex-col gap-4">
                      {/* TODO: add report! */}
                      <Button
                        className="gap-4"
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => setEditCommentId(comment.ratingId)}
                      >
                        <p>Rediger</p>
                        <EditIcon />
                      </Button>
                      <Button
                        className="gap-4"
                        variant={"destructive"}
                        size={"sm"}
                        onClick={() => handleDeleteComment(comment.ratingId)}
                      >
                        <p>Slett</p>
                        <TrashIcon />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </>
          ) : (
            <CommentForm
              gameId={gameId}
              refetch={ratingQuery.refetch}
              defaultValues={{
                comment: comment.description ?? "",
                rating: comment.starRating,
                ratingId: comment.ratingId,
              }}
              onFinish={() => setEditCommentId(null)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentSection;

type CommentFormProps = {
  gameId: number;
  refetch: VoidFunction;
  defaultValues?: { comment: string; rating: number; ratingId: number };
  onFinish?: VoidFunction;
};

const CommentForm = ({
  gameId,
  refetch,
  defaultValues,
  onFinish,
}: CommentFormProps) => {
  const useRating = api.rating.create.useMutation();
  const useRatingUpdate = api.rating.update.useMutation();
  const [comment, setComment] = useState(defaultValues?.comment ?? "");
  const [rating, setRating] = useState(defaultValues?.rating);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (comment === "" || !rating) {
      return;
    }

    try {
      if (defaultValues) {
        await useRatingUpdate.mutateAsync({
          ratingId: defaultValues.ratingId,
          starRating: rating,
          description: comment,
        });
      } else {
        await useRating.mutateAsync({
          gameId: gameId,
          starRating: rating,
          description: comment,
        });
      }
      setComment("");
      setRating(undefined);
      refetch();
      if (onFinish) onFinish();
    } catch (e) {
      console.error("Error submitting rating: ", e);
    }
  };

  return (
    <div
      className={classNames("", {
        "w-full rounded-xl bg-neutral-700 p-2": defaultValues,
      })}
    >
      <form
        onSubmit={handleCommentSubmit}
        className={classNames(
          "flex h-full w-full  items-center justify-center gap-4  text-rg font-normal",
        )}
      >
        <Input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Select
          value={rating ? String(rating) : undefined}
          onValueChange={(val) => {
            setRating(Number(val));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                <div key={i} className="ietms-center flex gap-2">
                  <p>{i + 1}</p>
                  <StarIcon className="text-white" />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit">{defaultValues ? "Oppdater" : "Legg til"}</Button>
      </form>
    </div>
  );
};
export { CommentForm };
