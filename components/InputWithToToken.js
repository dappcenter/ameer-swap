import { Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useMoralis, useOneInchQuote } from "react-moralis";

const InputWithToToken = ({
  selectedChain,
  fromToken,
  fromAmount,
  toAmount,
  toToken,
  setToAmount,
}) => {
  const { Moralis } = useMoralis();
  const {
    data: quoteData,
    error,
    getQuote,
  } = useOneInchQuote({
    chain: selectedChain,
    fromToken: fromToken,
    toToken: toToken,
    fromAmount: fromAmount,
  });

  useEffect(() => {
    getQuote({
      chain: selectedChain,
      fromToken: fromToken,
      toToken: toToken,
      fromAmount: fromAmount,
    });
  }, [fromAmount, fromToken, toToken, selectedChain]);

  useEffect(() => {
    if (quoteData) {
      setToAmount(
        Moralis.Units.FromWei(
          quoteData?.toTokenAmount,
          quoteData?.toToken?.decimals
        ).toFixed(6)
      );
    }
  }, [quoteData]);

  return (
    <Input
      placeholder="Amount"
      value={
        quoteData
          ? Moralis.Units.FromWei(
              quoteData?.toTokenAmount,
              quoteData?.toToken?.decimals
            ).toFixed(6)
          : ""
      }
    />
  );
};

export default InputWithToToken;
