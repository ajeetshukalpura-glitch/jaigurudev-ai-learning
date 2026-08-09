const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jaigurudev AI Learning API is Live 🚀"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Jaigurudev AI Learning"
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
