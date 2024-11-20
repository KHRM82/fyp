const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/backend/user");
const Crop = require("../../models/backend/crop");
const Disease = require("../../models/backend/disease");

// Login route
router.get("/login", (req, res) => {
  res.render("backend/login", { message: req.flash("error") });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Attempting login for user: ${username}`);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Incorrect username");
      req.flash("error", "Incorrect username.");
      return res.redirect("/login");
    }

    console.log(`Stored hashed password: ${user.password}`);
    console.log(`Entered password: ${password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${isMatch}`);
    if (!isMatch) {
      console.log("Incorrect password");
      req.flash("error", "Incorrect password.");
      return res.redirect("/login");
    }

    console.log("Login successful");
    return res.redirect("/admin");
  } catch (err) {
    console.log("An error occurred:", err);
    req.flash("error", "An error occurred. Please try again.");
    return res.redirect("/login");
  }
});

// Admin panel route
router.get("/admin", async (req, res) => {
  try {
    const crops = await Crop.find();
    const diseases = await Disease.find();
    res.render("backend/adminPanel", { crops, diseases });
  } catch (error) {
    res.status(500).send("Error loading admin panel: " + error.message);
  }
});

// Disease routes
router.get("/edit-disease/:id", async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    res.render("backend/editDisease", { disease });
  } catch (err) {
    console.error("Error fetching disease for edit:", err);
    res.status(500).send("Error fetching disease for edit");
  }
});

router.put("/edit-disease/:id", async (req, res) => {
  try {
    const diseaseId = req.params.id;
    const updatedData = req.body;
    await Disease.findByIdAndUpdate(diseaseId, updatedData);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error updating disease:", err);
    res.status(500).send("Error updating disease");
  }
});

router.delete("/delete-disease/:id", async (req, res) => {
  try {
    const diseaseId = req.params.id;
    await Disease.findByIdAndDelete(diseaseId);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting disease:", err);
    res.status(500).send("Error deleting disease");
  }
});

module.exports = router;
