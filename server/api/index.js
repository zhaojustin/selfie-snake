// server/src/index.js
const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

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

const app = express();

app.use(cors());
app.use(express.json());

const bucket = admin.storage().bucket();

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/test", (req, res) => {
  res.send("Welcome to the Selfie Snake API");
});

// Example route to fetch data from Firestore
app.get("/api/users", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.res.status(200).send(usersSnapshot);
    console.log(users);
  } catch (error) {
    res.status(500).send("Error fetching snakes:", error);
  }
});

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
