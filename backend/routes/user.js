const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Create a new user (Sign Up)
router.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    streetName,
    city,
    province,
    country,
    postalCode,
    latitude,
    longitude,
  } = req.body;
  const address = { streetName, city, province, country, postalCode };

  try {
    const newUser = new User({ name, email, password, phone, address, latitude, longitude });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
    console.log(error);
  }
});

//get garbage details of a user by id
router.get("/get-garbage-details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("garbageIds");

    const garbage = user.garbageIds;
    return res.status(200).json({
      garbage,
      message: "Garbage details retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting garbage entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    res.json({ message: "Sign in successful", user });
  } catch (error) {
    res.status(400).json({ error: "Error signing in" });
    console.log(error);
  }
});

// Read all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Error fetching users" });
  }
});

// Read a specific user by ID
router.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Error fetching user" });
  }
});

// Update a user by ID
router.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting user" });
  }
});

module.exports = router;