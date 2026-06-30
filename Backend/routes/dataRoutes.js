const express = require("express");
const router = express.Router();

const Data = require("../models/Data");

// Save JSON
router.post("/", async (req, res) => {
  try {
    const data = await Data.create(req.body);

    res.status(201).json({
      success: true,
      message: "Data Stored Successfully",
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get All Data
router.get("/", async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get One Document
router.get("/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found"
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete One Document
router.delete("/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;