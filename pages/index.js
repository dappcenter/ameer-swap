import { Box, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import SelectChain from "../components/SelectChain";
import SwapTokens from "../components/SwapTokens";

export default function Home() {
  const { colorMode } = useColorMode();
  const [selectedChain, setSelectedChain] = useState("eth");
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Box bg={colorMode == "light" ? "gray.100" : "gray.500"} minH="100vh">
      <Header />
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyItems="center"
        m={["6", "0"]}
      >
        <Box display="flex" flexDir="column">
          <SelectChain
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
          />

          <SwapTokens selectedChain={selectedChain} />
        </Box>
      </Box>
    </Box>
  );
}
