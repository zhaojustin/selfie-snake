import { useState } from "react";

import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiCamera, FiCheck, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { addUser } from "../../api/users";
import { addUserToSnake, createSnake } from "../../api/snakes";
import { useNavigate, useParams } from "react-router-dom";

export const UploadSelfie = ({
  name,
  setUrl,
  onBack,
  parentSnakeId,
  onNext,
}) => {
  const [image, setImage] = useState(null); // image file
  const [loading, setLoading] = useState(false); // loading state
  const [preview, setPreview] = useState(""); // preview image url

  const navigate = useNavigate();

  // handle change of input
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
      } catch (error) {
        console.error("Error compressing the file:", error);
      }
    }
  };

  // handle upload of file
  const handleUpload = async () => {
    setLoading(true); // start loading animation
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUrl(response.data.fileUrl);

      // create snake with new image url
      const newSnake = await addUserToSnake(
        parentSnakeId,
        name,
        response.data.fileUrl
      );
      if (newSnake) {
        navigate(`/snake/${newSnake.id}`);
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  const handleReset = () => {
    setImage(null);
    setLoading(false);
    setUrl("");
    setPreview("");
  };

  if (preview && !loading)
    return (
      <VStack pb={20}>
        <Box shadow="lg" mb={5} borderRadius={15} overflow="hidden">
          <Image src={preview} boxSize={64} objectFit="cover" />
        </Box>
        <Button onClick={handleUpload} leftIcon={<Icon as={FiCheck} />}>
          Submit
        </Button>
        <Button
          bg="gray.100"
          color="gray.500"
          _hover={{ bg: "gray.200" }}
          leftIcon={<Icon as={FiCamera} />}
          onClick={handleReset}
        >
          Retake
        </Button>
      </VStack>
    );

  return (
    <motion.div
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.9, 0, 0.3, 1],
      }}
    >
      <VStack spacing={5}>
        {!loading ? (
          <>
            <VStack mb={5}>
              <HStack _hover={{ cursor: "pointer" }} onClick={onBack}>
                <Icon as={FiEdit3} color="brand" fontSize="small" />
                <Text color="brand">{name}</Text>
              </HStack>
            </VStack>
            <Text fontSize="lg" fontWeight="semibold">
              Start by taking a selfie.
            </Text>
            <Input
              type="file"
              capture="environment"
              accept="image/*"
              onChange={handleChange}
              display="none"
              id="file-input"
            />
            <label htmlFor="file-input">
              <IconButton
                as="span"
                boxSize={24}
                icon={<Icon as={FiCamera} fontSize={30} />}
                isRound
                mb={4}
                _hover={{ cursor: "pointer", bg: "blue.100" }}
              >
                Upload
              </IconButton>
            </label>
          </>
        ) : (
          <VStack m={5}>
            <Spinner size="lg" color="brand" />
            <Text mt={2} color="brand">
              Loading
            </Text>
          </VStack>
        )}
      </VStack>
    </motion.div>
  );
};
