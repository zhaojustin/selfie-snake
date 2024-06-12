import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const TomotimeHeader = () => {
  const navigate = useNavigate();
  return (
    <VStack
      mb={10}
      _hover={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      <Heading fontFamily="heading" fontWeight="black">
        Selfie Snake
      </Heading>
      <HStack>
        <Text>by</Text>
        <Text display="inline" fontWeight="semibold" color="brand">
          tomotime
        </Text>
      </HStack>
    </VStack>
  );
};
