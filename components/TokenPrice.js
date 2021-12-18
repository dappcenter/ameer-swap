import { Box, Fade } from "@chakra-ui/react";
import { useTokenPrice } from "react-moralis";
import formateNumber from "../helpers/formateNumber";

const TokenPrice = ({ selectedChain, fromToken, amount }) => {
  const { data } = useTokenPrice({
    chain: selectedChain,
    address: fromToken.address,
  });
  return (
    <Fade in={data?.usdPrice && amount}>
      <Box mt="2" transitionDelay={200}>
        ~$ {formateNumber(data?.usdPrice * amount)}
      </Box>
    </Fade>
  );

  return null;
};

export default TokenPrice;
