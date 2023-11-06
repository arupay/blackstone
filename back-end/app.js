//Dependencies
const express = require("express");
const cors = require("cors");
const meetingRoomController = require("./controllers/meetingRoomController");
const bookingsController = require("./controllers/bookingsController");
const usersController = require("./controllers/usersController");

//Config
const app = express();

//Middleware

app.use(cors());
app.use(express.json());
app.use("/api/meeting-rooms", meetingRoomController);
app.use("/api/bookings", bookingsController);
app.use("/api/users", usersController);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to RoomBooker");
});

app.get("*", (req, res) => {
  res.send("Sorry, this route does not exist");
});

module.exports = app;
