const express = require("express");
const router = express.Router();
const Disease = require("../../models/backend/disease");

// Route to add a new disease
router.get("/admin/new-disease", (req, res) => {
  res.render("backend/newDisease");
});

router.post("/admin/new-disease", async (req, res) => {
  try {
    const diseaseData = req.body;
    const newDisease = new Disease(diseaseData);
    await newDisease.save();
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error adding new disease: " + error.message);
  }
});

// Route to edit an existing disease
router.get("/admin/edit-disease/:id", async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    res.render("backend/editDisease", { disease });
  } catch (error) {
    res.status(500).send("Error retrieving disease: " + error.message);
  }
});

router.put("/admin/edit-disease/:id", async (req, res) => {
  try {
    await Disease.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error updating disease: " + error.message);
  }
});

// Route to delete an existing disease
router.delete("/admin/delete-disease/:id", async (req, res) => {
  try {
    await disease.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error deleting disease: " + error.message);
  }
});

module.exports = router;
