const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors()); // Needed for React Native apps to access backend
app.use(express.json());
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/done-count", (req, res) => {
  doneCount = req.body.doneCount;
  res.json({ status: "Done count received", doneCount });
});
app.get("/api/done-count", (req, res) => {
  res.json({ doneCount });
});
