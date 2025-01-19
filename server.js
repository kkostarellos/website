const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Authentication Mock
const adminCredentials = { username: "admin", password: "1234" };

// Serve exhibitions JSON data
app.get("/api/exhibitions", (req, res) => {
  fs.readFile("./data/exhibitions.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch exhibitions" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Serve links JSON data
app.get("/api/links", (req, res) => {
  fs.readFile("./data/links.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch links" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Serve paintings JSON data
app.get("/api/paintings", (req, res) => {
  fs.readFile("./data/paintings.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch paintings" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Handle admin login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === adminCredentials.username && password === adminCredentials.password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
