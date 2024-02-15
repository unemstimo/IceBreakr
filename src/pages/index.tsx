import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.post.getAll.useQuery();
  console.log(data);
  const user = useUser()
  
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <SignedOut>
          <SignInButton />
          <p>
            This content is public. Only signed out users can see the
            SignInButton above this text.
          </p>
        </SignedOut>
        <SignedIn>

          <SignOutButton signOutCallback={() => redirect("/")} />
          <div className="text-center">
            <h3>Data fra databasen under</h3>
            {data
              ? data.map((post) => (
                  <div key={post.id} className="flex gap-2">
                    <p>{post.authorId}:</p>

                    <p>{post.content}</p>
                  </div>
                ))
              : "Loading..."}
          </div>
        </SignedIn>
      </main>
    </>
  );
}
