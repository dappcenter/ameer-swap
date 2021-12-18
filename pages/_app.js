import "@fontsource/cairo";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <MoralisProvider
        appId="cYF8xeB2uApPO3vflmds45CpxO3k7r5NufMPeivG"
        serverUrl="https://dzzhe58erkny.usemoralis.com:2053/server"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
