import {
  initialNotifications,
  initialRequests,
  initialUsers,
} from "./mockData.ts";

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from the barangay app Express.js backend!",
  });
});

app.post("/api/login", (req, res) => {
  const found = initialUsers.find(
    (u) =>
      u.email.toLowerCase() === req.body.email &&
      u.password === req.body.password,
  );
  if (!found) {
    res.json({
      ok: false,
      message: "Check your email and password, or use a demo account.",
    });
  } else {
    res.json({ ok: true, user: { ...found } });
  }
});

app.post("/api/register", (req, res) => {
  let resData = { ok: true };
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.address
  ) {
    resData = { ok: false, message: "Complete all fields." };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    resData = { ok: false, message: "Enter a valid email address." };
  } else if (req.body.password.length < 6) {
    resData = { ok: false, message: "Password must be at least 6 characters." };
  } else if (
    initialUsers.some(
      (u) => u.email.toLowerCase() === req.body.email.toLowerCase(),
    )
  ) {
    resData = { ok: false, message: "That email already has a demo account." };
  }

  if (!resData.ok) {
    res.json(resData);
  } else {
    const created = {
      id: `u-${Date.now()}`,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "resident",
      address: req.body.address,
      verified: false,
    };
    initialUsers.push(created);
    resData = { ok: true, user: created };

    res.json(resData);
  }
});

app.get("/api/users", (req, res) => {
  res.json(initialUsers);
});

app.post("/api/verifyUser", (req, res) => {
  let resData = null;
  for (let user of initialUsers) {
    if (user.id === req.body.userId) {
      user.verified = true;
      resData = { ok: true, user: { ...user }, users: initialUsers };
      break;
    }
  }

  if (!resData) {
    resData = { ok: false };
  }
  res.json(resData);
});

app.get("/api/requests", (req, res) => {
  res.json(initialRequests);
});

app.post("/api/updateStatus", (req, res) => {
  let resData = null;
  for (let request of initialRequests) {
    if (request.id === req.body.requestId) {
      request.status = req.body.status;
      resData = { ok: true };
      break;
    }
  }

  if (!resData) {
    resData = { ok: false };
  }
  res.json(resData);
});

app.post("/api/submitRequest", (req, res) => {
  let resData = null;
  initialRequests.push(req.body);
  resData = { ok: true };
  res.json(resData);
});

app.post("/api/createNotification", (req, res) => {
  let resData = null;
  initialNotifications.push(req.body);
  resData = { ok: true };
  res.json(resData);
});

app.get("/api/getNotifications", (req, res) => {
  res.json(initialNotifications);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
