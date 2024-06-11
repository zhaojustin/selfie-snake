// adds a user with image url
export async function addUser(name, imageUrl) {
  const url = "/api/addUser";

  const payload = {
    name,
    imageUrl,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    if (data.success) {
      return data;
    } else throw new Error("Something went wrong", data);
  } catch (error) {
    console.error("Error adding or updating user:", error);
  }
}

export async function getUser(name) {
  const url = "/api/getUser"; // Adjust the URL as needed

  const payload = {
    name,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      console.log("User not found");
      return null;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log("User data:", data);
    return data;
  } catch (error) {
    console.error("Error checking user:", error);
  }
}
