import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
      ;
    </>
  );
}

export default MyApp;
