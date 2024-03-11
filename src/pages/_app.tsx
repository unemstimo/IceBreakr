import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "~/redux/store";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
