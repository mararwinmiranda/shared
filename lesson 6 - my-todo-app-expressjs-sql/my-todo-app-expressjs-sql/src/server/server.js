require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

let doneCount = 0;

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.post("/api/done-count", (req, res) => {
  doneCount = req.body.doneCount;
  res.json({ status: "Done count received", doneCount });
});
app.get("/api/done-count", (req, res) => {
  res.json({ doneCount });
});
// Register endpoint
app.post("/api/register", async (req, res) => {
  const { name, birthday, email, password } = req.body;
  if (!name || !birthday || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  const [rows] = await pool.execute("SELECT id FROM users WHERE email= ?", [
    email,
  ]);
  if (rows.length > 0)
    return res.status(400).json({ message: "Email already exists" });
  const hash = await bcrypt.hash(password, 10);
  await pool.execute(
    "INSERT INTO users (name, birthday, email, password) VALUES (?,?, ?, ?)",
    [name, birthday, email, hash],
  );
  res.json({ message: "Registered successfully" });
});
// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.execute("SELECT * FROM users WHERE email= ?", [
    email,
  ]);
  if (rows.length === 0)
    return res.status(400).json({ message: "Invalid credentials" });
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });
  res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, birthday FROM users WHERE id = ?",
      [id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Update user birthday
app.put("/api/users/:id/birthday", async (req, res) => {
  const { id } = req.params;
  const { birthday } = req.body;
  if (!birthday)
    return res.status(400).json({ message: "Birthday is required" });
  try {
    await pool.execute("UPDATE users SET birthday = ? WHERE id = ?", [
      birthday,
      id,
    ]);
    res.json({ message: "Birthday updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update birthday" });
  }
});

// Delete user birthday
app.delete("/api/users/:id/birthday", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("UPDATE users SET birthday = NULL WHERE id = ?", [id]);
    res.json({ message: "Birthday removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove birthday" });
  }
});

// Update all user fields
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, birthday } = req.body;
  if (!name || !email || !birthday) {
    return res.status(400).json({ message: "All fields arerequired" });
  }
  try {
    await pool.execute(
      "UPDATE users SET name = ?, email = ?, birthday = ? WHEREid = ?",
      [name, email, birthday, id],
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Delete user record
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});
app.listen(3000, () => console.log("Server running on port 3000"));
