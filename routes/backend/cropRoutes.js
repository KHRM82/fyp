const express = require("express");
const router = express.Router();
const Crop = require("../../models/backend/crop");

// Route to add a new crop
router.get("/admin/new-crop", (req, res) => {
  res.render("backend/newCrop");
});

router.post("/admin/new-crop", async (req, res) => {
  try {
    const cropData = req.body;
    const newCrop = new Crop(cropData);
    await newCrop.save();
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error adding new crop: " + error.message);
  }
});

// Route to edit an existing crop
router.get("/edit-crop/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    res.render("backend/editCrop", { crop });
  } catch (error) {
    res.status(500).send("Error retrieving crop: " + error.message);
  }
});

router.post("/edit-crop/:id", async (req, res) => {
  try {
    await Crop.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error updating crop: " + error.message);
  }
});

// Route to delete an existing crop
router.get("/delete-crop/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    res.render("backend/deleteCrop", { crop });
  } catch (error) {
    res.status(500).send("Error retrieving crop: " + error.message);
  }
});

router.post("/delete-crop/:id", async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error deleting crop: " + error.message);
  }
});

module.exports = router;
