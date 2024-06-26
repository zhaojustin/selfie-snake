import { useEffect, useState } from "react";
import { baseUrl } from "../api/util";
import { Box, Flex, Icon, Center, Text, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FiCopy } from "react-icons/fi";

export const ShareableLinkBox = () => {
  const { snakeId } = useParams();
  const toast = useToast();
  const [shareableLink, setShareableLink] = useState(baseUrl);
  useEffect(() => {
    setShareableLink(baseUrl + "/snake/" + snakeId);
  }, [snakeId]);

  const handleClick = () => {
    navigator.clipboard.writeText(shareableLink);

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
    <Box my={10} bg="blue.50" p={5} borderRadius={25} mx={5}>
      <Text fontSize="lg" color="brand" fontWeight="semibold">
        Add your friends to the snake!
      </Text>

      <Flex
        bg="white"
        alignItems="center"
        direction="row"
        mt={2}
        mx={-2}
        px={2}
        py={2}
        overflowX="hidden"
        borderRadius={15}
        onClick={handleClick}
        _hover={{ cursor: "pointer" }}
      >
        <Text fontFamily="mono" color="brand" fontSize="xs" pr={5}>
          {shareableLink}
        </Text>
        <Icon as={FiCopy} color="brand" />
      </Flex>
    </Box>
  );
};
