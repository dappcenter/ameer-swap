import { useEffect, useState } from "react";
import { useOneInchTokens } from "react-moralis";

// components
import {
  Box,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
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
import TokenPrice from "./TokenPrice";

// assets
import {
  FaChevronDown as ChevronDownIcon,
  FaArrowDown as ArrowDownIcon,
} from "react-icons/fa";
import InputWithToToken from "./InputWithToToken";
import SwapButton from "./SwapButton";

const SwapTokens = ({ selectedChain }) => {
  const { colorMode } = useColorMode();

  const [tokensModalOpen, setTokensModalOpen] = useState(false);
  const [toAmount, setToAmount] = useState(0);
  const [fromAmount, setFromAmount] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [type, setType] = useState("from");
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);

  const { data } = useOneInchTokens({ chain: selectedChain });

  useEffect(() => {
    setFromToken(null);
    setFromAmount(0);
    setToToken(null);
    setToAmount(0);
  }, [selectedChain]);

  const tokensList = data?.tokens;

  return (
    <Box
      bg={colorMode == "light" ? "white" : "gray.600"}
      p={"2"}
      mt="6"
      w={["100%", "400px"]}
      borderRadius="lg"
    >
      {/* from Token and Amount */}
      <Box
        display="flex"
        flexDir={["column", "row"]}
        justifyItems="space-between"
      >
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
        <Box w={["100%", "60%"]} mt={["4", "0"]}>
          <Input
            placeholder="Amount"
            value={fromAmount ? fromAmount : ""}
            onChange={(e) => setFromAmount(e.target.value)}
          />
          {fromToken && fromAmount ? (
            <TokenPrice
              fromToken={fromToken}
              amount={fromAmount}
              selectedChain={selectedChain}
            />
          ) : null}
        </Box>
      </Box>

      {/* to Token and Amount */}
      <Box
        display="flex"
        flexDir={["column", "row"]}
        justifyItems="space-between"
        mt={fromToken && fromAmount ? "2" : "6"}
      >
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
        <Box w={["100%", "60%"]} mt={["4", "0"]}>
          {toToken ? (
            <InputWithToToken
              selectedChain={selectedChain}
              fromToken={fromToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              toToken={toToken}
              setToAmount={setToAmount}
            />
          ) : (
            <Input
              value={toAmount ? toAmount : ""}
              onChange={(e) => {}}
              placeholder="Amount"
            />
          )}
          {toToken && toAmount ? (
            <TokenPrice
              fromToken={toToken}
              amount={toAmount}
              selectedChain={selectedChain}
            />
          ) : null}
        </Box>
      </Box>

      {fromToken && fromAmount && toToken ? (
        <SwapButton
          fromToken={fromToken}
          fromAmount={fromAmount}
          toToken={toToken}
          toAmount={toAmount}
          selectedChain={selectedChain}
        />
      ) : null}

      <Modal
        isOpen={tokensModalOpen}
        onClose={() => {
          setNameFilter("");
          setTokensModalOpen(false);
        }}
      >
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
                      _hover={{
                        backgroundColor:
                          colorMode == "light" ? "gray.100" : "gray.600",
                      }}
                      onClick={() => {
                        if (type == "from") {
                          setFromToken(tokensList[tokenKey]);
                        } else {
                          setToToken(tokensList[tokenKey]);
                        }
                        setNameFilter("");
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
