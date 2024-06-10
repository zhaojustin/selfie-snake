import { Box, Image, Flex } from "@chakra-ui/react";

// A helper component for a single image row
const ImageRow = ({ images, offset }) => (
  <Flex justifyContent={offset ? "flex-end" : "flex-start"} mb={4}>
    {offset ? (
      <Flex>
        {images.reverse().map((src, index) => (
          <Image
            key={index}
            borderRadius={"25%"}
            mt={() => {
              if (index == 1) return 10;
              else if (index == 2) return 0;
              return 20;
            }}
            src={src}
            boxSize="100px"
            objectFit="cover"
            mx={2}
          />
        ))}
      </Flex>
    ) : (
      <Flex>
        {images.map((src, index) => (
          <Image
            mt={() => {
              if (index == 1) return 10;
              else if (index == 2) return 20;
              return 0;
            }}
            borderRadius={"25%"}
            key={index}
            src={src}
            boxSize="100px"
            objectFit="cover"
            mx={2}
          />
        ))}
      </Flex>
    )}
  </Flex>
);

export const ZigzagPattern = ({ imageUrls }) => {
  // split the imageUrls array into chunks of 3 images each
  const chunkedImages = [];
  for (let i = 0; i < imageUrls.length; i += 3) {
    chunkedImages.push(imageUrls.slice(i, i + 3));
  }

  return (
    <Box>
      {chunkedImages.map((images, index) => (
        <ImageRow key={index} images={images} offset={index % 2 !== 0} />
      ))}
    </Box>
  );
};
