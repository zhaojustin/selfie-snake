export async function addUserToSnake(parentSnakeId, username, imageUrl) {
  const response = await fetch("/api/addUserToSnake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parentSnakeId, username, imageUrl }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error creating snake: ${errorMessage}`);
  }

  const data = await response.json();
  return data;
}
