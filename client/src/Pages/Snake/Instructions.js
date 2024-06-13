import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiHelpCircle, FiLink, FiSmile, FiTrendingUp } from "react-icons/fi";
import { TomotimeHeader } from "../../Components/Header";
import Cookies from "js-cookie";
import { useEffect } from "react";

const MotionBox = motion(Box);

const InstructionsBox = ({ onClose }) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      width="100%"
      h="100%"
      bg="white"
      zIndex={10}
      position="fixed"
      top={0}
      left={0}
      p={2}
    >
      <VStack width="100%" h="100%" spacing={4}>
        <Box maxW="300px" mt={10}>
          <TomotimeHeader />

          <Text fontSize="xl" fontWeight="bold">
            How it works
          </Text>

          <Text fontSize="lg" mt={2}>
            Create a chain of selfies with your friends, and watch it grow.
          </Text>

          <Text fontSize="lg" mt={4}>
            Let's see how far friends of friends can go!
          </Text>

          <VStack alignItems="left" my={10} spacing={5}>
            <HStack alignItems="center" spacing={4}>
              <Icon as={FiSmile} color="purple.400" fontSize={30} />
              <Text fontSize="lg" fontWeight="semibold">
                Take a selfie and add to the selfie snake.
              </Text>
            </HStack>
            <HStack alignItems="center" spacing={4}>
              <Icon as={FiLink} color="green.400" fontSize={30} />
              <VStack alignItems="left" spacing={0}>
                <Text fontSize="lg" fontWeight="semibold">
                  Post the link on your story.
                </Text>
                <Text fontSize="md" color="gray.600">
                  Or send it to your friends!
                </Text>
              </VStack>
            </HStack>
            <HStack alignItems="center" spacing={4}>
              <Icon as={FiTrendingUp} color="brand" fontSize={30} />
              <VStack alignItems="left" spacing={0}>
                <Text fontSize="lg" fontWeight="semibold">
                  Watch it grow!
                </Text>
                <Text fontSize="md" color="gray.600">
                  Friends of friends of friends....
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <Button
            bg="blue.50"
            color="brand"
            mt={2}
            size="md"
            borderRadius={15}
            onClick={onClose}
          >
            Get Started
          </Button>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export const InstructionsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const hasSeenInstructions = Cookies.get("hasSeenInstructions");
    if (!hasSeenInstructions) {
      onOpen();
      Cookies.set("hasSeenInstructions", "true", { expires: 7 });
    }
  }, [onOpen]);

  return (
    <>
      <HStack
        _hover={{ cursor: "pointer", bg: "blue.50" }}
        p={2}
        borderRadius={15}
      >
        <Icon as={FiHelpCircle} color="brand" />
        <Text fontFamily="mono" color="brand" fontSize="sm" onClick={onOpen}>
          Help
        </Text>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
        <ModalOverlay />
        <ModalContent>
          <InstructionsBox onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
