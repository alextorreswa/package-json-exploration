const express = require("express");

const app = express();
app.use(express.json());

// Normal route
app.get("/", (req, res) => {
  res.status(200).send("Hello from package.json exploration!");
});

// Route with input
app.get("/sum", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  // Edge handling
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).json({ error: "Query params a and b must be valid numbers." });
  }

  return res.status(200).json({ a, b, sum: a + b });
});

// Only start server if run directly (not during tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
