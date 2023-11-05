const db = require("../db/dbConfig.js");

//reusable funciton that checks for conflicting bookings
const hasConflictingBooking = async (
  meeting_room_id,
  start_date,
  end_date,
  excludeBookingId = null
) => {
  const query = excludeBookingId
    ? "SELECT * FROM booking WHERE meeting_room_id = $1 AND ((start_date, end_date) OVERLAPS ($2, $3)) AND id != $4"
    : "SELECT * FROM booking WHERE meeting_room_id = $1 AND ((start_date, end_date) OVERLAPS ($2, $3))";

  const queryParams = excludeBookingId
    ? [meeting_room_id, start_date, end_date, excludeBookingId]
    : [meeting_room_id, start_date, end_date];

  const conflictingBooking = await db.oneOrNone(query, queryParams);
  return conflictingBooking != null;
};

const getBookings = async () => {
  try {
    const query = `
      SELECT booking.*, meeting_room.floor, meeting_room.capacity, meeting_room.name as room_name
      FROM booking
      JOIN meeting_room ON booking.meeting_room_id = meeting_room.id;
    `;

    const bookingInfo = await db.any(query);

    const now = new Date();
    const pastBookings = [];
    const futureBookings = [];

    bookingInfo.forEach((booking) => {
      const endMoment = new Date(booking.end_date);
      const bookingWithAttendees = {
        ...booking,
        attendees: booking.attendees.split(";"),
      };

      // checkint for end date already happening/occurring
      if (endMoment < now) {
        pastBookings.push(bookingWithAttendees);
      } else {
        futureBookings.push(bookingWithAttendees);
      }
    });

    // sort past, most recent first (for front end purposes)
    pastBookings.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

    // sort future, soonest to occur first ('')
    futureBookings.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

    return {
      past: pastBookings,
      future: futureBookings,
    };
  } catch (error) {
    console.log(error.message || error);
    return { error: true, message: "Database error." };
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
        booking.created_on,
        meeting_room.name as room_name,
        meeting_room.capacity,
        meeting_room.floor 
      FROM booking
      JOIN meeting_room ON booking.meeting_room_id = meeting_room.id
      WHERE booking.id = $1;
    `;

    // Fetch the booking from the database
    const bookingInfo = await db.oneOrNone(query, [id]);

    if (bookingInfo) {
      return {
        ...bookingInfo,
        attendees: bookingInfo.attendees.split(";"),
      };
    }

    return bookingInfo;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const createBooking = async (bookingData) => {
  const { start_date, end_date, attendees, meeting_room_id, meeting_name } =
    bookingData;
  if (!meeting_name || !start_date || !end_date) {
    return { error: true, message: "Missing required booking information." };
  }

  try {
    const isConflict = await hasConflictingBooking(
      meeting_room_id,
      start_date,
      end_date
    );
    if (isConflict) {
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

const updateBooking = async (bookingId, bookingData) => {
  const { start_date, end_date, attendees, meeting_name, meeting_room_id } =
    bookingData;
  if (!meeting_name || !start_date || !end_date) {
    throw new Error("Missing required booking information.");
  }

  const isConflict = await hasConflictingBooking(
    meeting_room_id,
    start_date,
    end_date,
    bookingId
  );
  if (isConflict) {
    throw new Error("The room is already booked for the desired time slot.");
  }

  const query = `
    UPDATE booking 
    SET start_date = $1, end_date = $2, attendees = $3, meeting_name = $4, meeting_room_id = $5 
    WHERE id = $6
    RETURNING *; 
  `;
  return db.oneOrNone(query, [
    start_date,
    end_date,
    attendees,
    meeting_name,
    meeting_room_id,
    bookingId,
  ]);
};

const deleteBooking = async (id) => {
  try {
    await db.none("DELETE FROM booking WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.log(error.message || error);
    throw new Error("Failed to delete booking");
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  deleteBooking,
  updateBooking,
};
