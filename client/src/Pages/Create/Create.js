import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UploadSelfie } from "./UploadSelfie";
import { useEffect, useState } from "react";
import { InputName } from "./InputName";

import { getUser } from "../../api/users";
import { ReturningUser } from "./ReturningUser";

export default function Create() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");

  const [stage, setStage] = useState("inputName");

  async function createSnake() {
    const imageUrl = url;
    const response = await fetch("/api/addUserToSnake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, imageUrl }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error creating snake: ${errorMessage}`);
    }

    const newSnake = await response.json();
    if (newSnake) {
      navigate("/snake/" + newSnake.id);
    }
    return newSnake;
  }

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
          onBack={() => setStage("inputName")}
          onNext={createSnake}
        />
      )}
      {stage == "next" && <Text>success</Text>}

      {/* <ZigzagPattern imageUrls={images} /> */}
    </VStack>
  );
}
