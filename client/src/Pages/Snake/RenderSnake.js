import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiArrowUp, FiPlus, FiShare } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { InstructionsModal } from "./Instructions";

const AddImageButton = ({ onAdd }) => {
  return (
    <Box
      boxSize="100px"
      bg="blue.50"
      shadow="sm"
      borderRadius={25}
      onClick={onAdd}
      _hover={{ cursor: "pointer", bg: "blue.100" }}
    >
      <Center h="100%">
        <VStack>
          <Icon as={FiPlus} color="brand" fontSize="2xl" />
        </VStack>
      </Center>

      {/* tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box position="relative" mt={2}>
          <VStack>
            <Icon as={FiArrowUp} color="gray.400" />
            <Text color="gray.400" fontWeight="semibold" fontSize="sm">
              you go here!
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};

const ImageRow = ({ images, offset, onAdd }) => {
  const adjustedImages = offset ? [...images].reverse() : images;

  return (
    <SimpleGrid columns={3} spacing={2} mb={4}>
      {adjustedImages.map((image, index) => (
        <Box
          key={index}
          textAlign="center"
          mx={1}
          mt={
            offset
              ? index === 1
                ? 10
                : index === 2
                ? 0
                : 20
              : index === 1
              ? 10
              : index === 2
              ? 20
              : 0
          }
        >
          {image.placeholder ? (
            <Box boxSize="100px" />
          ) : image.firstItem ? (
            <AddImageButton onAdd={onAdd} />
          ) : (
            <Box
              _hover={{ cursor: "pointer" }}
              onClick={() =>
                window.location.assign(
                  "https://instagram.com/" + image.created_by
                )
              }
            >
              <Image
                src={image.imageUrl}
                boxSize="100px"
                objectFit="cover"
                borderRadius={25}
                shadow="sm"
              />
              <Text mt={1} fontFamily="mono" fontSize="sm" color="brand">
                @{image.created_by}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </SimpleGrid>
  );
};

const ZigzagPattern = ({ snake }) => {
  const navigate = useNavigate();
  let { snakeId } = useParams();

  const modifiedImagesData = [{ firstItem: true }, ...snake];

  // Split the sorted imagesData array into chunks of 3 images each
  const chunkedImages = [];
  for (let i = 0; i < modifiedImagesData.length; i += 3) {
    chunkedImages.push(modifiedImagesData.slice(i, i + 3));
  }

  // Ensure the last chunk has exactly 3 items by adding placeholders
  const lastChunk = chunkedImages[chunkedImages.length - 1];
  while (lastChunk.length < 3) {
    // add a creator tag to the last one
    lastChunk[lastChunk.length - 1].isCreator = true;
    lastChunk.push({ placeholder: true });
  }

  return (
    <Box>
      {chunkedImages.map((images, index) => (
        <ImageRow
          key={index}
          images={images}
          offset={index % 2 !== 0}
          onAdd={() => navigate(`/snake/${snakeId}/add`)}
        />
      ))}
    </Box>
  );
};

export const RenderSnake = ({ snake }) => {
  const toast = useToast();
  const navigate = useNavigate();

  // Extract image URLs and usernames from the snake data
  const processedData = snake
    .map((s) => s.entries)
    .flat()
    .map((entry) => ({
      imageUrl: entry.image_url,
      created_by: entry.username,
      created_at: entry.created_at,
    }));

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
    <VStack>
      <VStack mb={5}>
        <Text fontSize="xl" fontWeight="bold" fontFamily="mono">
          🐍 @{snake[snake.length - 1].created_by}'s Snake
        </Text>
        <HStack>
          <Text fontFamily="mono" color="brand" fontSize="md">
            {snake.length}
          </Text>
          <Text fontFamily="mono" fontSize="md">
            Selfies
          </Text>
        </HStack>
      </VStack>

      <HStack justify="space-between" w="100%" alignItems="baseline" mb={10}>
        <VStack alignItems="flex-start">
          <InstructionsModal />
        </VStack>

        <HStack
          _hover={{ cursor: "pointer", bg: "blue.50" }}
          p={2}
          borderRadius={15}
          onClick={() => navigate("/create")}
        >
          <Icon as={FiPlus} color="brand" />
          <Text fontFamily="mono" color="brand" fontSize="sm">
            Create
          </Text>
        </HStack>

        <VStack alignItems="flex-end" spacing={0}>
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
        </VStack>
      </HStack>

      {/* content */}
      <ZigzagPattern snake={processedData} />
    </VStack>
  );
};

export default RenderSnake;
