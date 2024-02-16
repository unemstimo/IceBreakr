import Head from "next/head";

type PageWrapperProps = {
  children: React.ReactNode | React.ReactElement[];
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <>
      <Head>
        <title>IceBreakr</title>
        <meta
          name="dashboard"
          content="Learn more about what IceBreakr offers."
        />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 font-darker text-lg font-bold text-white">
        <div className="max-w-screen-l my-2 flex h-full w-full max-w-[1440px] gap-4 rounded-3xl bg-neutral-950 pb-2">
          {children}
        </div>
      </main>
    </>
  );
};

export default PageWrapper;
