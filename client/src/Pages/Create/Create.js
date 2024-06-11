import { Heading, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UploadSelfie } from "./UploadSelfie";
import { useEffect, useState } from "react";
import { InputName } from "./InputName";

import { getUser } from "../../api/users";
import { ReturningUser } from "./ReturningUser";

export default function Create() {
  const navigate = useNavigate();

  const images = [
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
  ];

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");

  const [stage, setStage] = useState("inputName");

  useEffect(() => {
    if (stage == "inputName_done") {
      // check if user exists already
      const checkUser = async () => {
        const response = await getUser(username);
        if (response) {
          setUrl(response.imageUrl);
          setStage("returningUser");
        } else setStage("upload");
      };
      checkUser();
    }
  }, [stage]);

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
        <Text fontSize="xl">
          by{" "}
          <Text display="inline" fontWeight="semibold" color="brand">
            tomotime
          </Text>
        </Text>
      </VStack>

      {stage == "inputName" && (
        <InputName
          name={username}
          setName={setUsername}
          onNextStage={() => setStage("inputName_done")}
        />
      )}
      {stage == "returningUser" && (
        <ReturningUser
          name={username}
          imageUrl={url}
          onRetake={() => setStage("upload")}
          onNext={() => setStage("next")}
        />
      )}
      {stage == "upload" && (
        <UploadSelfie
          name={username}
          setUrl={setUrl}
          onBack={() => setStage("inputName")}
          onNext={() => setStage("next")}
        />
      )}
      {stage == "next" && <Text>success</Text>}

      {/* <ZigzagPattern imageUrls={images} /> */}
    </VStack>
  );
}
