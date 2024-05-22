const express = require("express");
const jobRouter = express.Router();

const {
  addJob,
  getAllJobs,
  updateJob,
  getById,
  deleteJob,
  getByUserId,
  applyJob,
  unapplyJob,
  getAppliers,
  acceptApplier,
  getAcceptedAppliers,
  getSortedAppliers,
} = require("../controllers/job.controller");

jobRouter.post("/jobs/add", addJob);
jobRouter.get("/", getAllJobs);
jobRouter.put("/update/:id", updateJob);
jobRouter.get("/:id", getById);
jobRouter.delete("/:id", deleteJob);
jobRouter.get("/user/:id", getByUserId);
//
jobRouter.put("/jobs/:jobId/apply/:userId", applyJob);
jobRouter.put("/jobs/:jobId/unapply/:userId", unapplyJob);
jobRouter.get("/jobs/:jobId/appliers", getAppliers);
jobRouter.get("/jobs/:jobId/sortedappliers", getSortedAppliers);
jobRouter.put("/jobs/:jobId/appliers/:userId/accept", acceptApplier);

jobRouter.get("/jobs/:jobId/accepted-appliers", getAcceptedAppliers);

module.exports = jobRouter;
