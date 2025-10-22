import express from "express";
import Project from "../models/Project.js"; // already declared safely there
import { verifyToken } from "../middleware/auth.js";
import { sendMail, getAdminEmailTemplate, getUserEmailTemplate } from "../utils/mail.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
      projectDocuments,
    } = req.body;

    const userId = req.user.id;

    if (!name || !email || !mobile || !projectName || !websiteType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const newProject = new Project({
      user: userId,
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
      projectDocuments: projectDocuments || [],
    });

    await newProject.save();

    const adminEmailHtml = getAdminEmailTemplate({
      name,
      email,
      mobile,
      companyName,
      projectName,
      websiteLink,
      budget,
      projectDocuments,
    });

    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `🆕 New Project Submitted: ${projectName}`,
      html: adminEmailHtml,
    });

    const userEmailHtml = getUserEmailTemplate({
      name,
      projectName,
      message:
        "Your project has been successfully submitted. Our team will contact you soon.",
    });

    await sendMail({
      to: email,
      subject: "✅ Project Submission Received",
      html: userEmailHtml,
    });

    res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id })
      .populate("websiteType", "name price")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
});

export default router;
