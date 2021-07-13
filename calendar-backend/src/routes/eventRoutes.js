const express = require("express");
const eventRouter = express.Router();
const EventData = require("../model/Database").EventData;

// Get an array of all events
eventRouter.get("/", (req, res) => {
  // retrieve id, title, date and time
  // sort by date and then by time
  EventData.find({},{_id:1,title:1,date:1,time:1},{sort:{date:-1,time:-1}})
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send("Database read error");
    });
});

// Add a new event
eventRouter.post("/", (req, res) => {
  let newEvent = req.body;
  EventData(newEvent)
    .save()
    .then((event) => {
      // Newly saved  document is available in emp variable
      res.status(200).send(event);
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database write failed");
    });
});

// Get a single event's details based on unique _id property of mongodb
eventRouter.get("/edit/:id", (req, res) => {
  let eventId = req.params.id;
  EventData.findById(eventId)
    .then((event) => {
      if (event) {
        res.status(200).send(event);
      } else {      // No event details received. ie: event with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database read failed");
    });
});

// Update details of an event based on unique _id property of mongodb
eventRouter.put("/edit/:id", (req, res) => {
  let eventId = req.params.id;
  let updatedEvent = req.body;
  EventData.findByIdAndUpdate(eventId, updatedEvent, { new: true })
    .then((event) => {
      if (event) {
        res.status(200).send(event);
      } else {    // No event details received. ie: event with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database write failed");
    });
});

// Delete an event based on unique _id property of mongodb
eventRouter.delete("/delete/:id", (req, res) => {
  let eventId = req.params.id;
  EventData.findByIdAndDelete(eventId)
    .then((event) => {
      if (event) {
        res.status(200).send(event);
      } else {    // No event details received. ie: event with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database operation failed");
    });
});

module.exports = eventRouter;
