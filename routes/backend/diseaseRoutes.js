const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Disease = require("../../models/backend/disease");
const mongoose = require("mongoose");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the image is stored in 'public/uploads'
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    // Ensure unique filenames by adding a timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage configuration and allowed file types
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // Allowed image formats
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images are allowed"), false); // Reject if not an image
    }
    cb(null, true); // Accept the file
  },
});

// Route to add a new disease
router.get("/admin/new-disease", (req, res) => {
  res.render("backend/newDisease");
});

// POST route to handle the form submission and image upload
router.post("/admin/new-disease", upload.single("photo"), async (req, res) => {
  try {
    const diseaseData = req.body;

    // If a file is uploaded, save the file path
    if (req.file) {
      diseaseData.photoPath = `/uploads/${req.file.filename}`;
    }

    // Create a new Disease document and save it to the database
    const newDisease = new Disease(diseaseData);
    await newDisease.save();
    res.redirect("/admin"); // Redirect to admin panel after success
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

// POST route to edit an existing disease (with optional photo update)
router.put(
  "/admin/edit-disease/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      const diseaseId = req.params.id;
      const updatedData = req.body;

      if (!mongoose.Types.ObjectId.isValid(diseaseId)) {
        return res.status(400).send("Invalid disease ID.");
      }

      // Find the disease document
      const disease = await Disease.findById(diseaseId);
      if (!disease) {
        return res.status(404).send("Disease not found.");
      }

      // Update fields from the form data
      Object.keys(updatedData).forEach((key) => {
        disease[key] = updatedData[key];
      });

      // Handle image upload if provided
      if (req.file) {
        disease.photoPath = `/uploads/${req.file.filename}`; // Update the photo path if a new image is uploaded
      }

      // Save the updated disease document
      await disease.save();
      res.redirect("/admin"); // Redirect after update
    } catch (error) {
      res.status(500).send("Error updating disease: " + error.message);
    }
  }
);

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
