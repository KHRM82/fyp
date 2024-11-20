const express = require("express");
const router = express.Router();

// Crop Management Page
router.get("/", (req, res) => {
  res.render("cropManagement");
});

module.exports = router;
