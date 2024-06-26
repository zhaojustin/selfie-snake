// server/src/index.js
const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const snakeRoutes = require("./snakeRoutes");

require("dotenv").config();

// firebase
const serviceAccount = JSON.parse(
  Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64,
    "base64"
  ).toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://selfie-snake.appspot.com",
});

const db = admin.firestore();
// firebase end

const app = express();

app.use(cors());
app.use(express.json());

const bucket = admin.storage().bucket();

app.use(express.static(path.join(__dirname, "../../client/build")));

// file upload
const upload = multer({ storage: multer.memoryStorage() });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");

    const blob = bucket.file(`images/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async () => {
      // Make the file publicly accessible
      await blob.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).send({ fileUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// users
app.post("/api/addUser", async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl)
      return res.status(400).send("Name and imageUrl are required");

    const usersRef = db.collection("users");
    await usersRef.doc(name).set({
      imageUrl: imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return res.status(201).json({ success: true, message: "Set user data" });
  } catch (error) {
    console.error("Error adding or finding user: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

// get user
app.post("/api/getUser", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Name is required");
    }

    const usersRef = db.collection("users").doc(name);
    const doc = await usersRef.get();
    if (!doc.exists) return res.status(404).send("User not found");
    else return res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error checking user: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.use("/api", snakeRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
