const express = require("express");
const eventRouter = express.Router();

const {
  addEvent,
  getAllEvents,
  updateEvent,
  getById,
  deleteEvent,
  getByUserId,
  applyEvent,
  unapplyEvent,
  getAppliers,
  acceptApplier,
  getAcceptedAppliers,
} = require("../controllers/event.controller");

eventRouter.post("/events/add", addEvent);
eventRouter.get("/", getAllEvents);
eventRouter.put("/update/:id", updateEvent);
eventRouter.get("/:id", getById);
eventRouter.delete("/:id", deleteEvent);
eventRouter.get("/user/:id", getByUserId);
//
eventRouter.put("/events/:eventId/apply/:userId", applyEvent);
eventRouter.put("/events/:eventId/unapply/:userId", unapplyEvent);
eventRouter.get("/events/:eventId/appliers", getAppliers);

eventRouter.put("/events/:eventId/appliers/:userId/accept", acceptApplier);

eventRouter.get("/events/:eventId/accepted-appliers", getAcceptedAppliers);

module.exports = eventRouter;
