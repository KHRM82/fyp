const express = require("express");
const router = express.Router();

// Crop Disease Management Page
router.get("/", (req, res) => {
  res.render("diseaseManagement");
});

module.exports = router;
