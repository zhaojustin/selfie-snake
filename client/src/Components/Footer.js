import { HStack, Heading, Image, VStack, Text } from "@chakra-ui/react";
export const Footer = () => {
  return (
    <VStack spacing={2} pb={20}>
      <Text fontWeight="medium" size="md">
        Created with ❤️, by the team at
      </Text>
      <HStack
        spacing={2}
        _hover={{ cursor: "pointer" }}
        onClick={() => window.location.assign("https://tomotime.app")}
      >
        <Image src="icon.png" boxSize={8} borderRadius={10} />
        <Heading
          color="brand"
          fontFamily="body"
          fontWeight="semibold"
          size="lg"
        >
          tomotime
        </Heading>
      </HStack>
    </VStack>
  );
};
