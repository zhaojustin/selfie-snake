import { Button, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { TomotimeHeader } from "../Components/Header";
import { ZigzagPattern } from "../Components/Snake";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <VStack mt={20}>
      <VStack mb={20}>
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

      <Button onClick={() => navigate("/create")}>Create a snake!</Button>
      <Button>View my snake</Button>
    </VStack>
  );
}
