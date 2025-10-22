import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    companyName: { type: String },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    websiteLink: { type: String },
    projectName: { type: String, required: true },
    websiteType: { type: mongoose.Schema.Types.ObjectId, ref: "WebsiteType", required: true },
    budget: { type: Number },
    projectDocuments: [{ type: String }],
  },
  { timestamps: true }
);

// This ensures that hot reload / multiple imports won't break it
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
