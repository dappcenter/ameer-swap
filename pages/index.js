import { Box, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import SelectChain from "../components/SelectChain";
import SwapTokens from "../components/SwapTokens";

export default function Home() {
  const { colorMode } = useColorMode();
  const [selectedChain, setSelectedChain] = useState("eth");

  return (
    <Box bg={colorMode == "light" ? "gray.100" : "gray.500"} minH="100vh">
      <Header />
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyItems="center"
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
