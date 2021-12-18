import { useState } from "react";
import { useOneInchTokens } from "react-moralis";

// components
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";

// assets
import {
  FaChevronDown as ChevronDownIcon,
  FaArrowDown as ArrowDownIcon,
} from "react-icons/fa";

const SwapTokens = ({ selectedChain }) => {
  const { colorMode } = useColorMode();
  const { data, error } = useOneInchTokens({ chain: selectedChain });

  const [tokensModalOpen, setTokensModalOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [type, setType] = useState("from");
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);

  const tokensList = data?.tokens;

  return (
    <Box
      bg={colorMode == "light" ? "white" : "gray.600"}
      p="2"
      mt="6"
      w="400px"
      borderRadius="lg"
    >
      <Box display="flex" justifyItems="space-between">
        <Menu
          isLazy
          modifiers={{ name: "eventListeners", options: { scroll: false } }}
        >
          <MenuButton
            onClick={() => {
              setType("from");
              setTokensModalOpen(true);
            }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {fromToken ? fromToken.name : "From Token"}
          </MenuButton>
        </Menu>
        <Spacer />
        <Input w="60%" />
      </Box>

      {/* <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyItems="center"
        w="100%"
        mt="6"
        mb="2"
      >
        <Icon as={ArrowDownIcon} width={30} height={30} />
      </Box> */}

      <Box display="flex" justifyItems="space-between" mt="5">
        <Menu>
          <MenuButton
            onClick={() => {
              setType("to");
              setTokensModalOpen(true);
            }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {toToken ? toToken.name : "To Token"}
          </MenuButton>
        </Menu>
        <Spacer />
        <Input w="60%" />
      </Box>

      <Button mt="4" isFullWidth={true}>
        Swap
      </Button>

      <Modal isOpen={tokensModalOpen} onClose={() => setTokensModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxH="80vh" overflow="scroll">
          <ModalHeader>Choose Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Token Name"
              mb="6"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            {tokensList
              ? Object.keys(tokensList)
                  .filter((tokenKey) =>
                    nameFilter
                      ? data?.tokens[tokenKey].name
                          .toLowerCase()
                          .includes(nameFilter)
                      : true
                  )
                  .map((tokenKey) => (
                    <Box
                      key={tokenKey}
                      minH="48px"
                      display="flex"
                      alignItems="center"
                      px="2"
                      borderRadius="lg"
                      cursor="pointer"
                      mb="2"
                      _hover={{ backgroundColor: "gray.100" }}
                      onClick={() => {
                        if (type == "from") {
                          setFromToken(tokensList[tokenKey]);
                        } else {
                          setToToken(tokensList[tokenKey]);
                        }
                        setTokensModalOpen(false);
                      }}
                    >
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={tokensList[tokenKey].logoURI}
                        alt={tokensList[tokenKey].name}
                        mr="12px"
                      />
                      <Text>{tokensList[tokenKey].name}</Text>
                      <Spacer />
                      <Text color="gray.400">
                        {tokensList[tokenKey].symbol}
                      </Text>
                    </Box>
                  ))
              : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SwapTokens;
