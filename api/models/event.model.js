const mongoose = require("mongoose");
const Tester = require("./tester.model");

const EventSchema = new mongoose.Schema({
  testerId: {
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
  participants: {
    type: Number,
    default: 0, // Initialize participants to 0
  },
  tester: {
    type: mongoose.Types.ObjectId,
    ref: "Tester",
    required: true,
  },
  appliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  acceptedAppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
