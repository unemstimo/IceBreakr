import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      {/* <Header /> */}
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
