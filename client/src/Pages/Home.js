import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { TomotimeHeader } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { FiLink, FiSmile, FiTrendingUp } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();

  return (
    <VStack mb={10}>
      <Box maxW="300px" mt={10}>
        <TomotimeHeader />

        <Text fontSize="lg" mt={2}>
          Create a chain of selfies with your friends, and watch it grow.
        </Text>

        <Text fontSize="lg" mt={4}>
          Let's see how far friends of friends can go!
        </Text>

        <VStack alignItems="left" my={10} spacing={5}>
          <HStack alignItems="center" spacing={4}>
            <Icon as={FiSmile} color="purple.400" fontSize={30} />
            <Text fontSize="lg" fontWeight="semibold">
              Take a selfie and add to the selfie snake.
            </Text>
          </HStack>
          <HStack alignItems="center" spacing={4}>
            <Icon as={FiLink} color="green.400" fontSize={30} />
            <VStack alignItems="left" spacing={0}>
              <Text fontSize="lg" fontWeight="semibold">
                Post the link on your story.
              </Text>
              <Text fontSize="md" color="gray.600">
                Or send it to your friends!
              </Text>
            </VStack>
          </HStack>
          <HStack alignItems="center" spacing={4}>
            <Icon as={FiTrendingUp} color="brand" fontSize={30} />
            <VStack alignItems="left" spacing={0}>
              <Text fontSize="lg" fontWeight="semibold">
                Watch it grow!
              </Text>
              <Text fontSize="md" color="gray.600">
                Friends of friends of friends....
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      <Button size="lg" borderRadius={20} onClick={() => navigate("/create")}>
        Create a snake!
      </Button>
    </VStack>
  );
}
