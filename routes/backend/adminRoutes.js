const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/backend/user");
const Crop = require("../../models/backend/crop");
const Disease = require("../../models/backend/disease");

// Login route
router.get("/login", (req, res) => {
  res.render("backend/login", { message: req.flash("error") });
});

router.get("/logout", (req, res) => {
  res.render("home");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Login failed: User "${username}" not found.`);
      return res.status(401).send("Invalid username or password.");
    }

    // Compare the entered password directly (no hashing since you store plaintext passwords)
    if (user.password !== password) {
      console.log(`Login failed: Incorrect password for user "${username}".`);
      return res.status(401).send("Invalid username or password.");
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      console.log(`Login failed: User "${username}" is not an admin.`);
      return res.status(403).send("Access denied. Admins only.");
    }

    // Successful login - Render the admin panel
    console.log(`Login successful: Admin "${username}" logged in.`);
    return res.redirect("/admin"); // Adjust path if necessary
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal server error.");
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

module.exports = router;
