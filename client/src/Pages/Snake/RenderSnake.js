import {
  Box,
  Center,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

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
            <Box
              boxSize="100px"
              bg="blue.50"
              borderRadius={25}
              onClick={onAdd}
              _hover={{ cursor: "pointer", bg: "blue.100" }}
            >
              <Center h="100%">
                <VStack>
                  <Icon as={FiPlus} color="brand" fontSize="2xl" />
                </VStack>
              </Center>
            </Box>
          ) : (
            <>
              <Image
                src={image.imageUrl}
                boxSize="100px"
                objectFit="cover"
                borderRadius={25}
              />
              <Text mt={2}>{image.created_by}</Text>
            </>
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
  // Extract image URLs and usernames from the snake data
  const processedData = snake
    .map((s) => s.entries)
    .flat()
    .map((entry) => ({
      imageUrl: entry.image_url,
      created_by: entry.username,
    }));

  return (
    <VStack>
      <ZigzagPattern snake={processedData} />
    </VStack>
  );
};

export default RenderSnake;
