import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Client Info
    name: { type: String, required: true },
    companyName: { type: String },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: "Mobile number must be 10 digits",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email",
      },
    },

    // Project Info
    websiteLink: { type: String },
    projectName: { type: String, required: true },
    websiteType: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    budget: { type: String },

    // Project Documents
    projectDocuments: [
      {
        name: String,             // File name or description
        driveLink: String,        // Google Drive shareable link
      },
    ],

    // Status & Result
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    finalWebsiteLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
