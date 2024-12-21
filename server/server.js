const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS, images, JS)
app.use(express.static("service_sync"));

// Handle Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Add login logic (e.g., check database)
  res.send(`Login request received for: ${email}`);
});

// Handle Signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  // Add signup logic (e.g., save to database)
  res.send(`Signup request received for: ${name}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
