const db = require("../db/dbConfig.js");

const getRooms = async () => {
  try {
    const rooms = await db.any("SELECT * FROM meeting_room");
    return rooms;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const getRoomById = async (id) => {
  try {
    const chosenRoom = await db.any(
      "SELECT * FROM meeting_room WHERE id = $1",
      [id]
    );
    return chosenRoom;
  } catch (error) {
    console.log(error.message || error);
    return null;
  }
};

const getFutureBookingsForRoom = async (roomId) => {
  try {
    const futureBookings = await db.any(
      `
            SELECT * FROM booking 
            WHERE meeting_room_id = $1 AND start_date > NOW()
            ORDER BY start_date ASC`,
      [roomId]
    );
    return futureBookings;
  } catch (error) {
    console.log(error.message || error);
    return null;
  }
};

const getFilteredRooms = async (start_date, end_date, capacity, floor) => {
  try {
    let params = [start_date, end_date]; // required params
    let query = `SELECT * FROM meeting_room
    WHERE id NOT IN (
      SELECT meeting_room_id
      FROM booking
      WHERE (start_date, end_date) OVERLAPS ($1, $2)
    )`;

    if (capacity) {
      //add capacity to query string
      query += ` AND capacity>= $${params.length + 1}`;
      params.push(capacity);
    }

    if (floor) {
      //add floro to query string/ dynamic paramaetizaiton
      query += ` AND floor = $${params.length + 1}`;
      params.push(floor);
    }
    const rooms = await db.any(query, params);
    return rooms;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};
const createRoom = async (name, capacity, floor, createdBy) => {
  try {
    const newRoomQuery = `
      INSERT INTO meeting_room (name, capacity, floor, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const newRoom = await db.one(newRoomQuery, [name, capacity, floor, createdBy]);
    return newRoom;
  } catch (error) {
    console.error("Error creating new room:", error.message || error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoomById,
  getFutureBookingsForRoom,
  getFilteredRooms,
};
