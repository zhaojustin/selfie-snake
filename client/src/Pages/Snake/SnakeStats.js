import { Text, VStack } from "@chakra-ui/react";

export const SnakeStats = ({ snakeStats }) => {
  return (
    <VStack alignItems="left">
      <Text fontFamily="mono" color="brand" fontSize="sm">
        Length: {snakeStats.snakeLength}
      </Text>
      <Text fontFamily="mono" color="brand" fontSize="sm">
        Baby Snakes: {snakeStats.totalChildren}
      </Text>
    </VStack>
  );
};
