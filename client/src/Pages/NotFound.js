import { Link, Text, VStack } from "@chakra-ui/react";
import { TomotimeHeader } from "../Components/Header";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <VStack mt={20}>
      <VStack mb={5}>
        <TomotimeHeader />
      </VStack>

      <VStack>
        <Text fontSize="4xl">🔍 😥</Text>
        <Text fontSize="lg" fontWeight="semibold">
          Snake not found!
        </Text>
        <Text fontSize="md" mt={5}>
          Want to{" "}
          <Link
            color="brand"
            fontWeight="semibold"
            onClick={() => navigate("/create")}
          >
            create a snake
          </Link>{" "}
          instead?
        </Text>
      </VStack>
    </VStack>
  );
}
