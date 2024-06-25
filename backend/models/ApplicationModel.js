import mongoose from "mongoose";
const ApplicationModel = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
    },
    applicantEmail: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    offerTitle: {
      type: String,
      required: true,
    },

    CreateAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Application = mongoose.model("Application", ApplicationModel);
