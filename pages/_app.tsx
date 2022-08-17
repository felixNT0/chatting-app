import "antd-css-utilities/utility.min.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import ProgressBar from "react-progressbar-on-scroll";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar
        color="pink"
        gradient={true}
        height={5}
        gradientColor="yellow"
      />
      <NextNProgress
        color="black"
        startPosition={0.1}
        height={5}
        showOnShallow={true}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
