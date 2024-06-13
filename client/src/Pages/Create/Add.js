import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadSelfie } from "./UploadSelfie";
import { useEffect, useState } from "react";
import { InputName } from "./InputName";

export default function Add() {
  const navigate = useNavigate();
  const { parentSnakeId } = useParams();

  useEffect(() => {
    console.log([parentSnakeId]);
  }, [parentSnakeId]);

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [stage, setStage] = useState("inputName");

  return (
    <VStack mt={10}>
      <VStack
        mb={10}
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Heading fontFamily="heading" fontWeight="black">
          Selfie Snake
        </Heading>
        <HStack>
          <Text>by</Text>
          <Text display="inline" fontWeight="semibold" color="brand">
            tomotime
          </Text>
        </HStack>
      </VStack>

      {stage == "inputName" && (
        <InputName
          name={username}
          setName={setUsername}
          onNextStage={() => setStage("upload")}
        />
      )}
      {stage == "upload" && (
        <UploadSelfie
          name={username}
          setUrl={setUrl}
          parentSnakeId={parentSnakeId}
          onBack={() => setStage("inputName")}
          onNext={() => {}}
        />
      )}
    </VStack>
  );
}
