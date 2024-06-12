import { Box, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RenderSnake } from "./RenderSnake";
import { TomotimeHeader } from "../../Components/Header";
import { baseUrl } from "../../api/util";
import { ShareableLinkBox } from "../../Components/ShareableLinkBox";

export default function Snake({}) {
  const { snakeId } = useParams();
  const [snake, setSnake] = useState(null);
  const [loading, setLoading] = useState(true);

  async function addUserToSnake(parentSnakeId, username) {
    const response = await fetch("/api/addUserToSnake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parentSnakeId, username }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error adding user to snake: ${errorMessage}`);
    }

    const data = await response.json();
    fetchSnake();
    return data;
  }

  const fetchSnake = async () => {
    try {
      const response = await fetch(`/api/fetchSnakeWithAncestors/${snakeId}`);
      if (!response.ok) throw new Error(`Network response was not ok`);
      const data = await response.json();
      setLoading(false);
      setSnake(data);
    } catch (error) {
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

      <RenderSnake
        snake={snake}
        onAdd={() => addUserToSnake(snakeId, "asdf")}
      />

      {/* invite link */}
      <ShareableLinkBox />
    </VStack>
  );
}
