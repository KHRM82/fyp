const express = require("express");
const router = express.Router();
const Crop = require("../models/crop");

// Route to get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    console.log("All crops fetched:", crops);
    res.render("crops", { crops });
  } catch (err) {
    console.error("Error fetching all crops:", err);
    res.status(500).send(err);
  }
});

// Route to get crops by type
router.get("/type/:type", async (req, res) => {
  try {
    const crops = await Crop.find({
      type: new RegExp("^" + req.params.type + "$", "i"),
    });
    console.log("Crops of type", req.params.type, "fetched:", crops);
    res.render("cropType", { type: req.params.type, crops });
  } catch (err) {
    console.error("Error fetching crops by type:", err);
    res.status(500).send(err);
  }
});

// Route to get a specific crop by ID
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    console.log("Crop fetched by ID", req.params.id, ":", crop);
    res.render("cropDetails", { crop });
  } catch (err) {
    console.error("Error fetching crop by ID:", err);
    res.status(500).send(err);
  }
});

module.exports = router;
