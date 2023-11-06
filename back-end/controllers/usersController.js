const express = require("express");
const users = express.Router();

const {
  getAllUsers,
  getUserByEmail,
  createUser,
} = require("../queries/userQueries");

users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({ success: true, payload: allUsers });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

users.get("/:email", async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (user) {
      res.status(200).json({ success: true, payload: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

users.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body.email);
    res.status(201).json({ success: true, payload: user });
  } catch (error) {
    if (error.message === "User with this email already exists.") {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});

module.exports = users;
