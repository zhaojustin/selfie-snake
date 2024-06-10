import { Heading, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UploadSelfie } from "./UploadSelfie";
import { useEffect, useState } from "react";

export default function Create() {
  const navigate = useNavigate();

  const images = [
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
  ];

  const [url, setUrl] = useState("");
  const [stage, setStage] = useState("upload");

  useEffect(() => {
    if (url !== "") setStage("");
  }, [url]);

  return (
    <VStack mt={10}>
      <VStack
        mb={20}
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Heading fontFamily="heading" fontWeight="black">
          Selfie Snake
        </Heading>
        <Text fontSize="xl">
          by{" "}
          <Text display="inline" fontWeight="semibold" color="brand">
            tomotime
          </Text>
        </Text>
      </VStack>

      {stage == "upload" && <UploadSelfie setUrl={setUrl} />}
      {stage == ""}

      {/* <ZigzagPattern imageUrls={images} /> */}
    </VStack>
  );
}
