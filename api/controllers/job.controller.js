const mongoose = require("mongoose");
const User = require("../models/user.model");
const Job = require("../models/job.model");
const Tester = require("../models/tester.model");
const { sendEmail } = require("../middlewares/mail.middleware");
const { sortappliers } = require("../tensorflow/anotherz");

const addJob = async (req, res, next) => {
  const { title, description, salary, image, tester } = req.body;

  let existingCompany;
  try {
    existingCompany = await Tester.findById(tester);
  } catch (err) {
    return console.log(err);
  }
  if (!existingCompany) {
    return res
      .status(400)
      .json({ message: "Unable TO FInd tester By This ID" });
  }
  const job = new Job({
    title,
    description,
    salary,
    image,
    tester,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await job.save({ session });
    existingCompany.jobs.push(job);
    await existingCompany.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ job });
};
///
const getAllJobs = async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find().populate("tester");
  } catch (err) {
    return console.log(err);
  }
  if (!jobs) {
    return res.status(404).json({ message: "No Jobs Found" });
  }
  return res.status(200).json({ jobs });
};
//////
const updateJob = async (req, res, next) => {
  const { title, description } = req.body;
  const jobId = req.params.id;
  let job;
  try {
    job = await Job.findByIdAndUpdate(jobId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!job) {
    return res.status(500).json({ message: "Unable To Update The Job" });
  }
  return res.status(200).json({ job });
};
//
const getById = async (req, res, next) => {
  const id = req.params.id;
  let job;
  try {
    job = await Job.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!job) {
    return res.status(404).json({ message: "No Job Found" });
  }
  return res.status(200).json({ job });
};
//
const deleteJob = async (req, res, next) => {
  const id = req.params.id;

  let job;
  try {
    job = await Job.findByIdAndRemove(id).populate("tester");
    await job.tester.jobs.pull(job);
    await job.tester.save();
  } catch (err) {
    console.log(err);
  }
  if (!job) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};
//// get compnay jobs
const getByUserId = async (req, res, next) => {
  const companyId = req.params.id;
  let companyJobs;
  try {
    companyJobs = await Tester.findById(companyId).populate("jobs"); //in populte you use the Ref in user.model
  } catch (err) {
    return console.log(err);
  }
  if (!companyJobs) {
    return res.status(404).json({ message: "No Job Found" });
  }
  return res.status(200).json({ tester: companyJobs });
};
////
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();
    if (!job) return res.status(400).json("Job not found");

    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.status(400).json("User not found");

    // Check if user has already applied
    if (job.appliers.includes(req.params.userId))
      return res.status(400).json("You have already applied for this job");

    // Check if user has already been accepted
    if (job.acceptedAppliers.includes(req.params.userId))
      return res
        .status(400)
        .json("You have already been accepted for this job");

    job.appliers.push(req.params.userId);
    await job.save();

    // add notification to tester
    const tester = await Tester.findById(job.tester).exec();
    tester.notificationsCompany.push({
      message: `Applied for your job of : ${job.title}`,
      job: job._id,
      user: user._id,
      userFirstname: user.firstname,
      userLastname: user.lastname,
      userPicture: user.picturePath,
      createdAt: new Date(),
    });
    await tester.save();

    return res.status(200).json("Applied successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const unapplyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();
    if (!job) return res.status(400).json("Job not found");

    // Check if user has applied
    const applierIndex = job.appliers.indexOf(req.params.userId);
    if (applierIndex === -1)
      return res.status(400).json("You have not applied for this job");

    // Remove user from appliers array
    job.appliers.splice(applierIndex, 1);

    // Remove user from acceptedAppliers array if they were accepted
    const acceptedApplierIndex = job.acceptedAppliers.indexOf(
      req.params.userId
    );
    if (acceptedApplierIndex !== -1) {
      job.acceptedAppliers.splice(acceptedApplierIndex, 1);
    }

    await job.save();
    return res.status(200).json("Unapplied successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAppliers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate({ path: "appliers", select: "firstname lastname email" })
      .select({ appliers: 1 })
      .lean()
      .exec();
    if (job.appliers.length === 0) return res.status(204).json(job.appliers);
    return res.status(200).json(job.appliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getSortedAppliers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate("appliers");
    if (job.appliers.length === 0) return res.status(204).json(job.appliers);
    const sortedappliers = await sortappliers(job.appliers);
    return res.status(200).json(sortedappliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const acceptApplier = async (req, res) => {
  const { jobId, userId } = req.params;

  try {
    // Find the job and the user
    const job = await Job.findById(jobId);
    const user = await User.findById(userId);

    // Check if the job and user exist
    if (!job || !user) {
      return res.status(404).json({ message: "Job or user not found" });
    }

    // Check if the user has applied to the job
    if (!job.appliers.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "User has not applied to this job" });
    }

    // Add the user to the acceptedAppliers array of the job
    job.acceptedAppliers.push(user._id);
    user.notifications.push({
      message: "You have been accepted for The Job: ",
      job: job._id,
    });
    sendEmail(user.email, "You have been accepted for a Job: ");
    await user.save();
    await job.save();

    return res
      .status(200)
      .json({ message: "User has been accepted for this job" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAcceptedAppliers = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).exec();
    if (!job) return res.status(400).json("Job not found");

    const acceptedAppliers = job.acceptedAppliers;

    // create notifications for accepted users
    for (const userId of acceptedAppliers) {
      const user = await User.findById(userId).exec();
    }

    return res.status(200).json(acceptedAppliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  updateJob,
  getById,
  deleteJob,
  getByUserId,
  acceptApplier,
  getAppliers,
  unapplyJob,
  applyJob,
  getAcceptedAppliers,
  getSortedAppliers,
};
