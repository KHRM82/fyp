const express = require("express");
const router = express.Router();
const Crop = require("../../models/backend/crop");
const Disease = require("../../models/backend/disease");

// Route to display all crops
router.get("/crops", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.render("cropList", { crops });
  } catch (error) {
    res.status(500).send("Error loading crop list: " + error.message);
  }
});

// Route to display crop details
router.get("/crop/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).send("Crop not found");
    }
    res.render("cropDetails", { crop });
  } catch (error) {
    res.status(500).send("Error loading crop details: " + error.message);
  }
});

// Route to display all diseases
router.get("/diseases", async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.render("diseaseList", { diseases });
  } catch (error) {
    res.status(500).send("Error loading disease list: " + error.message);
  }
});

// Route to display disease details
router.get("/disease/:id", async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).send("Disease not found");
    }
    res.render("diseaseDetails", { disease });
  } catch (error) {
    res.status(500).send("Error loading disease details: " + error.message);
  }
});

module.exports = router;
