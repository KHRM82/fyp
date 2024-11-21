const express = require("express");
const router = express.Router();
const Disease = require("../../models/backend/disease");
const mongoose = require("mongoose");

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
    console.log("Request body:", req.body); // Log the request body to debug

    const diseaseId = req.params.id;
    const updatedData = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(diseaseId)) {
      return res.status(400).send("Invalid disease ID.");
    }

    // Find the disease document by ID
    const disease = await Disease.findById(diseaseId);

    // If the disease is not found, return an error
    if (!disease) {
      return res.status(404).send("Disease not found.");
    }

    // Update the disease fields one by one
    Object.keys(updatedData).forEach((key) => {
      disease[key] = updatedData[key]; // Set the new data to the fields
    });

    // Explicitly save the updated document to the database
    await disease.save(); // This saves the changes

    console.log("Updated disease:", disease);

    // Redirect to admin panel after update
    res.redirect("/admin");
  } catch (error) {
    console.error("Error updating disease:", error);
    res.status(500).send("Error updating disease: " + error.message);
  }
});

// Route to delete an existing disease
router.post("/admin/delete-disease/:id", async (req, res) => {
  try {
    await Disease.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error deleting disease: " + error.message);
  }
});

module.exports = router;
