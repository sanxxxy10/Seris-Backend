import express from "express";
import Review from "../models/Review.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create a new review (user)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { service, rating, comment } = req.body;

    if (!service || !rating || !comment)
      return res.status(400).json({ error: "All fields are required" });

    const review = await Review.create({
      user: req.user.id,
      service,
      rating,
      comment,
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Get all reviews (admin or public)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("service", "name description price");

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Get reviews for a single service
router.get("/service/:serviceId", async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
