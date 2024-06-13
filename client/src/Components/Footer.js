import { HStack, Heading, Image, VStack, Text } from "@chakra-ui/react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Blog category") => {
  const eventTracker = (
    action = "click on tomotime footer",
    label = "tomotime footer click label"
  ) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export const Footer = () => {
  const gaEventTracker = useAnalyticsEventTracker("Contact us");

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
          gaEventTracker("redirect-to-tomotime");
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
