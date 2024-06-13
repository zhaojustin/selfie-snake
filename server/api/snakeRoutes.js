const express = require("express");
const router = express.Router();
const db = require("./db");

// add user to snake given parent id
// if parent id not given, then create new snake
router.post("/addUserToSnake", async (req, res) => {
  const { parentSnakeId, username, imageUrl } = req.body;
  if (!username || !imageUrl)
    return res.status(400).send("Username and image URL are required");

  try {
    let parentSnake = null;
    if (parentSnakeId) {
      const parentSnakeResult = await db.query(
        "SELECT * FROM snakes WHERE id = $1",
        [parentSnakeId]
      );
      if (parentSnakeResult.rows.length === 0)
        return res.status(404).send("Parent snake not found");
      parentSnake = parentSnakeResult.rows[0];
    }

    const snakeResult = await db.query(
      "INSERT INTO snakes (created_by, parent_snake_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
      [username, parentSnake ? parentSnakeId : null]
    );

    const snakeId = snakeResult.rows[0].id;
    await db.query(
      "INSERT INTO entries (snake_id, username, image_url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
      [snakeId, username, imageUrl]
    );

    if (parentSnake) {
      // Fetch the current latest children
      const currentChildrenResult = await db.query(
        "SELECT latest_children FROM snakes WHERE id = $1",
        [parentSnakeId]
      );
      let latestChildren = currentChildrenResult.rows[0].latest_children || [];

      // Add the new child to the beginning of the array
      latestChildren.unshift(snakeId);

      // Keep only the latest 5 children
      if (latestChildren.length > 5) {
        latestChildren = latestChildren.slice(0, 5);
      }

      // Update the parent snake with the new latest children
      await db.query(
        "UPDATE snakes SET latest_children = $1, child_count = child_count + 1, total_descendants_count = total_descendants_count + 1 WHERE id = $2",
        [JSON.stringify(latestChildren), parentSnakeId]
      );
    }

    res.status(201).json(snakeResult.rows[0]);
  } catch (err) {
    console.error("Error adding user to snake:", err);
    res.status(500).send("Internal Server Error");
  }
});

// get full hierarchy of snake
// sorted by create time, descending
router.get("/fetchFullHierarchy/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
        WITH RECURSIVE parent_hierarchy AS (
          SELECT 
              id, created_by, created_at, parent_snake_id, latest_children, 1 AS level
          FROM snakes
          WHERE id = $1
          UNION ALL
          SELECT 
              s.id, s.created_by, s.created_at, s.parent_snake_id, s.latest_children, ph.level + 1
          FROM snakes s
          INNER JOIN parent_hierarchy ph ON ph.parent_snake_id = s.id
        ),
        descendant_hierarchy AS (
          SELECT 
              id, created_by, created_at, parent_snake_id, latest_children, 1 AS level
          FROM snakes
          WHERE id = $1
          UNION ALL
          SELECT 
              s.id, s.created_by, s.created_at, s.parent_snake_id, s.latest_children, dh.level + 1
          FROM snakes s
          INNER JOIN descendant_hierarchy dh ON s.parent_snake_id = dh.id
        )
        SELECT * FROM parent_hierarchy
        UNION
        SELECT * FROM descendant_hierarchy
        ORDER BY created_at DESC;
      `,
      [id]
    );

    const snakeHierarchy = result.rows;

    // Fetch entries for each snake in the hierarchy
    for (const snake of snakeHierarchy) {
      const entriesResult = await db.query(
        "SELECT * FROM entries WHERE snake_id = $1 ORDER BY created_at DESC",
        [snake.id]
      );
      snake.entries = entriesResult.rows;
    }

    res.status(200).json(snakeHierarchy);
  } catch (err) {
    console.error("Error fetching full hierarchy:", err);
    res.status(500).send("Internal Server Error");
  }
});

// get stats about snake
router.get("/snakeStats/:snakeId", async (req, res) => {
  const { snakeId } = req.params;

  try {
    // Query to get the total number of children
    const totalChildrenResult = await db.query(
      `
        WITH RECURSIVE snake_descendants AS (
          SELECT id
          FROM snakes
          WHERE parent_snake_id = $1
          UNION ALL
          SELECT s.id
          FROM snakes s
          INNER JOIN snake_descendants sd ON s.parent_snake_id = sd.id
        )
        SELECT COUNT(*)
        FROM snake_descendants;
      `,
      [snakeId]
    );

    const totalChildren = totalChildrenResult.rows[0].count;

    // Query to get the length of the snake
    const snakeLengthResult = await db.query(
      `
        WITH RECURSIVE snake_lineage AS (
          SELECT id, parent_snake_id
          FROM snakes
          WHERE id = $1
          UNION ALL
          SELECT s.id, s.parent_snake_id
          FROM snakes s
          INNER JOIN snake_lineage sl ON s.id = sl.parent_snake_id
        )
        SELECT COUNT(*)
        FROM snake_lineage;
      `,
      [snakeId]
    );

    const snakeLength = snakeLengthResult.rows[0].count;

    res.status(200).json({
      totalChildren: parseInt(totalChildren, 10),
      snakeLength: parseInt(snakeLength, 10),
    });
  } catch (err) {
    console.error("Error fetching snake stats:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
