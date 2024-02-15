/**
 * Integration test example for the `post` router
 */
import { type inferProcedureInput } from "@trpc/server";
import { type AppRouter, appRouter, createFactory } from "../../root";
import { db } from "~/server/db";

// Legg til vitest extenion i vscode for å kjøre her eller kjør `npm run test` i terminalen
test("add and get post", async () => {
  const createCaller = createFactory(appRouter.post);
  //   gå i db for å endre database url
  const postCaller = createCaller({ db });

  const input: inferProcedureInput<AppRouter["post"]["create"]> = {
    authorId: "1",
    content: "Hello, world!",
  };

  const allPostsLenght = await postCaller
    .getAll()
    .then((posts) => posts.length);

  const post = await postCaller.create(input);
  const byId = await postCaller.getPostsByUserId({ userId: "1" });
  expect(byId).toEqual([post]);
  const allPostsLenghtAfter = await postCaller
    .getAll()
    .then((posts) => posts.length);
  expect(allPostsLenghtAfter).toEqual(allPostsLenght + 1);
  const deletePost = await postCaller.delete({ id: post.id });
  const allPostsLenghtAfterDelete = await postCaller
    .getAll()
    .then((posts) => posts.length);
  expect(allPostsLenghtAfterDelete).toEqual(allPostsLenght);
});
