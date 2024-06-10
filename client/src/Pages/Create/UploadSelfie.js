import { useState } from "react";

import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Progress,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiCamera, FiCheck } from "react-icons/fi";
import axios from "axios";
import imageCompression from "browser-image-compression";

export const UploadSelfie = ({ setUrl }) => {
  const [image, setImage] = useState(null); // image file
  const [loading, setLoading] = useState(false); // loading state
  const [preview, setPreview] = useState(""); // preview image url

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
      setLoading(false);
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
      <VStack>
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
    <VStack spacing={5}>
      {!loading ? (
        <>
          <Text fontSize="lg">Start by taking a selfie.</Text>
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
        <Spinner size="lg" m={5} color="brand" />
      )}
    </VStack>
  );
};
