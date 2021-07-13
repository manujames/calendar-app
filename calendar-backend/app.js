const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin:["http://localhost:4200", "http://127.0.0.1:4200"]
}
app.use(cors(corsOptions));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: "2mb" }));

const port = 5000;

const eventRouter = require("./src/routes/eventRoutes");
app.use("/events", eventRouter);

app.get("/", (req, res) => {
  res.send("Calendar API");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
