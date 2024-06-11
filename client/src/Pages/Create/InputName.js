import {
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  InputRightElement,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const InputName = ({ name, setName, onNextStage }) => {
  const [error, setError] = useState(false); // error handling

  // test if handle is valid
  function isValidInstagramHandle(handle) {
    const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    return regex.test(handle);
  }

  useEffect(() => {
    // remove @ in the beginning
    if (name.charAt(0) == "@") setName(name.substring(1));
    if (!isValidInstagramHandle(name) && name !== "") setError(true);
    else setError(false);
  }, [name]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.9, 0, 0.3, 1],
      }}
    >
      <VStack spacing={5}>
        <Text fontSize="lg" fontWeight="semibold">
          What's your Instagram handle?
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none" color="gray.500">
            @
          </InputLeftElement>
          <Input
            isInvalid={error}
            variant="filled"
            placeholder="tomotime.app"
            pr={5}
            borderRadius={15}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <InputRightElement>
            {name !== "" && !error && (
              <motion.div
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  ease: [0.42, 0, 1, 1], // custom ease-in (can be adjusted as needed)
                }}
              >
                <IconButton
                  size="sm"
                  bg="brand"
                  color="white"
                  icon={<Icon as={FiCheck} />}
                  onClick={onNextStage}
                ></IconButton>
              </motion.div>
            )}
          </InputRightElement>
        </InputGroup>
        <Text fontSize="sm" color="gray.600" as="i" pt={10} maxW={250}>
          We are not affiliated with Instagram in any way and will not use this
          for any reason other than identifying you for Selfie Snake.
        </Text>
      </VStack>
    </motion.div>
  );
};
