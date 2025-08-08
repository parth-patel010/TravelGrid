const express = require("express");
const router = express.Router();

// Test GET route (so you can check in browser)
router.get("/", (req, res) => {
  res.json({ message: "Search API is ready! Send a POST request to search." });
});

// Actual search POST route
router.post("/", (req, res) => {
  console.log("Received body:", req.body);
  const { location, category } = req.body;
  res.json({
    message: `You searched for: ${location} in ${category}`
  });
});

module.exports = router;
