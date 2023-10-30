const db = require("../db/dbConfig.js");

const getBookings = async () => {
  try {
    const query = `
      SELECT booking.*, meeting_room.floor, meeting_room.name
      FROM booking
      JOIN meeting_room ON booking.meeting_room_id = meeting_room.id;
    `;

    const bookingsWithFloor = await db.any(query);

    return bookingsWithFloor;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const getBookingById = async (id) => {
  try {
    const query = `
      SELECT 
        booking.id,
        booking.start_date,
        booking.end_date,
        booking.attendees,
        booking.meeting_name,
        booking.meeting_room_id,
        meeting_room.floor 
      FROM booking
      JOIN meeting_room ON booking.meeting_room_id = meeting_room.id
      WHERE booking.id = $1;
    `;

    const bookingWithFloor = await db.oneOrNone(query, [id]);

    return bookingWithFloor;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const createBooking = async (bookingData) => {
  const { start_date, end_date, attendees, meeting_room_id, meeting_name } =
    bookingData;
  try {
    const conflictingBooking = await db.oneOrNone(
      "SELECT * FROM booking WHERE meeting_room_id = $1 AND ((start_date, end_date) OVERLAPS ($2, $3))",
      [meeting_room_id, start_date, end_date]
    );

    if (conflictingBooking) {
      return {
        error: true,
        message: "The room is already booked for the desired time slot.",
      };
    }

    const newBooking = await db.one(
      "INSERT INTO booking (start_date, end_date, attendees, meeting_name, meeting_room_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [start_date, end_date, attendees, meeting_name, meeting_room_id]
    );
    return { success: true, payload: newBooking };
  } catch (error) {
    console.log(error.message || error);
    return { error: true, message: "Database error." };
  }
};

const deleteBooking = async (id) => {
  try {
    const deletedBooking = await db.result(
      "DELETE FROM booking WHERE id = $1",
      [id]
    );
    return deletedBooking.rowCount; // Returns the number of rows affected by the last executed statement!
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = { getBookings, getBookingById, createBooking, deleteBooking };
