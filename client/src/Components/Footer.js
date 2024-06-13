import { HStack, Heading, Image, VStack, Text } from "@chakra-ui/react";
import ReactGA from "react-ga4";
const TRACKING_ID = "G-QJ3NR3QPZY"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export const Footer = () => {
  return (
    <VStack spacing={2} pb={10}>
      <Text fontWeight="medium" size="md">
        Created with ❤️, by the team at
      </Text>
      <HStack
        spacing={2}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          window.location.assign("https://tomotime.app");
          ReactGA.event({
            category: "redirect-to-tomotime",
            action: "footer-click",
          });
        }}
      >
        <Image src="/icon.png" boxSize={8} borderRadius={10} />
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
