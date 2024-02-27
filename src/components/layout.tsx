import React from "react";
import Head from "next/head";
import Link from "next/link";
import PageWrapper from "~/components/pageWrapper";
import NavigationBar from "~/components/navigationBar";
import { useRouter } from "next/router";
type ChildrenType = {
  children: React.ReactNode;
  navbarChildren?: React.ReactNode;
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
      </PageWrapper>
    </>
  );
};

export default Layout;
