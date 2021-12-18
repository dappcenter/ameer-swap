// components
import { Box, Icon, Text, useColorMode } from "@chakra-ui/react";

// assets
import ETHLogo from "../assets/svgs/ETHLogo";
import BSCLogo from "../assets/svgs/BSCLogo";
import PolygonLogo from "../assets/svgs/PolygonLogo";

const chains = [
  { value: "eth", name: "ETH", logo: ETHLogo },
  { value: "bsc", name: "BSC", logo: BSCLogo },
  { value: "polygon", name: "Polygon", logo: PolygonLogo },
];

const SelectChain = ({ selectedChain, setSelectedChain }) => {
  const { colorMode } = useColorMode();

  return (
    <Box display="flex" flexDir="column" alignItems="flex-start">
      <Text fontSize="xl" my="6">
        Select Chain
      </Text>
      <Box display="flex">
        {chains.map((chain) => (
          <Box
            key={chain.value}
            bg={
              selectedChain == chain.value
                ? colorMode == "light"
                  ? "white"
                  : "gray.600"
                : "transparent"
            }
            p={2}
            borderRadius={6}
            display="flex"
            onClick={() => setSelectedChain(chain.value)}
            cursor="pointer"
            mr="6"
            transition="background-color 200ms linear"
          >
            <Icon as={chain.logo} />
            <Text ml="2">{chain.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SelectChain;
