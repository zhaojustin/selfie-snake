import { Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RenderSnake } from "./RenderSnake";
import { TomotimeHeader } from "../../Components/Header";
import { ShareableLinkBox } from "../../Components/ShareableLinkBox";

export default function Snake({}) {
  const navigate = useNavigate();
  const { snakeId } = useParams();
  const [snake, setSnake] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSnake = async () => {
    try {
      const response = await fetch(`/api/fetchFullHierarchy/${snakeId}`);
      if (!response.ok) throw new Error(`Network response was not ok`);
      const data = await response.json();
      setLoading(false);
      setSnake(data);
    } catch (error) {
      navigate("/not-found");
      console.error("Error fetching snake:", error);
    }
  };

  useEffect(() => {
    fetchSnake();
  }, [snakeId]);

  if (loading || !snake)
    return (
      <VStack mt={10}>
        <TomotimeHeader />
        <Spinner color="brand" />
        <Text mt={2} color="brand">
          Loading
        </Text>
      </VStack>
    );

  return (
    <VStack mt={10}>
      <TomotimeHeader />

      <RenderSnake snake={snake} />

      {/* invite link */}
      <ShareableLinkBox />
    </VStack>
  );
}
