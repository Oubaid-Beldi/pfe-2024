import { Application } from "../models/ApplicationModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";

import fs from "fs";
import path from "path";

// Apply for a job
export const applyForJob = async (req, res) => {
  const { applicantName, applicantEmail, offerTitle } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Please upload your CV." });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Please upload a PDF file." });
  }

  try {
    // Upload CV to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    // Delete temporary file from server
    fs.unlinkSync(req.file.path);

    const cvUrl = result.secure_url;

    // Create new application
    const newApplication = new Application({
      applicantName,
      applicantEmail,
      cv: cvUrl,
      offerTitle,
      published: false,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error uploading CV:", error);
    res.status(500).json({ message: "Failed to submit application." });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};
// delete an article by id
export const deleteApplication = async (req, res) => {
  const id = req.params.id;
  try {
    await Application.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "delete failed." });
  }
};
