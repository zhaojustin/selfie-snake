import { HStack, Heading, Image } from "@chakra-ui/react";

export const TomotimeHeader = () => {
  return (
    <HStack spacing={5} _hover={{ cursor: "pointer" }} onClick={() => alert()}>
      <Image src="icon.png" boxSize={8} borderRadius={10} />
      <Heading color="brand" fontWeight="semibold" size="lg">
        tomotime
      </Heading>
    </HStack>
  );
};
