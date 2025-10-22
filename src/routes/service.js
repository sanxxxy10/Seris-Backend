import express from "express";
import mongoose from "mongoose"; // <-- ADD THIS IMPORT
import Service from "../models/Service.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// ✅ Add new service (admin only)
router.post("/", verifyToken, upload.single("thumbnail"), async (req, res) => {
  try { 
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, description, price } = req.body;
    const thumbnail = req.file ? req.file.path : "";

    const newService = new Service({
      name,
      description,
      price,
      thumbnail,
    });

    await newService.save();
    res.status(201).json({ success: true, service: newService });

  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ==========================================================
// ✅ Get a single service by ID  <-- THIS IS THE NEW ROUTE
// ==========================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // First, check if the provided ID is in a valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid service ID format." 
      });
    }

    // Find the service in the database
    const service = await Service.findById(id);

    // If no service is found, return a 404 error
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: "Service not found." 
      });
    }

    // If the service is found, return it
    res.status(200).json({ success: true, service });

  } catch (error)
 {
    console.error("Error fetching service by ID:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


export default router;