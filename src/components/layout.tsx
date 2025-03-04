import React from "react";
import Head from "next/head";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { useRouter } from "next/router";
import QueueBar from "./queueBar";
import CountdownComponent from "./countdownComponent";
type ChildrenType = {
  children: React.ReactNode;
  navbarChildren?: React.ReactNode;
  friendsbarChildren?: React.ReactNode;
};

const Layout = ({ children, navbarChildren }: ChildrenType) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.basePath} | IceBreakr</title>
        <meta
          name={router.basePath}
          content="Learn more about what IceBreakr offers."
        />
      </Head>

      <PageWrapper>
        <NavigationBar>{navbarChildren}</NavigationBar>
        {children}
        <div className="flex flex-col gap-4">
          {/* <MyFriendsBar /> */}
          <CountdownComponent />
          <QueueBar />
        </div>
      </PageWrapper>
    </>
  );
};

export default Layout;
