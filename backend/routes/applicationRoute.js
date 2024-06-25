import express from "express";
import multer from "multer";
import {
  applyForJob,
  getApplications,
  deleteApplication,
} from "../controllers/applicatinController.js";
// import {
//   applyForJob,
//   getApplications,
// } from "../controllers/applicationController.js";

const router = express.Router();

const storage = { dest: "uploads/" };
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("cv"), applyForJob);
router.get("/", getApplications);
router.delete("/:id", deleteApplication);

export default router;
