import express from "express";
import Project from "../models/Project.js";
import { sendMail, getAdminEmailTemplate, getUserEmailTemplate } from "../utils/mail.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// POST - Create new project
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name, companyName, mobile, email,
      websiteLink, projectName, websiteType, budget,
      projectDocuments // new field: array of { name, driveLink }
    } = req.body;

    const newProject = await Project.create({
      user: req.user.id,
      name,
      companyName,
      mobile,
      email,
      websiteLink,
      projectName,
      websiteType,
      budget,
      projectDocuments, // store documents
      status: "pending"
    });

    const emailData = { name, companyName, mobile, email, websiteLink, projectName, websiteType, budget, projectDocuments };

    const adminHtml = getAdminEmailTemplate(emailData);
    const userHtml = getUserEmailTemplate(emailData);

    console.log("Admin Email Preview:", adminHtml.substring(0, 100));
    console.log("User Email Preview:", userHtml.substring(0, 100));

    sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Project: ${projectName} - ${companyName}`,
      html: adminHtml
    }).catch(err => console.error("Admin email failed:", err));

    sendMail({
      to: email,
      subject: "✅ Project Submission Confirmation",
      html: userHtml
    }).catch(err => console.error("User email failed:", err));

    res.status(201).json({
      success: true,
      message: "Project submitted successfully!",
      project: newProject
    });

  } catch (error) {
    console.error("❌ Error submitting project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET - Fetch all projects for logged-in user
router.get("/user", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('websiteType', 'name'); // populate website type name

    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error("❌ Error fetching user projects:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET - Fetch all projects (Admin only)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const projects = await Project.find()
      .populate('user', 'name email')
      .populate('websiteType', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error("❌ Error fetching all projects:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PUT - Update project status (Admin only)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { status, projectDocuments, finalWebsiteLink } = req.body; // allow updating documents and final link
    
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status, projectDocuments, finalWebsiteLink },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project updated",
      project
    });
  } catch (error) {
    console.error("❌ Error updating project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE - Delete project (Admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Project deleted"
    });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
