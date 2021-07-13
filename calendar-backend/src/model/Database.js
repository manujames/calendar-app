const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/EventsData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  date: String,
  time: String,
});
const EventData = mongoose.model("event", EventSchema);

module.exports.EventData = EventData;
