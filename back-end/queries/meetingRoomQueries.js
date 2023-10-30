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
    qq;
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

const createRoom = async (name, capacity, floor) => {
  try {
    const newRoomQuery = `INSERT INTO meeting_room (name, capacity, floor)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
    const newRoom = await db.one(newRoomQuery, [name, capacity, floor]);
    return newRoom;
  } catch (error) {
    console.log(error.message || error);
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoomById,
  getFutureBookingsForRoom,
};
