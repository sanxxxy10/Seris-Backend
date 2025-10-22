import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  companyName: { type: String },
  projectName: { type: String, required: true },
  websiteType: { type: String, required: true }, // <- change from ObjectId to String
  projectDocuments: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true }
    }
  ],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
