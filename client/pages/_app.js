import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
