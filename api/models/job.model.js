const mongoose = require("mongoose");
const Tester = require("./tester.model");

const JobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tester",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  salary: { type: Number, required: true },

  tester: {
    type: mongoose.Types.ObjectId,
    ref: "Tester",
    required: true,
  },
  appliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  acceptedAppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Job", JobSchema);
