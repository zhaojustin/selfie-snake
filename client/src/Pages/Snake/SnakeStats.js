import { Box, Center, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { FiShare } from "react-icons/fi";

export const SnakeStats = ({ snakeStats }) => {
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
            <Box bg="blue.50" p={3} px={5} borderRadius={15}>
              <Text color="brand" fontWeight="semibold">
                Link copied!
              </Text>
            </Box>
          </Center>
        </Box>
      ),
    });
  };

  return (
    <HStack spacing={10} mb={10}>
      <Text fontFamily="mono" color="brand" fontSize="sm">
        Length: {snakeStats.snakeLength}
      </Text>
      <Text fontFamily="mono" color="brand" fontSize="sm">
        Baby Snakes: {snakeStats.totalChildren}
      </Text>
      <HStack
        _hover={{ cursor: "pointer", bg: "blue.50" }}
        p={2}
        borderRadius={15}
        onClick={handleShare}
      >
        <Icon as={FiShare} color="brand" />
        <Text fontFamily="mono" color="brand" fontSize="sm">
          Share
        </Text>
      </HStack>
    </HStack>
  );
};
