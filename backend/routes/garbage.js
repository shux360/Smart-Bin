const router = require("express").Router();
const Garbage = require("../models/garbage");
const moment = require("moment-timezone");
const User = require("../models/user");

//get garbage details by id
router.get("/get-garbage-details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const garbage = await Garbage.findById(id);

    return res.status(200).json({
      garbage,
      message: "Garbage details retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting garbage entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Adding garbage details
router.post("/garbage-details", async (req, res) => {
  try {
    const { userId, driverId } = req.body;
    const { location, categories, date } = req.body.data;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const localDate = moment.tz(date, "Asia/Colombo").startOf("day");
    const utcDate = localDate.clone().utc(true);

    const newGarbage = new Garbage({
      userId,
      driverId,
      location: {
        streetName: location.streetName,
        city: location.city,
        province: location.province,
        country: location.country,
        postalcode: location.postalcode,
        // latitude: req.body.location.latitude,
        // longitude: req.body.location.longitude
      },
      categories: categories,
      date: utcDate.toDate(),
    });
    // Save
    const saveGarbage = await newGarbage.save();
    // Add garbage ID to the user's garbageIds array
    user.garbageIds.push(saveGarbage._id);
    await user.save();

    return res.status(201).json({
      saveGarbage,
      message: "Garbage details added successfully",
    });
  } catch (error) {
    console.error("Error creating garbage entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//get all garbage details
router.get("/get-all-garbage-details", async (req, res) => {
  try {
    const garbage = await Garbage.find();

    return res.status(200).json({
      garbage,
      message: "All garbage details retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting garbage entries:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//update pickup status
router.put("/garbage/update-pickup-status/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const garbage = await Garbage.findByIdAndUpdate(
      req.params.id,
      { pickupStatus: status },
      { new: true }
    );
    res.status(200).json(garbage);
  } catch (err) {
    res.status(500).json({ error: "Failed to update pickup status" });
  }
});

// Report issue
router.put("/garbage/report-issue/:id", async (req, res) => {
  try {
    const garbage = await Garbage.findByIdAndUpdate(
      req.params.id,
      { issueReported: true },
      { new: true }
    );
    res.status(200).json(garbage);
  } catch (err) {
    res.status(500).json({ error: "Failed to report issue" });
  }
});

// Mark issue as solved
router.put("/garbage/issue-solved/:id", async (req, res) => {
  try {
    const garbage = await Garbage.findByIdAndUpdate(
      req.params.id,
      { issueReported: false },
      { new: true }
    );
    res.status(200).json(garbage);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark issue as solved" });
  }
});

//Editing garbage details
router.put("/edit-garbage-details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { location, categories, date } = req.body;

    const localDate = moment.tz(date, "Asia/Colombo").startOf("day");
    const utcDate = localDate.clone().utc(true);
    const updateGarbage = {
      location: {
        streetName: location.streetName,
        city: location.city,
        province: location.province,
        country: location.country,
        postalcode: location.postalcode,
        // latitude: req.body.location.latitude,
        // longitude: req.body.location.longitude
      },
      categories: categories,
      date: utcDate.toDate(),
    };
    const updatedGarbage = await Garbage.findByIdAndUpdate(id, updateGarbage, {
      new: true,
    });

    res.status(200).json({
      updatedGarbage,
      message: "Garbage details updated successfully",
    });
  } catch (error) {
    console.error("Error updating garbage entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//deleting garbage details
router.delete("/delete-garbage-details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteGarbage = await Garbage.findByIdAndDelete(id);

    res.status(200).json({
      deleteGarbage,
      message: "Garbage details deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting garbage entry:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
