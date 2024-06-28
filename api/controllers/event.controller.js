const mongoose = require("mongoose");
const User = require("../models/user.model");
const Event = require("../models/event.model");
const Tester = require("../models/tester.model");
const { sendEmail } = require("../middlewares/mail.middleware");

const addEvent = async (req, res, next) => {
  const { title, description, image, tester } = req.body;

  let existingTester;
  try {
    existingTester = await Tester.findById(tester);
  } catch (err) {
    return console.log(err);
  }
  if (!existingTester) {
    return res
      .status(400)
      .json({ message: "Unable to find tester by this ID" });
  }
  const event = new Event({
    title,
    description,
    image,
    tester,
    participants: 0, // Initialize participants to 0
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await event.save({ session });
    existingTester.events.push(event);
    await existingTester.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ event });
};
///
const getAllEvents = async (req, res, next) => {
  let events;
  try {
    events = await Event.find().populate("tester");
  } catch (err) {
    return console.log(err);
  }
  if (!events) {
    return res.status(404).json({ message: "No Events Found" });
  }
  return res.status(200).json({ events });
};
//////
const updateEvent = async (req, res, next) => {
  const { title, description } = req.body;
  const eventId = req.params.id;
  let event;
  try {
    event = await Event.findByIdAndUpdate(eventId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!event) {
    return res.status(500).json({ message: "Unable To Update The Event" });
  }
  return res.status(200).json({ event });
};
//
const getById = async (req, res, next) => {
  const id = req.params.id;
  let event;
  try {
    event = await Event.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!event) {
    return res.status(404).json({ message: "No Event Found" });
  }
  return res.status(200).json({ event });
};
//
const deleteEvent = async (req, res, next) => {
  const id = req.params.id;

  let event;
  try {
    event = await Event.findByIdAndRemove(id).populate("tester");
    await event.tester.events.pull(event);
    await event.tester.save();
  } catch (err) {
    console.log(err);
  }
  if (!event) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};
//// get compnay events
const getByUserId = async (req, res, next) => {
  const testerId = req.params.id;
  let testerEvents;
  try {
    testerEvents = await Tester.findById(testerId).populate("events"); //in populte you use the Ref in user.model
  } catch (err) {
    return console.log(err);
  }
  if (!testerEvents) {
    return res.status(404).json({ message: "No Event Found" });
  }
  return res.status(200).json({ tester: testerEvents });
};
////
const applyEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).exec();
    if (!event) return res.status(400).json("Event not found");

    const user = await User.findById(req.params.userId).exec();
    if (!user) return res.status(400).json("User not found");

    // Check if user has already paritcipated
    if (event.appliers.includes(req.params.userId))
      return res
        .status(400)
        .json("You have already participated to this event");

    // Check if user has already been accepted
    if (event.acceptedAppliers.includes(req.params.userId))
      return res
        .status(400)
        .json("You have already been accepted for this event");

    event.appliers.push(req.params.userId);
    event.participants++; // Increment participants by 1

    await event.save();

    // add notification to tester
    const tester = await Tester.findById(event.tester).exec();
    tester.notificationsTester.push({
      message: `paritcipated for your event of : ${event.title}`,
      event: event._id,
      user: user._id,
      userFirstname: user.firstname,
      userLastname: user.lastname,
      userPicture: user.picturePath,
      createdAt: new Date(),
    });
    await tester.save();

    return res.status(200).json("paritcipated successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const unapplyEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).exec();
    if (!event) return res.status(400).json("Event not found");

    // Check if user has paritcipated
    const applierIndex = event.appliers.indexOf(req.params.userId);
    if (applierIndex === -1)
      return res.status(400).json("You have not paritcipated for this event");

    // Remove user from appliers array
    event.appliers.splice(applierIndex, 1);
    event.participants--; // Decrement participants by 1

    // Remove user from acceptedAppliers array if they were accepted
    const acceptedApplierIndex = event.acceptedAppliers.indexOf(
      req.params.userId
    );
    if (acceptedApplierIndex !== -1) {
      event.acceptedAppliers.splice(acceptedApplierIndex, 1);
    }

    await event.save();
    return res.status(200).json("Unparticipated successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAppliers = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate({ path: "appliers", select: "firstname lastname email" })
      .select({ appliers: 1 })
      .lean()
      .exec();
    if (event.appliers.length === 0)
      return res.status(204).json(event.appliers);
    return res.status(200).json(event.appliers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const acceptApplier = async (req, res) => {
  const { eventId, userId } = req.params;

  try {
    // Find the event and the user
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    // Check if the event and user exist
    if (!event || !user) {
      return res.status(404).json({ message: "Event or user not found" });
    }

    // Check if the user has paritcipated to the event
    if (!event.appliers.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "User has not paritcipated to this event" });
    }

    // Add the user to the acceptedAppliers array of the event
    event.acceptedAppliers.push(user._id);
    user.notifications.push({
      message: "You have been accepted for The Event: ",
      event: event._id,
    });

    return res
      .status(200)
      .json({ message: "User has been accepted for this event" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAcceptedAppliers = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).exec();
    if (!event) return res.status(400).json("Event not found");

    const acceptedAppliers = event.acceptedAppliers;

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
  addEvent,
  getAllEvents,
  updateEvent,
  getById,
  deleteEvent,
  getByUserId,
  acceptApplier,
  getAppliers,
  unapplyEvent,
  applyEvent,
  getAcceptedAppliers,
};
