const express = require("express");
const meetingRooms = express.Router();

const {
  getRooms,
  createRoom,
  getRoomById,
  getFutureBookingsForRoom,
  getFilteredRooms,
} = require("../queries/meetingRoomQueries");

meetingRooms.get("/", async (req, res) => {
  try {
    const allRooms = await getRooms();
    res.status(200).json({ success: true, payload: allRooms });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

meetingRooms.get("/filter", async (req, res) => {
  try {
    const { start_date, end_date, capacity, floor } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message:
          "You must include start or end dates to search available rooms",
      });
    }
    const filteredRooms = await getFilteredRooms(
      start_date,
      end_date,
      capacity,
      floor
    );
    if (filteredRooms.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No rooms available for the given criteria.",
        payload: [],
      });
    }

    res.status(200).json({ success: true, payload: filteredRooms });
  } catch (error) {
    console.log(error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

meetingRooms.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await getRoomById(id);
    if (room && room.length > 0) {
      res.status(200).json({ success: true, payload: room[0] });
    } else {
      res.status(404).json({ success: false, error: "Meeting room not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

meetingRooms.get("/:id/bookings", async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await getFutureBookingsForRoom(id);
    if (bookings && bookings.length > 0) {
      res.status(200).json({
        success: true,
        payload: bookings,
        message: `Found ${bookings.length} rooms matching your criteria!`,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No future bookings found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

meetingRooms.post("/", async (req, res) => {
  const { name, capacity, floor, created_by } = req.body;
  try {
    const newRoom = await createRoom(name, capacity, floor, created_by);
    res.status(201).json({ success: true, payload: newRoom }); // Status code 201 for resource creation
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: "Could not make room" });
  }
});

module.exports = meetingRooms;
