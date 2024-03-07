import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const useUserMuation = api.user.create.useMutation();
  const router = useRouter();

  const {
    data: userDb,
    isLoading,
    isSuccess,
  } = api.user.getUserById.useQuery(
    {
      id: user.user?.id ?? "",
    },
    { enabled: user.user?.id !== undefined },
  );

  const queueQuery = api.playlist.getQueuePlaylist.useQuery();
  const useQueueMutation = api.playlist.createQueue.useMutation();

  useEffect(() => {
    if (isLoading || queueQuery.isLoading) return;

    if (!user.isSignedIn) {
      router.push("/dashboard");
    } else if (
      user.isSignedIn &&
      userDb?.userId !== user.user?.id &&
      isSuccess
    ) {
      const input = {
        mail: user?.user?.primaryEmailAddress?.emailAddress ?? "11",
        username: user?.user?.fullName ?? "11",
        administrator: false,
      };
      useUserMuation.mutate(input);
    } else if (queueQuery.isSuccess && queueQuery.data?.length === 0) {
      useQueueMutation.mutate();
    } else {
      router.push("/dashboard");
    }
  }, [
    isLoading,
    isSuccess,
    router,
    useUserMuation,
    user,
    userDb,
    queueQuery,
    useQueueMutation,
  ]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className=" text-white">Loading</h1>
    </div>
  );
}
