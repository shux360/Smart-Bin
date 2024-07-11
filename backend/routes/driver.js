const express = require("express");
const Driver = require("../models/driver");

const router = express.Router();

// Create a new driver
router.post("/add-driver", async (req, res) => {
  const { name, email, location, truckNumber } = req.body;
  try {
    const newDriver = new Driver({ name, email, location, truckNumber });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: "Error creating driver" });
    console.log(error.message);
  }
});

//driver login
router.post("/signin", async (req, res) => {
  const { email } = req.body;

  try {
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Sign in successful", driver });
  } catch (error) {
    res.status(400).json({ error: "Error signing in" });
    console.log(error);
  }
});

// Read all drivers
router.get("/drivers", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(400).json({ error: "Error fetching drivers" });
  }
});

// Read a specific driver by ID
router.get("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: "Error fetching driver" });
  }
});

// Read a specific driver by name
router.get("/drivers/name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const driver = await Driver.findOne({ name });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: "Error fetching driver" });
  }
});

// Update a driver by ID
router.put("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, truckNumber } = req.body;
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { name, location, truckNumber },
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ error: "Error updating driver" });
  }
});

// Delete a driver by ID
router.delete("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting driver" });
  }
});

module.exports = router;
