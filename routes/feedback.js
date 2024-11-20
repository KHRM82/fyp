const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Feedback Page
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ date: -1 });
  res.render("feedback", { feedbacks });
});

// Handle Feedback Submission
router.post("/", async (req, res) => {
  const { feedback } = req.body;
  try {
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();
    res.json({
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
