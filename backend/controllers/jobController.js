import { Job } from "../models/JobModel.js";
import { User } from "../models/userModel.js";
// get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).send({ count: jobs.length, Jobs: jobs });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// get published jobs
export const getPublishedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ published: true });
    res.status(200).send({ count: jobs.length, publishedJobs: jobs });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// get Unpublished jobs
export const getUnpublishedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ published: false });
    res.status(200).send({ count: jobs.length, UnpublishedJobs: jobs });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// Approve Job
export const approveJobById = async (req, res) => {
  const id = req.params.id;
  try {
    const job = Job.findById(id);
    if (!job) {
      res.status(404).send("Job not found");
    }
    req.body.published = true;
    req.body.publishedAt = Date.now();

    await Job.findByIdAndUpdate(id, req.body);

    console.log("job approved");
    res.status(200).send("job approved successfully");
  } catch (error) {
    console.error("Error approving job:", error);
    res.status(500).send("Internal server error");
  }
};

// get a job by it's id
export const FindJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).send({ msg: "Job offer not found" });
    } else {
      return res.status(200).send(job);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// create a job
export const PostJob = async (req, res) => {
  try {
    // const {
    //   title,
    //   description,
    //   benefits,
    //   targetProfile,
    //   requiredQualification,
    //   optionalQualification,
    //   yearsOfExperienceRequired,
    //   yearsOfExperienceRecommanded,
    //   locationType,
    //   locationPlace,
    //   contractType,
    //   contractDuration,
    //   incomePeriod,
    //   incomeValue,
    //   incomeCurrency,
    //   author,
    //   published,
    //   publishedAt,
    // } = req.body;

    // const newJob = {
    //   title,
    //   description,
    //   benefits,
    //   targetProfile,
    //   requiredQualification,
    //   optionalQualification,
    //   yearsOfExperienceRequired,
    //   yearsOfExperienceRecommanded,
    //   locationType,
    //   locationPlace,
    //   contractType,
    //   contractDuration,
    //   incomePeriod,
    //   incomeValue,
    //   incomeCurrency,
    //   author,
    //   published,
    //   publishedAt,
    // };

    const savedJob = await Job.create(req.body);
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// update a job
export const updateJobById = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ msg: "You have to put something to change" });
    } else {
      const user = await User.findById(req.user._id);
      if (user.role === "Web Editor") {
        req.body.published = false;
      }
      const id = req.params.id;
      const result = await Job.findByIdAndUpdate(id, req.body, { new: true });
      if (!result) {
        return res.status(404).send({ msg: "Job not found" });
      } else {
        return res.status(200).send({
          msg: "Job succefully updated",
          Job: result,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
// delete a job
export const deleteJobById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Job.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ msg: "Not found" });
    } else {
      return res.status(200).send({ msg: "deleted succefully" });
    }
  } catch (error) {
    console.log(msg.error);
    return res.status(500).send({ msg: error.message });
  }
};

// get jobs for his editor by his id
export const getEditorJobs = async (req, res) => {
  try {
    const editorId = req.params.editorId;
    const jobs = await Job.find({ userId: editorId });
    if (!jobs) {
      return res.status(404).send({ msg: "no jobs" });
    } else {
      return res.status(200).send({ count: jobs.length, editorJobs: jobs });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: error.message });
  }
};
