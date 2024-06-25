import mongoose from "mongoose";
const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: "uesr",
    ref: "user",
  },
  // verfication token
  vToken: {
    type: String,
    default: "",
  },
  // reset token
  rToken: {
    type: String,
    default: "",
  },
  // login token
  lToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const Token = mongoose.model("Token", tokenSchema);
