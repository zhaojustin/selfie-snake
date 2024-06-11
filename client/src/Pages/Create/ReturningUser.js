import {
  VStack,
  Text,
  Box,
  Image,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCamera, FiCheck } from "react-icons/fi";

export const ReturningUser = ({ name, onRetake, onNext, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.9, 0, 0.3, 1],
      }}
    >
      <VStack spacing={2} pb={20}>
        <Text fontSize="lg" fontWeight="medium">
          Hi {name}!
        </Text>
        <Box shadow="lg" mb={5} borderRadius={15} overflow="hidden">
          <Image src={imageUrl} boxSize={48} objectFit="cover" />
        </Box>
        <Text fontSize="lg" fontWeight="semibold">
          Are you happy with this photo?
        </Text>

        <VStack mt={5}>
          <Button onClick={onNext} leftIcon={<Icon as={FiCheck} />} w={110}>
            Yes
          </Button>
          <Button
            bg="gray.100"
            color="gray.500"
            _hover={{ bg: "gray.200" }}
            leftIcon={<Icon as={FiCamera} />}
            onClick={onRetake}
            w={110}
          >
            Retake
          </Button>
        </VStack>
      </VStack>
    </motion.div>
  );
};
