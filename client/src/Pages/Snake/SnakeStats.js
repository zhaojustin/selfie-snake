import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiPlus, FiShare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api/util";

export const SnakeStats = ({ snakeStats }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location);

    toast({
      title: "Link copied!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
      render: () => (
        <Box>
          <Center>
            <Box bg="brand" p={3} px={5} borderRadius={15}>
              <Text color="white" fontWeight="semibold">
                😊 Link copied!
              </Text>
            </Box>
          </Center>
        </Box>
      ),
    });
  };

  return (
    <HStack spacing={5} my={5}>
      <VStack
        bg="gray.50"
        borderRadius={25}
        p={2}
        boxSize={24}
        justifyContent="center"
      >
        <Text fontFamily="mono" color="brand" fontSize="sm">
          Length
        </Text>
        <Text fontFamily="mono" fontWeight="bold" color="brand">
          {snakeStats.snakeLength}
        </Text>
      </VStack>
      <VStack bg="gray.50" borderRadius={25} p={2} boxSize={24}>
        <Text
          fontFamily="mono"
          color="brand"
          maxW={20}
          textAlign="center"
          fontSize="sm"
          justifyContent="center"
        >
          Baby Snakes
        </Text>
        <Text fontFamily="mono" fontWeight="bold" color="brand">
          {snakeStats.totalChildren}
        </Text>
      </VStack>
      <VStack maxH={24}>
        <Button
          w={24}
          leftIcon={<Icon as={FiPlus} />}
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
        <Button w={24} leftIcon={<Icon as={FiShare} />} onClick={handleShare}>
          Share
        </Button>
      </VStack>
    </HStack>
  );
};
